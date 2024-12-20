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
import { deleteEmployee, getEmployeePaginate } from "../../api/Employee";
import PaginationCustom from "../../components/Elements/PaginationCustom";
import { getAllDepartment } from "../../api/Department";
import { getDepartmentName } from "../../utils/helpers/HelperFunctions";

const Employees = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listDepartment, setListDepartment] = useState(true);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const onTryDelete = (empNo) => {
    Swal.fire({
      title: `Are you sure want to delete Employee?`,
      text: `Employee Number: ${empNo}`,
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
    deleteEmployee(empNo)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Employee deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(true);
        }
      })
      .finally(() => {
        setTimeout(() => {
          getEmployeePaginate(page, perPage)
            .then((res) => {
              if (res.status === 200) {
                setList(res.data);
              } else {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: res.message,
                  showConfirmButton: true,
                });
              }
            })
            .finally(() => setLoading(false));
          navigate("/employees");
        }, 1500);
      });
  };

  useEffect(() => {
    getAllDepartment().then((res) => {
      if (res.status === 200) {
        setListDepartment(res.data);
      }
    });
  }, []);

  useEffect(() => {
    getEmployeePaginate(page, perPage)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length !== 0) {
            setList(res.data);
          } else {
            setPage(page - 1);
          }
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: res.message,
            showConfirmButton: true,
          });
        }
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 1500)
      );
  }, [page, perPage]);

  if (loading) {
    return <Loading />;
  }

  const onChangePage = (action) => {
    let result = page + action;
    if (result < 1) {
      setPage(1);
    } else {
      setPage(page + action);
    }
  };

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
              <th style={{ width: "10%" }}>Emp Number</th>
              <th>First</th>
              <th>Last</th>
              <th>Department</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{val.empno}</td>
                <td>{val.fname}</td>
                <td>{val.lname}</td>
                <td>{getDepartmentName(listDepartment, val.deptno)}</td>
                <td>{val.emailAddress}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <OverlayTrigger overlay={<Tooltip>Details</Tooltip>}>
                          <Button
                            as={Link}
                            variant="dark"
                            to={`/employees/${val.empno}`}
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
                            to={`/employees/${val.empno}/history`}
                          >
                            <FontAwesomeIcon icon={faHistory} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                          <Button
                            as={Link}
                            variant="primary"
                            to={`/employees/${val.empno}/edit`}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            variant="danger"
                            onClick={() => onTryDelete(val.empno)}
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
        <PaginationCustom
          page={page}
          perPage={perPage}
          onChangePage={onChangePage}
          onChangePerPage={(e) => setPerPage(e.target.value)}
        />
      </Card.Body>
    </Card>
  );
};

export default Employees;
