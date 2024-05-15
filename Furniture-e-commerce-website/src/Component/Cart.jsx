import React, {  useContext, useEffect, useState } from "react";
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import { Globalcontext } from "./GlobalContext";



function Cart() {
  const userId = localStorage.getItem('id');
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [,,,,,,,,,,config]=useContext(Globalcontext)
  

  


  //user view their cart product
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:7907/api/users/cart/${userId}`,config);
        setCartProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart products:", error);
        setLoading(false);
      }
    };
    fetchCartProducts();
  }, [userId,config]);

  console.log(cartProducts,"it is from cart");


  //user can increment cart element
  const handleIncrement = async (id) => {
    try {
      await axios.post(`http://localhost:7907/api/users/${userId}/cart/${id}/increment`,{},config);
      // Update cart products after incrementing
      const response = await axios.get(`http://localhost:7907/api/users/cart/${userId}`,config);
      setCartProducts(response.data);
    } catch (error) {
      console.error("Error incrementing product quantity:", error);
    }
  };


  //user can decrement cart element
  const handleDecrement = async (id) => {
    try {
      await axios.post(`http://localhost:7907/api/users/${userId}/cart/${id}/decrement`,{},config);
      // Update cart products after decrementing
      const response = await axios.get(`http://localhost:7907/api/users/cart/${userId}`,config);
      setCartProducts(response.data);
    } catch (error) {
      console.error("Error decrementing product quantity:", error);
    }
  };


  //user can increment cart product
  const handleRemove = async (id) => {
    window.location.reload()
    try {
      await axios.post(`http://localhost:7907/api/users/${userId}/cart/${id}/remove`,{},config);
      // Update cart products after removing
      const response = await axios.get(`http://localhost:7907/api/users/cart/${userId}`,config);
      setCartProducts(response.data);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  
    //user can pay money to buy product
    const handlepay = async(id)=>{

      if(cartProducts.length !=0){

      

      const response =await axios.post(`http://localhost:7907/api/users/payment/${id}`,{},config)
      const url=response.data.url
      const confirmation = window.confirm("payment gateway is redirecting do you want to continue")
      if(confirmation)window.location.replace(url)


      console.log(response.data.url,"url of stripe payment");
  
    }
    else{
      alert('please add some product')
    }
  }


  

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {loading ? (
              <p>Loading cart...</p>
            ) : cartProducts.length > 0 ? (
              cartProducts.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.productId.productImage}
                        alt={item.productId.title}
                        className="img-thumbnail"
                        width={"200px"}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.productId.title}</h5>
                        <p className="card-text">Price: ${item.productId.price}</p>
                        <p className="card-text">Quantity: {item.quantity}</p>
                        <div className="btn-group" role="group" aria-label="Quantity">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleIncrement(item.productId._id)}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleDecrement(item.productId._id)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemove(item.productId._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}

            



          </div>
          <div className="col-md-4">
            <h1>Sum Total</h1>
            {cartProducts.map((item, index) => (
              <div key={index}>
                <h3>{item.productId.title}: ₹{item.productId.price}</h3>
              </div>
            ))}
            <div>
          
              <h1>
                Total:
                {cartProducts.reduce(
                  (acc, item) => (acc += item.productId.price * item.quantity),
                  0
                )}
              </h1>
            </div>
            <button onClick={()=>handlepay(userId)} className="btn btn-secondary">BUY NOW</button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              possimus nobis sequi hic fuga cupiditate eos ipsam? Nam voluptatem
              mollitia, illum nemo eum expedita possimus error eveniet a incidunt
              at?
            </p>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
