import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getBooks } from "../../utils/Books";
import Loading from "../../components/Elements/Loading";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (detail) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [detail]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Card>
      <Card.Header>Book Details</Card.Header>
      <Card.Body className="d-grid gap-4">
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>Book ID</Card.Subtitle>
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
          <Col>
            <Card.Subtitle>Availability</Card.Subtitle>
            <Card.Text className="mt-1">
              {detail.isAvailable ? (
                <Badge bg="success">Available</Badge>
              ) : (
                <Badge bg="secondary">Not Available</Badge>
              )}
            </Card.Text>
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
