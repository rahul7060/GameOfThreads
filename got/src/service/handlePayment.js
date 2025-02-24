
import instance from "./instance";
import { loadRazorpayScript } from "../service/razorpayService";
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;


import { clearDeliveryDetails } from "../Redux/features/auth/DeliverySlice"; // ✅ Import Redux action


const handlePayment = async (amount, userDetails, dispatch, navigate) => {
    try {
        console.log("🔄 Loading Razorpay script...");
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
            alert("⚠️ Failed to load Razorpay. Please check your internet connection.");
            return;
        }

        console.log("🛒 Creating order...");
        const { data } = await instance.post("/cart/create-order", {  amount });

        console.log("✅ Order Created Successfully:", data);

        const options = {
            key: razorpayKey, // ✅ Ensure this key is correct
            amount: data.order.amount,
            currency: "INR",
            name: "Your Store",
            description: "Test Transaction",
            order_id: data.order.id,
            handler: async function (response) {
                try {
                    console.log("💳 Payment Successful. Verifying...");
                    const verification = await instance.post("/cart/verify-payment", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        totalPrice: amount,
                    });

                    if (verification.data.success) {
                        alert("✅ Payment Successful! Redirecting to Order Summary...");
                        dispatch(clearDeliveryDetails());

                        // ✅ Navigate to order confirmation page with payment status
                        navigate(`/UserDashboard/home?status=success&payment_id=${response.razorpay_payment_id}`);
                    } else {
                        alert("❌ Payment verification failed.");
                    
                    }
                } catch (error) {
                    console.error("🔴 Payment Verification Error:", error);
                    alert("❌ Error verifying payment. Please contact support.");
                   
                }
            },
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
                contact: userDetails.phone,
            },
            theme: {
                color: "#3399cc",
            },
            modal: {
                escape: false, // Prevent closing modal on clicking outside
                ondismiss: function () {
                    alert("⚠️ Payment process was canceled.");
                    navigate(`/order-summary?status=canceled`);
                },
            },
        };

        console.log("🚀 Initializing Razorpay Payment Gateway...");
        const razor = new window.Razorpay(options);
        razor.open();
    } catch (error) {
        console.error("🔴 Payment Process Failed:", error);
        alert("❌ Payment failed. Please try again.");
        navigate(`/order-summary?status=failed`);
    }
};
export default handlePayment;