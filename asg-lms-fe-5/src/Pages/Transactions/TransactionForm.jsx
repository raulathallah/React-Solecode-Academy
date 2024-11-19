/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { getAllUser } from "../../api/Users";
import { getAllBook } from "../../api/Books";
import { Link } from "react-router-dom";
import { borrowBook, getAllBorrow, returnBook } from "../../api/Transactions";
import Swal from "sweetalert2";
import ErrorMessage from "../../utils/ErrorMessage";

const initialValue = {
  userId: 0,
  bookId: [],
};
const initialError = {
  userId: "",
  bookId: "",
};

const TransactionForm = ({ type }) => {
  const inputFocus = useRef(null);
  const [borrowReturn, setBorrowReturn] = useState(initialValue);
  const [errors, setErrors] = useState(initialError);
  const [listUser, setListUser] = useState([]);
  const [listBook, setListBook] = useState([]);
  const [listBorrow, setListBorrow] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);

  //GET USERS
  useEffect(() => {
    getAllUser(
      (res) => {
        setListUser(res.data);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);

  //GET BOOKS
  useEffect(() => {
    getAllBook(
      (res) => {
        setListBook(res.data);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);

  useEffect(() => {
    if (type !== "borrow") {
      getAllBorrow(
        (res) => {
          setListBorrow(res.data);
        },
        (err) => {
          console.log(err.message);
        }
      );
    }
  }, [borrowReturn.userId, type]);

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };
  const onBorrow = (e) => {
    e.preventDefault();
    let valid = Validate(borrowReturn);
    if (valid) {
      borrowBook(
        borrowReturn,
        (res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Book borrowed!",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              navigate("/transactions");
            }, 1500);
          }
        },
        (err) => {
          ErrorMessage(err.message);
        }
      );
    }
  };

  const onReturn = (e) => {
    e.preventDefault();
    let valid = Validate(borrowReturn);
    if (valid) {
      returnBook(
        borrowReturn,
        (res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Book returned!",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              navigate("/transactions");
            }, 1500);
          }
        },
        (err) => {
          ErrorMessage(err.message);
        }
      );
    }
  };

  //VALIDATION BOOK
  const Validate = (body) => {
    let errorMessages = {};

    //-- member
    if (!body.userId) {
      errorMessages.userId = "Member must be filled!";
    }

    //-- books
    if (body.bookId.length === 0) {
      errorMessages.bookId = "No Book selected!";
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

  const onAddBookId = (value, checked) => {
    let books = [];
    if (checked) {
      books = [...borrowReturn.bookId, value.bookid];
    } else {
      books = borrowReturn.bookId.filter((x) => x !== value.bookid);
    }
    setBorrowReturn({ ...borrowReturn, bookId: books });
  };
  const displayBookName = (bookId) => {
    let book = listBook.find((x) => x.bookid === bookId);

    if (!book) {
      return "BOOK NOT FOUND";
    }

    return book.title;
  };

  const displayMemberName = (userId) => {
    let user = listUser.find((x) => x.userid === userId);
    console.log(listUser);
    if (!user) {
      return "USER NOT FOUND";
    }

    return user.username;
  };
  return (
    <Card>
      <Form onSubmit={type === "borrow" ? onBorrow : onReturn}>
        <Card.Header>
          {type === "borrow" ? "Book Borrow" : "Book Return"}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formTitle">
                <Form.Label className="fw-semibold">Member</Form.Label>
                <Form.Select
                  ref={inputFocus}
                  type="text"
                  value={borrowReturn.userId}
                  size="sm"
                  onChange={(e) =>
                    setBorrowReturn({
                      ...borrowReturn,
                      userId: parseInt(e.target.value),
                    })
                  }
                  isInvalid={errors.userId}
                >
                  <option disabled hidden value={0}>
                    --- select user ---
                  </option>
                  {listUser.map((val) => (
                    <option key={val.userid} value={val.userid}>
                      {val.username}
                    </option>
                  ))}
                </Form.Select>
                {errors.userId && <small>{errors.userId}</small>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Label className="fw-semibold">
              {type === "borrow" ? "Books" : "Transactions"}
            </Form.Label>
            {errors.bookId && <small>{errors.bookId}</small>}

            {type !== "borrow" ? (
              <Table striped bordered hover responsive="sm">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}></th>
                    <th>Transaction ID</th>
                    <th>Member</th>
                    <th>Book</th>
                    <th>Borrow Date</th>
                    <th>Expired Date</th>
                    <th>Return Date</th>
                  </tr>
                </thead>
                <tbody>
                  {listBorrow
                    .filter((x) => x.userid === borrowReturn.userId)
                    .filter((x) => !x.isreturned)
                    .map((val, key) => (
                      <tr key={key}>
                        <td className="">
                          <Form.Check
                            inline
                            disabled={false}
                            name="group1"
                            type={"checkbox"}
                            onChange={(e) => onAddBookId(val, e.target.checked)}
                            id={key}
                          />
                        </td>
                        <td>{val.transactionid}</td>
                        <td>{displayMemberName(val.userid)}</td>
                        <td>{displayBookName(val.bookid)}</td>
                        <td>{val.borrowdate}</td>
                        <td>{val.borrowexpired}</td>
                        <td>{val.returndate}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            ) : (
              <Table striped bordered hover responsive="sm">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}></th>
                    <th style={{ width: "5%" }}>No.</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listBook.map((val, key) => (
                    <tr key={key}>
                      <td className="">
                        <Form.Check
                          inline
                          disabled={
                            !borrowReturn.bookId.find(
                              (x) => x === val.bookid
                            ) && borrowReturn.bookId.length >= 3
                          }
                          name="group1"
                          type={"checkbox"}
                          onChange={(e) => onAddBookId(val, e.target.checked)}
                          id={key}
                        />
                      </td>

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
                            </ButtonGroup>
                          </Row>
                        </Container>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Row>
        </Card.Body>

        <Card.Footer className="text-muted">
          <div className="d-flex justify-content-end">
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Submit {type === "borrow" ? "Borrow" : "Return"}
              </Button>
              <Button variant="danger" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default TransactionForm;
