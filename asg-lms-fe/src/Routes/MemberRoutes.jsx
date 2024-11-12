import MemberDetail from "../Pages/Members/MemberDetail";
import MemberForm from "../Pages/Members/MemberForm";
import MemberList from "../Pages/Members/MemberList";

const MemberRoutes = [
  {
    path: "/members",
    element: <MemberList />,
  },
  {
    path: "/members/add",
    element: <MemberForm type="add" />,
  },
  {
    path: "/members/:id",
    element: <MemberDetail />,
  },
  {
    path: "/members/:id/edit",
    element: <MemberForm type="edit" />,
  },
];

export default MemberRoutes;
