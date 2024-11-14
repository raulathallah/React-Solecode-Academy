import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, ListGroup } from "react-bootstrap";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { getDepartmentName } from "../../utils/helpers/HelperFunctions";
import { getProjects } from "../../utils/api/Projects";

const initialValue = {
  projNo: 0,
  projName: "",
  deptNo: 0,
};

const ProjectDetail = () => {
  const { id: projNo } = useParams();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState(initialValue);

  useEffect(() => {
    if (projNo) {
      setProjectData(
        getProjects().find((val) => val.projNo === parseInt(projNo))
      );
    }
  }, [projNo]);

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  return (
    <Card className="w-50">
      <Card.Header>Project Detail</Card.Header>
      <Card.Body className="">
        <div className="tw-grid tw-grid-cols-2">
          {/**LEFT */}
          <ListGroup as="ol" className="list-group-flush border-0">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Project Number</div>
                {projectData.projNo}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Project Name</div>
                {projectData.projName}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Department</div>
                {getDepartmentName(projectData.deptNo)}
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

export default ProjectDetail;
