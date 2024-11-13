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
import { useEffect, useState } from "react";
import Loading from "../../components/Elements/Loading";
import { deleteBook, getAllBook } from "../../api/Books";

const BookList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  //DELETE BOOK
  const onDelete = (id) => {
    deleteBook(
      id,
      (res) => console.log(res),
      (err) => console.log(err)
    );
    setTimeout(() => {
      getAllBook(
        (res) => {
          setList(res.data);
        },
        (err) => {
          console.log(err.message);
        }
      );
    }, 1500);
    alert("Book Deleted!");
    navigate("/books");
  };

  //GET BOOKS
  useEffect(() => {
    getAllBook(
      (res) => {
        setList(res.data);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);

  //SET LOADING STATE
  useEffect(() => {
    if (list) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [list]);

  return (
    <Card>
      <Card.Header>Book List</Card.Header>
      <Card.Body className="d-grid gap-3">
        <div>
          <Button variant="primary" as={Link} to={"/books/add"}>
            Add Book
          </Button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>No.</th>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((val, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.title}</td>
                  <td>{val.author}</td>
                  <td style={{ width: "20px" }}>
                    <Container>
                      <Row>
                        <ButtonGroup aria-label="Basic example">
                          <Button
                            as={Link}
                            variant="dark"
                            size="sm"
                            to={`/books/${val.bookid}`}
                          >
                            Details
                          </Button>
                          <Button
                            as={Link}
                            variant="primary"
                            size="sm"
                            to={`/books/${val.bookid}/edit`}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete(val.bookid)}
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
        )}
      </Card.Body>
    </Card>
  );
};

export default BookList;
