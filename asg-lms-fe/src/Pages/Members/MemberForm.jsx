/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { generateMemberId, getMembers } from "../../utils/Members";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const initialValue = {
  id: 0,
  fullName: "",
  email: "",
  gender: "Male",
  phone: "",
  address: "",
};

const initialError = {
  fullName: "",
  email: "",
  gender: "",
  phone: "",
  address: "",
};

const MemberForm = ({ type }) => {
  const navigate = useNavigate();
  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [type]);

  const { id } = useParams();

  const [list, setList] = useState([]);
  const [errors, setErrors] = useState(initialError);

  const [newMember, setNewMember] = useState(initialValue);

  useEffect(() => {
    if (id) {
      setNewMember(getMembers().find((val) => val.id === parseInt(id)));
    }
  }, [id]);

  //CLEAR FORM
  const clearForm = () => {
    setNewMember(initialValue);
  };

  useEffect(() => {
    setList(getMembers());

    return () => {
      clearForm();
    };
  }, []);

  //ADD MEMBER
  const onAdd = (e) => {
    e.preventDefault();
    let newId = generateMemberId();
    let bookAddId = { ...newMember, id: newId };
    let oldData = list;
    let valid = ValidateMember(oldData, newMember);
    let newData = [...oldData, bookAddId];
    if (valid) {
      localStorage.setItem("members", JSON.stringify(newData));
      alert("Member Added!");
      navigate("/members");
    } else {
      localStorage.setItem("memberId", newId - 1);
    }
  };

  //VALIDATION MEMBER
  const ValidateMember = (oldData, member) => {
    let errorMessages = {};
    //let yearNow = new Date().getFullYear();

    //-- fullName
    if (!member.fullName) {
      errorMessages.fullName = `Full name must be filled!`;
    }

    //-- email
    if (!member.email) {
      errorMessages.email = `Email must be filled!`;
    } else if (!member.email.includes("@") || !member.email.includes(".")) {
      errorMessages.email = `Must be a valid Email!`;
    }

    //-- gender
    if (!member.gender) {
      errorMessages.gender = `Gender must be choosen!`;
    }

    //-- phone
    if (!member.phone || member.phone.length <= 4) {
      errorMessages.phone = `Phone must be filled!`;
    }

    //-- address
    if (!member.address) {
      errorMessages.address = `Address must be filled!`;
    } else if (member.address.length > 200) {
      errorMessages.address = `Address must be 200 characters minimum!`;
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
    let oldData = list;
    let updatedMember = { ...newMember, id: parseInt(id) };

    let newData = oldData.map((val) =>
      val.id === parseInt(id) ? updatedMember : val
    );
    localStorage.setItem("members", JSON.stringify(newData));
    alert("Member Updated!");
    navigate("/members");
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
  return (
    <Card>
      <Form onSubmit={type === "add" ? onAdd : onEdit}>
        <Card.Header>
          {type === "add" ? "Add Member" : "Edit Member"}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formFullNama">
                <Form.Label className="fw-semibold">Full Name</Form.Label>
                <Form.Control
                  ref={inputFocus}
                  type="text"
                  value={newMember.fullName}
                  size="sm"
                  onChange={(e) => onChangeValue("fullName", e)}
                  isInvalid={errors.fullName}
                />
                {errors.fullName && <small>{errors.fullName}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={newMember.email}
                  size="sm"
                  onChange={(e) => onChangeValue("email", e)}
                  isInvalid={errors.email}
                />
                {errors.email && <small>{errors.email}</small>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group
                controlId="formGender"
                className="d-grid align-items-center"
              >
                <Form.Label className="fw-semibold">Gender</Form.Label>
                <div className="d-flex gap-4">
                  <Form.Check
                    label="Male"
                    name="group1"
                    type="radio"
                    value={"Male"}
                    checked={newMember.gender === "Male"}
                    onChange={(e) => onChangeValue("gender", e)}
                    id={`checkbox-1`}
                  />
                  <Form.Check
                    inline
                    label="Female"
                    name="group1"
                    type="radio"
                    value={"Female"}
                    checked={newMember.gender === "Female"}
                    id={`checkbox-1`}
                    onChange={(e) => onChangeValue("gender", e)}
                  />
                </div>

                {errors.gender && <small>{errors.gender}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPhone">
                <Form.Label className="fw-semibold">Phone</Form.Label>
                <PhoneInput
                  inputStyle={{ width: "100%" }}
                  country={"id"}
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e })}
                />
                {errors.phone && <small>{errors.phone}</small>}
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
                  value={newMember.address}
                  size="sm"
                  onChange={(e) => onChangeValue("address", e)}
                  isInvalid={errors.address}
                />
                <p style={{ fontSize: "12px" }}>
                  {newMember.address.length}/200
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
