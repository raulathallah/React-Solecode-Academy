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
import { getDepartmentName } from "../../utils/helpers/HelperFunctions";
import { deleteProject, getProjectPaginate } from "../../api/Project";
import { getAllDepartment } from "../../api/Department";
import PaginationCustom from "../../components/Elements/PaginationCustom";
import { useSelector } from "react-redux";

const Projects = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { user: currentUser } = useSelector((state) => state.auth);
  const isEmployee = currentUser?.roles?.some((role) =>
    ["Employee"].includes(role)
  );

  const [listDepartment, setListDepartment] = useState();
  const onTryDelete = (proj) => {
    Swal.fire({
      title: `Are you sure want to delete project?`,
      text: `Project: ${proj.projname}`,
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
        onDelete(proj.projno);
      }
    });
  };
  //DELETE PROJECT
  const onDelete = (projNo) => {
    deleteProject(projNo)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Project deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(true);
        }
      })
      .finally(() => {
        setTimeout(() => {
          getProjectPaginate(page, perPage)
            .then((res) => {
              if (res.status === 200) {
                if (res.data.length !== 0) {
                  setList(res.data);
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
            .finally(() => setLoading(false));
          navigate("/projects");
        }, 1500);
      });
  };

  useEffect(() => {
    getProjectPaginate(page, perPage)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length !== 0) {
            setList(res.data);
          } else {
            //setPage(page - 1);
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

  useEffect(() => {
    getAllDepartment().then((res) => {
      if (res.status === 200) {
        setListDepartment(res.data);
      }
    });
  }, []);

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
      <Card.Header>Project List</Card.Header>
      <Card.Body className="d-grid gap-2">
        <div>
          {!isEmployee && (
            <ButtonCustom
              icon={<FontAwesomeIcon icon={faPlus} />}
              as={Link}
              to={"/projects/new"}
              size="sm"
            >
              Add Project
            </ButtonCustom>
          )}
        </div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Project Number</th>
              <th>Project Name</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{val.projno}</td>
                <td>{val.projname}</td>
                <td>{getDepartmentName(listDepartment, val.deptno)}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <OverlayTrigger overlay={<Tooltip>Details</Tooltip>}>
                          <Button
                            as={Link}
                            variant="dark"
                            to={`/projects/${val.projno}`}
                          >
                            <FontAwesomeIcon icon={faList} />
                          </Button>
                        </OverlayTrigger>{" "}
                        <OverlayTrigger
                          overlay={<Tooltip>Work History</Tooltip>}
                        >
                          <Button
                            as={Link}
                            variant="secondary"
                            to={`/projects/${val.projno}/history`}
                          >
                            <FontAwesomeIcon icon={faHistory} />
                          </Button>
                        </OverlayTrigger>
                        {!isEmployee && (
                          <>
                            <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                              <Button
                                as={Link}
                                variant="primary"
                                to={`/projects/${val.projno}/edit`}
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
                          </>
                        )}
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

export default Projects;
