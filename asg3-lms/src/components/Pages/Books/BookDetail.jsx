import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getBooks } from "../../../utils/Books";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  useEffect(() => {
    if (id) {
      let book = getBooks().find((val) => val.id === parseInt(id));
      setDetail(book);
    }
  }, [id]);
  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };
  return (
    <Card>
      <Card.Header>Book Details</Card.Header>
      <Card.Body className="d-grid gap-4">
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>ID</Card.Subtitle>
            <Card.Text>{detail.id}</Card.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>Title</Card.Subtitle>
            <Card.Text>{detail.title}</Card.Text>
          </Col>
          <Col>
            <Card.Subtitle>Author</Card.Subtitle>
            <Card.Text>{detail.author}</Card.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>Category</Card.Subtitle>
            <Card.Text>{detail.author}</Card.Text>
          </Col>
          <Col>
            <Card.Subtitle>Publication Year</Card.Subtitle>
            <Card.Text>{detail.year}</Card.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>ISBN</Card.Subtitle>
            <Card.Text>{detail.isbn}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div className="d-flex justify-content-start">
          <Button variant="secondary" onClick={onCancel}>
            Back
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default BookDetail;
