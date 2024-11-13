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
import { useEffect, useState } from "react";
import Loading from "../../components/Elements/Loading";
import { deleteUser, getAllUser } from "../../api/Users";

const MemberList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  //DELETE MEMBER
  const onDelete = (id) => {
    deleteUser(
      id,
      (res) => console.log(res),
      (err) => console.log(err)
    );

    setTimeout(() => {
      getAllUser(
        (res) => {
          setList(res.data);
        },
        (err) => {
          console.log(err.message);
        }
      );
    }, 1500);
    alert("Member Deleted!");
    navigate("/members");
  };

  //GET USERS
  useEffect(() => {
    getAllUser(
      (res) => {
        setList(res.data);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);

  useEffect(() => {
    if (list) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [list]);

  return (
    <Card>
      <Card.Header>Member List</Card.Header>
      <Card.Body className="d-grid gap-3">
        <div>
          <Button variant="primary" as={Link} to={"/members/add"}>
            Add Member
          </Button>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>No.</th>
                <th>Username</th>
                <th>Phonenumber</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((val, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.username}</td>
                  <td>{val.phonenumber}</td>
                  <td style={{ width: "20px" }}>
                    <Container>
                      <Row>
                        <ButtonGroup aria-label="Basic example">
                          <Button
                            as={Link}
                            variant="dark"
                            size="sm"
                            to={`/members/${val.userid}`}
                          >
                            Details
                          </Button>
                          <Button
                            as={Link}
                            variant="primary"
                            size="sm"
                            to={`/members/${val.userid}/edit`}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete(val.userid)}
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
        )}
      </Card.Body>
    </Card>
  );
};

export default MemberList;
