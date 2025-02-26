import instance from "./instance";

const orderServices = {
    getorder: async () => {
        try {
            const response = await instance.get("/order/getorder");
            return response; // Check if you're getting the correct response
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error; // Or handle the error gracefully
        }
    }
    
    
}
export default orderServices;