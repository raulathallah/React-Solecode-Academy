import { createBrowserRouter } from "react-router-dom";
import Layouts from "../components/Layouts/Layouts";
import BookRoutes from "./BookRoutes";
import MemberRoutes from "./MemberRoutes";
import Home from "../Pages/Home";
import TransactionRoutes from "./TransactionRoutes";
import InfiniteScrollList from "../Pages/Books/InfiniteScrollList";

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
      ...TransactionRoutes,
    ],
  },
  {
    path: "/infinite",
    element: <InfiniteScrollList />,
  },
]);
