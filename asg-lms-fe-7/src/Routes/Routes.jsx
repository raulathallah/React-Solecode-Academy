import { createBrowserRouter } from "react-router-dom";
import Layouts from "../components/Layouts/Layouts";
import BookRoutes from "./BookRoutes";
import MemberRoutes from "./MemberRoutes";
import Home from "../Pages/Home";
//import TransactionRoutes from "./TransactionRoutes";
import InfiniteScrollList from "../Pages/Books/InfiniteScrollList";
import Login from "../Pages/Auth/Login";
import Profile from "../Pages/Profile/Profile";
import PrivateRoute from "../components/PrivateRoutes";
import Register from "../Pages/Auth/Register";
import Unauthorized from "../Pages/Unauthorized";
import TestUpload from "../Pages/Books/TestUpload";
import RequestRoutes from "./RequestRoutes";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "/unauthorized",
        element: <Unauthorized />,
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
        path: "/uploads",
        element: <TestUpload />,
      },
      {
        // {/* Route yang Membutuhkan Login (Semua User) */}
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/infinite",
            element: <InfiniteScrollList />,
          },
        ],
      },
      ...BookRoutes,
      ...MemberRoutes,
      ...RequestRoutes,
    ],
  },
]);
