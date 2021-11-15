import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useHistory, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {

    const [loginData, setLoginData] = useState({})
    const history = useHistory();
    const { user, registerUser, loading, authError } = useAuth();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert("Your password did not match");
            return;
        }
        registerUser(loginData.email, loginData.password, loginData.name, history)
        e.preventDefault();
    }

    return (
        <>
            <div className="container w-50 my-5 p-5 bg-info">
                <h2 className="mb-3 text-center">Please Register</h2>

                {!loading && <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">

                        <Form.Control onBlur={handleOnBlur} type="text" name="name" placeholder="Enter Name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control onBlur={handleOnBlur} type="email" name="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control onBlur={handleOnBlur} type="password" name="password" placeholder="Password" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control onBlur={handleOnBlur} type="password" name="password2" placeholder="Retype Password" required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    <div>
                        <NavLink
                            style={{ textDecoration: "none" }}
                            to="/login">
                            <Button variant="secondary"> Already Registered? Please Login</Button>
                        </NavLink>
                    </div>
                </Form>}
                <div className="mb-3 text-danger">
                    {authError}
                </div>
                {user.email && <div className="mb-3 text-success">
                    User created successfully
                </div>}
            </div>
        </>
    );
};

export default Register;