/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { generateEmpNo, getEmployees } from "../../utils/Employees";
import { getDepartments } from "../../utils/Departments";

const initialValue = {
  empNo: 0,
  fName: "",
  lName: "",
  address: "",
  dob: "",
  sex: "",
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
};

const EmployeeForm = ({ type }) => {
  const { id: empNo } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(initialError);
  const [employeeData, setEmployeeData] = useState(initialValue);
  const [listEmployee, setListEmployee] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);

  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);

  useEffect(() => {
    setListEmployee(getEmployees());
    setListDepartment(getDepartments());
  }, []);

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
    let employeeDataAddId = { ...employeeData, id: newId };
    let oldData = listEmployee;
    //let valid = ValidateMember(oldData, newMember);
    let valid = false;
    let newData = [...oldData, employeeDataAddId];

    console.log(employeeData);
    if (valid) {
      localStorage.setItem("employees", JSON.stringify(newData));
      alert("Employee Added!");
      navigate("/employees");
    } else {
      localStorage.setItem("empNo", newId - 1);
    }
  };

  return (
    <Card>
      <Form onSubmit={type === "add" ? onAdd : onEdit}>
        <Card.Header>{type === "add" ? "Add Book" : "Edit Book"}</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Row>
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
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formLName">
                    <Form.Label className="fw-semibold">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={employeeData.lName}
                      size="sm"
                      onChange={(e) => onChangeValue("lName", e)}
                      isInvalid={errors.lName}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Group controlId="formDepartment">
                <Form.Label className="fw-semibold">Department</Form.Label>

                <Form.Select
                  onChange={(e) => onChangeValue("category", e)}
                  isInvalid={errors.category}
                >
                  {listDepartment.map((val) => (
                    <option key={val.deptNo} value={val.deptNo}>
                      {val.deptName}
                    </option>
                  ))}
                </Form.Select>
                {errors.category && <small>{errors.category}</small>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col></Col>
            <Col></Col>
          </Row>
          <Row className="mb-3">
            <Col></Col>
            <Col></Col>
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
