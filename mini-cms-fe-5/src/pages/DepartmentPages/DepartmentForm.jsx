/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import Swal from "sweetalert2";
import {
  addDepartment,
  getDepartment,
  updateDepartment,
} from "../../api/Department";
import { getAllEmployee } from "../../api/Employee";
import Loading from "../../components/Elements/Loading";
import ErrorMessage from "../../utils/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const initialValue = {
  deptname: "",
  mgrempno: 0,
  location: [],
};

const initialError = {
  deptname: "",
  mgrempno: "",
  location: "",
};

const locations = [
  {
    id: 1,
    name: "Jakarta",
  },
  {
    id: 2,
    name: "Bandung",
  },
  {
    id: 3,
    name: "Surabaya",
  },
];

const DepartmentForm = ({ type }) => {
  const { id: deptNo } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(initialError);
  const [departmentData, setDepartmentData] = useState(initialValue);
  const [isSuccess, setIsSuccess] = useState(false);
  const [listEmployee, setListEmployee] = useState([]);
  //const [location] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);

  const [deptLocations, setDeptLocations] = useState([]);
  const [locationTemp, setLocationTemp] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onAddLocations = () => {
    setDeptLocations([...deptLocations, locationTemp]);
    setLocationTemp(0);
    handleClose();
  };

  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);

  useEffect(() => {
    getAllEmployee().then((res) => {
      if (res.status === 200) {
        let filtered = res.data.filter(
          (val) => val.deptno === parseInt(deptNo)
        );
        setListEmployee(filtered);
      }
    });
  }, [deptNo]);

  useEffect(() => {
    return () => {
      clearForm();
      setIsSuccess(false);
    };
  }, []);

  useEffect(() => {
    if (deptLocations) {
      setDepartmentData({ ...departmentData, location: deptLocations });
    }
  }, [deptLocations]);

  //ALERT FEEDBACK
  useEffect(() => {
    if (isSuccess) {
      let alertMessage = "";
      if (type === "add") {
        alertMessage = "Department added!";
      } else {
        alertMessage = "Department updated!";
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
      setLoading(true);
      getDepartment(deptNo)
        .then((res) => {
          if (res.status === 200) {
            setDepartmentData(res.data);
            setDeptLocations(res.data.location);
          }
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false);
          }, 1500)
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

  const onDeleteLocation = (val) => {
    const filtered = deptLocations.filter((x) => x !== val);
    setDeptLocations(filtered);
  };

  //ADD DEPARTMENT
  const onAdd = (e) => {
    e.preventDefault();
    let valid = Validate(departmentData);
    if (valid) {
      const body = {
        ...departmentData,
        mgrempno:
          departmentData.mgrempno === 0 ? null : departmentData.mgrempno,
      };
      addDepartment(body).then((res) => {
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

  //EDIT DEPARTMENT
  const onEdit = (e) => {
    e.preventDefault();
    let valid = Validate(departmentData);
    if (valid) {
      const body = {
        ...departmentData,
        mgrempno:
          departmentData.mgrempno === 0 ? null : departmentData.mgrempno,
      };
      updateDepartment(deptNo, body).then((res) => {
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

  //VALIDATE DEPARTMENT
  const Validate = (newDept) => {
    let errorMessages = {};

    //-- deptName
    if (!newDept.deptname) {
      errorMessages.deptName = `Department name must be filled!`;
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
    <>
      <Card>
        <Form onSubmit={type === "add" ? onAdd : onEdit}>
          <Card.Header>
            {type === "add" ? "Add Department" : "Edit Department"}
          </Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formDeptName">
                  <Form.Label className="fw-semibold">
                    Department Name
                  </Form.Label>
                  <Form.Control
                    ref={inputFocus}
                    type="text"
                    value={departmentData.deptname}
                    size="sm"
                    onChange={(e) => onChangeValue("deptname", e)}
                    isInvalid={errors.deptname}
                  />
                  {errors.deptname && <small>{errors.deptname}</small>}
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
                        mgrempno: parseInt(e.target.value),
                      })
                    }
                    isInvalid={errors.mgrempno}
                    value={
                      departmentData.mgrempno ? departmentData.mgrempno : 0
                    }
                    size="sm"
                  >
                    <option disabled value={null} hidden />
                    <option value={0}>None</option>
                    {listEmployee
                      .filter((x) => x.deptno === departmentData.deptno)
                      .map((val) => (
                        <option key={val.empno} value={val.empno}>
                          {`${val.empno} - ${val.fname} ${val.lname}`}
                        </option>
                      ))}
                  </Form.Select>
                  {errors.mgrempno && <small>{errors.mgrempno}</small>}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formMgrEmpNo">
                  <Form.Label className="fw-semibold tw-flex tw-justify-between">
                    Locations{" "}
                    <Button variant="primary" size="sm" onClick={handleShow}>
                      Add Location
                    </Button>
                  </Form.Label>

                  <Table striped bordered hover responsive="sm">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Location Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deptLocations &&
                        deptLocations.map((val, key) => (
                          <tr key={key}>
                            <td style={{ width: "10%" }}>{key + 1}</td>
                            <td>
                              {val
                                ? locations.find((x) => x.id === val)?.name
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
                                  onClick={() => onDeleteLocation(val)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  {errors.mgrempno && <small>{errors.mgrempno}</small>}
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

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formMgrEmpNo">
            <Form.Label className="fw-semibold">Location Name</Form.Label>
            <Form.Select
              onChange={(e) => setLocationTemp(parseInt(e.target.value))}
              value={locationTemp}
              size="sm"
            >
              <option disabled value={0} hidden />
              {locations
                .filter((x) => !departmentData.location.includes(x.id))
                .map((val) => (
                  <option key={val.id} value={val.id}>
                    {`${val.name}`}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onAddLocations}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DepartmentForm;
