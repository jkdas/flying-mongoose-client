import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

const NotFound = () => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center my-5">
                <div className="me-4">
                    <h1>404</h1>
                </div>
                <div>
                    <h3>Oops! You're lost.</h3>
                    <h6>The page you are looking for was not found</h6>
                </div>

            </div>
            <div className="container w-50">
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="dark">Search</Button>
                </Form>
            </div>

        </>
    );
};

export default NotFound;