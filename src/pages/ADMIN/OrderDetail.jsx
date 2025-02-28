import React, { useEffect, useState }  from 'react';
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const  OrderDetail = () => {
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
    navigate(`/orderDetail/${newPage}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No orders found.</div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white shadow-lg rounded-lg p-6 mb-8">
            {/* User Details */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">👤 User Details</h2>
              <p className="text-gray-600">Name: {order.userDetails.name}</p>
              <p className="text-gray-600">Email: {order.userDetails.email}</p>
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Products Ordered */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">🛍 Products</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {order.products.map((product) => (
                  <li key={product._id} className="bg-gray-50 p-4 rounded-lg shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-contain rounded-lg mb-3"
                    />
                    <p className="text-gray-700 font-medium">{product.name}</p>
                    <p className="text-gray-600">Qty: {product.quantity}</p>
                    <p className="text-gray-600">Price: ₹{product.price}</p>
                    <p className="text-gray-600">Size: {product.size}</p>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Order Details */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">📦 Order Details</h2>
              <p className="text-gray-600">Total Price: ₹{order.totalPrice}</p>
              <p className="text-gray-600">Amount Paid: ₹{order.amountPaid}</p>
              <p className="text-gray-600">
                Payment Status:{" "}
                <span
                  className={`px-2 py-1 text-sm font-medium rounded-lg ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
              {/* <p className="text-gray-600">
                Order Status:{" "}
                <span className="px-2 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg">
                  {order.orderStatus}
                </span>
              </p> */}
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Delivery Address */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700">📍 Delivery Address</h2>
              <p className="text-gray-600">
                {order.deliveryAddress.firstName} {order.deliveryAddress.lastName}
              </p>
              <p className="text-gray-600">
                {order.deliveryAddress.address}, {order.deliveryAddress.landmark}
              </p>
              <p className="text-gray-600">
                {order.deliveryAddress.city}, {order.deliveryAddress.state} -{" "}
                {order.deliveryAddress.pinCode}
              </p>
              <p className="text-gray-600">Phone: {order.deliveryAddress.phone}</p>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center space-x-2">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
          onClick={() => updatePage(page - 1)}
          disabled={page === 1}
        >
          ◀ Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              page === i + 1
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            onClick={() => updatePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            page >= totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
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




export default OrderDetail;