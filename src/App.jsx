import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CustomerRootElement from "./Pages/CustomerRootElement";
import Home, { productsLoader } from "./Pages/Home";
import Cart from "./Pages/Cart";
import CategorySelection from "./Pages/CategorySelection";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomerRootElement />,
      children: [
        {
          index: true,
          element: <CategorySelection />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "category",
          children: [
            {
              path: ":categoryname",
              element: <Home />,
              loader: productsLoader,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
