import React from "react";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";
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
        <MainContent/>
       <Footer/>
        </>
    )
}

export default AdminDashboardWrapper;