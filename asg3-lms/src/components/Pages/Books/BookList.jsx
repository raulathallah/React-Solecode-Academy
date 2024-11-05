/* eslint-disable react/prop-types */
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { getBooks } from "../../../utils/Books";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const BookList = () => {
  const navigate = useNavigate();

  //DELETE BOOK
  const onDeleteBook = (id) => {
    let oldData = getBooks();
    let newData = oldData.filter((val) => val.id !== id);
    localStorage.setItem("books", JSON.stringify(newData));
    alert("Book Deleted!");
    navigate("/books");
  };
  return (
    <Card>
      <Card.Header>Book List</Card.Header>
      <Card.Body className="d-grid gap-3">
        <div>
          <Button variant="primary" as={Link} to={"/books/add"}>
            Add Book
          </Button>
        </div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Year</th>
              <th>ISBN</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getBooks().map((val, key) => (
              <tr key={key}>
                <td>{val.id}</td>
                <td>{val.title}</td>
                <td>{val.author}</td>
                <td>{val.category}</td>
                <td>{val.year}</td>
                <td>{val.isbn}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          as={Link}
                          variant="secondary"
                          size="sm"
                          to={`/books/${val.id}`}
                        >
                          Details
                        </Button>
                        <Button
                          as={Link}
                          variant="primary"
                          size="sm"
                          to={`/books/${val.id}/edit`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="dark"
                          size="sm"
                          onClick={() => onDeleteBook(val.id)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Row>
                  </Container>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
