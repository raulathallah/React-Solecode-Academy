import PrivateRoute from "../components/PrivateRoutes";
import EmployeeAssign from "../pages/EmployeePages/EmployeeAssign";
import EmployeeDetail from "../pages/EmployeePages/EmployeeDetail";
import EmployeeForm from "../pages/EmployeePages/EmployeeForm";
import Employees from "../pages/EmployeePages/Employees";
import EmployeeWorkHistory from "../pages/EmployeePages/EmployeeWorkHistory";

const EmployeesRoute = [
  {
    element: (
      <PrivateRoute
        allowedRoles={["Administrator", "HR Manager", "Employee Supervisor"]}
      />
    ),
    children: [
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/employees/:id",
        element: <EmployeeDetail />,
      },
      {
        path: "/employees/:id/history",
        element: <EmployeeWorkHistory />,
      },
    ],
  },
  {
    element: (
      <PrivateRoute
        allowedRoles={[
          "Administrator",
          "HR Manager",
          "Employee Supervisor",
          "Employee",
        ]}
      />
    ),
    children: [
      {
        path: "/employees/:id/edit",
        element: <EmployeeForm type={"edit"} />,
      },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={["Administrator", "HR Manager"]} />,
    children: [
      {
        path: "/employees/new",
        element: <EmployeeForm type={"add"} />,
      },

      {
        path: "/employees/assign",
        element: <EmployeeAssign />,
      },
    ],
  },
];

export default EmployeesRoute;