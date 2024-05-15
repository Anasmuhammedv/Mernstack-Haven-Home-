import React, { useContext } from 'react'
// import { Products } from '../../ProductsData/Data';
import Image4 from '../Component/Assets/Images/Table.jpg'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Globalcontext } from './GlobalContext';

function Table() {

  const navigate=useNavigate()

  const [,,,,,,products,setProducts]=useContext(Globalcontext)

    const Table = products.filter((product) => product.title === 'table');

    console.log(products);

  
  const rows = [];
  for (let i = 0; i < Table.length; i += 3) {
    rows.push(Table.slice(i, i + 3));
  }



  return (
    <div> 
      
      <Header/>
     <div className="Table-container">
        <div className='mb-20px'>
             <img src={Image4} style={{width:"100%", height:"100vh"}} ></img>

        </div>

        <br /><br />
      

    
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="card">
                
                <img src={item.productImage} className="img-fluid card-img-top" alt="Bed" onClick={()=>navigate(`/${item._id}`)} />

                
                <div className="card-body">
                  <h1 className="card-title">{item.title}</h1>
                  <h1 className="card-price">₹{item.price}</h1>
                  <h5>{item.category}</h5>

                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>

     <Footer/>
    </div>
  )
}

export default Table