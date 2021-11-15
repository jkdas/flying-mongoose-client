import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';



const MyOrders = () => {
    const { user } = useAuth();
    const [myOrders, setMyOrders] = useState([]);
    const [isDeleted, setIsDeleted] = useState(null);
    const [orderId, setOrderId] = useState("");


    useEffect(() => {
        fetch(`http://localhost:5000/myOrder/${user.email}`)
            .then(res => res.json())
            .then(data => setMyOrders(data))
    }, [isDeleted])

    const handleCheckOut = () => {
        // Coming soon 
    }
    const handleDelete = (id) => {
        const deleteConfirm = window.confirm("Are you sure want to delete?");
        if (deleteConfirm) {
            fetch(`http://localhost:5000/deleteOrder/${id}`, {
                method: "DELETE",
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(result => {
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
        <>
            <div>
                <h2> {user.displayName} Orders: {myOrders.length} </h2>
                {
                    myOrders?.map((order) => (
                        <div className="row container">
                            <div className="d-flex justify-content-center align-items-center border border p-2 m-2 ">
                                <div className="col-md-6 col-lg-6 ">
                                    <img className="img-fluid" src={order.imgUrl} alt="" />
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    <div>
                                        <h2>Model: {order.model}</h2>
                                        <h6>Customer Email: {order.email}</h6>
                                        <h5>Price: ৳ {order.price} </h5>
                                        <button onClick={() => handleDelete(order._id)} className="btn bg-danger p-2 my-2">Cancel Order</button>

                                        <Link to="/dashboard/payment">
                                            <button onClick={() => handleCheckOut(order._id)} className="btn btn-info m-2">
                                                Proceed To CheckOut
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
            </div >
        </>
    );
};

export default MyOrders;