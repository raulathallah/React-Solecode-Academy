import EmployeeForm from "../pages/EmployeePages/EmployeeForm";
import Employees from "../pages/EmployeePages/Employees";

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
    element: null,
  },
  {
    path: "/employees/:id/edit",
    element: <EmployeeForm type={"edit"} />,
  },
];

export default EmployeesRoute;
