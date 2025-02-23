import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    setFirstName, setLastName, setAddress, setLandmark, setCity, setState, 
    setPinCode, setPhone, setEmail, clearDeliveryDetails 
} from "../Redux/features/auth/DeliverySlice";
import deliveryServices from "../service/deliveryServices";
import handlePayment from "../service/handlePayment"; 
const Order = () => {
    const dispatch = useDispatch();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await deliveryServices.delivery(formData);
            alert(response.message || "Address updated successfully");
            dispatch(clearDeliveryDetails()); // Clear Redux state after successful submission
        } catch (error) {
            alert(error.message || "Failed to update address");
        }
    };
    const handlePaymentClick = async () => {
        if (!formData.phone || !formData.address || !formData.firstName) {
            alert("Please fill all required details before proceeding to payment.");
            return;
        }
        handlePayment(500, formData); // Example: Passing ₹500 as the amount
    }
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-pop font-extrabold mb-4">SHIPPING DETAILS</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg font-semibold">Contact</label>
                    <input
                        type="phone"
                        name="Number"
                        placeholder="Enter valid number"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg mt-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold">Delivery</label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border p-3 rounded-lg w-full"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border p-3 rounded-lg w-full"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full mt-2"
                        required
                    />
                    <input
                        type="text"
                        name="landmark"
                        placeholder="Landmark"
                        value={formData.landmark || ""}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full mt-2"
                    />
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="border p-3 rounded-lg w-full"
                            required
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            className="border p-3 rounded-lg w-full"
                            required
                        />
                            
                  
                        <input
                            type="text"
                            name="pinCode"
                            placeholder="PIN code"
                            value={formData.pinCode}
                            onChange={handleChange}
                            className="border p-3 rounded-lg w-full"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full mt-2"
                        required
                    />
                </div>

                <button
                    type="button"
                    onClick={handlePaymentClick}
                    className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
                >
                    Pay now
                </button>
            </form>
        </div>
    );
};


export default Order;
