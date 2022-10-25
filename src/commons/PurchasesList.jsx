import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export const PurchasesList = ({ user }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        console.log("USER", user);
        axios.get(`/api/cart/purchased-orders/${user.userId}`).then((res) => {
            const ordersArray = res.data;

            console.log("ORDERS", ordersArray);

            setOrders(ordersArray);
        });
    }, []);

    const Row = ({ order }) => {
        return (
            <>
                <tr>
                    <td>{order.id}</td>
                    <td>{order.detail[0]}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.totalPrice}</td>
                </tr>
            </>
        );
    };

    return (
        <>
            <div>PurchasesList</div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Details</th>
                        <th>Payment Method</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders
                        ? orders.map((order, i) => (
                            // return <Row order={order} />

                            <tr key={i}>
                                <td>{order.id}</td>
                                <td>
                                    <ul>
                                        <li>Brand:  {order.detail[0].brand}</li>
                                        <li>Model: {order.detail[0].model}</li>
                                        <li>Year: {order.detail[0].year}</li>
                                    </ul>

                                </td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.totalPrice}</td>
                            </tr>
                        ))
                        : ""}
                </tbody>
            </Table>
        </>
    );
};
