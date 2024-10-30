import { useState } from "react";
import { categories } from "../../utils/Categories";
import { BookList } from "./BookList";
import { BookForm } from "./BookForm";
export const Book = () => {
  const [id, setId] = useState(0);
  const [editId, setEditId] = useState(0);
  const [editBool, setEditBool] = useState(false);
  const [newBook, setNewBook] = useState({
    id: id + 1,
    title: "",
    author: "",
    category: categories[0],
    year: new Date().getFullYear(),
    isbn: "",
  });
  const [books, setBooks] = useState([]);

  const clearForm = () => {
    setNewBook({
      id: id,
      title: "",
      author: "",
      category: categories[0],
      year: new Date().getFullYear(),
      isbn: "",
    });
    setEditBool(false);
  };
  const onAddBook = (e) => {
    e.preventDefault();
    let newId = id + 1;
    let bookAddId = { ...newBook, id: newId };
    setBooks([...books, bookAddId]);
    setId(newId);
    alert("Book Added!");
    clearForm();
  };
  const onDeleteBook = (id) => {
    let del = books.filter((val) => val.id !== id);
    setBooks(del);
    alert("Book Deleted!");
    clearForm();
  };
  const onEditBook = (e) => {
    e.preventDefault();
    let updatedBook = { ...newBook, id: editId };
    setBooks(books.map((val) => (val.id === editId ? updatedBook : val)));
    alert("Book Updated!");
    clearForm();
  };
  const openEdit = (book) => {
    setEditId(book.id);
    setNewBook(book);
    setEditBool(true);
  };
  const onCancel = () => {
    setEditId(0);
    clearForm();
  };
  const onChangeValue = (key, e) => {
    setNewBook({
      ...newBook,
      [key]: e.target.value,
    });
  };

  return (
    <>
      <div className="p-3 border my-2">
        {!editBool ? (
          <>
            <h3>Add Book</h3>
            <BookForm
              onAdd={onAddBook}
              onChangeValue={onChangeValue}
              newBook={newBook}
              type="add"
            />
          </>
        ) : (
          <>
            <h3>Edit Book - ID: {editId}</h3>
            <BookForm
              onEdit={onEditBook}
              onChangeValue={onChangeValue}
              newBook={newBook}
              onCancel={onCancel}
              type="edit"
            />
          </>
        )}
      </div>
      <div className="p-3 border my-2">
        <h3>Book List</h3>
        <BookList
          bookList={books}
          onDelete={onDeleteBook}
          openEdit={openEdit}
        />
      </div>
    </>
  );
};
