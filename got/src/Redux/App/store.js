import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice"


const Store = configureStore({

  reducer:{
  auth:authReducer,

  },


});

export default Store;