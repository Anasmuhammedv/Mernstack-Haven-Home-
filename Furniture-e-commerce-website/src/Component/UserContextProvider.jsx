import { useState,useEffect } from "react";
import { Globalcontext } from "./GlobalContext";
import { Products } from "../../ProductsData/Data";
import axios from "axios"


export const UserContextProvider = ({children})=>{
    const [user,setUser]=useState(null)
    const [signup,setSignup]=useState([])
    const[newUser,setNewUser]=useState([])
    // const[products,setProducts]=useState(Products)
    const[oneUser,setoneUser]=useState([])

    const[products,setProducts]=useState([])

    useEffect(()=>{
  
      const getProducts = async () => {
       
  
           const response = await axios.get('http://localhost:7907/api/users/allProducts') 
              setProducts(response.data)
           
      }
      getProducts()
    
    },[])
    console.log(products);

    return(
        <Globalcontext.Provider value={[
            user,setUser,
            signup,setSignup,
            newUser,setNewUser,
            products,setProducts,
            oneUser,setoneUser
            
            
        ]}>
            {children}

        </Globalcontext.Provider>
    )

}