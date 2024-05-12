
import React, { useContext, useEffect, useId, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaUserLock } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { Globalcontext } from "./GlobalContext";
import axios from 'axios'

function Header() {
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState("");
  const [,,,,,,,,oneUser,setoneUser] = useContext(Globalcontext);

  const userid =localStorage.getItem('id')

  

  useEffect(()=>{
    const userdata=async()=>{
             const response = await axios.get(`http://localhost:7907/api/users/view/${userid}`)
             setoneUser(response.data)
            // console.log(response.data.cart, "oorop");

    }
    userdata()
  },[userid])

  console.log("one user data is", oneUser && oneUser.cart && oneUser.cart.length);
  
  // console.log("one user data is", oneUser);


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/Search/${searchData}`);
    setSearchData("");
  };
  const username=localStorage.getItem('name')
  const cart=localStorage.getItem('cartlength')
  console.log(cart);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fs-2" to={"/"}>
          Haven Home<span>...</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsFurni"
          aria-controls="navbarsFurni"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsFurni">
          <form className="d-flex me-auto my-2 my-lg-0" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchData(e.target.value)}
            />
          </form>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/Bed"}>
                Bed
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/Sofa"}>
                Sofa
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/Table"}>
                Table
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/Chair"}>
                Chair
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/Wardrobe"}>
                Wardrobe
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/Collection"}>
                Collections
              </NavLink>

           


            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={username ? "/Order" : "/LoginForm"}
                
              >
                Orders
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav d-flex align-items-center justify-content-center">
            <li className="nav-item">
              {username && (
                <HiOutlineLogout
                  onClick={() => {
                    // setUser("");
                    localStorage.clear()
                    navigate("/");
                  }}
                  style={{ color: "red", cursor: "pointer" }}
                />
              )}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/LoginForm"}>
                <FaUser />
                <span className="ms-1">{username ? username : "Not logged"}</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={username ? "/Cart" : "/LoginForm"}
                onClick={() => navigate(username ? "/Cart" : "/LoginForm")}
              >
                <FaShoppingCart />
                {username && <span className="badge bg-dark ms-1"><h5>{oneUser && oneUser.cart && oneUser.cart.length}</h5></span>}
              </NavLink>
            </li>

           


            <li className="nav-item">
              <NavLink className="nav-link" to={"/AdminLogin"}>
                <FaUserLock />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
