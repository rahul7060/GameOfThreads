
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Icons

const Tee = () => {
  const { products, total } = useLoaderData() || { products: [], total: 0 };
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const joggers = products.filter(product => product.category.trim().toUpperCase() === 'TEE');
  const updatePage = (e) => {
    const newPage = parseInt(e.target.textContent);
    setPage(newPage);
    navigate(`/products/pages/${newPage}`);
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      navigate(`/products/pages/${page - 1}`);
    }
  };

  const nextPage = () => {
    if (page < Math.ceil(total / 5)) {
      setPage(page + 1);
      navigate(`/products/pages/${page + 1}`);
    }
  };

  const productDetail = (id) => {
    if (!id) return console.error("Error: Product ID is missing!");
    navigate(`/UserDashboard/productPage/${id}`);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
  
      {/* Product Grid */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6"></h1>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                onClick={() => productDetail(product._id)}
                className="relative group cursor-pointer p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                {/* Label (Best Seller, Hot Promo, New) */}
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

                {/* Image */}
                <div className="relative  p-6 ">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover rounded-xl"
                  />
                </div>

                {/* Wishlist & Cart Icons */}
                <div className="absolute top-2 right-2 flex space-x-2">
                  <FaHeart className="text-gray-400 hover:text-red-500 text-xl cursor-pointer" />
                </div>

                {/* Product Info */}
                <div className="text-center uppercase p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-md font-bold text-gray-700">RS {product.price}</p>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg font-bold hover:bg-gray-900 transition-all">
                  <FaShoppingCart /> Add to Cart
                </button>
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
            onClick={previousPage}
            disabled={page === 1}
          >
            ◀ Prev
          </button>

          {Number.isFinite(total) &&
            Array.from({ length: Math.ceil(total / 5) }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  className={`px-4 py-2 rounded-full font-semibold ${
                    page === pageNum
                      ? "bg-black text-white scale-110 shadow-md"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={updatePage}
                >
                  {pageNum}
                </button>
              )
            )}

          <button
            className={`px-5 py-2 rounded-full font-semibold ${
              page >= Math.ceil(total / 5)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
            onClick={nextPage}
            disabled={page >= Math.ceil(total / 5)}
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tee;
