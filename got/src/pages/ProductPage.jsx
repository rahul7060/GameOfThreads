import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const ProductPage = () => {
  const product = useLoaderData();
  const { id } = useParams(); // Debugging

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
    <div>
      <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">
        {product.name}
      </h1>

      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          className="w-full md:w-1/2 rounded-lg mb-6 md:mb-0 md:mr-8"
          src={product.image || "default-placeholder.jpg"}
          alt={product.name}
        />
        <div className="w-full md:w-1/2 space-y-4">
          <p className="text-gray-300 text-lg leading-relaxed">
            {product.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
