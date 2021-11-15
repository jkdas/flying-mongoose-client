import { Carousel } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./Home.css"
import Footer from '../Footer/Footer';
import Rating from 'react-rating';
import Header from '../Header/Header';



const Home = () => {

    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res?.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/allReviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <>
            <Header></Header>
            <div className="mt-1">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/DDJQnBS/Drone-flying-outside-in-sky-sunset-banner-panorama-Closeup-of-drone-quadcopter-with-security-camera.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/SQrfXt0/Drone-horizontal-banner-Drones-remote-control-vector-illustration-in-flat-style-for-web.jpg"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/b3DL5md/banner-4.png"
                            alt="Third slide"
                        />
                    </Carousel.Item>

                </Carousel>
            </div>
            <div className="section-header text-white text-center py-4 my-4">
                <h2>Popular Products</h2>
            </div>
            <Container>
                <Row xs={1} md={2} className="gap-4">

                    {
                        products.slice(0, 6).map((product) => (
                            <div className="row container">
                                <div className="d-flex justify-content-center align-items-center border border p-2 m-2 ">
                                    <div className="col-md-4 col-lg-4 ">
                                        <img className="img-fluid" src={product.imgUrl} alt="" />
                                    </div>
                                    <div className="col-md-8 col-lg-8">
                                        <div>
                                            <h4>Model: {product.model}</h4>
                                            <h5>Price: ৳ {product.price} </h5>
                                            <Link to={`/product/${product._id}`}>
                                                <Button>Order Now

                                                </Button>
                                            </Link>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </Row>
            </Container>
            <div className="section-header text-white text-center py-4 my-4">
                <h2>Our Happy Clients Says</h2>
            </div>
            <Container className="mb-4">
                <Row xs={1} md={2}>
                    {
                        reviews.map(review => (

                            <Col md="4">
                                <h3>Customer Name: {review.name}</h3>
                                <p>
                                    Comments: {review.message}
                                </p>

                                <Rating
                                    initialRating={review.rating}
                                    emptySymbol="far fa-star icon-color"
                                    fullSymbol="fas fa-star icon-color"
                                    readonly />
                            </Col>

                        ))
                    }

                </Row>
            </Container>
            <div className="section-header text-white text-center py-4 my-4">
                <h2>Upcoming Drones</h2>
            </div>
            <Container className="mb-5">
                <Row xs={1} md={2} gap={3}>
                    <Col md="4">
                        <img src="https://www.bdstall.com/asset/product-image/giant_131463.jpg" className="w-50 h-50" alt="" />
                        <h3>Model Name: Aerocraft F16 Remote Control Foldable Drone</h3>
                        <p>
                            Price: 28500:
                        </p>
                        <p>
                            Description:You may control the F16 foldable drone via Wi-Fi. The drone has Up to 9 minutes of flight time and more than an 80-meter remote control distance. The drone's range and distance can be controlled with ease by establishing an altitude lim
                        </p>

                    </Col>
                    <Col md="4">
                        <img src="https://www.bdstall.com/asset/product-image/giant_131382.jpg" className="w-50 h-50" alt="" />
                        <h3>Model Na: me-CH Mini Folding Drone with Camera</h3>
                        <p>
                            Price: 65500:
                        </p>
                        <p>
                            Description:Follow me F9G mini folding drone comes with 2.4GHz 4 channel headless mode, LED lights, and G-sensor. Optical flow placement stabilizes the drone's flight, prevents side flight, and allows you to control the drone with your palm. Y
                        </p>

                    </Col>
                    <Col md="4">
                        <img src="https://www.bdstall.com/asset/product-image/giant_131231.jpg" className="w-50 h-50" alt="" />
                        <h3>Model Name: Aerocraft F16 Remote Control Foldable Drone</h3>
                        <p>
                            Price: 48500:
                        </p>
                        <p>
                            Description: The H19 tiny foldable drone uses advanced recognition technology to automatically snap images after identifying the movements, making photography more feasible.
                        </p>

                    </Col>


                </Row>
            </Container>
            <div className="mt-5">
                <Footer></Footer>
            </div>

        </>
    );
};

export default Home;