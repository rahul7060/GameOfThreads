import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice"
import AddProductReducer from "../features/auth/AddProductSlice"
import DeliveryReducer from "../features/auth/DeliverySlice"

const Store = configureStore({

  reducer:{
  auth:authReducer,
  addProduct:AddProductReducer,
  delivery:DeliveryReducer
  },


});

export default Store;