import orderServices from "../service/orderServices";


const orderLoader = async ({ params }) => {
    try {
      const page = Number(params.page) || 1;  
      const response = await orderServices.getorder();
      
      if (!response || !response.data || !response.data.orders) {
        return { orders: [], total: 0 };
      }
  
      const orders = response.data.orders.slice((page - 1) * 2, page * 2);
      return { orders, total: response.data.orders.length };
    } catch (error) {
      console.error("Error loading orders:", error);
      return { orders: [], total: 0 };
    }
  };
  


export default orderLoader;

