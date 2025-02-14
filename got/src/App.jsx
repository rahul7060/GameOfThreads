import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./wrappers/Layout";
import MainContent from "./components/MainContent";
import Login from "./pages/Login";
import Register from "./pages/Register";


const routes = [
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <MainContent />,
        children: [
          {
            path: "p",
            element: <Products />,
            loader: productsLoader,
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
            element: <Layout />,
            hydrateFallbackElement: <div>Loading...</div>,
          }
        ]
      },
    ]
  },
  // {
  //   path: "/dashboard",
  //   element: <DashboardWrapper />,
  //   loader: authLoader,
  //   hydrateFallbackElement: <div>Loading...</div>,
  //   children: [
  //     {
  //       path: "",
  //       element: <Dashboard />,
  //       hydrateFallbackElement: <div>Loading...</div>,
  //     },
  //     {
  //       path: "products/pages/:page",
  //       element: <UserProducts />,
  //       loader: productsLoader,
  //       hydrateFallbackElement: <div>Loading...</div>,
  //     },
  //     {
  //       path: "cart",
  //       element: <Cart />,
  //       hydrateFallbackElement: <div>Loading...</div>,
  //     },
  //     {
  //       path: "orders",
  //       element: <Orders />,
  //       hydrateFallbackElement: <div>Loading...</div>,
  //     }
  //   ]
  // },
  // {
  //   path: "/admin/dashboard",
  //   element: <AdminDashboardWrapper />,
  //   loader: authLoader,
  //   hydrateFallbackElement: <div>Loading...</div>,
  // }
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
    <Provider store={store}>
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