import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import Loading from "../../components/Elements/Loading";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../utils/ErrorMessage";

const fetchBookDetail = async ({ id }) => {
  const { data } = await getBook(id);
  return data;
};

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookDetail", id],
    queryFn: () => fetchBookDetail({ id }),
    placeholderData: keepPreviousData,
  });

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return ErrorMessage(error.message);
  }
  return (
    <Card className="w-50">
      <Card.Header>Book Details</Card.Header>
      <Card.Body className="d-grid gap-1 w-75">
        <Row>
          <Col className="text-end text-primary">Title</Col>
          <Col>{data.title}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">Book ID</Col>
          <Col>{data.bookId}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">Author</Col>
          <Col>{data.author}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">Category</Col>
          <Col>{data.category}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">ISBN</Col>
          <Col>{data.isbn}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">Publisher</Col>
          <Col>{data.publisher}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">Language</Col>
          <Col>{data.language}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">Description</Col>
          <Col>{data.description}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">Price</Col>
          <Col>{data.price}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">Stock</Col>
          <Col>{data.stock}</Col>
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
