

import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const EliteTee = () => {
  const { products = [], total = 0 } = useLoaderData() || {};

  const navigate = useNavigate();
  const { page: currentPageParam } = useParams();
  
  const pageFromUrl = Number(currentPageParam) || 1;
  const totalPages = Math.ceil(total / 3);
  const [page, setPage] = useState(pageFromUrl);

  const EliteTee = products.filter(
    (product) => product.category.trim().toUpperCase() === "TEE"
  );
  useEffect(() => {
    if (page !== pageFromUrl) setPage(pageFromUrl); // Prevent unnecessary re-renders
  }, [pageFromUrl]);

  const updatePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    navigate(`/UserDashboard/eliteTee/${newPage}`);
  };
  const productDetail = (id) => {
    if (!id) return console.error("Error: Product ID is missing!");
    navigate(`/UserDashboard/productPage/${id}`);
  };
  return (
    <div className=" bg-white min-h-screen">
      <div className="flex-col-reverse p-8">
        <h1 className="text-3xl text-center text-amber-200 uppercase font-creep mb-6">EliteTee</h1>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {EliteTee.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">No products found.</div>
          ) : (
            EliteTee.map((product) => (
              <div
                key={product._id}
                onClick={() => productDetail(product._id)}
                className="relative group cursor-pointer p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                {product.label && (
                  <span
                    className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded ${
                      product.label === "New"
                        ? "bg-blue-500"
                        : product.label === "Hot Promo"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {product.label}
                  </span>
                )}

                <div className="relative p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                       className="w-full h-72 sm:h-80 md:h-96 lg:h-auto object-contain rounded-xl"
                  />
                </div>

                <div className="absolute top-2 right-2 flex space-x-2">
                  <FaHeart className="text-gray-400 hover:text-red-500 text-xl cursor-pointer" />
                </div>

                <div className="text-center uppercase p-4">
                  <h3 className="text-lg font-[Poppins] font-extrabold text-black">{product.name}</h3>
                  <p className="text-2xl font-[Poppins] font-extrabold text-red-600">  ₹ {product.price}</p>
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
                : "bg-black text-white hover:bg-gray-900"
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
                page === i + 1
                  ? "bg-black text-white scale-110 shadow-md"
                  : "bg-gray-200 hover:bg-gray-300"
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
                : "bg-black text-white hover:bg-gray-900"
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

export default EliteTee;
