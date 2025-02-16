import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";


const Layout = () => {
    return (
        <>
           <Navbar/>
           <MainContent/>
           <Outlet/>
           <Footer/>
        </>
    )
}

export default Layout;