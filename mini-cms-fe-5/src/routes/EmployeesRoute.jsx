import EmployeeDetail from "../pages/EmployeePages/EmployeeDetail";
import EmployeeForm from "../pages/EmployeePages/EmployeeForm";
import Employees from "../pages/EmployeePages/Employees";
import EmployeeWorkHistory from "../pages/EmployeePages/EmployeeWorkHistory";

const EmployeesRoute = [
  {
    path: "/employees",
    element: <Employees />,
  },
  {
    path: "/employees/new",
    element: <EmployeeForm type={"add"} />,
  },
  {
    path: "/employees/:id",
    element: <EmployeeDetail />,
  },
  {
    path: "/employees/:id/history",
    element: <EmployeeWorkHistory />,
  },
  {
    path: "/employees/:id/edit",
    element: <EmployeeForm type={"edit"} />,
  },
];

export default EmployeesRoute;
