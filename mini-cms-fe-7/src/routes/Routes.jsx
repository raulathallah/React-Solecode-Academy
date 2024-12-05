import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import EmployeesRoute from "./EmployeesRoute";
import DepartmentRoute from "./DepartmentRoute";
import ProjectRoute from "./ProjectRoute";
import AssignmentRoute from "./AssignmentRoute";
import Unauthorized from "../pages/Unauthorized";
import Login from "../pages/AuthPages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoutes";
import Profile from "../pages/ProfilePages/Profile";
import Register from "../pages/AuthPages/Register";
import LeaveRequestRoute from "./LeaveRequestRoute";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        element: <PrivateRoute allowedRoles={["Administrator"]} />,
        children: [
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      ...EmployeesRoute,
      ...DepartmentRoute,
      ...ProjectRoute,
      ...AssignmentRoute,
      ...LeaveRequestRoute,
    ],
  },
]);

export default routers;
