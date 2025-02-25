import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const MyOrders = () => {
  const { orders = [], total = 0 } = useLoaderData() || {};
  const navigate = useNavigate();
  const { page: currentPageParam } = useParams();

  const pageFromUrl = Number(currentPageParam) || 1;
  const totalPages = Math.ceil(total / 3);
  const [page, setPage] = useState(pageFromUrl);

  useEffect(() => {
    if (page !== pageFromUrl) {
      setPage(pageFromUrl);
    }
  }, [pageFromUrl, page]);

  const updatePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    navigate(`/myOrders/${newPage}`);
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No orders found.</div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-6 rounded-lg shadow-lg mb-8 bg-gray-50">
            {/* User Details */}
            <div className="mb-4">
              <h2 className="text-xl font-bold">User Details</h2>
              <p>Name: {order.userDetails.name}</p>
              <p>Email: {order.userDetails.email}</p>
            </div>

            {/* Products Ordered */}
            <div className="mb-4">
              <h2 className="text-xl font-bold">Products</h2>
              <ul className="list-disc pl-5">
                {order.products.map((product) => (
                  <li key={product._id} className="p-3 bg-white shadow rounded-lg my-2">
           
                  <img
                    src={product.image}
                    alt={product.name}
                   className="w-full h-72 sm:h-80 md:h-96 lg:h-auto object-contain rounded-xl"
                  />
             
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: ₹{product.price}</p>
                    <p>Size: {product.size}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Details */}
            <div className="mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>
              <p>Total Price: ₹{order.totalPrice}</p>
              <p>Amount Paid: ₹{order.amountPaid}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Order Status: {order.orderStatus}</p>
            </div>

            {/* Delivery Address */}
            <div>
              <h2 className="text-xl font-bold">Delivery Address</h2>
              <p>{order.deliveryAddress.firstName} {order.deliveryAddress.lastName}</p>
              <p>{order.deliveryAddress.address}, {order.deliveryAddress.landmark}</p>
              <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pinCode}</p>
              <p>Phone: {order.deliveryAddress.phone}</p>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center space-x-3">
        <button
          className={`px-5 py-2 rounded-full font-semibold ${
            page === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white"
          }`}
          onClick={() => updatePage(page - 1)}
          disabled={page === 1}
        >
          ◀ Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded-full font-semibold ${
              page === i + 1 ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => updatePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`px-5 py-2 rounded-full font-semibold ${
            page >= totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white"
          }`}
          onClick={() => updatePage(page + 1)}
          disabled={page >= totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default MyOrders;

