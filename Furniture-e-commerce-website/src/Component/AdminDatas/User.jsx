import React, { useContext, useEffect, useState } from 'react';
import { UserContextProvider } from '../UserContextProvider';
import { Globalcontext } from '../GlobalContext';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { FaBan, FaCheck } from 'react-icons/fa';

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:7907/api/admin/allUser`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleblock = async(id)=>{
    window.location.reload()
    try {

      const response = await axios.post(`http://localhost:7907/api/admin/block/${id}`)
      if(response.status===200){
        alert("user blocked successfully")
      }
      
    } catch (error) {
      alert("failed to block")
      
    }
  }

  const handleUnblock = async(id)=>{

    window.location.reload()

    try {
      const response = await axios.post(`http://localhost:7907/api/admin/unblock/${id}`)
      if(response.status===200){
        alert('user Unblocked successfullly')
      }
      
    } catch (error) {

      alert("failed to unblock")
      
    }
  
  }

  return (

    <div>
    <AdminNavbar />
    <div style={{ backgroundColor: '#222', minHeight: '100vh', paddingTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <h1 className='text-center' style={{ color: 'orange', margin: '10px', padding: '10px', fontSize: '60px' }}>USER</h1>

        <div className='container'>
          {users.map((user) => (
            <div key={user.id} className='card mb-3' style={{ maxWidth: '540px', backgroundColor: '#333', color: '#fff' }}>
              <div className='row g-0'>
                <div className='col-md-4'>
                  <img
                    src='https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg'
                    alt='User Profile'
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
                <div className='col-md-8'>
                  <div className='card-body'>
                    <h5 className='card-title'>Username: {user.username}</h5>
                    <p className='card-text'>Email: {user.email}</p>
                    <button onClick={()=>handleblock(user._id)} className='btn btn-danger me-2'><FaBan/>Block</button>
                    <button onClick={()=>handleUnblock(user._id)} className='btn btn-success'><FaCheck/>Unblock</button>
                    <h5>{user.isDeleted===true?"blocked":"unblocked"}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default User;
