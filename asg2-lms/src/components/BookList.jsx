import "../styles/BookList.css";
export const BookList = () => {
  const books = [
    {
      title: "Adventure Cross",
      author: "Andy Arnold",
      category: "Action",
      publicationYear: "2024",
      isbn: "99997766551",
    },
    {
      title: "Youth School",
      author: "Benny Bory",
      category: "Romance",
      publicationYear: "2021",
      isbn: "99997766552",
    },
    {
      title: "Magic Land",
      author: "Cecilia Cherry",
      category: "Fantasy",
      publicationYear: "2021",
      isbn: "99997766553",
    },
    {
      title: "Destruction",
      author: "Doni Daniel",
      category: "Sci-Fi",
      publicationYear: "2016",
      isbn: "99997766554",
    },
    {
      title: "Escape",
      author: "Erwin Stephen",
      category: "Horror",
      publicationYear: "2012",
      isbn: "99997766555",
    },
  ];
  return (
    <div className="content-container">
      <h3>Book List</h3>
      <table>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Year</th>
          <th>ISBN</th>
          <th>Action</th>
        </tr>
        {books.map((val, key) => (
          <tr key={key}>
            <td>{val.title}</td>
            <td>{val.author}</td>
            <td>{val.category}</td>
            <td>{val.publicationYear}</td>
            <td>{val.isbn}</td>
            <td className="bl-action">
              <button style={{ padding: "5px" }}>Edit</button>
              <button style={{ padding: "5px" }}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
