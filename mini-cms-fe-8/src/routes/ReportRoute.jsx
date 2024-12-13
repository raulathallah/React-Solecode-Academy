import PrivateRoute from "../components/PrivateRoutes";
import Reports from "../pages/Reports/Reports";

const ReportRoute = [
  {
    element: (
      <PrivateRoute
        allowedRoles={["Administrator", "HR Manager", "Employee Supervisor"]}
      />
    ),
    children: [
      {
        path: "/reports",
        element: <Reports />,
      },
    ],
  },
];

export default ReportRoute;
