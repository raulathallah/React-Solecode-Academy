import PrivateRoute from "../components/PrivateRoutes";
import BookDetail from "../Pages/Books/BookDetail";
import BookForm from "../Pages/Books/BookForm";
import BookList from "../Pages/Books/BookList";
import BookReport from "../Pages/Books/BookReport";
import BookSearch from "../Pages/Books/BookSearch";

const BookRoutes = [
  {
    // {/* Route Khusus Librarian */}
    element: <PrivateRoute allowedRoles={["Librarian"]} />,
    children: [
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
  {
    // {/* Route Khusus Librarian */}
    element: <PrivateRoute allowedRoles={["Library User", "Librarian"]} />,
    children: [
      {
        path: "/books/search",
        element: <BookSearch />,
      },
    ],
  },
  {
    path: "/books/report",
    element: <BookReport />,
  },
];

export default BookRoutes;
