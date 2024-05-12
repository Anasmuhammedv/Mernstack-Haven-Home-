import React, { useContext } from 'react';
import bedImage from '../Component/Assets/Images/bed.jpg';
import '../Css Files/Bed.css'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Globalcontext } from './GlobalContext';


function Bed() {
const[,,,,,,products,setProducts]=useContext(Globalcontext)
  

  const navigate=useNavigate()
  
  const bedProducts = products.filter((product) => product.title === 'Bed');

  
  const rows = [];
  for (let i = 0; i < bedProducts.length; i += 3) {
    rows.push(bedProducts.slice(i, i + 3));
  }

  return (
    <div>
      <Header/>
    
    <div className="bed-container">
      
      
      
      <img className="img-fluid col-xl-12 MainImg" src={bedImage} alt="Bedroom" />

    
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="card">
                
                <img src={item.productImage} className="img-fluid card-img-top" alt="Bed" onClick={()=>navigate(`/${item._id}`)}/>

                
                <div className="card-body">
                  <h1 className="card-title">{item.type}</h1>
                  <h1 className="card-price">₹{item.price}</h1>
                  <h5>{item.title}</h5>

                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    <Footer/>
    </div>
  );
}

export default Bed;
