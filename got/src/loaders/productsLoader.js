import productServices from "../service/productServices";
const productsLoader = async ({ params }) => {
    try {
        const page = params.page || 1;  // Fallback to page 1 if not provided
        const response = await productServices.getAll();
        console.log("API Response:", response);  // Debugging API response

        if (!response || !response.data) {
            console.error("Invalid API response:", response);
            return { products: [], total: 0 };
        }
        const products = response.data.slice((page - 1) * 6, page * 6);
        console.log("Loaded products:", products); // Debugging loaded products

        return { products, total: response.data.length };
    } catch (error) {
        console.error("Error loading products:", error);
        return { products: [], total: 0 };
    }
};


export default productsLoader;
