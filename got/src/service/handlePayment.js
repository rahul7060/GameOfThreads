import instance from "./instance";
import { loadRazorpayScript } from "../service/razorpayService";
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
import { clearDeliveryDetails } from "../Redux/features/auth/DeliverySlice"; 
import Swal from "sweetalert2";
const handlePayment = async (amount, userDetails, cartItems, dispatch, navigate) => {
    try {
        console.log("🔄 Loading Razorpay script...");
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) throw new Error("⚠️ Failed to load Razorpay. Please check your internet connection.");

        console.log("🛒 Creating order...");
        const { data } = await instance.post("/cart/create-order", { amount });
        if (!data.order) throw new Error("❌ Order creation failed.");

        console.log("✅ Order Created Successfully:", data);

        const options = {
            key: razorpayKey,
            amount: data.order.amount,
            currency: "INR",
            name: "GAME OF THREADS",
            description: "Purchase Order",
            order_id: data.order.id,
            handler: async function (response) {
                try {
                    console.log("💳 Payment Successful. Verifying...");

                    const verification = await instance.post("/order/verify-payment", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        totalPrice: amount,
                        size: cartItems[0]?.size || "N/A",
                        quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
                    });

                    if (!verification.data.success) throw new Error("❌ Payment verification failed.");

                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful!",
                        text: "Your order has been placed successfully.",
                        confirmButtonColor: "#3085d6",
                    });
                    dispatch(clearDeliveryDetails());

                    navigate(`/UserDashboard/myOrders?status=success&payment_id=${response.razorpay_payment_id}`);
                } catch (error) {
                    console.error("🔴 Payment Verification Error:", error);
                    alert("❌ Error verifying payment. Please contact support.");
                    navigate(`/order-summary?status=failed`);
                }
            },
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
                contact: userDetails.phone,
            },
            theme: { color: "#3399cc" },
            modal: {
                escape: false,
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
