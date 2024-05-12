import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./ProductsSlice";

export default configureStore({
    reducer:{
        AdminProducts:ProductsSlice,

    }
})