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
import { getEmployees } from "../../utils/Employees";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getDepartments } from "../../utils/Departments";
import Swal from "sweetalert2";

const Employees = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setListDepartment(getDepartments());
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
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{val.empNo}</td>
                <td>{`${val.fName}, ${val.lName}`}</td>
                <td>
                  {/** {val.deptNo
                    ? listDepartment.find((ld) => ld.deptNo === val.deptNo)
                        .deptName
                    : "-"} */}
                  {val.deptNo ? val.deptNo : "-"}
                </td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          as={Link}
                          variant="dark"
                          size="sm"
                          to={`/employees/${val.empNo}`}
                        >
                          Details
                        </Button>
                        <Button
                          as={Link}
                          variant="primary"
                          size="sm"
                          to={`/employees/${val.empNo}/edit`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(val.empNo)}
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

export default Employees;
