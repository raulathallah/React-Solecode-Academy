import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const initialValue = {
  title: "",
  author: "",
  publisher: "",
  isbn: "",
  startDate: "",
  endDate: "",
  locationId: 0,
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

  const onCancel = () => {
    navigate(-1);
  };
  console.log(user);
  return (
    <Card>
      <Form onSubmit={null}>
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
                type="text"
                value={`${userData?.fName} ${userData?.lName}`}
                size="sm"
                disabled
              />
            </Col>
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
