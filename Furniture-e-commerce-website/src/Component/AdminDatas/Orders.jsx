



import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './cssFiles/Order.css'; 
import AdminNavbar from './AdminNavbar';

function Orders() {

    const [adminorders, setAdminorders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:7907/api/admin/order`);
                setAdminorders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);
    console.log(adminorders,"this is from admin order");


    const handleship = async(id)=>{
        const response = await axios.put(`http://localhost:7907/api/admin/status/shipped/${id}`)
         console.log(response,"from ship");
    }

    const handleway = async(id)=>{
        const response =await axios.put(`http://localhost:7907/api/admin/status/ontheway/${id}`)
        console.log(response.data,"from way status");
    }

    const handledelivered = async(id)=>{
        const response = await axios.put(`http://localhost:7907/api/admin/status/delivered/${id}`)
        console.log(response.data,"this is from delivered");
    }

    return (
        <div>
            <AdminNavbar />
            <div className="container-fluid">
                <div className="orders-container">
                    <div className="table-responsive">
                    <table className="table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>Order Date</th>
                                    <th>Order Time</th>
                                    <th>Payment ID</th>
                                    <th>Product Title</th>
                                    <th>Product ID</th>
                                    <th>Total Price</th>
                                    <th>User ID</th>
                                    <th>Shipping</th>
                                    <th>On way</th>
                                    <th>Delivered</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {adminorders.map((item, index) => (
                                    <tr key={index}>
                                        <td>{new Date(parseInt(item.orderDate)).toLocaleDateString()}</td>
                                        <td>{item.orderTime}</td>
                                        <td>{item.paymentId}</td>
                                        <td>
                                            {item.productId.map(product => (
                                                <div key={product._id}>
                                                    <p>{product.title}</p>
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            {item.productId.map(product => (
                                                <div key={product._id}>
                                                    <p>{product._id}</p>
                                                </div>
                                            ))}
                                        </td>
                                        <td>{item.totalPrice}</td>
                                        <td>{item.userId}</td>
                                        <td><button onClick={()=>handleship(item._id)} className="btn btn-primary">Shipping</button></td>
                                       <td><button onClick={()=>handleway(item._id)} className="btn btn-secondary">Way</button></td>
                                        <td><button onClick={()=>handledelivered(item._id)} className="btn btn-success">Delivered</button></td>

                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
