import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Footer.css";



const Footer = () => {
    const handleNewsLetter = e => {
        e.prventDefault()
    }
    return (
        <div>
            <div className="row footer-container">

                <Row>
                    <div className="col-md-4">

                        <h3 className="text-white">Quick Links</h3>
                        <div className="quick-links">
                            <Link to="/home">Home</Link>
                            <Link to="/products">Products</Link>
                            <Link to="/contact">Contact Us</Link>
                            <Link to="/login">Login/Register</Link>
                        </div>

                    </div>
                    <div className="col-md-4">

                        <h3 className="text-white">NEWSLETTER</h3>
                        <p>Don't miss any updates or promotions by signing up to our newsletter.</p>
                        <div className="quick-links">
                            <form onSubmit={handleNewsLetter} >
                                <input type="text" />
                                <button className="bg-warning p-2" type="submit">Subscribe</button>
                            </form>
                        </div>

                    </div>
                    <div className="col-md-4">
                        <h2>Contact Us</h2>
                        <p> 55/7 (6th Floor), Bannani, Dhaka-1207</p>
                        <p>Phone: 880170000111</p>
                        <p>E-mail: info@flyingmongoos-bd.com,flyingmongoos-bd@gmail.com</p>

                    </div>
                </Row>
                <Row>
                    <div className="col-md-12">
                        <div>
                            <h3 className="">FOLLOW US</h3>
                            {/* <Link><FontAwesomeIcon icon="faFacebookF" /></Link>
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} /> */}
                        </div>
                    </div>
                </Row>

            </div>
        </div>
    );
};

export default Footer;