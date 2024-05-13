import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminNavbar from './AdminNavbar'

function Revenuegenerated() {

    const[order,setorder]=useState([])
    const[revenue,setrevenue]=useState([])

    useEffect(()=>{

        const adminOrder=async ()=>{
        try {

                const response = await axios.get(`http://localhost:7907/api/admin/order`)
                setorder(response.data)
            }
            
         catch (error) {
            console.log("error occured",error);
            
        }
    }

        adminOrder()
        
    },[])


    useEffect(()=>{
        const AdminRevenue=async()=>{

            try {
                  const response = await axios.get(`http://localhost:7907/api/admin/revenue`)
                  setrevenue(response.data)
                  console.log(response.data,"this is from revenue url");

                
            } catch (error) {

                console.log("error occured");
                
            }

        }
            
        AdminRevenue()

    },[])

    console.log("this is from revenue",order);


  return (

    <div>
    <AdminNavbar />
    <div className="container">

    <div className="mt-4">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Order Date</th>
                    <th>Payment ID</th>
                    <th>Total Price</th>
                    <th>User ID</th>
                </tr>
            </thead>
            <tbody>
                {order.map((item, index) => (
                    <tr key={index}>
                        <td>{new Date(parseInt(item.orderDate)).toLocaleDateString()}</td>
                        <td>{item.paymentId}</td>
                        <td>{item.totalPrice}</td>
                        <td>{item.userId}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    <div className="row mt-4">
        <div className="col-md-6">
            <h2>Total products Sold</h2>
            <h4>{revenue.totalProduct}</h4>
        </div>
        <div className="col-md-6">
            <h2>Total Revenue generated</h2>
            <h4>{revenue.totalRevenue}</h4>
        </div>
    </div>
</div>
</div>

  )
}

export default Revenuegenerated