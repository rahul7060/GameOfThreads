import React from "react";
import { Link,Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 font-creep gap-2 p-4 md:grid-cols-2 lg:grid-cols-2">
      
      <Link to="/teeAnyone" className="relative aspect-[5/2] block">
        <img
          src="/images/e.jpg"
          alt="Jackets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-xl font-bold">ELITE TEE</span>
        </div>
      </Link>

      {/* JOGGER Section */}
      { <Link to="/joggerAnyone" className="relative aspect-[5/2] block">
        <img
          src="/images/jog.png"
          alt="Jackets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
          <span className="text-white text-xl font-bold"></span>
        </div>
      </Link> }

      {/* HOODIE Section */}
      { <Link to="/hoodieAnyone" className="relative aspect-[5/2] block">
        <img
          src="/images/hoo.jpg"
          alt="Jackets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center ">
          <span className="text-white text-xl font-bold">HOODIES</span>
        </div>
      </Link> }

      {/* DENIM Section */}
       { <Link to="/denimAnyone" className="relative aspect-[5/2] block">
        <img
          src="/images/dee.jpg"
          alt="Tanks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center ">
          <span className="text-white text-xl font-bold">DENIM</span>
        </div>
      </Link> }

      {/* All Products Section (Spanning Full Width) */}
      <Link to="/homeProduct" className="relative col-span-2 aspect-[10/3] block">
        <img
          src="/images/all.png"
          alt="All Products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center  ">
          <span className="text-white text-xl font-bold"></span>
        </div>
      </Link>
      <Outlet />
    </div>
  );
};

export default Dashboard;