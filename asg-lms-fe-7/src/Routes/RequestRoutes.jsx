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
];

export default RequestRoutes;
