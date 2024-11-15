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
import { deleteDepartment, getDepartmentPaginate } from "../../api/Department";
import PaginationCustom from "../../components/Elements/PaginationCustom";
import { getAllEmployee } from "../../api/Employee";
import { getEmployeeName } from "../../utils/helpers/HelperFunctions";

const Departments = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [listEmployee, setListEmployee] = useState([]);

  const onTryDelete = (dept) => {
    Swal.fire({
      title: `Are you sure want to delete Department?`,
      text: `Department ${dept.deptname}`,
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
        onDelete(dept.deptno);
      }
    });
  };
  //DELETE DEPARTMENTS
  const onDelete = (deptNo) => {
    deleteDepartment(deptNo)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Department deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(true);
        }
      })
      .finally(() =>
        setTimeout(() => {
          getDepartmentPaginate(page, perPage)
            .then((res) => {
              if (res.status === 200) {
                if (res.data.length !== 0) {
                  setList(res.data);
                }
              }
            })
            .finally(() => setLoading(false));

          navigate("/departments");
        }, 1500)
      );
  };

  useEffect(() => {
    getAllEmployee().then((res) => {
      if (res.status === 200) {
        setListEmployee(res.data);
      }
    });
  }, []);

  useEffect(() => {
    getDepartmentPaginate(page, perPage)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length !== 0) {
            setList(res.data);
          } else {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "No more data!",
              showConfirmButton: false,
              timer: 1500,
            });
            setPage(page - 1);
          }
        }
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 1500)
      );
  }, [page, perPage]);

  const onChangePage = (action) => {
    let result = page + action;
    if (result < 1) {
      setPage(1);
    } else {
      setPage(page + action);
    }
  };

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
              <th>Dept Number</th>
              <th>Name</th>
              <th>Manager</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td style={{ width: "10%" }}>{val.deptno}</td>
                <td>{val.deptname}</td>
                <td>
                  {val.mgrempno
                    ? getEmployeeName(listEmployee, val.mgrempno)
                    : "None"}
                </td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <OverlayTrigger overlay={<Tooltip>Details</Tooltip>}>
                          <Button
                            as={Link}
                            variant="dark"
                            to={`/departments/${val.deptno}`}
                          >
                            <FontAwesomeIcon icon={faList} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                          <Button
                            as={Link}
                            variant="primary"
                            to={`/departments/${val.deptno}/edit`}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            variant="danger"
                            onClick={() => onTryDelete(val)}
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
          onChangePage={onChangePage}
          onChangePerPage={(e) => setPerPage(e.target.value)}
        />
      </Card.Body>
    </Card>
  );
};

export default Departments;
