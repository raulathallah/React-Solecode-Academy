import { Card, Col, Form, Row } from "react-bootstrap";
import ButtonCustom from "../../components/Elements/ButtonCustom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { leaveRequest } from "../../api/Employee";
import Swal from "sweetalert2";
import ErrorMessage from "../../utils/ErrorMessage";
import Loading from "../../components/Elements/Loading";

const initialValue = {
  empno: 0,
  leaveType: "",
  leaveReason: "",
  startDate: "",
  endDate: "",
};

const initialError = {
  leaveType: "",
  leaveReason: "",
  startDate: "",
  endDate: "",
  file: "",
};

const leaveTypeList = ["Annual Leave", "Sick Leave", "Personal Leave"];

const ALLOWED_FILE_TYPES = [
  "application/pdf", // PDF
  "image/jpeg", //JPG JPEG
];

const LeaveRequestForm = () => {
  const inputFocus = useRef(null);
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB dalam bytes

  const [errors, setErrors] = useState(initialError);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newRequest, setNewRequest] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const employeeName =
    currentUser?.employee?.fname + " " + currentUser?.employee?.lname;
  const empNo = currentUser?.employee?.empno;

  useEffect(() => {
    if (currentUser) {
      setNewRequest({ ...newRequest, empno: empNo });
    }
  }, [currentUser]);
  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };
  const onChangeValue = (key, e) => {
    setNewRequest({ ...newRequest, [key]: e.target.value });
  };
  const getTotalDays = () => {
    if (newRequest.endDate && newRequest.startDate) {
      var ed = new Date(newRequest.endDate);
      var sd = new Date(newRequest.startDate);

      let result = Math.floor((ed - sd) / (1000 * 60 * 60 * 24)) + 1;
      return result;
    }

    return 0;
  };

  const Validate = () => {
    let errorMessages = {};

    if (!newRequest.leaveType) {
      errorMessages.leaveType = `Leave type must be filled!`;
    }
    if (!newRequest.leaveReason) {
      errorMessages.leaveReason = `Leave reason must be filled!`;
    }
    if (!newRequest.startDate) {
      errorMessages.startDate = `Start Date must be filled!`;
    }
    if (!newRequest.endDate) {
      errorMessages.endDate = `End Date must be filled!`;
    }

    if (getTotalDays() > 1) {
      if (!selectedFile) {
        errorMessages.file = `Choose file!`;
      }
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

  const onRequestLeave = (e) => {
    e.preventDefault();

    let valid = Validate();
    if (valid) {
      setLoading(true);
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      formData.append("empno", newRequest.empno);
      formData.append("leaveType", newRequest.leaveType);
      formData.append("leaveReason", newRequest.leaveReason);
      formData.append("startDate", newRequest.startDate);
      formData.append("endDate", newRequest.endDate);

      leaveRequest(formData)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Request leave success!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            ErrorMessage(res.message);
          }
        })
        .catch((err) => {
          ErrorMessage(err.message);
        })
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            navigate("/leave-request/list");
          }, 1500);
        });
    }
  };

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 5 MB limit";
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Only PDF and Word documents are allowed";
    }

    return null;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: validationError,
          showConfirmButton: false,
          timer: 1500,
        });
        setSelectedFile(null);
        event.target.value = ""; // Reset input file
        return;
      }
      setSelectedFile(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Card>
      <Form onSubmit={onRequestLeave}>
        <Card.Header>Request Leave</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formFName">
                <Form.Label className="fw-semibold">Employee</Form.Label>
                <Form.Control
                  ref={inputFocus}
                  type="text"
                  value={employeeName}
                  size="sm"
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formStartDate">
                <Form.Label className="fw-semibold">Start Date</Form.Label>
                <Form.Control
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={newRequest.startDate}
                  onChange={(e) => onChangeValue("startDate", e)}
                  isInvalid={errors.startDate}
                  size="sm"
                />
                {errors.startDate && <small>{errors.startDate}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEndDate">
                <Form.Label className="fw-semibold">End Date</Form.Label>
                <Form.Control
                  type="date"
                  min={
                    newRequest.startDate
                      ? new Date(newRequest.startDate)
                          .toISOString()
                          .split("T")[0]
                      : null
                  }
                  disabled={!newRequest.startDate}
                  isInvalid={errors.endDate}
                  value={newRequest.endDate}
                  onChange={(e) => onChangeValue("endDate", e)}
                  size="sm"
                />
                {errors.endDate && <small>{errors.endDate}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formTotalDays">
                <Form.Label className="fw-semibold">Total Days</Form.Label>
                <Form.Control
                  type="number"
                  value={getTotalDays()}
                  size="sm"
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formLeaveType">
                <Form.Label className="fw-semibold">Leave Type</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    onChangeValue("leaveType", e);
                    setSelectedFile(null);
                  }}
                  value={newRequest.leaveType}
                  isInvalid={errors.leaveType}
                  size="sm"
                >
                  <option disabled value={""} hidden />
                  {leaveTypeList.map((val) => (
                    <option key={val} value={val}>
                      {`${val}`}
                    </option>
                  ))}
                </Form.Select>
                {errors.leaveType && <small>{errors.leaveType}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLeaveType">
                <Form.Label className="fw-semibold">Reason</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => onChangeValue("leaveReason", e)}
                  value={newRequest.leaveReason}
                  isInvalid={errors.leaveReason}
                  size="sm"
                />
                {errors.leaveReason && <small>{errors.leaveReason}</small>}
              </Form.Group>
            </Col>
            <Col>
              {getTotalDays() > 1 && newRequest.leaveType === "Sick Leave" && (
                <Form.Group controlId="formFile">
                  <Form.Label className="fw-semibold">
                    Medical Certificate ( pdf / jpg / jpeg , max 5MB )
                  </Form.Label>
                  <div className="mb-3">
                    <Form.Control
                      type="file"
                      size="sm"
                      onChange={handleFileSelect}
                      className="form-control"
                      accept=".pdf,.jpg,.jpeg"
                      isInvalid={errors.file}
                    />

                    {selectedFile && (
                      <div className="mt-2 text-muted">
                        Selected file: {selectedFile.name} (
                        {formatFileSize(selectedFile.size)})
                      </div>
                    )}
                  </div>
                  {errors.file && <small>{errors.file}</small>}
                </Form.Group>
              )}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="d-flex justify-content-end">
            <div className="d-flex gap-2">
              <ButtonCustom variant="primary" type="submit">
                Submit
              </ButtonCustom>
              <ButtonCustom variant="danger" onClick={onCancel}>
                Cancel
              </ButtonCustom>
            </div>
          </div>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default LeaveRequestForm;
