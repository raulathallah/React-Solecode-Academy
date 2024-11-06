import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getMembers } from "../../utils/Members";
import Loading from "../../components/Elements/Loading";

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      let member = getMembers().find((val) => val.id === parseInt(id));
      setDetail(member);
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
      <Card.Header>Member Details</Card.Header>
      <Card.Body className="d-grid gap-4">
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>Member ID</Card.Subtitle>
            <Card.Text>{detail.id}</Card.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>Full Name</Card.Subtitle>
            <Card.Text>{detail.fullName}</Card.Text>
          </Col>
          <Col>
            <Card.Subtitle>Email</Card.Subtitle>
            <Card.Text>{detail.email}</Card.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>Gender</Card.Subtitle>
            <Card.Text>{detail.gender}</Card.Text>
          </Col>
          <Col>
            <Card.Subtitle>Phone</Card.Subtitle>
            <Card.Text>{detail.phone}</Card.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>Address</Card.Subtitle>
            <Card.Text>{detail.address}</Card.Text>
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

export default MemberDetail;
