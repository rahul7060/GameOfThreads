import React, { useState } from 'react';
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import cartServices from "../service/cartServices";
import Swal from "sweetalert2";

const ProductPage = () => {
  const product = useLoaderData();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();

  console.log("Product ID from Params:", id);
  console.log("Loaded Product Data:", product);

  if (!product) {
    return (
      <p className="text-center text-red-600 font-bold text-xl">
        ❌ Error: Failed to load product details.
      </p>
    );
  }

  const addToCart = async (productId) => {
    if (!productId) {
      console.error("❌ Product ID is undefined.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Product ID is missing.",
      });
      return;
    }

    if (!selectedSize) {
      Swal.fire({
        toast: true,
        position: "top-right",
        icon: "warning",
        title: "Please select a size before adding to the cart!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      const response = await cartServices.addToCart({
        productId,
        quantity: 1,
        size: selectedSize,
      });

      if (response?.error) {
        Swal.fire({
          toast: true,
          position: "top-right",
          icon: "error",
          title: response.error,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-right",
          icon: "success",
          title: "✅ Product added to cart successfully!",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });

        setTimeout(() => {
          navigate("/UserDashboard/cart");
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Add to Cart Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the product.",
      });
    }
  };

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
          <h1 className="text-4xl font-[Poppins] font-extrabold">{product.name}</h1>
          <p className="text-2xl font-[Poppins] font-extrabold text-red-600">
            RS: ₹ {product.price}
          </p>
          <p className="text-sm font-pop text-gray-600">{product.description}</p>

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
            onClick={() => addToCart(product._id)}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-green-500 transition duration-300"
          >
            🛒 Add to Bag
          </button>
          <button
            className="w-full border border-gray-400 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-300"
          >
            ♥ Favourite
          </button>

          {/* Shipping Info */}
          <p className="text-sm text-red-600">
            Inclusive of all taxes | Free Shipping
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
