/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import "react-phone-input-2/lib/style.css";
import { addUser, getUser, updateUser } from "../../api/services/Users";
import Swal from "sweetalert2";
import ErrorMessage from "../../utils/ErrorMessage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loading from "../../components/Elements/Loading";

const initialValue = {
  fName: "",
  lName: "",
  userPrivilage: "",
  userPosition: "",
};

const initialError = {
  fName: "",
  lName: "",
  userPrivilage: "",
  userPosition: "",
};

const fetchUserDetail = async ({ id }) => {
  const { data } = await getUser(id);
  return data;
};

const userPositions = ["Library Manager", "Librarian", "Library User"];

const MemberForm = ({ type }) => {
  const navigate = useNavigate();
  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);

  const { id } = useParams();
  const [errors, setErrors] = useState(initialError);
  const [newMember, setNewMember] = useState(initialValue);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userDetail", id],
    queryFn: () => (id ? fetchUserDetail({ id }) : null),
    placeholderData: keepPreviousData,
  });

  //GET USER
  useEffect(() => {
    if (data) {
      setNewMember(data);
    }
  }, [data]);

  //CLEAR FORM
  const clearForm = () => {
    setNewMember(initialValue);
  };

  //ADD MEMBER
  const onAdd = (e) => {
    e.preventDefault();
    let valid = ValidateMember(newMember);
    if (valid) {
      addUser(newMember).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Member added!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/members");
          }, 1500);
        } else {
          if (res.message) {
            ErrorMessage(res.message);
          }
        }
      });
    }
  };

  //VALIDATION MEMBER
  const ValidateMember = (member) => {
    let errorMessages = {};

    if (!member.fName) {
      errorMessages.fName = "First name must be filled!";
    }

    if (!member.userPrivilage) {
      errorMessages.userPrivilage = "User Privilage must be filled!";
    }

    if (!member.userPosition) {
      errorMessages.userPosition = "User Position Privilage must be filled!";
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

  //EDIT MEMBER
  const onEdit = (e) => {
    e.preventDefault();

    let valid = ValidateMember(newMember);
    if (valid) {
      updateUser(id, newMember).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Member updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/members");
          }, 1500);
        } else {
          if (res.message) {
            ErrorMessage(res.message);
          }
        }
      });
    }
  };

  //ON CHANGE VALUE
  const onChangeValue = (key, e) => {
    setNewMember({
      ...newMember,
      [key]: e.target.value,
    });
  };

  //ON CANCEL
  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    return () => {
      clearForm();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return ErrorMessage(error.message);
  }

  return (
    <Card>
      <Form onSubmit={type === "add" ? onAdd : onEdit}>
        <Card.Header>
          {type === "add" ? "Add Member" : "Edit Member"}
        </Card.Header>
        <Card.Body className="d-grid gap-2">
          <Form.Group as={Row} controlId="formFname">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">First Name</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Control
                ref={inputFocus}
                type="text"
                value={newMember.fName}
                size="sm"
                onChange={(e) => onChangeValue("fName", e)}
                isInvalid={errors.fName}
              />
              {errors.fName && <small>{errors.fName}</small>}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formLname">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">Last Name</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Control
                ref={inputFocus}
                type="text"
                value={newMember.lName}
                size="sm"
                onChange={(e) => onChangeValue("lName", e)}
                isInvalid={errors.lName}
              />
              {errors.lName && <small>{errors.lName}</small>}
            </Col>
            <Col>
              <span style={{ fontSize: "13px" }}>(optional)</span>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formUserPrivilage">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">User Privilage</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Control
                ref={inputFocus}
                type="text"
                value={newMember.userPrivilage}
                size="sm"
                onChange={(e) => onChangeValue("userPrivilage", e)}
                isInvalid={errors.userPrivilage}
              />
              {errors.userPrivilage && <small>{errors.userPrivilage}</small>}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formUserPosition">
            <Col className="text-end" sm="2">
              <Form.Label className="fw-semibold">User Position</Form.Label>
            </Col>
            <Col sm="5">
              <Form.Select
                size="sm"
                value={newMember.userPosition}
                onChange={(e) => onChangeValue("userPosition", e)}
                isInvalid={errors.userPosition}
              >
                <option value="" disabled hidden></option>
                {userPositions.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Select>
              {errors.userPosition && <small>{errors.userPosition}</small>}
            </Col>
          </Form.Group>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="d-flex justify-content-end">
            {type !== "edit" ? (
              <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button variant="secondary" onClick={onCancel}>
                  Back
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button variant="danger" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default MemberForm;
