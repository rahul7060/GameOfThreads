import productServices from "../service/productServices";

const productIdLoader = async ({ params }) => {

    try {
        const product = await productServices.getById(params.id);
        return product;
    } catch (error) {
        console.error("Error loading product:", error);
        return null;
    }
};




export default productIdLoader;