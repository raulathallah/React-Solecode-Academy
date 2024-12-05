/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Tab,
  Table,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import { addEmployee, getEmployee, updateEmployee } from "../../api/Employee";
import ErrorMessage from "../../utils/ErrorMessage";
import Loading from "../../components/Elements/Loading";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllEmployees } from "../../api/Fetchs/FetchEmployees";
import { fetchAllDepartments } from "../../api/Fetchs/FetchDepartments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const initialValue = {
  fname: "",
  lname: "",
  address: "",
  dob: "",
  sex: "",
  salary: 0,
  ssn: "",
  emailAddress: "",
  phoneNumber: "",
  position: "",
  deptno: 0,
  empType: "",
  empLevel: 1,
  directSupervisor: 0,
  empDependents: [],
};

const initialValueDependant = {
  fname: "",
  lname: "",
  sex: "",
  relation: "",
  birthDate: "",
};

const initialError = {
  fname: "",
  lname: "",
  address: "",
  dob: "",
  sex: "",
  salary: "",
  ssn: "",
  emailAddress: "",
  phoneNumber: "",
  position: "",
  deptno: "",
  empType: "",
  empLevel: "",
  directSupervisor: "",
  empDependents: "",
};

const EmployeeForm = ({ type }) => {
  const { id: empNo } = useParams();
  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);
  const navigate = useNavigate();

  const [errors, setErrors] = useState(initialError);
  const [employeeData, setEmployeeData] = useState(initialValue);
  const [dependantData, setDependantData] = useState(initialValueDependant);
  const [isSuccess, setIsSuccess] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [dependants, setDependants] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: listE,
    isLoading: isLoadingE,
    isError: isErrorE,
    error: errorE,
  } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: () => fetchAllEmployees(),
    placeholderData: keepPreviousData,
  });

  const {
    data: listD,
    isLoading: isLoadingD,
    isError: isErrorD,
    error: errorD,
  } = useQuery({
    queryKey: ["allDepartments"],
    queryFn: () => fetchAllDepartments(),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (listE) {
      setEmployees(listE);
    }
  }, [listE]);

  useEffect(() => {
    if (listD) {
      setDepartments(listD);
    }
  }, [listD]);

  useEffect(() => {
    return () => {
      clearForm();
    };
  }, []);

  useEffect(() => {
    if (empNo) {
      getEmployee(empNo)
        .then((res) => {
          if (res.status === 200) {
            setEmployeeData(res.data);
            setDependants(res.data.empDependents);
          }
        })
        .finally(() => setTimeout(() => {}, 1500));
    }
  }, [empNo]);

  //ALERT FEEDBACK
  useEffect(() => {
    if (isSuccess) {
      let alertMessage = "";
      if (type === "add") {
        alertMessage = "Employee added!";
      } else {
        alertMessage = "Employee updated!";
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
    if (dependants) {
      setEmployeeData({ ...employeeData, empDependents: dependants });
    }
  }, [dependants]);

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
    let valid = Validate(employeeData);
    if (valid) {
      addEmployee(employeeData)
        .then((res) => {
          if (res.status === 200) {
            setIsSuccess(true);
          }
        })
        .catch((err) => ErrorMessage(err.message));
    }
  };

  //EDIT EMPLOYEE
  const onEdit = (e) => {
    e.preventDefault();
    let valid = Validate(employeeData);

    if (valid) {
      updateEmployee(empNo, employeeData)
        .then((res) => {
          if (res.status === 200) {
            setIsSuccess(true);
          }
        })
        .catch((err) => ErrorMessage(err.message));
    }
  };
  const onAddDependants = () => {
    setDependants([...dependants, dependantData]);
    setDependantData(initialValueDependant);
    handleClose();
  };

  const onDeleteDependants = (val) => {
    const filtered = dependants.filter((x) => x !== val);
    setDependants(filtered);
  };

  //VALIDATE EMPLOYEE
  const Validate = (newEmp) => {
    let errorMessages = {};

    //-- fName
    if (!newEmp.fname) {
      errorMessages.fname = `First name must be filled!`;
    }

    //-- sex
    if (!newEmp.sex) {
      errorMessages.sex = `Sex name must be filled!`;
    }

    //-- email
    if (!newEmp.emailAddress) {
      errorMessages.emailAddress = `Email must be filled!`;
    }

    //-- phone
    if (!newEmp.phoneNumber) {
      errorMessages.phoneNumber = `Phone number must be filled!`;
    }

    //-- dob
    if (!newEmp.dob) {
      errorMessages.dob = `Date of birth must be filled!`;
    }

    //-- department
    if (!newEmp.deptno) {
      errorMessages.deptno = `Department must be filled!`;
    }

    //-- position
    if (!newEmp.position) {
      errorMessages.position = `Position must be filled!`;
    }

    //-- salary
    if (!newEmp.salary) {
      errorMessages.salary = `Salary must be filled!`;
    }

    //-- ssn
    if (!newEmp.ssn) {
      errorMessages.ssn = `Ssn must be filled!`;
    }

    //-- emptype
    if (!newEmp.empType) {
      errorMessages.empType = `Employee type must be filled!`;
    }

    //-- emplevel
    if (!newEmp.empLevel) {
      errorMessages.empLevel = `Employee level must be filled!`;
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
  console.log({ employeeData });
  if (isLoadingE && isLoadingD) {
    return <Loading />;
  }

  if (isErrorE && errorE) {
    return <p>Error... {errorE.message}</p>;
  }

  if (isErrorD && errorD) {
    return <p>Error... {errorD.message}</p>;
  }

  return (
    <>
      <Card>
        <Form onSubmit={type === "add" ? onAdd : onEdit}>
          <Card.Header>
            {type === "add" ? "Add Employee" : "Edit Employee"}
          </Card.Header>
          <Card.Body>
            <Tabs
              defaultActiveKey="detail"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab
                eventKey="detail"
                title={
                  <span>
                    Details{" "}
                    {errors !== initialError && <Badge bg="danger">!</Badge>}
                  </span>
                }
              >
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formFName">
                      <Form.Label className="fw-semibold">
                        First Name
                      </Form.Label>
                      <Form.Control
                        ref={inputFocus}
                        type="text"
                        value={employeeData.fname}
                        size="sm"
                        onChange={(e) => onChangeValue("fname", e)}
                        isInvalid={errors.fname}
                      />
                      {errors.fname && <small>{errors.fname}</small>}
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
                        value={employeeData.lname}
                        size="sm"
                        onChange={(e) => onChangeValue("lname", e)}
                        isInvalid={errors.lname}
                      />
                      {errors.lname && <small>{errors.lname}</small>}
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
                          isInvalid={errors.sex}
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
                          isInvalid={errors.sex}
                        />
                      </div>

                      {errors.sex && <small>{errors.sex}</small>}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="formDob">
                      <Form.Label className="fw-semibold">
                        Date of Birth
                      </Form.Label>
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
                    <Form.Group controlId="formEmail">
                      <Form.Label className="fw-semibold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        onChange={(e) => onChangeValue("emailAddress", e)}
                        isInvalid={errors.emailAddress}
                        value={employeeData.emailAddress}
                        size="sm"
                      />
                      {errors.emailAddress && (
                        <small>{errors.emailAddress}</small>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPhone">
                      <Form.Label className="fw-semibold">Phone</Form.Label>
                      <PhoneInput
                        inputStyle={{ width: "100%" }}
                        country={"id"}
                        value={employeeData.phoneNumber}
                        onChange={(e) =>
                          setEmployeeData({ ...employeeData, phoneNumber: e })
                        }
                        isValid={!errors.phoneNumber}
                      />
                      {errors.phoneNumber && (
                        <small>{errors.phoneNumber}</small>
                      )}
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
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formDepartment">
                      <Form.Label className="fw-semibold">
                        Department
                      </Form.Label>
                      <Form.Select
                        onChange={(e) =>
                          setEmployeeData({
                            ...employeeData,
                            deptno: parseInt(e.target.value),
                          })
                        }
                        isInvalid={errors.deptno}
                        value={employeeData.deptno}
                        disabled={type !== "add"}
                        size="sm"
                      >
                        <option disabled value={0} hidden />
                        {departments.map((val) => (
                          <option key={val.deptno} value={val.deptno}>
                            {val.deptname}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.deptno && <small>{errors.deptno}</small>}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <Form.Group controlId="formDirectSupervisor">
                          <Form.Label className="fw-semibold">
                            Direct Supervisor
                          </Form.Label>
                          <Form.Select
                            onChange={(e) =>
                              setEmployeeData({
                                ...employeeData,
                                directSupervisor: parseInt(e.target.value),
                              })
                            }
                            isInvalid={errors.directSupervisor}
                            value={
                              employeeData.directSupervisor
                                ? employeeData.directSupervisor
                                : 0
                            }
                            size="sm"
                            disabled={!employeeData.deptno}
                          >
                            <option disabled value={0} hidden />
                            {employees
                              .filter((f) => f.deptno === employeeData.deptno)
                              .map((val) => (
                                <option key={val.empno} value={val.empno}>
                                  {`${val.empno} - ${val.fname} ${val.lname}`}
                                </option>
                              ))}
                          </Form.Select>
                          {errors.directSupervisor && (
                            <small>{errors.directSupervisor}</small>
                          )}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formPosition">
                          <Form.Label className="fw-semibold">
                            Position
                          </Form.Label>
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
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formSalary">
                      <Form.Label className="fw-semibold">Salary</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          setEmployeeData({
                            ...employeeData,
                            salary: e.target.value
                              ? parseInt(e.target.value)
                              : 0,
                          })
                        }
                        isInvalid={errors.salary}
                        value={employeeData.salary}
                        size="sm"
                      />
                      {errors.salary && <small>{errors.salary}</small>}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formSsn">
                      <Form.Label className="fw-semibold">SSN</Form.Label>
                      <Form.Control
                        type="text"
                        value={employeeData.ssn}
                        size="sm"
                        onChange={(e) => onChangeValue("ssn", e)}
                        isInvalid={errors.ssn}
                      />
                      {errors.ssn && <small>{errors.ssn}</small>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formEmpType">
                      <Form.Label className="fw-semibold">
                        Employee Type
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => onChangeValue("empType", e)}
                        isInvalid={errors.empType}
                        value={employeeData.empType}
                        size="sm"
                      >
                        <option disabled value={""} hidden />
                        <option key={1} value={"Permanent"}>
                          Permanent
                        </option>
                        <option key={2} value={"Contract"}>
                          Contract
                        </option>
                      </Form.Select>
                      {errors.empType && <small>{errors.empType}</small>}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formEmpLevel">
                      <Form.Label className="fw-semibold">
                        Employee Level
                      </Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e) =>
                          setEmployeeData({
                            ...employeeData,
                            empLevel: parseInt(e.target.value),
                          })
                        }
                        isInvalid={errors.empLevel}
                        value={employeeData.empLevel}
                        size="sm"
                      />
                      {errors.empLevel && <small>{errors.empLevel}</small>}
                    </Form.Group>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="dependants" title="Dependants">
                <Row>
                  <Form.Group controlId="formMgrEmpNo">
                    <Form.Label className="">
                      <Button variant="primary" size="sm" onClick={handleShow}>
                        Add Dependants
                      </Button>
                    </Form.Label>

                    <Table striped bordered hover responsive="sm">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Relation</th>
                          <th>Name</th>
                          <th>Sex</th>
                          <th>Birth Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dependants &&
                          dependants.map((val, key) => (
                            <tr key={key}>
                              <td style={{ width: "10%" }}>{key + 1}</td>
                              <td>{val.relation}</td>
                              <td>{`${val.fname} ${val.lname}`}</td>
                              <td>{val.sex}</td>
                              <td>
                                {val.birthDate
                                  ? moment(dependants.birthDate).format(
                                      "DD MMMM, YYYY"
                                    )
                                  : ""}
                              </td>
                              <td
                                className="tw-text-center"
                                style={{ width: "15%" }}
                              >
                                <OverlayTrigger
                                  overlay={<Tooltip>Delete</Tooltip>}
                                >
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDeleteDependants(val)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </Button>
                                </OverlayTrigger>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Form.Group>
                </Row>
              </Tab>
            </Tabs>
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

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Dependants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group controlId="formMgrEmpNo">
              <Form.Label className="fw-semibold">Relation</Form.Label>
              <Form.Control
                ref={inputFocus}
                type="text"
                value={dependantData.relation}
                size="sm"
                onChange={(e) =>
                  setDependantData({
                    ...dependantData,
                    relation: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formFNameD">
                <Form.Label className="fw-semibold">First Name</Form.Label>
                <Form.Control
                  ref={inputFocus}
                  type="text"
                  value={dependantData.fname}
                  size="sm"
                  onChange={(e) =>
                    setDependantData({
                      ...dependantData,
                      fname: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLNameD">
                <Form.Label className="fw-semibold">
                  Last Name{" "}
                  <span className="fw-light tw-text-xs">(optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={dependantData.lname}
                  size="sm"
                  onChange={(e) =>
                    setDependantData({
                      ...dependantData,
                      lname: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="formMgrEmpNo">
              <Form.Label className="fw-semibold">Sex</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setDependantData({ ...dependantData, sex: e.target.value })
                }
                value={dependantData.sex}
                size="sm"
              >
                <option disabled value={""} hidden />
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="formDobD">
              <Form.Label className="fw-semibold">Date of Birth</Form.Label>
              <Form.Control
                type="date"
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setDependantData({
                    ...dependantData,
                    birthDate: e.target.value,
                  })
                }
                value={dependants.birthDate}
                size="sm"
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onAddDependants}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeForm;
