import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/CartPage";

import LoginPage from "../pages/LoginPage";

import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // loader: () => {
    //   if (!localStorage.getItem("access_token")) {
    //     return redirect("/login");
    //   }

    //   return "Boleh masuk";
    // },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,

    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
