import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import DisplayProduct from '../DisplayProduct/DisplayProduct';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

// import "./TourPackages.css";

const Products = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('https://desolate-falls-28146.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])

    return (
        <>
            <Header></Header>
            <div id="services">
                <h2 className="text-primary mt-5">Our Products</h2>
                <div className="service-container">
                    <Row xs={1} md={3} className="g-4">
                        {
                            products.map(product => <DisplayProduct
                                key={product._id}
                                product={product}
                            ></DisplayProduct>)
                        }
                    </Row>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Products;