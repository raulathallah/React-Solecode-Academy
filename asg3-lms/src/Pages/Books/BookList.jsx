/* eslint-disable react/prop-types */
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getBooks } from "../../utils/Books";

const BookList = () => {
  const navigate = useNavigate();

  //DELETE BOOK
  const onDelete = (id) => {
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
              <th style={{ width: "5%" }}>No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getBooks().map((val, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{val.title}</td>
                <td>{val.author}</td>
                <td>{val.category}</td>
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
                          onClick={() => onDelete(val.id)}
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

export default BookList;
