import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ReactDOM from "react-dom";
import Navbar from "../components/Navbar";


const Layout = () => {
    return (
        <>
           <Navbar/>
           
           <Outlet/>
           <Footer/>
        </>
    )
}

export default Layout;