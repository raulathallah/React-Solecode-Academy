/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { addUser, getAllUser, getUser, updateUser } from "../../api/Users";
import Swal from "sweetalert2";
import ErrorMessage from "../../utils/ErrorMessage";

const initialValue = {
  username: "",
  phonenumber: "",
};

const initialError = {
  username: "",
  phonenumber: "",
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

  //GET USER
  useEffect(() => {
    if (id) {
      getUser(
        id,
        (res) => {
          setNewMember(res.data);
        },
        (err) => {
          console.log(err.message);
        }
      );
    }
  }, [id]);

  //CLEAR FORM
  const clearForm = () => {
    setNewMember(initialValue);
  };

  //GET USERS
  useEffect(() => {
    getAllUser(
      (res) => {
        setList(res.data);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);

  //ADD MEMBER
  const onAdd = (e) => {
    e.preventDefault();
    let valid = ValidateMember(list, newMember);
    if (valid) {
      addUser(
        newMember,
        (res) => {
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
          }
        },
        (err) => {
          ErrorMessage(err.message);
        }
      );
    }
  };

  //VALIDATION MEMBER
  const ValidateMember = (oldData, member) => {
    let errorMessages = {};

    const isExist = list.filter((x) => x.userid !== parseInt(id));
    //-- username
    if (!member.username) {
      errorMessages.username = `Usrname must be filled!`;
    } else if (
      isExist &&
      isExist.find((val) => val.username === member.username)
    ) {
      errorMessages.username = `Username already taken!`;
    }

    //-- phonenumber
    if (!member.phonenumber || member.phonenumber.length <= 4) {
      errorMessages.phonenumber = `Phone must be filled!`;
    } else if (
      isExist &&
      isExist.find((val) => val.phonenumber === member.phonenumber)
    ) {
      errorMessages.phonenumber = `Phone already exist!`;
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

    let valid = ValidateMember(list, newMember);
    if (valid) {
      updateUser(
        id,
        newMember,
        (res) => {
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
          }
        },
        (err) => {
          ErrorMessage(err.message);
        }
      );
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
                <Form.Label className="fw-semibold">Username</Form.Label>
                <Form.Control
                  ref={inputFocus}
                  type="text"
                  value={newMember.username}
                  size="sm"
                  onChange={(e) => onChangeValue("username", e)}
                  isInvalid={errors.username}
                />
                {errors.username && <small>{errors.username}</small>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPhone">
                <Form.Label className="fw-semibold">Phone</Form.Label>
                <PhoneInput
                  inputStyle={{ width: "100%" }}
                  country={"id"}
                  value={newMember.phonenumber}
                  onChange={(e) =>
                    setNewMember({ ...newMember, phonenumber: e })
                  }
                />
                {errors.phonenumber && <small>{errors.phonenumber}</small>}
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
