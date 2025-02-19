import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice"
import AddProductReducer from "../features/auth/AddProductSlice"


const Store = configureStore({

  reducer:{
  auth:authReducer,
  addProduct:AddProductReducer
  },


});

export default Store;