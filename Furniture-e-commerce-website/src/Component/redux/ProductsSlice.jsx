import { createSlice } from "@reduxjs/toolkit";
import { Products } from "../../../ProductsData/Data";

const productsSlice=createSlice({
    name:'AdminProducts',
    initialState:[...Products],
    reducers:{
        Add_Admin_Products:(state,action)=>{
            return [...action.payload]
        },
        Admin_Remove:(state,action)=>{          
           return  state.filter((item) => item.id !==  action.payload);}

    }
})
export const {Add_Admin_Products,  Admin_Remove}=productsSlice.actions
export default productsSlice.reducer