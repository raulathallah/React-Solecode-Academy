import PrivateRoute from "../components/PrivateRoutes";
import AssignmentDetail from "../pages/AssignmentPages/AssignmentDetail";
import AssignmentForm from "../pages/AssignmentPages/AssignmentForm";
import Assignments from "../pages/AssignmentPages/Assignments";

const AssignmentRoute = [
  {
    element: (
      <PrivateRoute
        allowedRoles={[
          "Administrator",
          "Employee Supervisor",
          "Employee",
          "HR Manager",
        ]}
      />
    ),
    children: [
      {
        path: "/assignments",
        element: <Assignments />,
      },
      {
        path: "/assignments/:empNo/:projNo",
        element: <AssignmentDetail />,
      },
    ],
  },
  {
    element: (
      <PrivateRoute allowedRoles={["Administrator", "Employee Supervisor"]} />
    ),
    children: [
      {
        path: "/assignments/new",
        element: <AssignmentForm type={"add"} />,
      },
      {
        path: "/assignments/:empNo/:projNo/edit",
        element: <AssignmentForm type={"edit"} />,
      },
    ],
  },
];

export default AssignmentRoute;
