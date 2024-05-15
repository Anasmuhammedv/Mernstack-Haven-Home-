import React ,{useContext, useEffect, useState} from 'react';
import '../Css Files/Allproducts.css'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { Globalcontext } from './GlobalContext';

function Allproducts() {
  const [,,,,,,products,setProducts]=useContext(Globalcontext)
 

  const navigate=useNavigate()
  return (
    <div>
    <div className='container'>

      <div className='row'>
        {products.map((item, index) => {
          return (
            <div key={index} className=' col-xl-2 col-lg-3 col-md-3 col-sm-6 col-12  mb-4 Allproducts'>
              <div className='card'>
                <img src={item.productImage} className='img-thumbnail' alt="Image missing" onClick={()=>navigate(`/${item._id}`)}/>
                <div className='card-title'>
                    <h3 className='card-title text-center'>{item.title}</h3>
                </div>
                <div >
                    <h4 className='card-title text-center'>₹{item.price}</h4>
      
      
                </div>
                <div className='card-body'>
                  <p className='card-title'>{item.category}</p>
                </div>
                
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
      <Footer/>
    </div>
  );
}

export default Allproducts;
