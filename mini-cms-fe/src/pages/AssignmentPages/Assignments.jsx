import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Elements/Loading";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faList,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { getWorksOn } from "../../utils/api/WorksOns";
import {
  getEmployeeName,
  getProjectName,
} from "../../utils/helpers/HelperFunctions";

const Assignments = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  //DELETE WORKS ON
  const onDelete = (worksOn) => {
    let newData = list.filter((val) => val !== worksOn);
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
              <th>Employee</th>
              <th>Project</th>
              <th>Date Worked</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{getEmployeeName(val.empNo)}</td>
                <td>{getProjectName(val.projNo)}</td>
                <td>{val.dateWorked}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <OverlayTrigger overlay={<Tooltip>Detail</Tooltip>}>
                          <Button
                            as={Link}
                            variant="dark"
                            to={`/assignments/${val.empNo}/${val.projNo}/${val.dateWorked}`}
                          >
                            <FontAwesomeIcon icon={faList} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                          <Button
                            as={Link}
                            variant="primary"
                            to={`/assignments/${val.empNo}/${val.projNo}/edit`}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            variant="danger"
                            onClick={() => onDelete(val)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </OverlayTrigger>
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
