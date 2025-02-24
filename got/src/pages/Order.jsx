import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    setFirstName, setLastName, setAddress, setLandmark, setCity, setState, 
    setPinCode, setPhone, setEmail, clearDeliveryDetails 
} from "../Redux/features/auth/DeliverySlice";
import { fetchCart } from "../service/cartServices"; 
import deliveryServices from "../service/deliveryServices";
import handlePayment from "../service/handlePayment";
import orderServices from "../service/orderServices";

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector((state) => state.delivery);
    const cartItems = useSelector((state) => state.cart.items); // ✅ Fetch cart items
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        dispatch(fetchCart()); // ✅ Fetch cart items when component loads
    }, [dispatch]);

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
            setIsProcessing(true);
            const response = await deliveryServices.delivery(formData);
            return response.success; // ✅ Return success status
        } catch (error) {
            alert(error.message || "❌ Failed to update address");
            setIsProcessing(false);
            return false;
        }
    };

    // ✅ Step 2: Handle payment process
    const handlePaymentClick = async () => {
        if (!formData.phone || !formData.address || !formData.firstName) {
            alert("⚠️ Please fill all required details before proceeding.");
            return;
        }

        // ✅ Ensure delivery details are saved
        const isSaved = await handleSubmit();
        if (!isSaved) return;

        try {
            setIsProcessing(true);
            const paymentResponse = await handlePayment(500, formData, dispatch, navigate);
            
            if (paymentResponse.success) {
                setPaymentStatus({ success: true, message: "✅ Payment successful!" });

                // ✅ Store new order after successful payment
                await storeOrder(paymentResponse.paymentDetails);
            } else {
                setPaymentStatus({ success: false, message: "❌ Payment failed!" });
            }
        } catch (error) {
            alert("❌ Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    // ✅ Step 3: Store Order after Payment Success
    const storeOrder = async (paymentDetails) => {
        try {
            const newOrder = {
                user: formData.email,
                cartItems, // ✅ Store cart details
                deliveryAddress: formData, // ✅ Store delivery details
                paymentDetails, // ✅ Store payment information
                orderDate: new Date(),
                status: "Processing", // Default status
            };

            const response = await orderServices.createOrder(newOrder);
            alert(response.message || "✅ Order placed successfully!");
            navigate("/orders"); // ✅ Redirect to order history
        } catch (error) {
            alert("❌ Failed to store order details.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-pop font-extrabold mb-4">SHIPPING DETAILS</h2>

            {paymentStatus && (
                <div className={`p-3 rounded-lg text-center ${paymentStatus.success ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                    {paymentStatus.message}
                </div>
            )}

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
                    className={`w-full text-white py-3 rounded-lg text-lg font-semibold transition ${
                        isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
                    }`}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "Pay now"}
                </button>
            </form>
        </div>
    );
};

export default Order;
