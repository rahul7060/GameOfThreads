import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./wrappers/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Store from "./Redux/App/store";
import { Provider } from "react-redux";
import Logout from "./components/Logout";
import Resetpassword from "./pages/Resetpassword";
import Verifycode from "./pages/Verifycode";
import Changepassword from "./pages/Changepassword";
import UserDashboard from "./wrappers/UserDashboard";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import authLoader from "./loaders/authLoader";
import AdminDashboardWrapper from "./wrappers/AdminDashboardWrapper";
import Home from "./pages/Home";
import Dashboard from "./pages/ANYONE/Dashboard";
import UserData from "./pages/ADMIN/UserData";
import ListProduct from "./pages/ADMIN/ListProduct";
import AdminAnalysis from "./pages/ADMIN/AdminAnalysis";
import OrderDetail from "./pages/ADMIN/OrderDetail";
import Payment from "./pages/ADMIN/Payment";
import productsLoader from "./loaders/productsLoader";
import ProductPage from"./pages/ProductPage"
import productIdLoader from "./loaders/productIdLoader";
import Tee from "./pages/ADMIN/Tee";
import Jogger from "./pages/Jogger";
import Hoodie from "./pages/Hoodie";
import Demim from "./pages/Demim";
import HomeProduct from "./pages/ANYONE/HomeProduct";
import HoodieAnyone from "./pages/ANYONE/HoodieAnyone";
import TeeAnyone from "./pages/ANYONE/TeeAnyone";
import DenimAnyone from "./pages/ANYONE/DenimAnyone";
import JoggerAnyone from "./pages/ANYONE/JoggerAnyone";





const routes = [
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true, // This makes "register" the default route
        element: <Home />,
      },{
        path: "dashboard",
        element: <Dashboard />,
  
        hydrateFallbackElement: <div>Loading...</div>,
      },
          
          {
            path: "homeProduct",
            element: <HomeProduct />,
            loader:productsLoader,
            hydrateFallbackElement: <div>Loading...</div>,
          },
          {
            path: "denimAnyone",
            element: <DenimAnyone/>,
            loader:productsLoader,
            hydrateFallbackElement: <div>Loading...</div>,
          },
          {
            path: "teeAnyone",
            element: <TeeAnyone />,
            loader:productsLoader,
            hydrateFallbackElement: <div>Loading...</div>,
          },
          {
            path: "hoodieAnyone",
            element: < HoodieAnyone/>,
            loader:productsLoader,
            hydrateFallbackElement: <div>Loading...</div>,
          },
          {
            path: "joggerAnyone",
            element: <JoggerAnyone/>,
            loader:productsLoader,
            hydrateFallbackElement: <div>Loading...</div>,
          },

          {
            path: "register",
            element: <Register />,
            hydrateFallbackElement: <div>Loading...</div>,
          },
          {
            path: "login",
            element: <Login/>,
            hydrateFallbackElement: <div>Loading...</div>,
          },
          {
            path: "logout",
            element: <Logout/>,
            hydrateFallbackElement: <div>Loading...</div>,
          },
        
          {
            path: "resetpassword",
            element: <Resetpassword/>,
            hydrateFallbackElement: <div>Loading...</div>,
          },
        
          {
            path: "verifycode",
            element: <Verifycode/>,
            hydrateFallbackElement: <div>Loading...</div>,
          },
          {
            path: "Changepassword",
            element: <Changepassword  />,
            hydrateFallbackElement: <div>Loading...</div>,
          },
        
      
    ]
  },
  {
    path: "/UserDashboard",
    element: <UserDashboard/>,
    loader: authLoader,
    hydrateFallbackElement: <div>Loading...</div>,
    children: [
      {
        path: "home",
        element: <Home/>,
        loader:productsLoader,
        hydrateFallbackElement: <div>Loading...</div>,
      },
      {
        path: "product/:page?",
        element: <Product/>,
      loader:productsLoader,
      hydrateFallbackElement: <div>Loading...</div>,
      },
      {
        path: "productPage/:id/:page?",
        element: <ProductPage />,
        loader: productIdLoader,
        hydrateFallbackElement: <div>Loading...</div>,
      },
        {
          path: "tee",
          element: <Tee/>,
          loader:productsLoader,
          hydrateFallbackElement: <div>Loading...</div>,
        },
        {
          path: "demim",
          element: <Demim/>,
          loader:productsLoader,
          hydrateFallbackElement: <div>Loading...</div>,
        },
        {
          path: "jogger",
          element: <Jogger/>,
          loader:productsLoader,
          hydrateFallbackElement: <div>Loading...</div>,
        },
        {
          path: "hoodie",
          element: <Hoodie/>,
          loader:productsLoader,
          hydrateFallbackElement: <div>Loading...</div>,
        },
   
    
        {
          path: "productPage/:id", 
          element: <ProductPage/>,
          loader: productIdLoader,
          hydrateFallbackElement: <div>Loading...</div>,
        },
   
    
      {
        path: "dashboard",
        element: <Dashboard/>,
        hydrateFallbackElement: <div>Loading...</div>,
      },
      
      {
        path: "cart",
        element: <Cart/>,
        hydrateFallbackElement: <div>Loading...</div>,
      },
      
      {
        path: "order",
        element: <Order/>,
        hydrateFallbackElement: <div>Loading...</div>,
      },
      
    ]
  },
  
  {
    path: "/AdminDashboardWrapper",
    element: <AdminDashboardWrapper />,
    loader: authLoader,
    hydrateFallbackElement: <div>Loading...</div>,
    children: [
      { index: true, element: <UserData /> },
      {
        path: "userData",
        element: <UserData/>,
        hydrateFallbackElement: <div>Loading...</div>,
      },
      {
        path: "ListProduct",
        element: <ListProduct/>,
        hydrateFallbackElement: <div>Loading...</div>,
      },
      {
        path: "AdminAnalysis",
        element: <AdminAnalysis/>,
        hydrateFallbackElement: <div>Loading...</div>,
      },
      {
        path: "OrderDetail",
        element: <OrderDetail/>,
        hydrateFallbackElement: <div>Loading...</div>,
      },
      {
        path: "payment",
        element: <Payment/>,
        hydrateFallbackElement: <div>Loading...</div>,
      },
    ]
  }
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionStatusRevalidation: true,
    v7_skipActionErrorRevalidation: true,
  }
});

const App = () => {
  return (
    <Provider store={Store}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </Provider>
  )
}

export default App;