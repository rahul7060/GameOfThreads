import React from 'react'
import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

const UserDashboard = () => {

    const user = useLoaderData();
 
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return (
        <>
            <Navbar
                user={user} 
            />
            <div className="w-full  ">
                <Outlet />
            </div>
        
            <Footer/>
        </>
    )
}

export default UserDashboard;