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
import { getWorksOn } from "../../utils/api/WorksOns";
import Loading from "../../components/Elements/Loading";
import { faArrowLeft, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { Link } from "react-router-dom";

const ProjectWorkHistory = () => {
  const navigate = useNavigate();
  const { id: projNo } = useParams();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setList(getWorksOn().filter((val) => val.projNo === parseInt(projNo)));
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

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  return (
    <Card>
      <Card.Header>Project Work History</Card.Header>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((val, key) => (
              <tr key={key}>
                <td>{getEmployeeName(val.empNo)}</td>
                <td>{getProjectName(val.projNo)}</td>
                <td>{val.dateWorked}</td>
                <td style={{ width: "20px" }}>
                  <Container>
                    <Row>
                      <ButtonGroup aria-label="Basic example">
                        <OverlayTrigger overlay={<Tooltip>Detail</Tooltip>}>
                          <Button
                            as={Link}
                            variant="dark"
                            to={`/assignments/${val.empNo}/${val.projNo}/${val.dateWorked}`}
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
      </Card.Body>
    </Card>
  );
};

export default ProjectWorkHistory;
