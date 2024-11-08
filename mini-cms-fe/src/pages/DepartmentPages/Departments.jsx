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
import { getDepartments } from "../../utils/api/Departments";
import { getEmployeeName } from "../../utils/helpers/HelperFunctions";

const Departments = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  //DELETE DEPARTMENTS
  const onDelete = (deptNo) => {
    let oldData = list;
    let newData = oldData.filter((val) => val.deptNo !== deptNo);
    localStorage.setItem("departments", JSON.stringify(newData));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Department deleted!",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      setList(getDepartments());
      navigate("/departments");
    }, 1500);
  };

  useEffect(() => {
    setList(getDepartments());
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
      <Card.Header>Department List</Card.Header>
      <Card.Body className="d-grid gap-2">
        <div>
          <ButtonCustom
            icon={<FontAwesomeIcon icon={faPlus} />}
            as={Link}
            to={"/departments/new"}
            size="sm"
          >
            Add Department
          </ButtonCustom>
        </div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Department Number</th>
              <th>Department Name</th>
              <th>Manager</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{val.deptNo}</td>
                <td>{val.deptName}</td>
                <td>{getEmployeeName(val.mgrEmpNo)}</td>

                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <OverlayTrigger overlay={<Tooltip>Details</Tooltip>}>
                          <Button
                            as={Link}
                            variant="dark"
                            to={`/departments/${val.deptNo}`}
                          >
                            <FontAwesomeIcon icon={faList} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                          <Button
                            as={Link}
                            variant="primary"
                            to={`/departments/${val.deptNo}/edit`}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            variant="danger"
                            onClick={() => onDelete(val.deptNo)}
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

export default Departments;
