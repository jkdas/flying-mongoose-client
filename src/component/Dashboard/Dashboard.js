import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import Review from "./../Review/Review";
import MyOrders from "../MyOrders/MyOrders";
import MakeAdmin from "./../MakeAdmin/MakeAdmin";
import Payment from "../Payment/Payment";
import ManageOrder from "../ManageOrder/ManageOrder";
import ManageProducts from "../ManageProducts/ManageProducts";
import AddProducts from "./../AddProducts/AddProducts";
import "./Dashboard.css";




const Dashbaord = () => {
    let { path, url } = useRouteMatch();
    const { user, logOut } = useFirebase();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch(`https://desolate-falls-28146.herokuapp.com/checkAdmin/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data[0]?.role === "admin") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            });
    }, [user?.email]);

    return (

        <div>
            <div className="dashboard-container ">
                <div className="row">
                    <div className="col-md-3">
                        <div className="dashboard">

                            <Link to="/home"> <button className="bg-warning p-2 my-4">Home</button></Link>
                            {
                                isAdmin ?
                                    <div className="user-panel">
                                        <h3>Admin Pannel</h3>
                                        <Link to={`${url}/makeAdmin`}>
                                            <button className="bg-info p-2 my-2 dashboard-button">Make Admin</button>
                                        </Link>
                                        <Link to={`${url}/addProducts`}>
                                            <button className="bg-info p-2 my-2 dashboard-button">Add New Products</button>
                                        </Link>
                                        <Link to={`${url}/manageProducts`}>
                                            <button className="bg-info p-2 my-2 dashboard-button">Manage All Products</button>
                                        </Link>
                                        <Link to={`${url}/manageOrders`}>
                                            <button className="bg-info p-2 my-2 dashboard-button">Manage All Orders</button>
                                        </Link>
                                    </div>

                                    :
                                    <div className="user-panel">
                                        <h3>User Pannel</h3>
                                        <Link to={`${url}/payment`}>
                                            <button className="bg-info p-2 my-2 dashboard-button">Make Payment</button>
                                        </Link>
                                        <Link to={`${url}/myOrders`}>
                                            <button className="bg-info p-2 my-2 dashboard-button">My Orders</button>
                                        </Link>
                                        <Link to={`${url}/review`}>
                                            <button className="bg-info p-2 my-2 dashboard-button">Review</button>
                                        </Link>
                                    </div>

                            }
                            {user?.email && <button onClick={logOut} className="bg-primary text-white p-2 my-2 mx-5">Log Out</button>}
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="bg-primary p-4 text-white fw-bold">DASHBOARD</div>
                        {
                            isAdmin ?
                                <Switch>
                                    <Route exact path={`${path}/makeAdmin`}>
                                        <MakeAdmin></MakeAdmin>
                                    </Route>
                                    <Route exact path={`${path}/addProducts`}>
                                        <AddProducts></AddProducts>
                                    </Route>
                                    <Route exact path={`${path}/manageProducts`}>
                                        <ManageProducts></ManageProducts>
                                    </Route>
                                    <Route exact path={`${path}/manageOrders`}>
                                        <ManageOrder></ManageOrder>
                                    </Route>
                                </Switch>
                                :
                                <Switch>
                                    <Route exact path={`${path}/payment`}>
                                        <Payment></Payment>
                                    </Route>
                                    <Route exact path={`${path}/myOrders`}>
                                        <MyOrders></MyOrders>
                                    </Route>
                                    <Route exact path={`${path}/review`}>
                                        <Review></Review>
                                    </Route>
                                </Switch>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashbaord;
