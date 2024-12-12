import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, ListGroup } from "react-bootstrap";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { getProject } from "../../api/Project";
import { getDepartment } from "../../api/Department";

const initialValue = {
  projno: 0,
  projname: "",
  projLocation: 0,
  deptno: 0,
};

const ProjectDetail = () => {
  const { id: projNo } = useParams();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState(initialValue);
  const [deptName, setDeptName] = useState("");

  useEffect(() => {
    if (projNo) {
      getProject(projNo).then((res) => {
        if (res.status === 200) {
          setProjectData(res.data);
        }
      });
    }
  }, [projNo]);

  useEffect(() => {
    if (projectData && projectData.deptno !== 0) {
      getDepartment(projectData.deptno).then((res) => {
        if (res.status === 200) {
          setDeptName(res.data.deptname);
        }
      });
    }
  }, [projectData]);

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
                {projectData.projno}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Project Location</div>
                {projectData.projLocation}
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup as="ol" className="list-group-flush border-0">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Project Name</div>
                {projectData.projname}
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Department</div>
                {deptName}
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
