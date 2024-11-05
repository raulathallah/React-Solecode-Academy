import { createBrowserRouter } from "react-router-dom";
import { BookList } from "./components/Pages/Books/BookList";
import { BookForm } from "./components/Pages/Books/BookForm";
import Home from "./components/Home";
import Layouts from "./components/Layouts/Layouts";
import BookDetail from "./components/Pages/Books/BookDetail";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <BookList />,
      },
      {
        path: "/books/add",
        element: <BookForm type="add" />,
      },
      {
        path: "/books/:id",
        element: <BookDetail />,
      },
      {
        path: "/books/:id/edit",
        element: <BookForm type="edit" />,
      },
    ],
  },
]);
