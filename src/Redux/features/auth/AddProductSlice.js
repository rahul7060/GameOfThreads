import { createSlice } from "@reduxjs/toolkit";

export const AddProductSlice = createSlice({

    name: "addProduct",
    initialState: {
        name: "",
        description: "",
        price: "",
        image: "",
        category: "", 
        stock: "",
     
    },
reducers: {
    setName: (state, action) => {
        state.name = action.payload;
    },
    setDescription: (state,action) =>{
      state.description = action.payload;
    },
    setImage:(state,action)=>{
     state.image=action.payload;
    },
    setPrice:(state,action)=>{
        state.price=action.payload;
    },
    setCategory:(state,action)=>{
        state.category=action.payload;
    },
    setStock:(state,action)=>{
        state.stock=action.payload;
    },
},
});

export const {  setName, setDescription,setImage,setCategory,setPrice,setStock } = AddProductSlice.actions;
export const selectName = (state) => state.addProduct.name;
export const selectDescription = (state) => state.addProduct.description;
export const selectImage = (state) => state.addProduct.image;
export const selectCategory = (state) => state.addProduct.category;
export const selectPrice = (state) => state.addProduct.price;
export const selectStock = (state) => state.addProduct.stock;



export default AddProductSlice.reducer;