import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SuccessPayment() {
    const navigate = useNavigate()
     
    useEffect(()=>{

        let isSuccess =true;

        const fetchdata = async()=>{
            try {
    
                const response = await axios.get(`http://localhost:7907/api/users/payment/success`)
                if (response.status==200 &&isSuccess ){
                    alert("payment succcessfull")
                    navigate('/')
                }
    
                
            } catch (error) {
                alert(error.response.data.message);
                
            }
        }
            
             const timeout = setTimeout(fetchdata,3000);
    
             return ()=>{
                isSuccess = false;
                clearTimeout(timeout)
             };
    },[navigate])
  

            
         

  return (
    <div>

        <img src="https://cdn.dribble.com/users/253392/screenshorts/6906291/check.gif" alt="result" />






    </div>
  )
}

export default SuccessPayment