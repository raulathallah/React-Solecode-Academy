import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import blankpp from "../../assets/blankpp.png";
import { Button, Card, Col, Row } from "react-bootstrap";
import { logout } from "../../api/slices/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user) {
      setUserData(user.user);
    }
  }, [user]);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="d-flex gap-5">
      <img src={blankpp} style={{ height: "200px" }} />
      <div className="w-100">
        <Card className="">
          <Card.Header>Profile</Card.Header>
          <Card.Body className="d-grid gap-1 w-75">
            <Row>
              <Col className="text-primary">ID</Col>
              <Col>{userData?.userId}</Col>
            </Row>
            <Row>
              <Col className="text-primary">First</Col>
              <Col>{userData?.fName}</Col>
            </Row>
            <Row>
              <Col className="text-primary">Last</Col>
              <Col>{userData?.lName}</Col>
            </Row>
            <Row>
              <Col className="text-primary">Position</Col>
              <Col>{userData?.userPosition}</Col>
            </Row>
            <Row>
              <Col className="text-primary">Privilage</Col>
              <Col>{userData?.userPrivilage}</Col>
            </Row>

            <Row>
              <Col className="text-primary">Library Card Number</Col>
              <Col>{userData?.libraryCardNumber}</Col>
            </Row>
            <Row>
              <Col className="text-primary">Library Card Expired Date</Col>
              <Col>
                {userData?.libraryCardNumber &&
                  userData?.libraryCardExpiredDate}
              </Col>
            </Row>
            <Row>
              <Col className="text-primary">Notes</Col>
              <Col>{userData?.userNotes}</Col>
            </Row>
          </Card.Body>
        </Card>

        <Button variant="secondary" className="mt-2" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
