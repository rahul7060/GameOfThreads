import instance from "./instance";
// productServices.js
const productServices = {
    getAll: async () => {
        try {
            const response = await instance.get("/products/getAll");
            return response; // Check if you're getting the correct response
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error; // Or handle the error gracefully
        }
    },
    createProduct: async (formData) =>{
        try{
         const response = await instance.post("/products/createProduct", formData, {
            headers: { "Content-Type": "multipart/form-data" }, // Ensure proper headers
        });
         return response;
        }
        catch (error){
            throw error;
        }
    },
    getById: async (id) => {
               try {
            const response = await instance.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching product by ID:", error.response?.data || error);
            return null;
        }
    }
    
    
}
export default productServices;