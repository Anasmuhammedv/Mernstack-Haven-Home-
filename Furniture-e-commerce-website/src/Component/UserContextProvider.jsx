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

    const [config,setConfig]=useState(null)


    useEffect(() => {
        const token = localStorage.getItem("token");
        // if (!token) {
        //   alert("Token is not available");
        //   return;
        // }
    
        const newConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
    
        
        setConfig(newConfig);
  
      }, []);
    
      useEffect(() => {
        const getProducts = async () => {
          try {
            const response = await axios.get(
              "http://localhost:7907/api/users/allProducts",
              
            );
            setProducts(response.data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        // if (config) {
        // }
        getProducts();
      }, []);


    return(
        <Globalcontext.Provider value={[
            user,setUser,
            signup,setSignup,
            newUser,setNewUser,
            products,setProducts,
            oneUser,setoneUser,
            config
            
            
        ]}>
            {children}

        </Globalcontext.Provider>
    )

}