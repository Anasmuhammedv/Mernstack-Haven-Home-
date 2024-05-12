import React, { useContext } from 'react'
import { UserContextProvider } from '../UserContextProvider'
import { Globalcontext } from '../GlobalContext'
import AdminNavbar from './AdminNavbar';

function User() {
    const[user,setUser,signup,setSignup]=useContext(Globalcontext)
    console.log(user);
    console.log(signup);
  return (
    <div>
        <AdminNavbar/>
        <h1 className='text-center ' style={{color:"orange", margin:"10px", padding:"10px",fontSize:"60px"}}>USER</h1>
        
                   
                
        <div className='bg-secondary ' style={{margin:'10px', padding:"10px"}}>
        {signup.map((val)=>{
            return (
            
                  <div className='bg-light d-flex flex-col rounded-3' style={{padding:"9px", margin:"10px"}}>
                 <img
                className="card-img" style={{height:"1oopx", width:'100px'}}
                src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                alt="User Profile"
                />
                <div className='' style={{padding:"20px", margin:"5px"}}>
                 <h1>username:{val.name}</h1>
                 <h5>useremail:{val.email}</h5>
                </div>
                </div>
             
                
            )
        })}
                 </div>


    </div>
  )
}

export default User