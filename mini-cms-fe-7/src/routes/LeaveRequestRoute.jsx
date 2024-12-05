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
        path: "/leave-request/:id",
        element: <LeaveRequestDetail />,
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
    ],
  },
];

export default LeaveRequestRoute;
