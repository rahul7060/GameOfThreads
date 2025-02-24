import instance from "./instance";

const orderServices={

neworder: async()=>{
    try {
        const response = await instance.post("/order/neworder");
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Or handle the error gracefully
    }
}

}

export default orderServices;