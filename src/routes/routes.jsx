import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/Warnings/Error";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Mobile from "../pages/Mobile";
import MobilesDashboard from "../pages/Dashboard/MobilesDashboard";
import HomeAppliancesDashboard from "../pages/Dashboard/HomeAppliancesDashboard";
import HomeAppliance from "../pages/HomeAppliance";
import MobileProductDetails from "../pages/Dashboard/MobileProductDetails";
import HomeApplianceDetails from "../pages/Dashboard/HomeApplianceDetails";
import UpdateMobile from "../pages/Dashboard/UpdateMobile";
import UpdateHomeAppliance from "../pages/Dashboard/UpdateHomeAppliance";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";

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
      {
        path: "mobile",
        element: <Mobile />,
      },
      {
        path: "home-appliance",
        element: <HomeAppliance />,
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="me" />,
      },
      {
        path: "me",
        element: <Profile />,
      },
      {
        path: "mobiles",
        element: <MobilesDashboard />,
      },
      {
        path: "home-appliances",
        element: <HomeAppliancesDashboard />,
      },
      {
        path: "mobiles/details/:id",
        element: <MobileProductDetails />,
      },
      {
        path: "home-appliances/details/:id",
        element: <HomeApplianceDetails />,
      },
      {
        path: "mobiles/update/:id",
        element: <UpdateMobile />,
      },
      {
        path: "home-appliances/update/:id",
        element: <UpdateHomeAppliance />,
      },
    ],
  },
]);
