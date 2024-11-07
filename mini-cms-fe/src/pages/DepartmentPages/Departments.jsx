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
import { getDepartments } from "../../utils/Departments";
import Swal from "sweetalert2";
import { getEmployees } from "../../utils/Employees";

const Departments = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
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
    setListEmployee(getEmployees());
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
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{val.deptNo}</td>
                <td>{val.deptName}</td>
                <td>
                  {/** 
                   * {val.mgrEmpNo
                    ? `${
                        listEmployee.find((ld) => ld.empNo === val.mgrEmpNo)
                          .fName
                      }, ${
                        listEmployee.find((ld) => ld.empNo === val.mgrEmpNo)
                          .lName
                      } `
                    : "-"} 
                  */}
                  {val.mgrEmpNo ? val.mgrEmpNo : "-"}
                </td>

                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          as={Link}
                          variant="dark"
                          size="sm"
                          to={`/departments/${val.deptNo}`}
                        >
                          Details
                        </Button>
                        <Button
                          as={Link}
                          variant="primary"
                          size="sm"
                          to={`/departments/${val.deptNo}/edit`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(val.deptNo)}
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

export default Departments;
