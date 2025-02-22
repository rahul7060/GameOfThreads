import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cartServices from "../service/cartServices";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartServices.getCart();
        if (response.error) throw new Error(response.error);
        setCartItems(response.cart || []);
        setTotalPrice(response.totalPrice || 0);
      } catch (error) {
        setError("Failed to load cart. Please try again.");
        console.error(error.message);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await cartServices.updateCart(productId, newQuantity);
      if (response.error) throw new Error(response.error);

      setCartItems(prev =>
        prev.map(item =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity, itemTotal: item.product.price * newQuantity }
            : item
        )
      );
      setTotalPrice(response.totalPrice);
    } catch (error) {
      setError("Failed to update quantity.");
      console.error(error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await cartServices.removeFromCart(productId);
      if (response.error) throw new Error(response.error);

      setCartItems(prev => prev.filter(item => item.product._id !== productId));
      setTotalPrice(response.totalPrice);
    } catch (error) {
      setError("Failed to remove item.");
      console.error(error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>

      {error && <p className="text-red-500">{error}</p>}

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <button 
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex items-center gap-4 border-b pb-4">
              <img 
                className="w-20 h-20 object-cover rounded-lg shadow-sm" 
                src={item.product.image} 
                alt={item.product.name} 
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                <p className="text-gray-600">₹ {item.product.price}</p>
                <p className="text-gray-600 font-semibold">Subtotal: ₹ {item.itemTotal}</p>
                <button onClick={() => removeFromCart(item.product._id)} className="bg-red-500 text-white px-4 py-1 rounded">Remove</button>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total: ₹ {totalPrice}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
