import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/Warnings/Error";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
  //   {
  //     path: "dashboard",
  //     element: <DashbaordLayout />,
  //     errorElement: <ErrorPage />,
  //     children: [
  //       {
  //         index: true,
  //         element: <Navigate to="manage-packages" />,
  //       },
  //       {
  //         path: "manage-schedules",
  //         element: (
  //           <AdminAccess>
  //             <ManageSchedule />
  //           </AdminAccess>
  //         ),
  //       },
  //       {
  //         path: "manage-packages",
  //         element: (
  //           <AdminAccess>
  //             <ManagePackages />
  //           </AdminAccess>
  //         ),
  //       },
  //       {
  //         path: "manage-drivers",
  //         element: (
  //           <AdminAccess>
  //             <ManageDrivers />
  //           </AdminAccess>
  //         ),
  //       },
  //     ],
  //   },
  //   {
  //     path: "profile",
  //     element: <ProfileLayout />,
  //     errorElement: <ErrorPage />,
  //     children: [
  //       {
  //         index: true,
  //         element: <Navigate to="me" />,
  //       },
  //       {
  //         path: "me",
  //         element: (
  //           <PrivateRoute>
  //             <Profile />
  //           </PrivateRoute>
  //         ),
  //       },
  //       {
  //         path: "purchase-history",
  //         element: (
  //           <PrivateRoute>
  //             <PurchaseHistory />
  //           </PrivateRoute>
  //         ),
  //       },
  //     ],
  //   },
]);
