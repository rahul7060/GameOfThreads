import instance from "./instance";

const cartServices = {
    addToCart: async (data) => {
        try {
            const response = await instance.post('/cart/add', data);
            return response.data;
        } catch (error) {
            return { error: error.response?.data || "An error occurred while adding to cart." };
        }
    },
    getCart: async () => {
        try {
            const response = await instance.get('/cart');
            return response.data;
        } catch (error) {
            return { error: "Failed to load cart." };
        }
    },
    removeFromCart: async (productId, size) => {
        console.log(`Sending DELETE request to /cart/${productId}/${size}`);
        try {
            const response = await instance.delete(`/cart/${productId}/${size}`);
            return response.data;
        } catch (error) {
            console.error("Error in removeFromCart:", error.response?.data || error.message);
            return { error: "Failed to delete item." };
        }
    },
    updateCart: async (productId, quantity, size) => {
        try {
            const response = await instance.patch(`/cart/${productId}`, { quantity, size });
            return response.data;
        } catch (error) {
            return { error: "Failed to update quantity." };
        }
    },  
      createOrder: async (data) => {
        try {
            const response = await instance.post('/create-order', data, { withCredentials: true });

            return response.data;
        } catch (error) {
            return { error: error.response?.data || "An error occurred while creating the order." };
        }
    },

    verifyPayment: async (data) => {
        try {
            const response = await instance.post('/verify-payment', data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return { error: error.response?.data || "An error occurred while verifying payment." };
        }
    }
};

export default cartServices;
