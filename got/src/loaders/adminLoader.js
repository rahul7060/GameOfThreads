import adminServices from "../service/adminServices";


const adminLoader = async ({ params }) => {
    try {
      const page = Number(params.page) || 1;  
      const response = await adminServices.allOrder();
      
      if (!response || !response.data || !response.data.orders) {
        return { orders: [], total: 0 };
      }
  
      const orders = response.data.orders.slice((page - 1) * 15, page * 15);
      return { orders, total: response.data.orders.length };
    } catch (error) {
      console.error("Error loading orders:", error);
      return { orders: [], total: 0 };
    }
  };
  


export default adminLoader;



