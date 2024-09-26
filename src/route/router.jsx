import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";

import MainLayout from "../layout/MainLayout";

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
    ],
  },
  //   {
  //     path: "detail/:id",
  //     element: <DetailPage />,
  //   },
]);

export default router;
