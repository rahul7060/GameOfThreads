import productServices from "../service/productServices";

const productIdLoader = async ({ params }) => {
    console.log("Loader Params:", params);  // Debugging

    if (!params || !params.id || params.id === "undefined") {
        console.error("Error: Product ID is missing or invalid");
        return null;
    }

    try {
        const product = await productServices.getById(params.id);
        return product;
    } catch (error) {
        console.error("Error loading product:", error);
        return null;
    }
};




export default productIdLoader;
