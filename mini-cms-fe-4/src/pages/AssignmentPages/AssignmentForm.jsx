/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import Swal from "sweetalert2";
import { getAllEmployee } from "../../api/Employee";
import { getAllProject } from "../../api/Project";
import {
  addWorksOn,
  getAllWorksOn,
  getWorksOn,
  updateWorksOn,
} from "../../api/WorksOn";
import ErrorMessage from "../../utils/ErrorMessage";

const initialValue = {
  empno: 0,
  projno: 0,
  dateworked: "",
  hoursworked: 0,
};

const initialError = {
  empno: "",
  projno: "",
  dateworked: "",
  hoursworked: "",
};

const AssignmentForm = ({ type }) => {
  const { empNo, projNo } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(initialError);
  const [worksOnData, setWorksOnData] = useState(initialValue);
  const [isSuccess, setIsSuccess] = useState(false);
  const [listProject, setListProject] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [listWorksOn, setListWorksOn] = useState([]);

  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);

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
    getAllWorksOn().then((res) => {
      if (res.status === 200) {
        setListWorksOn(res.data);
      }
    });

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
        alertMessage = "Assignment added!";
      } else {
        alertMessage = "Assignment updated!";
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: alertMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/assignments");
      }, 1500);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (projNo && empNo) {
      getWorksOn(projNo, empNo).then((res) => {
        if (res.status === 200) {
          setWorksOnData(res.data);
        }
      });
    }
  }, [projNo, empNo]);

  //ON CHANGE VALUE
  const onChangeValue = (key, e) => {
    if (e.target.type === "checkbox") {
      setWorksOnData({
        ...worksOnData,
        [key]: e.target.checked,
      });
    } else {
      setWorksOnData({
        ...worksOnData,
        [key]: e.target.value,
      });
    }
  };

  //CLEAR FORM
  const clearForm = () => {
    setWorksOnData(initialValue);
  };

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  //ADD WORKS ON
  const onAdd = (e) => {
    e.preventDefault();
    let valid = Validate(worksOnData);
    if (valid) {
      addWorksOn(worksOnData)
        .then((res) => {
          if (res.status === 200) {
            setIsSuccess(true);
          }
        })
        .catch((err) => ErrorMessage(err));
    }
  };

  //EDIT WORKS ON
  const onEdit = (e) => {
    e.preventDefault();
    let valid = Validate(worksOnData);
    if (valid) {
      updateWorksOn(projNo, empNo, worksOnData)
        .then((res) => {
          if (res.status === 200) {
            setIsSuccess(true);
          }
        })
        .catch((err) => ErrorMessage(err.message));
    }
  };

  //VALIDATE WORKS ON
  const Validate = (newWorksOn) => {
    let errorMessages = {};

    //-- empNo
    if (!newWorksOn.empno) {
      errorMessages.empno = `Employee must be filled!`;
    }

    //-- projNo
    if (!newWorksOn.projno) {
      errorMessages.projno = `Project must be filled!`;
    }

    if (type === "add") {
      if (
        listWorksOn.find(
          (val) =>
            val.projno === newWorksOn.projno && val.empno === newWorksOn.empno
        )
      ) {
        ErrorMessage("Employee already assign to the project!");
        errorMessages.projno = `Employee already assign to the project!`;
        errorMessages.empno = `Employee already assign to the project!`;
      }
    }

    //-- dateWorked
    if (!newWorksOn.dateworked) {
      errorMessages.dateworked = `Date worked must be filled!`;
    }

    //-- hoursWorked
    if (!newWorksOn.hoursworked || newWorksOn.hoursworked === 0) {
      errorMessages.hoursworked = `Hours worked must be greater than 0!`;
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
          {type === "add" ? "Add Assignment" : "Edit Assignment"}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formEmpNo">
                <Form.Label className="fw-semibold">Employee</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setWorksOnData({
                      ...worksOnData,
                      empno: parseInt(e.target.value),
                    })
                  }
                  isInvalid={errors.empno}
                  disabled={type !== "add"}
                  value={worksOnData.empno ? worksOnData.empno : 0}
                  size="sm"
                >
                  <option disabled value={0} hidden />
                  {listEmployee.map((val) => (
                    <option key={val.empno} value={val.empno}>
                      {`${val.fname} ${val.lname}`}
                    </option>
                  ))}
                </Form.Select>
                {errors.empno && <small>{errors.empno}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formProjNo">
                <Form.Label className="fw-semibold">Project</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setWorksOnData({
                      ...worksOnData,
                      projno: parseInt(e.target.value),
                    })
                  }
                  disabled={type !== "add"}
                  isInvalid={errors.projno}
                  value={worksOnData.projno ? worksOnData.projno : 0}
                  size="sm"
                >
                  <option disabled value={0} hidden />
                  {listProject.map((val) => (
                    <option key={val.projno} value={val.projno}>
                      {val.projname}
                    </option>
                  ))}
                </Form.Select>
                {errors.projno && <small>{errors.projno}</small>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formDateWorked">
                <Form.Label className="fw-semibold">Date Worked</Form.Label>
                <Form.Control
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => onChangeValue("dateworked", e)}
                  isInvalid={errors.dateworked}
                  value={worksOnData.dateworked}
                  size="sm"
                />
                {errors.dateworked && <small>{errors.dateworked}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formHoursWorked">
                <Form.Label className="fw-semibold">Hours Worked</Form.Label>
                <Form.Control
                  type="number"
                  max={600}
                  onChange={(e) =>
                    setWorksOnData({
                      ...worksOnData,
                      hoursworked: parseInt(e.target.value),
                    })
                  }
                  isInvalid={errors.hoursworked}
                  value={worksOnData.hoursworked}
                  size="sm"
                />
                {errors.hoursworked && <small>{errors.hoursworked}</small>}
              </Form.Group>
            </Col>
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

export default AssignmentForm;
