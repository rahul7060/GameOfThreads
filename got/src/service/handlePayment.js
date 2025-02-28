

import { loadRazorpayScript } from "../service/razorpayService";
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
import { clearDeliveryDetails } from "../Redux/features/auth/DeliverySlice";
import Swal from "sweetalert2";
import cartServices from "./cartServices";

const handlePayment = async (amount, userDetails, dispatch, navigate) => {
    try {
        console.log("🔄 Loading Razorpay script...");
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) throw new Error("⚠️ Failed to load Razorpay. Please check your internet connection.");

        console.log("🛒 Creating order...");
        
        const data = await cartServices.createOrder({ amount });
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
                console.log("Razorpay response:", response);

                try {
                    const verification = await cartServices.verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });
                    console.log("Verification response:", verification.data);
                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful!",
                        text: "Your order has been placed successfully.",
                        confirmButtonColor: "#3085d6",
                    });
                    dispatch(clearDeliveryDetails());
                    navigate(`/UserDashboard/myOrders?status=success&payment_id=${response.razorpay_payment_id}`);
                } catch (verificationError) {
                    console.error("Error during verification:", verificationError);
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
                    alert("Payment process was canceled.");
                    navigate(`/order-summary?status=canceled`);
                },
            },
        };

        const razor = new window.Razorpay(options);
        razor.open();
    } catch (error) {
        console.error("🔴 Payment Process Failed:", error);
        alert("❌ Payment failed. Please try again.");
        navigate(`/order-summary?status=failed`);
    }
};

export default handlePayment;


//   import { loadRazorpayScript } from "../service/razorpayService";
// const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
// import { clearDeliveryDetails } from "../Redux/features/auth/DeliverySlice";
// import Swal from "sweetalert2";
// import cartServices from "./cartServices";



// const handlePayment = async (userDetails, dispatch, navigate, orderId) => {
//     try {
//         console.log("🔄 Loading Razorpay script...");
//         const razorpayLoaded = await loadRazorpayScript();
//         if (!razorpayLoaded) throw new Error("⚠️ Failed to load Razorpay. Check your connection.");

//         console.log("🛒 Creating Razorpay order...");
//         const data = await cartServices.createOrder(orderId);

//         if (!data?.order?.id || !data?.order?.amount) throw new Error("❌ Order creation failed!");

//         console.log("✅ Order Created Successfully:", data.order);

//         const options = {
//             key: razorpayKey,
//             amount: data.order.amount,
//             currency: "INR",
//             name: "razorWave",
//             description: "E-commerce transaction",
//             order_id: data.order.id,
//             handler: async function (response) {
//                 console.log("🛠 Payment Response Received:", response);

//                 try {
//                     console.log("🔍 Verifying Payment...");
//                     const verification = await cartServices.verifyPayment(response);

//                     console.log("✅ Payment Verified. Updating order...");

//                     await deliveryServices.updateOrderStatus(orderId, "Paid");

//                     Swal.fire({
//                         icon: "success",
//                         title: "Payment Successful!",
//                         text: "Your order has been placed successfully.",
//                         confirmButtonColor: "#3085d6",
//                     });

//                     dispatch(clearDeliveryDetails());
//                     navigate(`/UserDashboard/myOrders?status=success&payment_id=${response.razorpay_payment_id}`);
//                 } catch (error) {
//                     console.error("❌ Verification Error:", error);
//                     alert("❌ Payment verification failed.");
//                     navigate(`/order-summary?status=failed`);
//                 }
//             },
//             prefill: { name: `${userDetails.firstName} ${userDetails.lastName}`, email: userDetails.email, contact: userDetails.phone },
//             theme: { color: "#3399cc" },
//             modal: { escape: false, ondismiss: () => navigate(`/order-summary?status=canceled`) },
//         };

//         console.log("🚀 Opening Razorpay...");
//         const razor = new window.Razorpay(options);
//         razor.open();
//     } catch (error) {
//         console.error("🔴 Payment Failed:", error);
//         alert("❌ Payment failed. Try again.");
//         navigate(`/order-summary?status=failed`);
//     }
// };

// export default handlePayment;



// import { loadRazorpayScript } from "../service/razorpayService";
// const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
// import { clearDeliveryDetails } from "../Redux/features/auth/DeliverySlice";
// import Swal from "sweetalert2";
// import cartServices from "./cartServices";

// const handlePayment = async (userDetails, dispatch, navigate) => {
//     try {
//         console.log("🔄 Loading Razorpay script...");
//         const razorpayLoaded = await loadRazorpayScript();
//         if (!razorpayLoaded) throw new Error("⚠️ Failed to load Razorpay. Please check your internet connection.");

//         console.log("🛒 Creating order...");
//         const data = await cartServices.createOrder();

//         console.log("📦 Order Data Received:", data);

//         if (!data?.order?.id || !data?.order?.amount) {
//             throw new Error("❌ Order creation failed. Order ID or Amount is missing.");
//         }

//         console.log("✅ Order Created Successfully:", data.order);

//         const options = {
//             key: razorpayKey,
//             amount: data.order.amount,
//             currency: "INR",
//             name: "razorWave",
//             description: "E-commerce transaction",
//             order_id: data.order.id,
//             handler: async function (response) {
//                 console.log("🛠 Payment Response Received:", response);

//                 if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
//                     console.error("❌ Missing payment details:", response);
//                     alert("Payment verification failed: Missing details.");
//                     navigate(`/order-summary?status=failed`);
//                     return;
//                 }

//                 try {
//                     console.log("🔍 Verifying Payment...");
//                     const verification = await cartServices.verifyPayment(response);

//                     console.log("✅ Verification Response:", verification.data);

//                     Swal.fire({
//                         icon: "success",
//                         title: "Payment Successful!",
//                         text: "Your order has been placed successfully.",
//                         confirmButtonColor: "#3085d6",
//                     });

//                     if (typeof dispatch === "function") {
//                         dispatch(clearDeliveryDetails());
//                     } else {
//                         console.error("Dispatch is not a function");
//                     }

//                     navigate(`/UserDashboard/myOrders?status=success&payment_id=${response.razorpay_payment_id}`);
//                 } catch (verificationError) {
//                     console.error("❌ Error during verification:", verificationError);
//                     alert("❌ Error verifying payment. Please contact support.");
//                     navigate(`/order-summary?status=failed`);
//                 }
//             },
//             prefill: {
//                 name: `${userDetails.firstName} ${userDetails.lastName}`,
//                 email: userDetails.email,
//                 contact: userDetails.phone,
//             },
//             theme: { color: "#3399cc" },
//             modal: {
//                 escape: false,
//                 ondismiss: function () {
//                     alert("⚠️ Payment process was canceled.");
//                     navigate(`/order-summary?status=canceled`);
//                 },
//             },
//         };

//         console.log("🚀 Opening Razorpay Payment Gateway...");
//         const razor = new window.Razorpay(options);
//         razor.open();
//     } catch (error) {
//         console.error("🔴 Payment Process Failed:", error);
//         alert("❌ Payment failed. Please try again.");
//         navigate(`/order-summary?status=failed`);
//     }
// };

// export default handlePayment;
