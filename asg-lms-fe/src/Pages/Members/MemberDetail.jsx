import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import Loading from "../../components/Elements/Loading";
import { getUser } from "../../api/Users";

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  //GET USER
  useEffect(() => {
    if (id) {
      getUser(
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

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (detail) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [detail]);

  return (
    <Card>
      <Card.Header>Member Details</Card.Header>

      {loading ? (
        <Loading />
      ) : (
        <Card.Body className="d-grid gap-4">
          <Row className="mb-3">
            <Col>
              <Card.Subtitle>Member ID</Card.Subtitle>
              <Card.Text>{detail.userid}</Card.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Card.Subtitle>Username</Card.Subtitle>
              <Card.Text>{detail.username}</Card.Text>
            </Col>
            <Col>
              <Card.Subtitle>Phone</Card.Subtitle>
              <Card.Text>{detail.phonenumber}</Card.Text>
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

export default MemberDetail;
