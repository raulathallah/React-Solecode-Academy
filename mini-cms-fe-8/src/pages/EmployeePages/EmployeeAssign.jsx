import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import {
  fetchAllEmployees,
  fetchEmployeeDetail,
} from "../../api/Fetchs/FetchEmployees";
import { fetchAllDepartments } from "../../api/Fetchs/FetchDepartments";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { useNavigate } from "react-router";
import { assignEmployee } from "../../api/Employee";
import Swal from "sweetalert2";
import ErrorMessage from "../../utils/ErrorMessage";
const initialError = {
  empNo: "",
  deptNo: "",
};

const EmployeeAssign = () => {
  const [errors, setErrors] = useState(initialError);
  const [empNo, setEmpNo] = useState(0);
  const [deptNo, setDeptNo] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const [listEmployee, setListEmployee] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);

  const { data: listE } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: () => fetchAllEmployees(),
    placeholderData: keepPreviousData,
  });

  const { data: listD } = useQuery({
    queryKey: ["allDepartments"],
    queryFn: () => fetchAllDepartments(),
    placeholderData: keepPreviousData,
  });

  const { data: empDetail } = useQuery({
    queryKey: ["employeeDetail", empNo],
    queryFn: () => (empNo ? fetchEmployeeDetail({ id: empNo }) : null),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (listE) {
      setListEmployee(listE);
    }
  }, [listE]);

  useEffect(() => {
    if (listD) {
      setListDepartment(listD);
    }
  }, [listD]);

  useEffect(() => {
    if (empDetail) {
      setDeptNo(empDetail.deptno);
    }
  }, [empDetail]);

  //VALIDATE DEPARTMENT
  const Validate = () => {
    let errorMessages = {};

    //-- deptName
    if (!deptNo) {
      errorMessages.deptNo = `Department must be filled!`;
    }
    if (!empNo) {
      errorMessages.empNo = `Employee must be filled!`;
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

  //ALERT FEEDBACK
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Employee assigned!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/employees");
      }, 1500);
    }
  }, [isSuccess]);

  const onAssign = (e) => {
    e.preventDefault();

    let valid = Validate();
    if (valid) {
      assignEmployee(empNo, { deptNo }).then((res) => {
        if (res.response) {
          let r = res.response.data;
          if (r.status === "Error") {
            ErrorMessage(r.message);
          }
        } else {
          setIsSuccess(true);
        }
      });
    }
  };

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };
  return (
    <Card>
      <Form onSubmit={onAssign}>
        <Card.Header>{"Assign Employee"}</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formDeptName">
                <Form.Label className="fw-semibold">Employee</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setEmpNo(parseInt(e.target.value));
                  }}
                  isInvalid={errors.empNo}
                  value={empNo}
                  size="sm"
                >
                  <option disabled value={0} hidden>
                    -- select employee --
                  </option>
                  {listEmployee.map((val) => (
                    <option key={val.empno} value={val.empno}>
                      {`${val.empno} - ${val.fname} ${val.lname}`}
                    </option>
                  ))}
                </Form.Select>
                {errors.empNo && <small>{errors.empNo}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formMgrEmpNo">
                <Form.Label className="fw-semibold">Department</Form.Label>
                <Form.Select
                  onChange={(e) => setDeptNo(e.target.value)}
                  isInvalid={errors.deptNo}
                  value={deptNo}
                  size="sm"
                >
                  <option disabled value={0} hidden />
                  {listDepartment.map((val) => (
                    <option key={val.deptno} value={val.deptno}>
                      {`${val.deptname}`}
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
            <div className="d-flex gap-2">
              <ButtonCustom variant="secondary" onClick={onCancel}>
                Back
              </ButtonCustom>
              <ButtonCustom variant="primary" type="submit">
                Submit
              </ButtonCustom>
            </div>
          </div>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default EmployeeAssign;
