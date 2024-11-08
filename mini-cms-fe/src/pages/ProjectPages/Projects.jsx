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
import Swal from "sweetalert2";
import { getProjects } from "../../utils/api/Projects";

const Projects = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

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
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{val.projNo}</td>
                <td>{val.projName}</td>
                <td>{val.deptNo ? val.deptNo : "-"}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          as={Link}
                          variant="dark"
                          size="sm"
                          to={`/projects/${val.projNo}`}
                        >
                          Details
                        </Button>
                        <Button
                          as={Link}
                          variant="primary"
                          size="sm"
                          to={`/projects/${val.projNo}/edit`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(val.projNo)}
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

export default Projects;
