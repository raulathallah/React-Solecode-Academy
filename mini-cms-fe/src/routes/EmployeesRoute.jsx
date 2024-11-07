import EmployeeForm from "../pages/Employees/EmployeeForm";
import Employees from "../pages/Employees/Employees";

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
    element: null,
  },
];

export default EmployeesRoute;
