import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Globalcontext } from '../GlobalContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminAddProduct() {

    const navigate=useNavigate()

    const [
      user,setUser,
      signup,setSignup,
      newUser,setNewUser,
      products,setProducts,
      oneUser,setoneUser
      ] = useContext(Globalcontext);
      console.log(products);
    
    // const handlesubmit=(e)=>{

    //     e.preventDefault()

    //       id:Math.random()*10;
    //        let newdata  = new FormData(e.target);
    //        let title = newdata.get("title");
    //        let type = newdata.get("type");
    //        let price= newdata.get("price");
    //        let image= newdata.get("image");

         





    //        let newProduct={
    //         id : Math.random()*10,
    //         title:title,
    //         type:type,
    //         price:parseFloat(price),
    //         image:image
    //        };

    //        setProducts([...products,newProduct])

    //        navigate('/AdminView')    

    // }


  return (
    <div >
      <AdminNavbar />
      
      <h1 className="text-center mt-4 mb-5 font-weight-bold ">ADD PRODUCT</h1>
    <div className="container" style={{background:"grey", color:"white", width:"50%", marginTop:"100px ", padding:"20px"}}>

      <form>
        <div className="row mb-3">
          <label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="title" placeholder="Enter title..." name='title' />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="type" className="col-sm-2 col-form-label">Type:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="type" placeholder="Enter type..." name='type' />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="price" className="col-sm-2 col-form-label">Price:</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="price" placeholder="Enter price..." name='price'/>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="image" className="col-sm-2 col-form-label">Image:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="image" placeholder="Enter image URL..." name='image' />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AdminAddProduct;
