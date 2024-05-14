

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Globalcontext } from "../GlobalContext";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminProducyEdit() {
  const [
    user, setUser,
    signup, setSignup,
    newUser, setNewUser,
    products, setProducts,
    oneUser, setoneUser
  ] = useContext(Globalcontext);

  const navigate = useNavigate();

  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [productData, setProductData] = useState({});
  const { id } = useParams();

  const productFind = async () => {
    try {
      const jwtToken = localStorage.getItem("adminToken");
      if (!jwtToken) {
        alert("Token is not available");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwtToken,
        },
      };

      const response = await axios.get(
        `http://localhost:7907/api/admin/product/${id}`,
        config
      );
      
      if (response.status === 200)
        setProductData(response.data.productById); 
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message, "this is from product update");
    }
  };

  useEffect(() => {
    productFind();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const jwtToken = localStorage.getItem('adminToken');
      if (!jwtToken) {
        alert("Token is not available");
        return;
      }

      const formData = new FormData();
      formData.append('image', image);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('title', title);
      formData.append('description', description);
      
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Update content type
          Authorization: jwtToken, // Pass correct token
        },
      };

      const response = await axios.patch(`http://localhost:7907/api/admin/editProduct/${id}`,
        formData,
        config
      );

      if (response.status === 200) {
        alert("Product updated successfully");
        navigate('/AdminView');
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message, "this is from product update catch");
    }
  };

  return (
    <div className="admin-product-edit">
      <AdminNavbar />
      <div className="container">
        <h1>Product Edit</h1>

        <div className="row">
          <div className="col-md-6">
            <img
              className="img-fluid mb-3"
              src={productData.productImage} 
              alt="image missing"
            />
          </div>
          <div className="col-md-6">
            <form onSubmit={(e) => handleUpdate(e)}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={productData.title} 
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={productData.category} 
                  onChange={(event) => setCategory(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder={productData.price} 
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea
                  className="form-control"
                  placeholder={productData.description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Image:</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                  placeholder="Image url"
                />
              </div>
              <button type="submit" className="btn btn-primary">Edit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducyEdit;


