import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, ListGroup } from "react-bootstrap";
import ButtonCustom from "../../components/Elements/ButtonCustom";

import { getWorksOn } from "../../utils/api/WorksOns";

const initialValue = {
  empNo: 0,
  projNo: 0,
  dateWorked: "",
  hoursWorked: 0,
};

const AssignmentDetail = () => {
  const { empNo, projNo, dateWorked } = useParams();
  const navigate = useNavigate();

  const [worksOnData, setWorksOnData] = useState(initialValue);

  useEffect(() => {
    if (projNo) {
      setWorksOnData(
        getWorksOn().find(
          (val) =>
            val.projNo === parseInt(projNo) &&
            val.empNo === parseInt(empNo) &&
            val.dateWorked === dateWorked
        )
      );
    }
  }, [projNo, empNo, dateWorked]);

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
                {getEmployeeName(worksOnData.empNo)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Date Worked</div>
                {worksOnData.dateWorked}
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
                {getProjectName(worksOnData.projNo)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Hours Worked</div>
                {worksOnData.hoursWorked}
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
