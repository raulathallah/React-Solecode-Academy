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
import { getProjects } from "../../utils/api/Projects";
import { getDepartmentName } from "../../utils/helpers/HelperFunctions";

const Projects = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const onTryDelete = (projNo) => {
    Swal.fire({
      title: `Are you sure want to delete project?`,
      text: `Project Number: ${projNo}`,
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
        onDelete(projNo);
      }
    });
  };
  //DELETE PROJECT
  const onDelete = (projNo) => {
    let oldData = list;
    let newData = oldData.filter((val) => val.projNo !== projNo);
    localStorage.setItem("projects", JSON.stringify(newData));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Project deleted!",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      setList(getProjects());
      navigate("/projects");
    }, 1500);
  };

  useEffect(() => {
    setList(getProjects());
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
      <Card.Header>Project List</Card.Header>
      <Card.Body className="d-grid gap-2">
        <div>
          <ButtonCustom
            icon={<FontAwesomeIcon icon={faPlus} />}
            as={Link}
            to={"/projects/new"}
            size="sm"
          >
            Add Project
          </ButtonCustom>
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
                <td>{val.projNo}</td>
                <td>{val.projName}</td>
                <td>{getDepartmentName(val.deptNo)}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <OverlayTrigger overlay={<Tooltip>Details</Tooltip>}>
                          <Button
                            as={Link}
                            variant="dark"
                            to={`/projects/${val.projNo}`}
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
                            to={`/projects/${val.projNo}/history`}
                          >
                            <FontAwesomeIcon icon={faHistory} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                          <Button
                            as={Link}
                            variant="primary"
                            to={`/projects/${val.projNo}/edit`}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            variant="danger"
                            onClick={() => onTryDelete(val.projNo)}
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

export default Projects;
