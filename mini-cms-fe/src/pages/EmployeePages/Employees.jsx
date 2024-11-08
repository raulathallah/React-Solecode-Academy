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
  faHistory,
  faList,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { getEmployees } from "../../utils/api/Employees";
import { getDepartmentName } from "../../utils/helpers/HelperFunctions";

const Employees = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const onTryDelete = (empNo) => {
    Swal.fire({
      title: `Are you sure want to delete Employee ${empNo}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `Cancel`,
      customClass: {
        confirmButton: "btn btn-primary",
        denyButton: "btn btn-danger",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(empNo);
      }
    });
  };
  //DELETE EMPLOYEE
  const onDelete = (empNo) => {
    let oldData = list;
    let newData = oldData.filter((val) => val.empNo !== empNo);
    localStorage.setItem("employees", JSON.stringify(newData));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Employee deleted!",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      setList(getEmployees());
      navigate("/employees");
    }, 1500);
  };

  useEffect(() => {
    setList(getEmployees());
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
      <Card.Header>Employee List</Card.Header>
      <Card.Body className="d-grid gap-2">
        <div>
          <ButtonCustom
            icon={<FontAwesomeIcon icon={faPlus} />}
            as={Link}
            to={"/employees/new"}
            size="sm"
          >
            Add Employee
          </ButtonCustom>
        </div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Employee Number</th>
              <th>Name</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{val.empNo}</td>
                <td>{`${val.fName}, ${val.lName}`}</td>
                <td>{getDepartmentName(val.deptNo)}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <OverlayTrigger overlay={<Tooltip>Details</Tooltip>}>
                          <Button
                            as={Link}
                            variant="dark"
                            to={`/employees/${val.empNo}`}
                          >
                            <FontAwesomeIcon icon={faList} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={<Tooltip>Work History</Tooltip>}
                        >
                          <Button
                            as={Link}
                            variant="secondary"
                            to={`/employees/${val.empNo}/history`}
                          >
                            <FontAwesomeIcon icon={faHistory} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                          <Button
                            as={Link}
                            variant="primary"
                            to={`/employees/${val.empNo}/edit`}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            variant="danger"
                            onClick={() => onTryDelete(val.empNo)}
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

export default Employees;
