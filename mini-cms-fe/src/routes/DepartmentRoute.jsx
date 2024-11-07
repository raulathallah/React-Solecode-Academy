import DepartmentForm from "../pages/DepartmentPages/DepartmentForm";
import Departments from "../pages/DepartmentPages/Departments";

const DepartmentRoute = [
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
    element: null,
  },
  {
    path: "/departments/:id/edit",
    element: <DepartmentForm type={"edit"} />,
  },
];

export default DepartmentRoute;
