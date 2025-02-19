import productServices from "../service/productServices";

const productsLoader = async ({ params }) => {
    try {
        const page = params.page || 1;  // Fallback to page 1 if not provided
        const response = await productServices.getAll();
        console.log("API Response:", response);  // Check API response

        const products = response.data.slice((page - 1) * 5, page * 5);
        return { products, total: response.data.length };
    } catch (error) {
        console.error("Error loading products:", error); // Log error
        return { products: [], total: 0 };  // Return empty data in case of error
    }
};


export default productsLoader;
