/* eslint-disable react/prop-types */
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { generateBookId, getBooks } from "../../../utils/Books";
import { categories } from "../../../utils/Categories";

export const BookForm = ({ type }) => {
  const navigate = useNavigate();
  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setNewBook(getBooks().find((val) => val.id === parseInt(id)));
    }
  }, [id]);

  const [newBook, setNewBook] = useState({
    id: 0,
    title: "",
    author: "",
    category: categories[0],
    year: new Date().getFullYear(),
    isbn: "",
  });

  //CLEAR FORM
  const clearForm = () => {
    setNewBook({
      id: 0,
      title: "",
      author: "",
      category: categories[0],
      year: new Date().getFullYear(),
      isbn: "",
    });
  };

  //ADD BOOK
  const onAddBook = (e) => {
    e.preventDefault();
    let bookAddId = { ...newBook, id: generateBookId() };
    let oldData = getBooks();
    let newData = [...oldData, bookAddId];
    localStorage.setItem("books", JSON.stringify(newData));
    alert("Book Added!");
    navigate("/books");
    clearForm();
  };

  //EDIT BOOK
  const onEditBook = (e) => {
    e.preventDefault();
    let oldData = getBooks();
    let updatedBook = { ...newBook, id: parseInt(id) };

    console.log(updatedBook);
    let newData = oldData.map((val) =>
      val.id === parseInt(id) ? updatedBook : val
    );
    localStorage.setItem("books", JSON.stringify(newData));
    alert("Book Updated!");
    navigate("/books");
    clearForm();
  };

  //ON CHANGE VALUE
  const onChangeValue = (key, e) => {
    setNewBook({
      ...newBook,
      [key]: e.target.value,
    });
  };

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };
  return (
    <Card>
      <Form onSubmit={type === "add" ? onAddBook : onEditBook}>
        <Card.Header>{type === "add" ? "Add Book" : "Edit Book"}</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  ref={inputFocus}
                  type="text"
                  required
                  value={newBook.title}
                  size="sm"
                  onChange={(e) => onChangeValue("title", e)}
                />
                <small>test</small>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={newBook.author}
                  size="sm"
                  onChange={(e) => onChangeValue("author", e)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  required
                  onChange={(e) => onChangeValue("category", e)}
                >
                  {categories.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  required
                  max={new Date().getFullYear()}
                  value={newBook.year}
                  size="sm"
                  onChange={(e) => onChangeValue("year", e)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formIsbn">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  value={newBook.isbn}
                  required
                  size="sm"
                  onChange={(e) => onChangeValue("isbn", e)}
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="d-flex justify-content-end">
            {type !== "edit" ? (
              <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button variant="secondary" onClick={onCancel}>
                  Back
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button variant="danger" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Card.Footer>
      </Form>
    </Card>
  );
};
