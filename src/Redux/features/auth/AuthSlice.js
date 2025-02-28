import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        name: "",
        email: "",
        password: "",
        resetCode: "",
        newPassword: "", // Added newPassword to initialState
        confirmPassword: "",
       
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
        setResetCode: (state, action) => { // Renamed to setResetCode
            state.resetCode = action.payload;
        },
        setNewPassword: (state, action) => { // Added setNewPassword reducer
            state.newPassword = action.payload;
        },

        
        
    },
});

export const { setEmail, setName, setPassword, setResetCode, setConfirmPassword, setNewPassword , setDp ,setBio,setGender } = AuthSlice.actions;

export const selectEmail =state=> state.auth.email;
export const selectName =state => state.auth.name;
export const selectPassword =state => state.auth.password;
export const selectResetCode = state=> state.auth.resetCode;
export const selectNewPassword = state=> state.auth.newPassword;
export const selectConfirmPassword =state=> state.auth.confirmPassword;


export default AuthSlice.reducer;