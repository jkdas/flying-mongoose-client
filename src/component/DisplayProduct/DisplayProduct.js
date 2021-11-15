import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./DisplayProduct.css";

const DisplayProduct = ({ product }) => {

    // Destructuring from products
    const { _id, model, status, price, description, imgUrl } = product;
    //Dynamic route url 
    const url = `/product/${_id}`;
    return (
        <>
            <Col>
                <Card className="h-100">
                    <Card.Img variant="center" className="product-img" src={imgUrl} />
                    <Card.Body>
                        <Card.Title>Model: {model}</Card.Title>
                        <Card.Text>
                            Status: {status}
                        </Card.Text>
                        <Card.Text>
                            Price : {price}
                        </Card.Text>
                        <Card.Text>
                            {description.slice(0, 100)}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-center">

                        <Link to={url}>
                            <Button>
                                Order Now
                            </Button>
                        </Link>
                    </Card.Footer>
                </Card>
            </Col>

        </>
    );
};

export default DisplayProduct;