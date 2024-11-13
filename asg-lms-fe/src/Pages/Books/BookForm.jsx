/* eslint-disable react/prop-types */
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { addBook, getAllBook, getBook, updateBook } from "../../api/Books";
import Loading from "../../components/Elements/Loading";

const initialValue = {
  title: "",
  author: "",
  publicationyear: new Date().getFullYear(),
  isbn: "",
};

const initialError = {
  title: "",
  author: "",
  publicationyear: "",
  isbn: "",
};

const BookForm = ({ type }) => {
  const navigate = useNavigate();
  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);
  const { id } = useParams();

  const [errors, setErrors] = useState(initialError);
  const [newBook, setNewBook] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  //GET BOOK
  useEffect(() => {
    if (id) {
      getBook(
        id,
        (res) => {
          setNewBook(res.data);
        },
        (err) => {
          console.log(err.message);
        }
      );
    }
  }, [id]);

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

  //CLEAR FORM
  const clearForm = () => {
    setNewBook(initialValue);
  };

  //ADD BOOK
  const onAdd = (e) => {
    e.preventDefault();
    let valid = ValidateBook(list, newBook);
    if (valid) {
      addBook(
        newBook,
        (res) => console.log(res),
        (err) => console.log(err)
      );
      alert("Book Added!");
      navigate("/books");
      clearForm();
    }
  };

  //VALIDATION BOOK
  const ValidateBook = (oldData, book) => {
    let errorMessages = {};
    let yearNow = new Date().getFullYear();
    //-- isbn
    if (!book.isbn) {
      errorMessages.isbn = "ISBN must be filled!";
    } else if (
      book.isbn.length < 10 ||
      book.isbn.length > 13 ||
      typeof parseInt(book.isbn) !== typeof 0
    ) {
      errorMessages.isbn = `Must be a valid ISBN number! (10-13 Number)`;
    } else if (oldData.find((x) => x.isbn === book.isbn)) {
      errorMessages.isbn = `Book with ${book.isbn} already exist!`;
    }

    //-- title
    if (!book.title) {
      errorMessages.title = "Title must be filled!";
    } else if (book.title.length < 3) {
      errorMessages.title = "Title must be 3 character minimum!";
    }

    //-- year
    if (!book.publicationyear) {
      errorMessages.publicationyear = "Publication year must be filled!";
    } else if (book.publicationyear < 1900 || book.publicationyear > yearNow) {
      errorMessages.publicationyear = `Must be a valid year! (1900-${yearNow})`;
    }

    //-- author
    if (!book.author) {
      errorMessages.author = "Author must be filled!";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    return formValid;
  };

  //EDIT BOOK
  const onEdit = (e) => {
    e.preventDefault();
    updateBook(
      id,
      newBook,
      (res) => console.log(res),
      (err) => console.log(err)
    );
    alert("Book Updated!");
    navigate("/books");
    clearForm();
  };

  //ON CHANGE VALUE
  const onChangeValue = (key, e) => {
    if (e.target.type === "checkbox") {
      setNewBook({
        ...newBook,
        [key]: e.target.checked,
      });
    } else {
      setNewBook({
        ...newBook,
        [key]: e.target.value,
      });
    }
  };

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  //SET LOADING STATE
  useEffect(() => {
    if (newBook || list) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [newBook, list]);

  return (
    <Card>
      <Form onSubmit={type === "add" ? onAdd : onEdit}>
        <Card.Header>{type === "add" ? "Add Book" : "Edit Book"}</Card.Header>
        {loading ? (
          <Loading />
        ) : (
          <Card.Body>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label className="fw-semibold">Title</Form.Label>
                  <Form.Control
                    ref={inputFocus}
                    type="text"
                    value={newBook.title}
                    size="sm"
                    onChange={(e) => onChangeValue("title", e)}
                    isInvalid={errors.title}
                  />
                  {errors.title && <small>{errors.title}</small>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formAuthor">
                  <Form.Label className="fw-semibold">Author</Form.Label>
                  <Form.Control
                    type="text"
                    value={newBook.author}
                    size="sm"
                    onChange={(e) => onChangeValue("author", e)}
                    isInvalid={errors.author}
                  />
                  {errors.author && <small>{errors.author}</small>}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formYear">
                  <Form.Label className="fw-semibold">Year</Form.Label>
                  <Form.Control
                    type="number"
                    value={newBook.publicationyear}
                    size="sm"
                    onChange={(e) => onChangeValue("publicationyear", e)}
                    isInvalid={errors.publicationyear}
                  />
                  {errors.publicationyear && (
                    <small>{errors.publicationyear}</small>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formIsbn">
                  <Form.Label className="fw-semibold">ISBN</Form.Label>
                  <Form.Control
                    type="text"
                    value={newBook.isbn}
                    size="sm"
                    onChange={(e) => onChangeValue("isbn", e)}
                    isInvalid={errors.isbn}
                  />
                  {errors.isbn && <small>{errors.isbn}</small>}
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        )}

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

export default BookForm;
