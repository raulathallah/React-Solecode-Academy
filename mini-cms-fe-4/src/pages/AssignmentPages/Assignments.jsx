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
import { deleteWorksOn, getWorksOnPaginate } from "../../api/WorksOn";
import PaginationCustom from "../../components/Elements/PaginationCustom";
import { getAllProject } from "../../api/Project";
import { getAllEmployee } from "../../api/Employee";
import {
  getEmployeeName,
  getProjectName,
} from "../../utils/helpers/HelperFunctions";

const Assignments = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [listEmployee, setListEmployee] = useState([]);
  const [listProject, setListProject] = useState([]);

  useEffect(() => {
    getAllEmployee().then((res) => {
      if (res.status === 200) {
        setListEmployee(res.data);
      }
    });
    getAllProject().then((res) => {
      if (res.status === 200) {
        setListProject(res.data);
      }
    });
  }, []);

  const onTryDelete = (worksOn) => {
    Swal.fire({
      title: `Are you sure want to delete assigments?`,
      text: `Employee Number: ${worksOn.empno}, Project Number: ${worksOn.projno}`,
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
        onDelete(worksOn);
      }
    });
  };
  //DELETE WORKS ON
  const onDelete = (worksOn) => {
    deleteWorksOn(worksOn.projno, worksOn.empno)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Assignment deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(true);
        }
      })
      .finally(() =>
        setTimeout(() => {
          getWorksOnPaginate(page, perPage)
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
          navigate("/assignments");
        }, 1500)
      );
  };

  useEffect(() => {
    getWorksOnPaginate(page, perPage)
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
                <td>{getEmployeeName(listEmployee, val.empno)}</td>
                <td>{getProjectName(listProject, val.projno)}</td>
                <td>{val.dateworked}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <OverlayTrigger overlay={<Tooltip>Detail</Tooltip>}>
                          <Button
                            as={Link}
                            variant="dark"
                            to={`/assignments/${val.empno}/${val.projno}`}
                          >
                            <FontAwesomeIcon icon={faList} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                          <Button
                            as={Link}
                            variant="primary"
                            to={`/assignments/${val.empno}/${val.projno}/edit`}
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

export default Assignments;
