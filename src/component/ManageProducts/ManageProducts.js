import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";


const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [isDeleted, setIsDeleted] = useState(null);
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        fetch("https://desolate-falls-28146.herokuapp.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [isDeleted]);



    const handleDelete = (id) => {
        setOrderId(id);
        console.log(id);
        const deleteConfirm = window.confirm("Are you sure want to delete?");
        if (deleteConfirm) {
            fetch(`https://desolate-falls-28146.herokuapp.com/deleteProduct/${id}`, {
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
            <h2>Total orders: {products.length}</h2>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>sl</th>
                        <th>Model Name</th>
                        <th>Description</th>
                        <th>Availability</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {products?.map((pd, index) => (
                    <tbody>
                        <tr>
                            <td>{index}</td>
                            <td>{pd.model}</td>
                            <td>{pd.description}</td>
                            <td>{pd.status}</td>
                            <td>Tk {pd.price}</td>

                            <button onClick={() => handleDelete(pd._id)} className="btn bg-danger p-2 my-2 w-100">Delete</button>

                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>
    );
};

export default ManageProducts;
