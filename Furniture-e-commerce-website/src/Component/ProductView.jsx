import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { Products } from '../../ProductsData/Data';
import '../Css Files/ProductView.css';
import { Globalcontext } from './GlobalContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';



import axios from 'axios'






function ProductView() {
    
    const navigate=useNavigate()

    const [,,,,,,,,,,config]=useContext(Globalcontext)

    console.log(config,"this is from add caer");
                        
  const [oneProduct,setOneProduct]=useState({})                      
                        
const { id } = useParams()

const userId=localStorage.getItem('id')
const userName=localStorage.getItem('name')

console.log(userId,"this is userid in cart");
console.log(id,"this is proId in cart");
console.log(userName,"this is username in cart");


        const handleclick=async(id)=>{

            window.location.reload()
            
             await  axios.post(`http://localhost:7907/api/users/${userId}/cart/${id}`, {}, config)
            
            // console.log(response,"this is response when click");

        }
    


useEffect(()=>{
    const anyProduct=async()=>{

        
      
         const filteredProduct = await axios.get(`http://localhost:7907/api/users/products/${id}`)
         setOneProduct(filteredProduct.data)
    
    }
    anyProduct()
},[id])


console.log("product is",id);
console.log("product is",oneProduct);
                        
     return (
        <div>
            <Header/>
            <div className='Productview'>
                <img src={oneProduct.productImage} className='Product-img col-md-6 col-sm-12 ' alt="image not found" />
                <div className='details col-md-6 col-sm-12'>
                    <h1 className='title'>{oneProduct.title}</h1>
                    <h3 className='price'>₹{oneProduct.price}</h3>
                    <h5 className='type'>{oneProduct.category}</h5>
                    <p className='description'>{oneProduct.description}</p>
                    <button onClick={userName ? () => handleclick(oneProduct._id)  : ()=>navigate('/LoginForm')}>AddCart</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProductView
