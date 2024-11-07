import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/Layouts/Layout";
import EmployeesRoute from "./EmployeesRoute";
import DepartmentRoute from "./DepartmentRoute";
import ProjectRoute from "./ProjectRoute";
import AssignmentRoute from "./AssignmentRoute";

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
      ...DepartmentRoute,
      ...ProjectRoute,
      ...AssignmentRoute,
    ],
  },
]);

export default routers;
