/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { generateEmpNo, getEmployees } from "../../utils/Employees";
import { getDepartments } from "../../utils/Departments";
import Swal from "sweetalert2";

const initialValue = {
  empNo: 0,
  fName: "",
  lName: "",
  address: "",
  dob: "",
  sex: "Male",
  position: "",
  deptNo: 0,
};

const initialError = {
  fName: "",
  lName: "",
  address: "",
  dob: "",
  sex: "",
  position: "",
  deptNo: "",
};

const EmployeeForm = ({ type }) => {
  const { id: empNo } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(initialError);
  const [employeeData, setEmployeeData] = useState(initialValue);
  const [listEmployee, setListEmployee] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);

  useEffect(() => {
    setListEmployee(getEmployees());
    setListDepartment(getDepartments());

    return () => {
      clearForm();
    };
  }, []);

  //ALERT FEEDBACK
  useEffect(() => {
    if (isSuccess) {
      let alertMessage = "";
      if (type !== "add") {
        alertMessage = "Employee updated!";
      } else {
        alertMessage = "Employee added!";
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: alertMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/employees");
      }, 1500);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (empNo) {
      setEmployeeData(
        getEmployees().find((val) => val.empNo === parseInt(empNo))
      );
    }
  }, [empNo]);

  //ON CHANGE VALUE
  const onChangeValue = (key, e) => {
    if (e.target.type === "checkbox") {
      setEmployeeData({
        ...employeeData,
        [key]: e.target.checked,
      });
    } else {
      setEmployeeData({
        ...employeeData,
        [key]: e.target.value,
      });
    }
  };

  //CLEAR FORM
  const clearForm = () => {
    setEmployeeData(initialValue);
  };
  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  //ADD EMPLOYEE
  const onAdd = (e) => {
    e.preventDefault();
    let newId = generateEmpNo();
    let employeeDataAddId = { ...employeeData, empNo: newId };
    let valid = Validate(employeeDataAddId);

    if (valid) {
      let newData = [...listEmployee, employeeDataAddId];
      localStorage.setItem("employees", JSON.stringify(newData));
      setIsSuccess(true);
    } else {
      localStorage.setItem("empNo", newId - 1);
    }
  };

  //EDIT EMPLOYEE
  const onEdit = (e) => {
    e.preventDefault();

    let updatedEmp = { ...employeeData, id: parseInt(empNo) };
    let valid = Validate(updatedEmp);

    if (valid) {
      let newData = listEmployee.map((val) =>
        val.empNo === parseInt(empNo) ? updatedEmp : val
      );
      localStorage.setItem("employees", JSON.stringify(newData));

      let departmentData = listDepartment.find(
        (val) => val.mgrEmpNo === parseInt(empNo)
      );
      console.log(departmentData);
      if (departmentData) {
        let updatedDept = { ...departmentData, mgrEmpNo: null };
        let newData = listDepartment.map((val) =>
          val.deptNo === departmentData.deptNo ? updatedDept : val
        );

        localStorage.setItem("departments", JSON.stringify(newData));
      }
      setIsSuccess(true);
    }
  };

  //VALIDATE EMPLOYEE
  const Validate = (newEmp) => {
    let errorMessages = {};

    let existedData = listEmployee.find((val) => val.empNo === newEmp.empNo);

    //-- fName
    if (!newEmp.fName) {
      errorMessages.fName = `First name must be filled!`;
    }

    //-- dob
    if (!newEmp.dob) {
      errorMessages.dob = `Date of birth must be filled!`;
    }

    //-- department
    if (!newEmp.deptNo) {
      errorMessages.deptNo = `Department must be filled!`;
    }

    //-- position
    if (!newEmp.position) {
      errorMessages.position = `Position must be filled!`;
    }
    //-- if manager exist
    else if (existedData && existedData.position !== newEmp.position) {
      if (
        listDepartment.find((val) => parseInt(newEmp.deptNo) === val.deptNo)
          ?.mgrEmpNo !== null &&
        newEmp.position.toLowerCase() === "manager"
      ) {
        errorMessages.position = `Manager position already exist at ${
          listDepartment.find((val) => parseInt(newEmp.deptNo) === val.deptNo)
            .deptName
        }`;
      }
    }

    //-- address
    if (!newEmp.address) {
      errorMessages.address = `Address must be filled!`;
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
          {type === "add" ? "Add Employee" : "Edit Employee"}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formFName">
                <Form.Label className="fw-semibold">First Name</Form.Label>
                <Form.Control
                  ref={inputFocus}
                  type="text"
                  value={employeeData.fName}
                  size="sm"
                  onChange={(e) => onChangeValue("fName", e)}
                  isInvalid={errors.fName}
                />
                {errors.fName && <small>{errors.fName}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLName">
                <Form.Label className="fw-semibold">
                  Last Name{" "}
                  <span className="fw-light tw-text-xs">(optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={employeeData.lName}
                  size="sm"
                  onChange={(e) => onChangeValue("lName", e)}
                  isInvalid={errors.lName}
                />
                {errors.lName && <small>{errors.lName}</small>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group
                controlId="formSex"
                className="d-grid align-items-center"
              >
                <Form.Label className="fw-semibold">Sex</Form.Label>
                <div className="d-flex gap-4">
                  <Form.Check
                    label="Male"
                    name="group1"
                    type="radio"
                    value={"Male"}
                    checked={employeeData.sex === "Male"}
                    onChange={(e) => onChangeValue("sex", e)}
                    id={`checkbox-1`}
                  />
                  <Form.Check
                    inline
                    label="Female"
                    name="group1"
                    type="radio"
                    value={"Female"}
                    checked={employeeData.sex === "Female"}
                    id={`checkbox-1`}
                    onChange={(e) => onChangeValue("sex", e)}
                  />
                </div>

                {errors.sex && <small>{errors.sex}</small>}
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="formDob">
                <Form.Label className="fw-semibold">Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => onChangeValue("dob", e)}
                  isInvalid={errors.dob}
                  value={employeeData.dob}
                  size="sm"
                />
                {errors.dob && <small>{errors.dob}</small>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formDepartment">
                <Form.Label className="fw-semibold">Department</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setEmployeeData({
                      ...employeeData,
                      deptNo: parseInt(e.target.value),
                    })
                  }
                  isInvalid={errors.deptNo}
                  value={employeeData.deptNo}
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
            <Col>
              <Form.Group controlId="formPosition">
                <Form.Label className="fw-semibold">Position</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => onChangeValue("position", e)}
                  isInvalid={errors.position}
                  value={employeeData.position}
                  size="sm"
                />
                {errors.position && <small>{errors.position}</small>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formAddress">
                <Form.Label className="fw-semibold">Address</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={4}
                  value={employeeData.address}
                  size="sm"
                  onChange={(e) => onChangeValue("address", e)}
                  isInvalid={errors.address}
                />
                <p style={{ fontSize: "12px" }}>
                  {employeeData.address.length}/200
                </p>
                {errors.address && <small>{errors.address}</small>}
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

export default EmployeeForm;
