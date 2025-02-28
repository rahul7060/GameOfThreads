import instance from "./instance";

const deliveryServices = {
    delivery: async (formData) => {
        try {
            const response = await instance.post("/cart/", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Network error" };
        }
    },
};

export default deliveryServices;
