import PrivateRoute from "../components/PrivateRoutes";
import BookDetail from "../Pages/Books/BookDetail";
import BookForm from "../Pages/Books/BookForm";
import BookList from "../Pages/Books/BookList";

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
];

export default BookRoutes;
