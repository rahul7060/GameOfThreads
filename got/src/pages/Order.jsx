import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    setFirstName, setLastName, setAddress, setLandmark, setCity, setState, 
    setPinCode, setPhone, setEmail, clearDeliveryDetails 
} from "../Redux/features/auth/DeliverySlice";
import deliveryServices from "../service/deliveryServices";
import Swal from "sweetalert2";
import handlePayment from "../service/handlePayment";

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector((state) => state.delivery);


    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "firstName": dispatch(setFirstName(value)); break;
            case "lastName": dispatch(setLastName(value)); break;
            case "address": dispatch(setAddress(value)); break;
            case "landmark": dispatch(setLandmark(value)); break;
            case "city": dispatch(setCity(value)); break;
            case "state": dispatch(setState(value)); break;
            case "pinCode": dispatch(setPinCode(value)); break;
            case "phone": dispatch(setPhone(value)); break;
            case "email": dispatch(setEmail(value)); break;
            default: break;
        }
    };

    // ✅ Step 1: Save delivery details before payment
    const handleSubmit = async () => {
   
        try {
            const response = await deliveryServices.delivery(formData);
            Swal.fire({
                icon: "success",
                title: "PAY TO PLACE ORDER",
                text: "THANKS FOR PURCHASING WITH US",
                confirmButtonColor: "#3085d6",
            });
            return response; // ✅ Indicates success
        } catch (error) {
            alert(error.message || "❌ Failed to update address");

            return false; // ❌ Indicates failure
        }
    };

    const handlePaymentClick = async () => {
        if (!formData.phone || !formData.address || !formData.firstName) {
            alert("⚠️ Please fill all required details before proceeding to payment.");
            return;
        }
    
        const isSaved = await handleSubmit(); // Save delivery details
    
        if (isSaved) {
           
       
        try {
            await handlePayment( formData, [], dispatch, navigate);
            
        } catch (error) {
            alert("❌ Payment failed. Please try again.");
        } 
    }
    };
    

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-pop font-extrabold mb-4">SHIPPING DETAILS</h2>

          

            <form className="space-y-4">
                <div>
                    <label className="block text-lg font-semibold">Delivery</label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} className="border p-3 rounded-lg w-full" required />
                        <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} className="border p-3 rounded-lg w-full" required />
                    </div>
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-3 rounded-lg w-full mt-2" required />
                    <input type="text" name="landmark" placeholder="Landmark" value={formData.landmark || ""} onChange={handleChange} className="border p-3 rounded-lg w-full mt-2" />
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-3 rounded-lg w-full" required />
                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="border p-3 rounded-lg w-full" required />
                        <input type="text" name="pinCode" placeholder="PIN code" value={formData.pinCode} onChange={handleChange} className="border p-3 rounded-lg w-full" required />
                    </div>
                    <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-3 rounded-lg w-full mt-2" required />
                </div>

                <button
    type="button"
    onClick={handlePaymentClick}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
>
    Proceed to Payment
</button>

            </form>
        </div>
    );
};

export default Order;