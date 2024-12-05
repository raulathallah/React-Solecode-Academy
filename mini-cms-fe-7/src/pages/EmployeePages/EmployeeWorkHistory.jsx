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
import { useNavigate, useParams } from "react-router";
import Loading from "../../components/Elements/Loading";
import { faArrowLeft, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { Link } from "react-router-dom";
import { getAllWorksOn } from "../../api/WorksOn";
import {
  getEmployeeName,
  getProjectName,
} from "../../utils/helpers/HelperFunctions";
import { getAllProject } from "../../api/Project";
import { getAllEmployee } from "../../api/Employee";
import Swal from "sweetalert2";

const EmployeeWorkHistory = () => {
  const navigate = useNavigate();
  const { id: empNo } = useParams();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  //const [page, setPage] = useState(1);
  //const [perPage, setPerPage] = useState(5);

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

  useEffect(() => {
    getAllWorksOn()
      .then((res) => {
        if (res.status === 200) {
          let filtered = res.data.filter(
            (val) => val.empno === parseInt(empNo)
          );
          setList(filtered);
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
  }, [empNo]);

  if (loading) {
    return <Loading />;
  }

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  //const onChangePage = (action) => {
  //  let result = page + action;
  //  if (result < 1) {
  //    setPage(1);
  //  } else {
  //    setPage(page + action);
  //  }
  //};

  return (
    <Card>
      <Card.Header>Employee Work History</Card.Header>
      <Card.Body className="d-grid gap-2">
        <div>
          <ButtonCustom
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            as={Link}
            variant="secondary"
            onClick={onCancel}
            size="sm"
          >
            Back
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
                      </ButtonGroup>
                    </Row>
                  </Container>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/** <PaginationCustom
          page={page}
          onChangePage={onChangePage}
          onChangePerPage={(e) => setPerPage(e.target.value)}
        /> */}
      </Card.Body>
    </Card>
  );
};

export default EmployeeWorkHistory;
