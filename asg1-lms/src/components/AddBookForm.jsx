import { useState } from "react";
import "../styles/AddBookForm.css";
export const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState(1);
  const [year, setYear] = useState("");
  const [isbn, setIsbn] = useState("");

  const categories = [
    {
      categoryId: 1,
      categoryName: "Action",
    },
    {
      categoryId: 2,
      categoryName: "Romance",
    },
    {
      categoryId: 3,
      categoryName: "Fantasy",
    },
    {
      categoryId: 4,
      categoryName: "Sci-Fi",
    },
    {
      categoryId: 5,
      categoryName: "Horror",
    },
  ];

  const onAddBook = () => {
    const body = {
      title: title,
      author: author,
      category: category,
      publicationYear: year,
      isbn: isbn,
    };

    console.log(body);
    alert("Book added!");
  };

  return (
    <div className="content-container">
      <h3>Add Book</h3>
      <div className="form">
        <div className="form-label">
          <label htmlFor="bookTitle">Title</label>
          <label htmlFor="author">Author</label>
          <label htmlFor="category">Category</label>
          <label htmlFor="year">Publication Year</label>
          <label htmlFor="isbn">ISBN</label>
        </div>
        <div className="form-input">
          <input
            type="text"
            id="bookTitle"
            value={title}
            onChange={(v) => setTitle(v.target.value)}
          />
          <input
            type="text"
            id="author"
            value={author}
            onChange={(v) => setAuthor(v.target.value)}
          />

          <select
            id="category"
            onChange={(v) => setCategory(v.target.value)}
            value={category}
          >
            {categories.map((val) => (
              <option key={val.categoryId} value={val.categoryId}>
                {val.categoryName}
              </option>
            ))}
          </select>

          <input
            type="text"
            id="year"
            value={year}
            onChange={(v) => setYear(v.target.value)}
          />
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(v) => setIsbn(v.target.value)}
          />
        </div>
      </div>

      <button className="button" onClick={() => onAddBook()}>
        Submit
      </button>
    </div>
  );
};
