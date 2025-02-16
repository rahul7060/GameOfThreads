import React from 'react'


    import { useState } from "react";

    const Order = () => {
      const [email, setEmail] = useState("");
      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
        nameOnCard: "",
        paymentMethod: "creditCard",
        saveInfo: true,
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          {/* Contact Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Contact</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-lg mt-2"
            />
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="news" className="w-4 h-4" />
              <label htmlFor="news" className="text-sm">Email me with news and offers</label>
            </div>
          </div>
    
          {/* Delivery Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Delivery</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <input type="text" placeholder="First name" name="firstName" onChange={handleChange} className="border p-3 rounded-lg w-full" />
              <input type="text" placeholder="Last name" name="lastName" onChange={handleChange} className="border p-3 rounded-lg w-full" />
            </div>
            <input type="text" placeholder="Address" name="address" onChange={handleChange} className="border p-3 rounded-lg w-full mt-2" />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" name="apartment" onChange={handleChange} className="border p-3 rounded-lg w-full mt-2" />
            <div className="grid grid-cols-3 gap-4 mt-2">
              <input type="text" placeholder="City" name="city" onChange={handleChange} className="border p-3 rounded-lg w-full" />
              <input type="text" placeholder="State" name="state" onChange={handleChange} className="border p-3 rounded-lg w-full" />
              <input type="text" placeholder="ZIP code" name="zip" onChange={handleChange} className="border p-3 rounded-lg w-full" />
            </div>
            <input type="text" placeholder="Phone" name="phone" onChange={handleChange} className="border p-3 rounded-lg w-full mt-2" />
          </div>
    
          {/* Payment Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Payment</h2>
            <p className="text-sm text-gray-500 mb-2">All transactions are secure and encrypted.</p>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <label className="flex items-center space-x-2">
                <input type="radio" name="paymentMethod" value="creditCard" checked={formData.paymentMethod === "creditCard"} onChange={handleChange} />
                <span>Credit Card</span>
              </label>
    
              <div className="mt-3">
                <input type="text" placeholder="Card number" name="cardNumber" onChange={handleChange} className="border p-3 rounded-lg w-full mt-2" />
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <input type="text" placeholder="Expiration date (MM / YY)" name="expiry" onChange={handleChange} className="border p-3 rounded-lg w-full" />
                  <input type="text" placeholder="Security code" name="cvc" onChange={handleChange} className="border p-3 rounded-lg w-full" />
                </div>
                <input type="text" placeholder="Name on card" name="nameOnCard" onChange={handleChange} className="border p-3 rounded-lg w-full mt-2" />
              </div>
            </div>
    
            <label className="flex items-center space-x-2 mt-4">
              <input type="radio" name="paymentMethod" value="paypal" onChange={handleChange} />
              <span>PayPal</span>
            </label>
    
            <label className="flex items-center space-x-2 mt-2">
              <input type="radio" name="paymentMethod" value="shopPay" onChange={handleChange} />
              <span>Shop Pay</span>
            </label>
          </div>
    
          {/* Remember Me Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Remember Me</h2>
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" checked={formData.saveInfo} onChange={() => setFormData({ ...formData, saveInfo: !formData.saveInfo })} />
              <span>Save my information for a faster checkout</span>
            </label>
          </div>
    
          {/* Pay Now Button */}
          <button className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition">
            Pay now
          </button>
        </div>

    
  )
}

export default Order;