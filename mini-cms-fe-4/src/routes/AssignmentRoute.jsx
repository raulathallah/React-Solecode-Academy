import AssignmentDetail from "../pages/AssignmentPages/AssignmentDetail";
import AssignmentForm from "../pages/AssignmentPages/AssignmentForm";
import Assignments from "../pages/AssignmentPages/Assignments";

const AssignmentRoute = [
  {
    path: "/assignments",
    element: <Assignments />,
  },
  {
    path: "/assignments/new",
    element: <AssignmentForm type={"add"} />,
  },
  {
    path: "/assignments/:empNo/:projNo",
    element: <AssignmentDetail />,
  },
  {
    path: "/assignments/:empNo/:projNo/edit",
    element: <AssignmentForm type={"edit"} />,
  },
];

export default AssignmentRoute;
