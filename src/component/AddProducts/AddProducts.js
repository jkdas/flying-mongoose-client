import React from 'react';
import { useForm } from 'react-hook-form';
import "./AddProducts.css";

const AddProducts = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {

        fetch(`http://localhost:5000/addNewProducts`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Product added successfully');
                    reset();
                }
            });

    };


    return (
        <>
            <div>
                <h2 className="my-5">Add new Paroduct here</h2>
                <div className="container add-new-product ">
                    <form className="bg-info p-5" onSubmit={handleSubmit(onSubmit)}>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input className="mb-3" defaultValue="" {...register("model", { required: true })} placeholder="Model" />
                        <input className="mb-3" type="number" {...register("price", { required: true })} placeholder="Price" />
                        <input className="mb-3" defaultValue="" {...register("imgUrl", { required: true })} placeholder="img url" />
                        <input className="mb-3" defaultValue="" {...register("status", { required: true })} placeholder="status" />
                        <input {...register("description")} placeholder="Description" />
                        {/* errors will return when field validation fails  */}
                        {errors.exampleRequired && <span className="text-warning">This field is required</span>}
                        <br />
                        <input className="bg-success p-3" type="submit" />
                    </form>
                </div>

            </div>
        </>
    );
};

export default AddProducts;