import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAllBook } from "../../api/services/Books";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { bookRequest } from "../../api/services/Transactions";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "../../components/Elements/Loading";
import ErrorMessage from "../../utils/ErrorMessage";

const initialValue = {
  title: "",
  author: "",
  publisher: "",
  isbn: "",
  startDate: "",
  endDate: null,
  //locationId: 1,
  notes: "",
};

const initialError = {
  bookId: "",
  startDate: "",
  endDate: "",
  //locationId: "",
  notes: "",
};
const fetchAllBook = async () => {
  const { data } = await getAllBook();
  return data;
};
const RequestForm = () => {
  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const userData = user?.user;

  const [newRequest, setNewRequest] = useState(initialValue);
  const [errors, setErrors] = useState(initialError);
  const [bookId, setBookId] = useState(0);
  const [loading, setLoading] = useState(false);

  const onCancel = () => {
    navigate(-1);
  };

  const [list, setList] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: () => fetchAllBook(),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  useEffect(() => {
    if (bookId) {
      let b = list.find((e) => e.bookId === parseInt(bookId));
      setNewRequest({
        ...newRequest,
        title: b.title,
        author: b.author,
        isbn: b.isbn,
        publisher: b.publisher,
      });
    }
  }, [bookId]);

  const onRequest = (e) => {
    e.preventDefault();

    let valid = Validate();
    if (valid) {
      toast.info("Please wait...");
      setLoading(true);
      bookRequest(newRequest).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Book requested!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/books/search");
          }, 1500);
        } else {
          if (res.message) {
            ErrorMessage(res.message);
          }
        }
        setLoading(false);
      });
    }
  };

  const Validate = () => {
    let errorMessages = {};
    if (!newRequest.startDate) {
      errorMessages.startDate = "Request Date must be filled!";
    }
    if (!bookId) {
      errorMessages.bookId = "Book must be filled!";
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

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <Card>
      <Form onSubmit={onRequest}>
        <Card.Header>Request Book</Card.Header>
        <Card.Body className="d-grid gap-2">
          <Form.Group as={Row} controlId="formRequester">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Requester</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Control
                type="text"
                value={`${userData?.fName} ${userData?.lName}`}
                size="sm"
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formRequestDate">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Request Date</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Control
                type="date"
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, startDate: e.target.value })
                }
                isInvalid={errors.startDate}
                value={newRequest.startDate}
                size="sm"
              />
              {errors.startDate && <small>{errors.startDate}</small>}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formBook">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Book</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Select
                isInvalid={errors.bookId}
                onChange={(e) => setBookId(e.target.value)}
                value={bookId}
                size="sm"
              >
                <option disabled value={0}>
                  --- select book ---
                </option>
                {list &&
                  list.map((val) => (
                    <option key={val.bookId} value={val.bookId}>
                      {`${val.bookId} - ${val.title}`}
                    </option>
                  ))}
              </Form.Select>
              {errors.bookId && <small>{errors.bookId}</small>}
            </Col>

            {/* {errors.deptno && <small>{errors.deptno}</small>} */}
          </Form.Group>
          <Form.Group as={Row}>
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Title</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Text>{newRequest.title}</Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Author</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Text>{newRequest.author}</Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Publisher</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Text>{newRequest.publisher}</Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Isbn</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Text>{newRequest.isbn}</Form.Text>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formNotes">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Notes (Optional)</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Text
                as={"textarea"}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, notes: e.target.value })
                }
                value={newRequest.notes}
                cols={44}
                rows={6}
              />
            </Col>

            {/* {errors.deptno && <small>{errors.deptno}</small>} */}
          </Form.Group>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Back
            </Button>
          </div>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default RequestForm;
