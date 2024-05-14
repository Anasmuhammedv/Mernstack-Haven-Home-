import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Globalcontext } from '../GlobalContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    
   

    const [newProduct,setNewProduct]=useState({

      image:null,
      price:0,
      category:"",
      title:"",
      description:""

    })

    const handleChange = (e)=>{
      setNewProduct({...newProduct,[e.target.name]:e.target.value})
    }

    const handleAdd = async(e)=>{
      e.preventDefault();

      try {

        const jwtToken = localStorage.getItem("adminToken");
        if(!jwtToken){
          alert("token is not available")
          return;

        }

        const formData = new FormData();
        formData.append('image',newProduct.image);
        formData.append('price',newProduct.price);
        formData.append('category',newProduct.category);
        formData.append('title',newProduct.title);
        formData.append('description',newProduct.description)

        // const config ={
        //   headers:{
        //     "Content-Type":"multipart/form-data",
        //     Authorization:jwtToken,
        //   },
        // };

        const response =await axios.post(`http://localhost:7907/api/admin/add`,
          formData,
          // config
        );

        if( response.status==201){
          alert("product added successfully");
        }else{
          alert("product not added some error",response.data)
        }
        
        
      } catch (error) {
        
        alert(response.data.message ||error)
      }

      e.target.reset()


    }

    console.log(newProduct.category,"this is from add product");
    console.log(newProduct.price,"this is from add product");
    console.log(newProduct.description,"this is from add product");
    console.log(newProduct.title,"this is from add product");
    console.log(newProduct.image,"this is from add product");


  return (
    <div >
      <AdminNavbar />
      
      <h1 className="text-center mt-4 mb-5 font-weight-bold ">ADD PRODUCT</h1>
    <div className="container" style={{background:"grey", color:"white", width:"50%", marginTop:"100px ", padding:"20px"}}>

      <form onSubmit={handleAdd}>

        <div className="row mb-3">
          <label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
          <div className="col-sm-10">
            <input type="text" 
            className="form-control" 
            id="title" placeholder="Enter title..." 
            name='title' 
            value={newProduct.title}
            onChange={handleChange}
             />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="type" className="col-sm-2 col-form-label">Category:</label>
          <div className="col-sm-10">
            <input type="text" 
            className="form-control" id="category" 
            placeholder="Enter category..." name='category'
            value={newProduct.category}
            onChange={handleChange} 
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="price" className="col-sm-2 col-form-label">Price:</label>
          <div className="col-sm-10">
            <input type="number" 
            className="form-control" 
            id="price" placeholder="Enter price..." 
            name='price'
            onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="price" className="col-sm-2 col-form-label">Description:</label>
          <div className="col-sm-10">
            <input type="text" 
            className="form-control" 
            id="description" 
            placeholder="Enter description..." 
            name='description'
            value={newProduct.description}
            onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="image" className="col-sm-2 col-form-label">Image:</label>
          <div className="col-sm-10">
            <input type="file" 
            className="form-control" 
            id="image" 
            placeholder="Enter image URL..." 
            name='image'
            accept='image/*'
            onChange={(e)=>setNewProduct({...newProduct,image:e.target.files[0]})}
            required
             />
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



