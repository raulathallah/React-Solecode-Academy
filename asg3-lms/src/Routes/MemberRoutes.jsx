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
];

export default MemberRoutes;
