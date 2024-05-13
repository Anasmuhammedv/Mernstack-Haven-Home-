import React from 'react';
import { NavLink,Link} from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const navigate=useNavigate()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" style={{height:"auto"}}>
      <div className="container">
        <NavLink className="navbar-brand fs-2 font-weight-bold" to={"/AdminView"}>ADMIN PANEL</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" exact to={"/AdminView"}>Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/User"}>User</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/AdminAddProduct"}>AddProduct</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to={'/Orders'}>Orders</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to={'/Revenuegenerated'}>Revenue</NavLink>
            </li>
            </ul>
            <ul>
            <li className='nav-item align-item-center mt-20' >
            <Link to="/"> <LuLogOut onClick={()=>{localStorage.clear()}}  style={{color:"white"}}/></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
