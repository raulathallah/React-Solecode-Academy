import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getDepartments } from "../../utils/api/Departments";
import { getEmployees } from "../../utils/api/Employees";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  ListGroup,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import {
  getDepartmentName,
  getEmployeeName,
} from "../../utils/helpers/HelperFunctions";

const initialValue = {
  deptNo: 0,
  deptName: "",
  mgrEmpNo: 0,
};

const DepartmentDetail = () => {
  const { id: deptNo } = useParams();
  const navigate = useNavigate();

  const [departmentData, setDepartmentData] = useState(initialValue);
  const [listEmployee, setListEmployee] = useState([]);

  useEffect(() => {
    if (deptNo) {
      setDepartmentData(
        getDepartments().find((val) => val.deptNo === parseInt(deptNo))
      );
      setListEmployee(
        getEmployees().filter((val) => val.deptNo === parseInt(deptNo))
      );
    }
  }, [deptNo]);

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };
  return (
    <Card className="">
      <Card.Header>Department Detail</Card.Header>
      <Card.Body className="tw-grid tw-gap-10">
        <div className="tw-grid tw-grid-cols-2">
          {/**LEFT */}
          <ListGroup as="ol" className="list-group-flush border-0">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Department Number</div>
                {departmentData.deptNo}
              </div>
            </ListGroup.Item>{" "}
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Department Name</div>
                {departmentData.deptName}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Department Manager</div>
                {getEmployeeName(departmentData.mgrEmpNo)}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div>
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
              {listEmployee.map((val, key) => (
                <tr key={key}>
                  <td>{val.empNo}</td>
                  <td>{`${val.fName}, ${val.lName}`}</td>
                  <td>{getDepartmentName(val.deptNo)}</td>
                  <td style={{ width: "20px" }}>
                    <Container>
                      <Row>
                        <ButtonGroup aria-label="Basic example">
                          <OverlayTrigger overlay={<Tooltip>Details</Tooltip>}>
                            <Button
                              as={Link}
                              variant="dark"
                              size="sm"
                              to={`/employees/${val.empNo}`}
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
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div className="d-flex justify-content-end">
          <ButtonCustom variant="secondary" onClick={onCancel}>
            Back
          </ButtonCustom>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default DepartmentDetail;
