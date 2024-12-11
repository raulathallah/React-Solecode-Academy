import PrivateRoute from "../components/PrivateRoutes";
import Reports from "../Pages/Reports/Reports";

const ReportRoute = [
  {
    element: <PrivateRoute allowedRoles={["Librarian", "Library Manager"]} />,
    children: [
      {
        path: "/reports",
        element: <Reports />,
      },
    ],
  },
];

export default ReportRoute;
