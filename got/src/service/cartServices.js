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
    removeFromCart: async (productId) => {
        try {
            const response = await instance.delete(`/cart/${productId}`);
            return response.data;
        } catch (error) {
            return { error: "Failed to delete item." };
        }
    }
};

export default cartServices;
