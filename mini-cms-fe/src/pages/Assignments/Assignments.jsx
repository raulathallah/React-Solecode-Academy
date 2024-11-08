import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Elements/Loading";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { getEmployees } from "../../utils/api/Employees";
import { getProjects } from "../../utils/api/Projects";
import { getWorksOn } from "../../utils/api/WorksOns";

const Assignments = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  //DELETE WORKS ON
  const onDelete = (empNo, projNo) => {
    let oldData = list;
    let newData = oldData.filter((val) => val.projNo !== projNo);
    localStorage.setItem("worksOns", JSON.stringify(newData));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Assignment deleted!",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      setList(getWorksOn());
      navigate("/assignments");
    }, 1500);
  };

  useEffect(() => {
    setList(getWorksOn());
  }, []);

  useEffect(() => {
    if (list) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [list]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Card>
      <Card.Header>Assignment List</Card.Header>
      <Card.Body className="d-grid gap-2">
        <div>
          <ButtonCustom
            icon={<FontAwesomeIcon icon={faPlus} />}
            as={Link}
            to={"/assignments/new"}
            size="sm"
          >
            Add Assignments
          </ButtonCustom>
        </div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Employee Number</th>
              <th>Project Number</th>
              <th>Date Worked</th>
              <th>Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{val.empNo}</td>
                <td>{val.projNo}</td>
                <td>{val.dateWorked}</td>
                <td>{val.hoursWorked}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          as={Link}
                          variant="dark"
                          size="sm"
                          to={`/assignments/${val.empNo}/${val.projNo}`}
                        >
                          Details
                        </Button>
                        <Button
                          as={Link}
                          variant="primary"
                          size="sm"
                          to={`/assignments/${val.empNo}/${val.projNo}/edit`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(val.empNo, val.projNo)}
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

export default Assignments;
