/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import Swal from "sweetalert2";
import { addProject, getProject, updateProject } from "../../api/Project";
import { getAllDepartment } from "../../api/Department";
import ErrorMessage from "../../utils/ErrorMessage";
import Loading from "../../components/Elements/Loading";

const initialValue = {
  projname: "",
  projLocation: 0,
  deptno: 0,
};

const initialError = {
  projname: "",
  projLocation: "",
  deptno: "",
};

const ProjectForm = ({ type }) => {
  const { id: projNo } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(initialError);
  const [projectData, setProjectData] = useState(initialValue);
  const [isSuccess, setIsSuccess] = useState(false);
  const [listDepartment, setListDepartment] = useState([]);
  const [location] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);

  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);

  useEffect(() => {
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
      setLoading(true);
      getProject(projNo)
        .then((res) => {
          if (res.status === 200) {
            setProjectData(res.data);
          }
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false);
          }, 1500)
        );
    }
  }, [projNo]);

  useEffect(() => {
    getAllDepartment().then((res) => {
      if (res.status === 200) {
        setListDepartment(res.data);
      }
    });
  }, []);

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
    let valid = Validate(projectData);
    if (valid) {
      addProject(projectData).then((res) => {
        if (res.data.status === false) {
          ErrorMessage(res.data.message);
        } else {
          setIsSuccess(true);
        }
      });
    }
  };

  //EDIT PROJECT
  const onEdit = (e) => {
    e.preventDefault();
    let valid = Validate(projectData);
    if (valid) {
      updateProject(projNo, projectData).then((res) => {
        if (res.data.status === false) {
          ErrorMessage(res.data.message);
        } else {
          setIsSuccess(true);
        }
      });
    }
  };

  //VALIDATE PROJECT
  const Validate = (newProj) => {
    let errorMessages = {};

    //-- projName
    if (!newProj.projname) {
      errorMessages.projname = `Project name must be filled!`;
    }

    //-- deptNo
    if (!newProj.deptno) {
      errorMessages.deptno = `Department must be filled!`;
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

  if (loading) {
    return <Loading />;
  }

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
                  value={projectData.projname}
                  size="sm"
                  onChange={(e) => onChangeValue("projname", e)}
                  isInvalid={errors.projname}
                />
                {errors.projname && <small>{errors.projname}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formDeptNo">
                <Form.Label className="fw-semibold">Department</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      deptno: parseInt(e.target.value),
                    })
                  }
                  isInvalid={errors.deptno}
                  value={projectData.deptno ? projectData.deptno : 0}
                  size="sm"
                >
                  <option disabled value={0} hidden />
                  {listDepartment.map((val) => (
                    <option key={val.deptno} value={val.deptno}>
                      {val.deptname}
                    </option>
                  ))}
                </Form.Select>
                {errors.deptno && <small>{errors.deptno}</small>}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formDeptNo">
                <Form.Label className="fw-semibold">Location</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      projLocation: parseInt(e.target.value),
                    })
                  }
                  isInvalid={errors.projLocation}
                  value={
                    projectData.projLocation ? projectData.projLocation : 0
                  }
                  size="sm"
                >
                  <option value={0} disabled hidden></option>
                  {location.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </Form.Select>
                {errors.projLocation && <small>{errors.projLocation}</small>}
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="d-flex justify-content-end">
            <div className="d-flex gap-2">
              <ButtonCustom variant="primary" type="submit">
                Submit
              </ButtonCustom>
              {type !== "edit" ? (
                <ButtonCustom variant="secondary" onClick={onCancel}>
                  Back
                </ButtonCustom>
              ) : (
                <ButtonCustom variant="danger" onClick={onCancel}>
                  Cancel
                </ButtonCustom>
              )}
            </div>
          </div>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default ProjectForm;
