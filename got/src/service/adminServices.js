import instance from "./instance";

const adminServices = {
  allOrder: async () => {
    try {
      const response = await instance.get("/order/allOrder", {
        headers: { "Content-Type": "application/json" },
      });

      return response; // Return the response as expected
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { data: { orders: [] } }; // Prevent breaking loaders in UI
    }
  },
};

export default adminServices;
