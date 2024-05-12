

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

function AdminLogin() {
    const navigate = useNavigate();

    const Admin = {
        name: "Admin",
        email: "admin@gmail.com",
        password: 123456
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminLogin, setAdminLogin] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Admin.email == email && Admin.password == password) {
            navigate('/AdminView');
        } else {
            alert("Email or password is incorrect");
        }
    };

    return (
        <div>
            {/* <AdminNavbar /> */}
            <div className='container-fluid d-flex justify-content-center align-items-center vh-100 bg-secondary'>
                <form className='card p-4' onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
                    <h1 className='text-center mb-4'>Admin Login</h1>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" id="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {/* <button type="submit" className="btn btn-dark btn-block" style={{ marginBottom: '10px' }}>Sign in</button>
                    <Link to={'/'}><button className='btn btn-light' style={{ textDecoration: 'none' }}>Back to Home</button></Link> */}

                    <button type="submit" className="btn btn-dark btn-block" style={{ marginBottom: '10px' }}>Sign in</button>
                    <div style={{ textAlign: 'center' }}>
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <button className='btn btn-light' style={{ display: 'block', margin: '0 auto' }}>Back to Home</button>
                   </Link>
                    </div>


                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
