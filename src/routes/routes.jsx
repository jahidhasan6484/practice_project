import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/Warnings/Error";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import HomeAppliances from "../pages/Dashboard/HomeAppliances";
import Mobiles from "../pages/Dashboard/Mobiles";
// import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="mobiles" />,
      },
      {
        path: "mobiles",
        element: (
          // <PrivateRoute>
          <Mobiles />
          // </PrivateRoute>
        ),
      },
      {
        path: "home-appliances",
        element: (
          // <PrivateRoute>
          <HomeAppliances />
          // </PrivateRoute>
        ),
      },
    ],
  },
  // {
  //   path: "profile",
  //   element: <ProfileLayout />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to="me" />,
  //     },
  //     {
  //       path: "me",
  //       element: (
  //         <PrivateRoute>
  //           <Profile />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: "purchase-history",
  //       element: (
  //         <PrivateRoute>
  //           <PurchaseHistory />
  //         </PrivateRoute>
  //       ),
  //     },
  //   ],
  // },
]);
