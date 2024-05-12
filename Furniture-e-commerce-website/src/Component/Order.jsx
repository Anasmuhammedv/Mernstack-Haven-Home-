import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

function Order() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7907/api/users/order/${userId}`
        );
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [userId]);

  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString(); // Adjust the date format as needed
  };

  console.log("Orders:", orders);

  return (
    <div>
        <Header/>
   

      {orders.length == 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <section
            key={order._id}
            className="h-100 h-custom"
            style={{ backgroundColor: "#eee" }}
          >
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-8 col-xl-6">
                  <div
                    className="card border-top border-bottom border-3"
                    style={{ borderColor: "#f37a27 !important" }}
                  >
                    <div className="card-body p-5">
                      <p
                        className="lead fw-bold mb-5"
                        style={{ color: "#f37a27" }}
                      >
                        Purchase Receipt
                      </p>
                      <div className="row">
                        <div className="col mb-3">
                          <p className="small text-muted mb-1">Date</p>
                          <p>{formatDate(order.orderDate)}</p>
                        </div>
                        <div className="col mb-3">
                          <p className="small text-muted mb-1">Order No.</p>
                          <p>{order.orderId}</p>
                        </div>
                      </div>
                      <div
                        className="mx-n5 px-5 py-4"
                        style={{ backgroundColor: "#f2f2f2" }}
                      >
                        {order.productId.map((product, idx) => (
                          <div key={idx} className="row">
                            <div className="col-md-8 col-lg-9">
                              <p>{product.title}</p>
                            </div>
                            <div className="col-md-4 col-lg-3">
                              <p>{product.price}</p>
                            </div>
                          </div>
                        ))}
                        <div className="row">
                          <div className="col-md-8 col-lg-9">
                            <p className="mb-0">Shipping</p>
                          </div>
                          <div className="col-md-4 col-lg-3">
                            <p className="mb-0">0</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="row mt-3"
                        style={{
                          backgroundColor: "#f9f9f9",
                          padding: "10px",
                          borderRadius: "5px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <div className="col-md-8 col-lg-9">
                          <p className="mb-0" style={{ fontWeight: "bold" }}>
                            Total Price
                          </p>
                        </div>
                        <div className="col-md-4 col-lg-3">
                          <p className="mb-0" style={{ color: "#f37a27" }}>
                            {order.totalPrice}
                          </p>
                        </div>
                      </div>

                      <p
                        className="lead fw-bold mb-4 pb-2"
                        style={{ color: "#f37a27" }}
                      >
                        Tracking Order
                      </p>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="horizontal-timeline">
                            <ul className="list-inline items d-flex justify-content-between">
                              <li className="list-inline-item items-list">
                                <p
                                  className="py-1 px-2 rounded text-white"
                                  style={{ backgroundColor: "#f37a27" }}
                                >
                                  Ordered
                                </p>
                              </li>
                              <li className="list-inline-item items-list">
                                <p
                                  className="py-1 px-2 rounded text-white"
                                  style={{ backgroundColor: "#f37a27" }}
                                >
                                  Shipped
                                </p>
                              </li>
                              <li className="list-inline-item items-list">
                                <p
                                  className="py-1 px-2 rounded text-white"
                                  style={{ backgroundColor: "#f37a27" }}
                                >
                                  On the way
                                </p>
                              </li>
                              <li
                                className="list-inline-item items-list text-end"
                                style={{ marginRight: "8px" }}
                              >
                                <p style={{ marginRight: "-8px" }}>
                                  Delivered
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 pt-2 mb-0">
                        Need any help?{" "}
                        <a href="#!" style={{ color: "#f37a27" }}>
                          Contact us
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default Order;
