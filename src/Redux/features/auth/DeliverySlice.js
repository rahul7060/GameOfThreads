import { createSlice } from "@reduxjs/toolkit";

export const DeliverySlice = createSlice({
    name: "delivery",
    initialState: {
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        landmark: "",
        city: "",
        state: "",
        pinCode: "",
        phone: "",
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setLandmark: (state, action) => {
            state.landmark = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setState: (state, action) => {
            state.state = action.payload;
        },
        setPinCode: (state, action) => {
            state.pinCode = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        clearDeliveryDetails: (state) => {
            return {
                email: "",
                firstName: "",
                lastName: "",
                address: "",
                landmark: "",
                city: "",
                state: "",
                pinCode: "",
                phone: "",
            };
        },
    },
});

export const { 
    setEmail, setFirstName, setLastName, setAddress, 
    setLandmark, setCity, setState, setPinCode, 
    setPhone, clearDeliveryDetails 
} = DeliverySlice.actions;

export default DeliverySlice.reducer;
