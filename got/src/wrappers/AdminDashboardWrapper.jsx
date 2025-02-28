import React from 'react'
import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

const AdminDashboardWrapper = () => {

    const user = useLoaderData();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== 'admin') {
        return <Navigate to="/userdashboard" replace />;
    }

    return (
        <>
            <Navbar
                user={user}
            />
            <div className="container mx-auto p-4 mt-4">
                <Outlet />
            </div>

       <Footer/>
        </>
    )
}

export default AdminDashboardWrapper;