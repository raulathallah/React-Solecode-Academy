import PrivateRoute from "../components/PrivateRoutes";
import DepartmentDetail from "../pages/DepartmentPages/DepartmentDetail";
import DepartmentForm from "../pages/DepartmentPages/DepartmentForm";
import Departments from "../pages/DepartmentPages/Departments";

const DepartmentRoute = [
  {
    element: <PrivateRoute allowedRoles={["Administator"]} />,
    children: [
      {
        path: "/departments",
        element: <Departments />,
      },
      {
        path: "/departments/new",
        element: <DepartmentForm type={"add"} />,
      },
      {
        path: "/departments/:id",
        element: <DepartmentDetail />,
      },
      {
        path: "/departments/:id/edit",
        element: <DepartmentForm type={"edit"} />,
      },
    ],
  },
];

export default DepartmentRoute;
