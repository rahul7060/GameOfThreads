import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Jogger = () => {
  const { products = [], total = 0 } = useLoaderData() || {};
  const navigate = useNavigate();
  const { page: currentPageParam } = useParams();
  const pageFromUrl = Number(currentPageParam) || 1;
  const totalPages = Math.ceil(total / 3);
  const [page, setPage] = useState(pageFromUrl);
  const jogger = products.filter(
    (product) => product.category.trim().toUpperCase() === "JOGGER"
  );

  useEffect(() => {
    if (page !== pageFromUrl) setPage(pageFromUrl);
  }, [pageFromUrl]);

  const updatePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    navigate(`/UserDashboard/product/${newPage}`);
  };

  const productDetail = (id) => {
    if (!id) return console.error("Error: Product ID is missing!");
    navigate(`/UserDashboard/productPage/${id}`);
  };

  return (
    <div className=" bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-creep text-center  mb-6">ELITE JOGGER</h1>

        {/* Fixed Grid Layout */}
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {jogger.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">No products found.</div>
          ) : (
            jogger.map((product) => (
              <div
                key={product._id}
                onClick={() => productDetail(product._id)}
                className="relative group cursor-pointer p-4 bg-white rounded-2xl shadow-xl w-full"
              >
                {/* Heart Icon */}
                <div className="absolute top-4 right-4">
                  <FaHeart className="text-gray-400 text-xl cursor-pointer" />
                </div>

                {/* Product Image */}
                <div className="relative p-4">
                  <img
                    src={product.image}
                    alt={product.name}
           className="w-full h-72 sm:h-80 md:h-96 lg:h-auto object-contain rounded-xl"
                  />
                </div>

                {/* Product Details */}
                <div className="text-center uppercase p-4">
                  <h3 className="text-xl font-bold tracking-wider">{product.name}</h3>
                  <p className="text-2xl font-semibold text-red-600">₹ {product.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center space-x-3">
          <button
            className={`px-5 py-2 rounded-full font-semibold ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white"
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
              page >= totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white"
            }`}
            onClick={() => updatePage(page + 1)}
            disabled={page >= totalPages}
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jogger;
