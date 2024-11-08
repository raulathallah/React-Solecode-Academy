import AssignmentForm from "../pages/Assignments/AssignmentForm";
import Assignments from "../pages/Assignments/Assignments";

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
    element: null,
  },
  {
    path: "/assignments/:empNo/:projNo/edit",
    element: <AssignmentForm type={"edit"} />,
  },
];

export default AssignmentRoute;
