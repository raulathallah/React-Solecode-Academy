import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import Loading from "../../components/Elements/Loading";
import { getBook } from "../../api/Books";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  //GET BOOK
  useEffect(() => {
    if (id) {
      getBook(
        id,
        (res) => {
          setDetail(res.data);
        },
        (err) => {
          console.log(err.message);
        }
      );
    }
  }, [id]);

  //SET LOADING STATE
  useEffect(() => {
    if (detail) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [detail]);

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

  return (
    <Card>
      <Card.Header>Book Details</Card.Header>
      {loading ? (
        <Loading />
      ) : (
        <Card.Body className="d-grid gap-4">
          <Row className="mb-3">
            <Col>
              <Card.Subtitle>Book ID</Card.Subtitle>
              <Card.Text>{detail.bookid}</Card.Text>
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
              <Card.Subtitle>Publication Year</Card.Subtitle>
              <Card.Text>{detail.publicationyear}</Card.Text>
            </Col>
            <Col>
              <Card.Subtitle>ISBN</Card.Subtitle>
              <Card.Text>{detail.isbn}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      )}

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
