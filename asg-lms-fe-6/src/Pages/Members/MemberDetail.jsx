import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import Loading from "../../components/Elements/Loading";
import { getUser } from "../../api/services/Users";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../utils/ErrorMessage";

const fetchUserDetail = async ({ id }) => {
  const { data } = await getUser(id);
  return data;
};

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userDetail", id],
    queryFn: () => fetchUserDetail({ id }),
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
      <Card.Header>Member Details</Card.Header>

      <Card.Body className="d-grid gap-1 w-75">
        <Row>
          <Col className="text-end text-primary">First</Col>
          <Col>{data.fName}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">Last</Col>
          <Col>{data.lName}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">User ID</Col>
          <Col>{data.userId}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">User Position</Col>
          <Col>{data.userPosition}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">Library Card Number</Col>
          <Col>{data.libraryCardNumber}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">Library Card Expired Date</Col>
          <Col>{data.libraryCardExpiredDate}</Col>
        </Row>
        <Row>
          <Col className="text-end text-primary">User Notes</Col>
          <Col>{data.userNotes}</Col>
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

export default MemberDetail;
