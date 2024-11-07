/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { getEmployees } from "../../utils/Employees";
import { generateDeptNo, getDepartments } from "../../utils/Departments";
import Swal from "sweetalert2";

const initialValue = {
  deptNo: 0,
  deptName: "",
  mgrEmpNo: 0,
};

const initialError = {
  deptName: "",
  mgrEmpNo: "",
};

const DepartmentForm = ({ type }) => {
  const { id: deptNo } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(initialError);
  const [departmentData, setDepartmentData] = useState(initialValue);
  const [isSuccess, setIsSuccess] = useState(false);
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

    console.log(departmentData);
    return () => {
      clearForm();
      setIsSuccess(false);
    };
  }, []);

  //ALERT FEEDBACK
  useEffect(() => {
    if (isSuccess) {
      let alertMessage = "";
      if (type !== "add") {
        alertMessage = "Department updated!";
      } else {
        alertMessage = "Department added!";
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: alertMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/departments");
      }, 1500);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (deptNo) {
      setDepartmentData(
        getDepartments().find((val) => val.deptNo === parseInt(deptNo))
      );
    }
  }, [deptNo]);

  //ON CHANGE VALUE
  const onChangeValue = (key, e) => {
    if (e.target.type === "checkbox") {
      setDepartmentData({
        ...departmentData,
        [key]: e.target.checked,
      });
    } else {
      setDepartmentData({
        ...departmentData,
        [key]: e.target.value,
      });
    }
  };

  //CLEAR FORM
  const clearForm = () => {
    setDepartmentData(initialValue);
  };

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  //ADD DEPARTMENT
  const onAdd = (e) => {
    e.preventDefault();
    let newId = generateDeptNo();

    let manager = departmentData.mgrEmpNo;
    if (departmentData.mgrEmpNo === 0) {
      manager = null;
    }

    let departmentDataAddId = {
      ...departmentData,
      deptNo: newId,
      mgrEmpNo: manager,
    };

    let valid = Validate(departmentData);

    if (valid) {
      let newData = [...listDepartment, departmentDataAddId];
      localStorage.setItem("departments", JSON.stringify(newData));
      setIsSuccess(true);
    } else {
      localStorage.setItem("deptNo", newId - 1);
    }
  };

  //EDIT DEPARTMENT
  const onEdit = (e) => {
    e.preventDefault();

    let manager = departmentData.mgrEmpNo;
    if (departmentData.mgrEmpNo === 0) {
      manager = null;
    }
    let updatedDept = {
      ...departmentData,
      deptNo: parseInt(deptNo),
      mgrEmpNo: manager,
    };
    let valid = Validate(updatedDept);
    if (valid) {
      let newData = listDepartment.map((val) =>
        val.deptNo === parseInt(deptNo) ? updatedDept : val
      );

      localStorage.setItem("departments", JSON.stringify(newData));
      setIsSuccess(true);
    }
  };

  //VALIDATE DEPARTMENT
  const Validate = (newDept) => {
    let errorMessages = {};
    console.log(newDept);
    //-- deptName
    if (!newDept.deptName) {
      errorMessages.deptName = `Department name must be filled!`;
    }

    //-- isExist
    let isExist = listDepartment.find((val) => val.deptNo === newDept.deptNo);
    if (isExist && isExist.deptName !== newDept.deptName) {
      errorMessages.deptName = `Department ${newDept.deptName} already exist!`;
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
          {type === "add" ? "Add Department" : "Edit Department"}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formDeptName">
                <Form.Label className="fw-semibold">Department Name</Form.Label>
                <Form.Control
                  ref={inputFocus}
                  type="text"
                  value={departmentData.deptName}
                  size="sm"
                  onChange={(e) => onChangeValue("deptName", e)}
                  isInvalid={errors.deptName}
                />
                {errors.deptName && <small>{errors.deptName}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formMgrEmpNo">
                <Form.Label className="fw-semibold">
                  Manager{" "}
                  <span className="fw-light tw-text-xs">(optional)</span>
                </Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setDepartmentData({
                      ...departmentData,
                      mgrEmpNo: parseInt(e.target.value),
                    })
                  }
                  isInvalid={errors.mgrEmpNo}
                  value={departmentData.mgrEmpNo ? departmentData.mgrEmpNo : 0}
                  size="sm"
                >
                  <option disabled value={0} />
                  {listEmployee
                    .filter(
                      (x) =>
                        x.position.toLowerCase() === "manager" &&
                        !listDepartment
                          .map((ld) => ld.mgrEmpNo)
                          .find((y) => y === x.empNo)
                    )
                    .map((val) => (
                      <option key={val.empNo} value={val.empNo}>
                        {`${val.fName}, ${val.lName}`}
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

export default DepartmentForm;
