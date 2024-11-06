/* eslint-disable react/prop-types */
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getMembers } from "../../utils/Members";
import { useEffect, useState } from "react";
import Loading from "../../components/Elements/Loading";

const MemberList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  //DELETE MEMBER
  const onDelete = (id) => {
    let oldData = getMembers();
    let newData = oldData.filter((val) => val.id !== id);
    localStorage.setItem("members", JSON.stringify(newData));
    alert("Member Deleted!");
    navigate("/members");
  };
  useEffect(() => {
    setList(getMembers());
  }, []);

  useEffect(() => {
    if (list) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [list]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Card>
      <Card.Header>Member List</Card.Header>
      <Card.Body className="d-grid gap-3">
        <div>
          <Button variant="primary" as={Link} to={"/members/add"}>
            Add Member
          </Button>
        </div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>No.</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{val.fullName}</td>
                <td>{val.email}</td>
                <td>{val.gender}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          as={Link}
                          variant="dark"
                          size="sm"
                          to={`/members/${val.id}`}
                        >
                          Details
                        </Button>
                        <Button
                          as={Link}
                          variant="primary"
                          size="sm"
                          to={`/members/${val.id}/edit`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(val.id)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Row>
                  </Container>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default MemberList;
