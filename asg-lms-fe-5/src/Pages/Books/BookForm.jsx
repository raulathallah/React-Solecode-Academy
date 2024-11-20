/* eslint-disable react/prop-types */
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { addBook, getAllBook, getBook, updateBook } from "../../api/Books";
import Loading from "../../components/Elements/Loading";
import Swal from "sweetalert2";
import ErrorMessage from "../../utils/ErrorMessage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const initialValue = {
  title: "",
  category: "",
  publisher: "",
  author: "",
  isbn: "",
  description: "",
  stock: 1,
  price: 1000,
  language: "",
};

const initialError = {
  title: "",
  category: "",
  publisher: "",
  author: "",
  isbn: "",
  description: "",
  stock: "",
  price: "",
  language: "",
};

const bookCategories = [
  "Science Fiction",
  "Science",
  "Fiction",
  "Cooking",
  "Mystery",
  "Business",
  "Psychology",
  "Art",
  "Adventure",
  "Biography",
  "Technology",
  "Sports",
  "Self-Help",
  "Fantasy",
  "History",
];

const bookPublishers = [
  "Galaxy Books",
  "Oceanic Publishing",
  "Fiction House",
  "Gramedia",
];

const bookLanguages = ["English", "French", "Spanish"];

const fetchBookDetail = async ({ id }) => {
  const { data } = await getBook(id);
  return data;
};

const fetchAllBooks = async () => {
  const { data } = await getAllBook();

  return data;
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

  const { data: books } = useQuery({
    queryKey: ["allBooks"],
    queryFn: () => fetchAllBooks(),
    placeholderData: keepPreviousData,
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookDetail", id],
    queryFn: () => (id ? fetchBookDetail({ id }) : null),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      setNewBook(data);
    }
  }, [data]);

  //CLEAR FORM
  const clearForm = () => {
    setNewBook(initialValue);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return ErrorMessage("Get detail failed!");
  }

  //ADD BOOK
  const onAdd = (e) => {
    e.preventDefault();
    let valid = ValidateBook(books, newBook);
    if (valid) {
      addBook(newBook).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Book added!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/books");
          }, 1500);
        } else {
          if (res.message) {
            ErrorMessage(res.message);
          }
        }
      });
      //clearForm();
    }
  };

  //EDIT BOOK
  const onEdit = (e) => {
    e.preventDefault();
    let valid = ValidateBook(books, newBook);
    if (valid) {
      updateBook(id, newBook).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Book updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            clearForm();
            navigate("/books");
          }, 1500);
        } else {
          if (res.message) {
            ErrorMessage(res.message);
          }
        }
      });
    }
  };

  //VALIDATION BOOK
  const ValidateBook = (oldData, book) => {
    let errorMessages = {};
    //-- isbn
    if (!book.isbn) {
      errorMessages.isbn = "ISBN must be filled!";
    }

    /*
    else if (
      book.isbn.length < 10 ||
      book.isbn.length > 13 ||
      typeof parseInt(book.isbn) !== typeof 0
    ) {
      errorMessages.isbn = `Must be a valid ISBN number! (10-13 Number)`;
    } else if (
      oldData
        .filter((f) => f.isbn !== data.isbn)
        .find((x) => x.isbn === book.isbn)
    ) {
      errorMessages.isbn = `Book with ${book.isbn} already exist!`;
    }
      */

    //-- title
    if (!book.title) {
      errorMessages.title = "Title must be filled!";
    } else if (book.title.length < 3) {
      errorMessages.title = "Title must be 3 character minimum!";
    }

    //-- author
    if (!book.author) {
      errorMessages.author = "Author must be filled!";
    }

    //-- category
    if (!book.category) {
      errorMessages.category = "Category must be filled!";
    }

    //-- language
    if (!book.language) {
      errorMessages.language = "Language must be filled!";
    }

    //-- publisher
    if (!book.publisher) {
      errorMessages.publisher = "Publisher must be filled!";
    }

    //-- description
    if (!book.description) {
      errorMessages.description = "Description must be filled!";
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

  return (
    <Card>
      <Form onSubmit={type === "add" ? onAdd : onEdit}>
        <Card.Header>{type === "add" ? "Add Book" : "Edit Book"}</Card.Header>
        <Card.Body className="d-grid gap-2">
          <Form.Group as={Row} controlId="formTitle">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Title</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Control
                ref={inputFocus}
                type="text"
                value={newBook.title}
                size="sm"
                onChange={(e) => onChangeValue("title", e)}
                isInvalid={errors.title}
              />
              {errors.title && <small>{errors.title}</small>}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formCategory">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Category</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Select
                size="sm"
                value={newBook.category}
                onChange={(e) => onChangeValue("category", e)}
                isInvalid={errors.category}
              >
                <option value="" disabled hidden></option>
                {bookCategories.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Select>
              {errors.category && <small>{errors.category}</small>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formLanguage">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Language</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Select
                size="sm"
                value={newBook.language}
                onChange={(e) => onChangeValue("language", e)}
                isInvalid={errors.language}
              >
                <option value="" disabled hidden></option>
                {bookLanguages.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Select>
              {errors.language && <small>{errors.language}</small>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formAuthor">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Author</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Control
                type="text"
                value={newBook.author}
                size="sm"
                onChange={(e) => onChangeValue("author", e)}
                isInvalid={errors.author}
              />
              {errors.author && <small>{errors.author}</small>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPublisher">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Publisher</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Select
                size="sm"
                value={newBook.publisher}
                onChange={(e) => onChangeValue("publisher", e)}
                isInvalid={errors.publisher}
              >
                <option value="" disabled hidden></option>
                {bookPublishers.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Select>
              {errors.publisher && <small>{errors.publisher}</small>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formIsbn">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">ISBN</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Control
                type="text"
                value={newBook.isbn}
                size="sm"
                onChange={(e) => onChangeValue("isbn", e)}
                isInvalid={errors.isbn}
              />
              {errors.isbn && <small>{errors.isbn}</small>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDescription">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Description</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Control
                as={"textarea"}
                type="text"
                rows={5}
                maxLength={200}
                value={newBook.description}
                size="sm"
                onChange={(e) => onChangeValue("description", e)}
                isInvalid={errors.description}
              />
              <p>{newBook.description.length}/200</p>
              {errors.description && <small>{errors.description}</small>}
            </Col>
          </Form.Group>
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

export default BookForm;
