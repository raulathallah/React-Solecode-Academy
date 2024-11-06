import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Layouts from "../components/Layouts/Layouts";
import BookRoutes from "./BookRoutes";
import MemberRoutes from "./MemberRoutes";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      ...BookRoutes,
      ...MemberRoutes,
    ],
  },
]);
