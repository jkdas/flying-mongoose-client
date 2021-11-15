import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

const MangeOrder = () => {
    const [orders, setOrders] = useState([]);
    const { register, handleSubmit } = useForm();
    const [isDeleted, setIsDeleted] = useState(null);
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/allOrders")
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, [isDeleted]);

    // const status = "apporved";
    const handleOrderId = (id) => {
        setOrderId(id);
    };

    const onSubmit = (data) => {
        fetch(`http://localhost:5000/statusUpdate/${orderId}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.modifiedCount) {
                    alert("Status updated successfully")
                }
            });

    };
    const handleDelete = (id) => {
        const deleteConfirm = window.confirm("Are you sure want to delete?");
        if (deleteConfirm) {
            fetch(`http://localhost:5000/deleteOrder/${id}`, {
                method: "DELETE",
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    if (result.deletedCount) {
                        setIsDeleted(true);
                        alert('Order deleted successfully');
                    }
                    else {
                        setIsDeleted(false);
                    }
                });
        }
    }
    return (
        <div className="container">
            <h2>Total orders: {orders.length}</h2>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>sl</th>
                        <th>Model Name</th>
                        <th>Price</th>
                        <th>Order Status</th>
                        <th>Update Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {orders?.map((pd, index) => (
                    <tbody>
                        <tr>
                            <td>{index}</td>
                            <td>{pd.model}</td>
                            <td>Tk {pd.price}</td>
                            <td>{pd.status}</td>
                            <td>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <select
                                        onClick={() => handleOrderId(pd?._id)}
                                        {...register("status")}
                                    >
                                        <option value={pd?.status}>{pd?.status}</option>
                                        <option value="shipped">shipped</option>

                                    </select>
                                    <button type="submit" className="btn bg-success ms-2 p-2">Update</button>
                                </form>
                            </td>
                            <button onClick={() => handleDelete(pd._id)} className="btn bg-danger p-2 my-2 w-100">Delete</button>

                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>
    );
};

export default MangeOrder;
