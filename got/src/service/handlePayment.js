import instance from "./instance";
import { loadRazorpayScript } from "../service/razorpayService";
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

const handlePayment = async (amount, userDetails) => {
    try {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
            alert("Failed to load Razorpay. Check your network.");
            return;
        }

        const { data } = await instance.post("/cart/create-order", { amount });

        const options = {
            key:razorpayKey ,
            amount: data.order.amount,
            currency: "INR",
            name: "Your Store",
            description: "Test Transaction",
            order_id: data.order.id,
            handler: async function (response) {
                try {
                    const verification = await instance.post("/verify-payment", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        totalPrice: amount
                    });

                    if (verification.data.success) {
                        alert("Payment Successful! Order Confirmed.");
                    } else {
                        alert("Payment verification failed.");
                    }
                } catch (error) {
                    console.error("Verification error:", error);
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
        };

        const razor = new window.Razorpay(options);
        razor.open();
    } catch (error) {
        console.error("Payment failed:", error);
        alert("Payment failed. Try again.");
    }
};

export default handlePayment;
