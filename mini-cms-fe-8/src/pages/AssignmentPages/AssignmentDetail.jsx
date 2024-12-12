import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, ListGroup } from "react-bootstrap";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { getWorksOn } from "../../api/WorksOn";
import {
  getEmployeeName,
  getProjectName,
} from "../../utils/helpers/HelperFunctions";
import { getAllEmployee } from "../../api/Employee";
import { getAllProject } from "../../api/Project";

const initialValue = {
  empno: 0,
  projno: 0,
  dateworked: "",
  hoursworked: 0,
};

const AssignmentDetail = () => {
  const { empNo, projNo } = useParams();
  const navigate = useNavigate();

  const [worksOnData, setWorksOnData] = useState(initialValue);

  useEffect(() => {
    if (projNo && empNo) {
      getWorksOn(projNo, empNo).then((res) => {
        if (res.status === 200) {
          setWorksOnData(res.data);
        }
      });
    }
  }, [projNo, empNo]);

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

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  return (
    <Card className="w-50">
      <Card.Header>Assignment Detail</Card.Header>
      <Card.Body className="">
        <div className="tw-grid tw-grid-cols-2">
          {/**LEFT */}
          <ListGroup as="ol" className="list-group-flush border-0">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Employee</div>
                {getEmployeeName(listEmployee, worksOnData.empno)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Date Worked</div>
                {worksOnData.dateworked}
              </div>
            </ListGroup.Item>
          </ListGroup>

          {/**RIGHT */}
          <ListGroup as="ol" className="list-group-flush border-0">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Project</div>
                {getProjectName(listProject, worksOnData.projno)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Hours Worked</div>
                {worksOnData.hoursworked}
              </div>
            </ListGroup.Item>
          </ListGroup>
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

export default AssignmentDetail;
