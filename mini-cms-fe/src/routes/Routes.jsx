import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/Layouts/Layout";
import EmployeesRoute from "./EmployeesRoute";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      ...EmployeesRoute,
    ],
  },
]);

export default routers;
