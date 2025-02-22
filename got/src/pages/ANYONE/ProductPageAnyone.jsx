import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const ProductPageAnyone = () => {
  const product = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);


  const loginto = () => {
    Swal.fire({
      toast: true,
      position: "top-right", // Show it in the corner
      icon: "warning",
      title: "You need to log to buy!",
      showConfirmButton: false,
      timer: 2000, // Auto close after 2 seconds
      timerProgressBar: true,
    });
  
    setTimeout(() => {
      navigate("/Login");
    }, 2000); // Navigate after the toast disappears
  };

  console.log("Product ID from Params:", id);
  console.log("Loaded Product Data:", product);

  if (!product) {
    return (
      <p className="text-center text-red-600 font-bold text-xl">
        Error: Failed to load product details.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Product Image */}
        <img
          className="w-full md:w-1/2 rounded-lg object-cover"
          src={product.image || "default-placeholder.jpg"}
          alt={product.name}
        />

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl font-creep">{product.name}</h1>
          <p className="text-2xl text-red-600 font-semibold">MRP: ₹ {product.price}</p>
          <p className="text-sm text-gray-600">{product.description}</p>

          {/* Size Selection */}
          <div>
            <span className="font-semibold text-lg">Select Size</span>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {["M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md font-semibold ${
                    selectedSize === size ? "bg-black text-white" : "border-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

        

          {/* Add to Cart & Favourite Button */}
          <button
            onClick={loginto}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-green-500"
          >
            Add to Bag
          </button>
          <button className="w-full border border-gray-400 py-3 rounded-lg font-bold hover:bg-gray-100">
            ♥ Favourite
          </button>

          {/* Shipping Info */}
          <p className="text-sm text-gray-600">Inclusive of all taxes | Free Shipping</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPageAnyone;
