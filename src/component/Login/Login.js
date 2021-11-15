import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useHistory, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const Login = () => {
    const [loginData, setLoginData] = useState({})
    const { user, loginUser, signInWithGoogle, loading, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);

    }

    return (
        <>
            <div className="container w-50 my-5 p-5 bg-info">
                <h2 className="mb-3 text-center">Please Sign In</h2>

                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control onBlur={handleOnBlur} name="email" type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control onBlur={handleOnBlur} name="password" type="password" placeholder="Password" required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
                    <div><NavLink
                        style={{ textDecoration: "none" }}
                        to="/register">
                        <Button variant="text"> New User?? Please Register</Button>
                    </NavLink></div>

                </Form>
                <div className="mb-3 text-danger">
                    {authError}
                </div>
                {user.email && <div className="mb-3 text-success">
                    User Login successfully
                </div>}
                <div>-------or----------</div>

                <Button onClick={handleGoogleSignIn} variant="primary">Google Sign In</Button>
            </div>
        </>
    );
};

export default Login;