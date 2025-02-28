import React, { useState, useEffect, useCallback }from 'react';
import { useNavigate } from "react-router-dom";
import cartServices from "../service/cartServices";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch Cart Data
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await cartServices.getCart();
                if (response.error) throw new Error(response.error);
                setCartItems(response.cart || []);
            } catch (error) {
                setError(error.message || "Failed to load cart. Please try again.");
                console.error(error.message);
            }
        };
        fetchCart();
    }, []);

    // Recalculate total price whenever cartItems change
    useEffect(() => {
        const newTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        setTotalPrice(newTotal);
    }, [cartItems]);

    // Update Quantity
    const updateQuantity = useCallback(
        async (productId, newQuantity, size) => {
            if (newQuantity < 1) return;
            try {
                const response = await cartServices.updateCart(productId, newQuantity, size);
                if (response.error) throw new Error(response.error);

                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item.product._id === productId && item.size === size
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
            } catch (error) {
                setError(`Failed to update quantity: ${error.message}`);
            }
        },
        []
    );

    // Remove Item from Cart
    const removeFromCart = useCallback(async (productId, size) => {
        try {
            const response = await cartServices.removeFromCart(productId, size);
            if (response.error) throw new Error(response.error);

            setCartItems(prevItems => prevItems.filter(item => !(item.product._id === productId && item.size === size)));
        } catch (error) {
            setError("Failed to remove item.");
        }
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6 font-[Poppins] font-extrabold bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
            {error && <p className="text-red-500">{error}</p>}
            {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center">Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={`${item.product._id}-${item.size}`} className="flex items-center gap-4 border-b py-4">
                            <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                            <span className="flex-1">{item.product.name} - {item.size}</span>
                            <button 
                                className={`px-2 py-1 border ${item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={item.quantity <= 1}
                                onClick={() => updateQuantity(item.product._id, item.quantity - 1, item.size)}
                            >-</button>
                            <span className="px-4">{item.quantity}</span>
                            <button className="px-2 py-1 border" onClick={() => updateQuantity(item.product._id, item.quantity + 1, item.size)}>+</button>
                            <button className="px-2 py-1 text-red-500 hover:text-red-700" onClick={() => removeFromCart(item.product._id, item.size)}>Remove</button>
                        </div>
                    ))}
                    <h2 className="text-xl text-red-500 font-[Poppins] font-extrabold mt-4">Total: ₹{totalPrice}</h2>
                    <button onClick={() => navigate("/UserDashboard/Order")} className="mt-4 px-6 py-2 bg-black text-white rounded-lg">Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;