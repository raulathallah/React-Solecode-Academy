import RequestDetail from "../Pages/Requests/RequestDetail";
import RequestForm from "../Pages/Requests/RequestForm";
import RequestList from "../Pages/Requests/RequestList";

const RequestRoutes = [
  {
    path: "/request",
    element: <RequestList />,
  },
  {
    path: "/request/add",
    element: <RequestForm />,
  },
  {
    path: "/request/:id",
    element: <RequestDetail />,
  },
  {
    path: "/request/:id/detail",
    element: <RequestDetail type={"detail"} />,
  },
];

export default RequestRoutes;
