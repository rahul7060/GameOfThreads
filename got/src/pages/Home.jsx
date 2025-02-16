import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 md:grid-cols-2 lg:grid-cols-2">
      {/* TEE Section */}
      <Link to="/tee" className="relative aspect-[5/2] block">
        <img
          src="/images/jackets.jpg"
          alt="Jackets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <span className="text-white text-xl font-bold">ELITE TEE</span>
        </div>
      </Link>

      {/* JOGGER Section */}
      <Link to="/jogger" className="relative aspect-[5/2] block">
        <img
          src="/images/red.jpeg"
          alt="Jackets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <span className="text-white text-xl font-bold">JOGGER</span>
        </div>
      </Link>

      {/* HOODIE Section */}
      <Link to="/hoodie" className="relative aspect-[5/2] block">
        <img
          src="/images/jackets.jpg"
          alt="Jackets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <span className="text-white text-xl font-bold">HOODIES</span>
        </div>
      </Link>

      {/* DENIM Section */}
      <Link to="/denim" className="relative aspect-[5/2] block">
        <img
          src="/images/tanks.jpg"
          alt="Tanks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <span className="text-white text-xl font-bold">DENIM</span>
        </div>
      </Link>

      {/* All Products Section (Spanning Full Width) */}
      <Link to="/all-products" className="relative col-span-2 aspect-[10/3] block">
        <img
          src="/images/all-products.jpg"
          alt="All Products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <span className="text-white text-xl font-bold">ALL PRODUCTS</span>
        </div>
      </Link>
    </div>
  );
};

export default Home;
