/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { getDepartments } from "../../utils/api/Departments";
import Swal from "sweetalert2";
import { generateProjNo, getProjects } from "../../utils/api/Projects";

const initialValue = {
  projNo: 0,
  projName: "",
  deptNo: 0,
};

const initialError = {
  projName: "",
  deptNo: "",
};

const ProjectForm = ({ type }) => {
  const { id: projNo } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(initialError);
  const [projectData, setProjectData] = useState(initialValue);
  const [isSuccess, setIsSuccess] = useState(false);
  const [listProject, setListProject] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);

  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);

  useEffect(() => {
    setListProject(getProjects());
    setListDepartment(getDepartments());
    return () => {
      clearForm();
      setIsSuccess(false);
    };
  }, []);

  //ALERT FEEDBACK
  useEffect(() => {
    if (isSuccess) {
      let alertMessage = "";
      if (type === "add") {
        alertMessage = "Project added!";
      } else {
        alertMessage = "Project updated!";
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: alertMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/projects");
      }, 1500);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (projNo) {
      setProjectData(
        getDepartments().find((val) => val.projNo === parseInt(projNo))
      );
    }
  }, [projNo]);

  //ON CHANGE VALUE
  const onChangeValue = (key, e) => {
    if (e.target.type === "checkbox") {
      setProjectData({
        ...projectData,
        [key]: e.target.checked,
      });
    } else {
      setProjectData({
        ...projectData,
        [key]: e.target.value,
      });
    }
  };

  //CLEAR FORM
  const clearForm = () => {
    setProjectData(initialValue);
  };

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  //ADD PROJECT
  const onAdd = (e) => {
    e.preventDefault();
    let newId = generateProjNo();

    let projectDataAddId = {
      ...projectData,
      projNo: newId,
    };

    let valid = Validate(projectDataAddId);

    if (valid) {
      let newData = [...listProject, projectDataAddId];
      localStorage.setItem("projects", JSON.stringify(newData));
      setIsSuccess(true);
    } else {
      localStorage.setItem("projNo", newId - 1);
    }
  };

  //EDIT PROJECT
  const onEdit = (e) => {
    e.preventDefault();

    let updatedProj = {
      ...projectData,
      deptNo: parseInt(projNo),
    };
    let valid = Validate(updatedProj);
    if (valid) {
      let newData = listProject.map((val) =>
        val.deptNo === parseInt(projNo) ? updatedProj : val
      );

      localStorage.setItem("projects", JSON.stringify(newData));
      setIsSuccess(true);
    }
  };

  //VALIDATE PROJECT
  const Validate = (newProj) => {
    let errorMessages = {};

    //-- projName
    if (!newProj.projName) {
      errorMessages.projName = `Project name must be filled!`;
    }

    //-- deptNo
    if (!newProj.deptNo) {
      errorMessages.deptNo = `Department must be filled!`;
    }
    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    return formValid;
  };

  return (
    <Card>
      <Form onSubmit={type === "add" ? onAdd : onEdit}>
        <Card.Header>
          {type === "add" ? "Add Project" : "Edit Project"}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formProjName">
                <Form.Label className="fw-semibold">Project Name</Form.Label>
                <Form.Control
                  ref={inputFocus}
                  type="text"
                  value={projectData.projName}
                  size="sm"
                  onChange={(e) => onChangeValue("projName", e)}
                  isInvalid={errors.projName}
                />
                {errors.projName && <small>{errors.projName}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formDeptNo">
                <Form.Label className="fw-semibold">Department</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      deptNo: parseInt(e.target.value),
                    })
                  }
                  isInvalid={errors.deptNo}
                  value={projectData.deptNo ? projectData.deptNo : 0}
                  size="sm"
                >
                  <option disabled value={0} />
                  {listDepartment.map((val) => (
                    <option key={val.deptNo} value={val.deptNo}>
                      {val.deptName}
                    </option>
                  ))}
                </Form.Select>
                {errors.deptNo && <small>{errors.deptNo}</small>}
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="d-flex justify-content-end">
            {type !== "edit" ? (
              <div className="d-flex gap-2">
                <ButtonCustom variant="primary" type="submit">
                  Submit
                </ButtonCustom>
                <ButtonCustom variant="secondary" onClick={onCancel}>
                  Back
                </ButtonCustom>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <ButtonCustom variant="primary" type="submit">
                  Submit
                </ButtonCustom>
                <ButtonCustom variant="danger" onClick={onCancel}>
                  Cancel
                </ButtonCustom>
              </div>
            )}
          </div>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default ProjectForm;
