import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './ProductDetail.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ProductDetail = () => {

    const { id } = useParams();
    // full course detail store data in useState
    const [ProductDetails, setProductDetails] = useState([]);
    // Single course detail store data in useState
    const [singleProductDetail, setSingleProductDetail] = useState({});
    const { user } = useAuth();

    // coursedetails data load from local json data file
    useEffect(() => {
        fetch('https://desolate-falls-28146.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProductDetails(data))
    }, [])
    // find course detail according to course id 
    useEffect(() => {
        const foundSinglePackageDetail = ProductDetails?.find(p => p._id === id)
        setSingleProductDetail(foundSinglePackageDetail);
    }, [ProductDetails])

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        data.model = singleProductDetail.model;
        data.price = singleProductDetail.price;
        data.productStatus = singleProductDetail.status;
        data.imgUrl = singleProductDetail.imgUrl;
        data.status = "pending"

        /*  tourPackage.email = user.email;
         tourPackage.status = "pending"; */

        fetch(`https://desolate-falls-28146.herokuapp.com/addOrder`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Order Confirmed successfully');
                    reset();
                }
            });
    }
    return (
        <>
            <Header></Header>
            <div>
                <Container className="my-5">

                    <Row className="d-flex align-items-center justify-content-center">
                        <Col md="4" className="mb-3">
                            <div>
                                <img className="img-fluid" src={singleProductDetail?.imgUrl} alt="" />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="ms-4 ps-3 text-left">
                                <h2>Model: {singleProductDetail?.model}</h2>
                                <p>Price: Tk {singleProductDetail?.price}</p>
                                <p>Availability: {singleProductDetail?.status}</p>
                                <p>Description: {singleProductDetail?.description}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="container w-75 bg-info mx-auto my-3">
                        <h2 className="my-4">Please confirm your Booking</h2>

                        <div className="place-order">
                            <form className="bg-secondary p-5" onSubmit={handleSubmit(onSubmit)}>
                                {/* register your input into the hook by invoking the "register" function */}
                                <input className="mb-3" defaultValue={user.displayName} {...register("name", { required: true })} placeholder="Your Name" />
                                <input className="mb-3" defaultValue={user.email} {...register("email", { required: true })} placeholder="Your Email" />
                                <input className="mb-3" defaultValue="" {...register("mobile", { required: true })} placeholder="Mobile no" />
                                <input className="mb-3" defaultValue="" {...register("address", { required: true })} placeholder="Address" />
                                <input type="textArea" {...register("message")} placeholder="Your Message" />

                                {/* errors will return when field validation fails  */}
                                {errors.exampleRequired && <span className="text-warning">This field is required</span>}
                                <br />
                                <input className="bg-warning p-3" type="submit" />
                            </form>
                        </div>
                    </Row>
                </Container>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </>
    );
};

export default ProductDetail;