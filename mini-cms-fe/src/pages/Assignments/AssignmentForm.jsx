/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import Swal from "sweetalert2";
import { getProjects } from "../../utils/api/Projects";
import { getEmployees } from "../../utils/api/Employees";
import { getWorksOn } from "../../utils/api/WorksOns";

const initialValue = {
  empNo: 0,
  projNo: 0,
  dateWorked: "",
  hoursWorked: 0,
};

const initialError = {
  empNo: "",
  projNo: "",
  dateWorked: "",
  hoursWorked: "",
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
    setListProject(getProjects());
    setListEmployee(getEmployees());
    setListWorksOn(getWorksOn());
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
      setWorksOnData(
        getWorksOn().find(
          (val) =>
            val.projNo === parseInt(projNo) && val.empNo === parseInt(empNo)
        )
      );
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
      let newData = [...listWorksOn, worksOnData];
      localStorage.setItem("worksOns", JSON.stringify(newData));
      setIsSuccess(true);
    }
  };

  //EDIT WORKS ON
  const onEdit = (e) => {
    e.preventDefault();
    let valid = Validate(worksOnData);
    if (valid) {
      let newData = listWorksOn.map((val) =>
        val.projNo === parseInt(projNo) && val.empNo === parseInt(empNo)
          ? worksOnData
          : val
      );

      localStorage.setItem("worksOns", JSON.stringify(newData));
      setIsSuccess(true);
    }
  };

  //VALIDATE WORKS ON
  const Validate = (newWorksOn) => {
    let errorMessages = {};

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
                      empNo: parseInt(e.target.value),
                    })
                  }
                  isInvalid={errors.empNo}
                  value={worksOnData.empNo ? worksOnData.empNo : 0}
                  size="sm"
                >
                  <option disabled value={0} />
                  {listEmployee.map((val) => (
                    <option key={val.empNo} value={val.empNo}>
                      {`${val.fName}, ${val.lName}`}
                    </option>
                  ))}
                </Form.Select>
                {errors.empNo && <small>{errors.empNo}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formProjNo">
                <Form.Label className="fw-semibold">Project</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setWorksOnData({
                      ...worksOnData,
                      projNo: parseInt(e.target.value),
                    })
                  }
                  isInvalid={errors.projNo}
                  value={worksOnData.projNo ? worksOnData.projNo : 0}
                  size="sm"
                >
                  <option disabled value={0} />
                  {listProject.map((val) => (
                    <option key={val.projNo} value={val.projNo}>
                      {val.projName}
                    </option>
                  ))}
                </Form.Select>
                {errors.projNo && <small>{errors.projNo}</small>}
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
                  onChange={(e) => onChangeValue("dateWorked", e)}
                  isInvalid={errors.dateWorked}
                  value={worksOnData.dateWorked}
                  size="sm"
                />
                {errors.dateWorked && <small>{errors.dateWorked}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formHoursWorked">
                <Form.Label className="fw-semibold">Hours Worked</Form.Label>
                <Form.Control
                  type="number"
                  max={24}
                  onChange={(e) =>
                    setWorksOnData({
                      ...worksOnData,
                      hoursWorked: parseInt(e.target.value),
                    })
                  }
                  isInvalid={errors.hoursWorked}
                  value={worksOnData.hoursWorked}
                  size="sm"
                />
                {errors.hoursWorked && <small>{errors.hoursWorked}</small>}
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

export default AssignmentForm;
