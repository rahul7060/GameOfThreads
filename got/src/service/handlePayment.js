
import instance from "./instance";
import { loadRazorpayScript } from "../service/razorpayService";
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;


import { clearDeliveryDetails } from "../Redux/features/auth/DeliverySlice"; // ✅ Import Redux action

const handlePayment = async (amount, userDetails, cartItems, dispatch, navigate) => {
    try {
        console.log("🔄 Loading Razorpay script...");
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
            alert("⚠️ Failed to load Razorpay. Please check your internet connection.");
            return;
        }

        console.log("🛒 Creating order...");
        const { data } = await instance.post("/cart/create-order", { amount });

        console.log("✅ Order Created Successfully:", data);

        const options = {
            key: razorpayKey,
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
                        alert("✅ Payment Successful! Storing order in the database...");
                        dispatch(clearDeliveryDetails());

                        // ✅ Store order in the database
                        await storeOrder(userDetails, cartItems, response, amount);

                        // ✅ Navigate to order confirmation page
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

// ✅ Function to store order details after payment success
const storeOrder = async (userDetails, cartItems, paymentDetails, totalAmount) => {
    try {
        const orderData = {
            user: userDetails.email,
            cartItems, // ✅ Store all cart details
            deliveryAddress: userDetails, // ✅ Store user delivery details
            paymentDetails: {
                paymentId: paymentDetails.razorpay_payment_id,
                orderId: paymentDetails.razorpay_order_id,
                signature: paymentDetails.razorpay_signature,
                amountPaid: totalAmount,
                status: "Paid",
            },
            orderDate: new Date(),
            status: "Processing",
        };

        const response = await instance.post("/order/neworder", orderData);
        console.log("✅ Order stored in DB:", response.data);
        alert("✅ Order placed successfully!");

    } catch (error) {
        console.error("❌ Failed to store order:", error);
        alert("❌ Failed to store order details.");
    }
};

export default handlePayment;

