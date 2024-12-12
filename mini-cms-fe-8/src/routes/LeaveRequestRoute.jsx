import PrivateRoute from "../components/PrivateRoutes";
import LeaveRequest from "../pages/LeaveRequestPages/LeaveRequest";
import LeaveRequestDetail from "../pages/LeaveRequestPages/LeaveRequestDetail";
import LeaveRequestForm from "../pages/LeaveRequestPages/LeaveRequestForm";

const LeaveRequestRoute = [
  {
    element: (
      <PrivateRoute
        allowedRoles={["Administrator", "Employee Supervisor", "HR Manager"]}
      />
    ),
    children: [
      {
        path: "/leave-request",
        element: <LeaveRequest />,
      },
      {
        path: "/leave-request/:id/review",
        element: <LeaveRequestDetail />,
      },
    ],
  },
  {
    element: (
      <PrivateRoute
        allowedRoles={[
          "Administrator",
          "Employee Supervisor",
          "HR Manager",
          "Employee",
        ]}
      />
    ),
    children: [
      {
        path: "/leave-request/:id",
        element: <LeaveRequestDetail type={"detail"} />,
      },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={["Administrator", "Employee"]} />,
    children: [
      {
        path: "/leave-request/add",
        element: <LeaveRequestForm />,
      },
      {
        path: "/leave-request/list",
        element: <LeaveRequest type={"employee"} />,
      },
    ],
  },
];

export default LeaveRequestRoute;
