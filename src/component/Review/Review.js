import React from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import './Review.css';

const Review = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {

        fetch(`https://desolate-falls-28146.herokuapp.com/addReview`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Your Review added successfully');
                    reset();
                }
            });

    };
    return (
        <>
            <Container>
                <div className=" row mt-5">
                    <div className="col-md-6">
                        <img className="img-fluid" src="https://i.ibb.co/FgZK12c/Review.jpg" alt="" />
                    </div>
                    <div className="col-md-6">
                        <div className="container add-new-contact ">
                            <form className="bg-info p-5" onSubmit={handleSubmit(onSubmit)}>
                                <input className="mb-2" defaultValue={user.displayName} {...register("name", { required: true })} placeholder="Your Name" />
                                <input className="mb-2" defaultValue={user.email} {...register("email", { required: true })} placeholder="Your Email" />
                                <input className="mb-2" type="textArea" {...register("message")} placeholder="Your Message" />
                                <input defaultValue="" type="number" {...register("rating")} placeholder="Rating" />
                                {errors.exampleRequired && <span className="text-warning">This field is required</span>}
                                <br />
                                <input className="bg-warning p-3" type="submit" />
                            </form>
                        </div>
                    </div>

                </div>
            </Container>

        </>
    );

};

export default Review;