import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import recordSlice from "./taskSlice"




const store = configureStore({
    reducer:{
        auth : authSlice,
        records : recordSlice


    }
});


export default store