import React from "react";
import { useLoaderData, useParams } from "react-router-dom";

const ProductPage = () => {
  const product = useLoaderData();
  const { id } = useParams();

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
    <div className="w-full bg-black mx-auto p-6">
      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Product Image */}
        <img
          className="md:w-1/2 w-full rounded-lg object-cover"
          src={product.image || "default-placeholder.jpg"}
          alt={product.name}
        />

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-500 text-lg">${product.price}</p>
          <p className="text-sm text-gray-600">{product.description}</p>

          {/* Color Selection */}
          <div>
            <span className="font-semibold">Color:</span>
            <div className="flex items-center gap-2 mt-2">
              {product.colors?.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <span className="font-semibold">Size:</span>
            <div className="flex space-x-2 mt-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
            Add to Cart
          </button>

          {/* Shipping Info */}
          <p className="text-sm text-gray-600">
            Free Shipping over $50 | 7-Day Hassle-Free Returns
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
