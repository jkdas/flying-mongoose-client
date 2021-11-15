import React from "react";
import { useForm } from "react-hook-form";


const MakeAdmin = () => {
    const { register, handleSubmit, reset, watch, errors } = useForm();

    const onSubmit = (data) => {
        fetch("http://localhost:5000/makeAdmin", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.modifiedCount) {
                    alert("Admin added successfully")
                }
                else {
                    alert("Admin added successfully")
                    reset();
                }
            });

    };
    return (
        <div>
            <h2 className="my-3">Make an Admin</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="input-field w-50"
                    name="email"
                    placeholder="Enter admin email"
                    type="email"
                    {...register("email", { required: true })}
                />
                <br />

                <input
                    className=" btn btn-primary mt-3 w-50"
                    type="submit"
                    value="Make Admin"
                />
            </form>
        </div>
    );
};

export default MakeAdmin;
