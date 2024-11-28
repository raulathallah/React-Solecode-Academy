import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { register, reset } from "../../api/slices/authSlice";
import ErrorMessage from "../../utils/ErrorMessage";
import Swal from "sweetalert2";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllEmployees } from "../../api/Fetchs/FetchEmployees";

const initialValue = {
  userName: "",
  password: "",
  email: "",
  role: "",
};
const initialError = {
  userName: "",
  password: "",
  email: "",
  role: "",
};

const roleList = [
  "Employee",
  "Employee Supervisor",
  "HR Manager",
  "Department Manager",
];

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState(initialValue);
  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);
  const [errors, setErrors] = useState(initialError);
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const [listEmployee, setListEmployee] = useState([]);
  const [empEmail, setEmpEmail] = useState("");
  const { data: listE } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: () => fetchAllEmployees(),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (listE) {
      setListEmployee(listE);
    }
  }, [listE]);

  useEffect(() => {
    if (isError) {
      ErrorMessage(message);
    }

    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration success!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onRegister = (e) => {
    e.preventDefault();
    let valid = isValid();

    if (valid) {
      if (
        checkAtLeastOneDigit(registerData.password) &&
        checkMinimumCharacter(registerData.password)
      ) {
        dispatch(register(registerData));
        //console.log(registerData);
      } else {
        ErrorMessage("Please check your registration data!");
      }
    }
  };

  const checkAtLeastOneDigit = (val) => {
    return /[0-9]/g.test(val);
  };

  const checkMinimumCharacter = (val) => {
    if (val.length >= 6) {
      return true;
    }

    return false;
  };

  const onChangeValue = (key, e) => {
    if (key === "userName") {
      let message = "";
      if (!e.target.value) {
        message = "Username must be filled!";
      }

      setErrors({
        ...errors,
        password: message,
      });
    }

    if (key === "password") {
      let message = "";
      if (!e.target.value) {
        message = "Password must be filled!";
      }

      setErrors({
        ...errors,
        password: message,
      });
    }

    if (key === "email") {
      let message = "";
      if (!e.target.value) {
        message = "Email must be filled!";
      }

      setErrors({
        ...errors,
        email: message,
      });
    }

    setRegisterData({ ...registerData, [key]: e.target.value });
  };
  const isValid = () => {
    let errorMessages = {};

    if (!registerData.userName) {
      errorMessages.userName = "Username must be filled!";
    }
    if (!registerData.password) {
      errorMessages.password = "Password must be filled!";
    }
    if (!registerData.email) {
      errorMessages.email = "Email must be filled!";
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

  useEffect(() => {
    if (empEmail) {
      setRegisterData({ ...registerData, email: empEmail });
    }
  }, [empEmail]);

  console.log(registerData);
  return (
    <div className="container my-5 d-grid gap-3 w-50">
      <div className="border p-4 rounded d-grid gap-4">
        <h3>Make account</h3>
        <Form onSubmit={onRegister}>
          <div className="d-grid gap-3">
            <Form.Select
              onChange={(e) => {
                setEmpEmail(e.target.value);
              }}
              value={empEmail}
              size="sm"
            >
              <option disabled value={""} hidden>
                -- select employee --
              </option>
              {listEmployee.map((val) => (
                <option key={val.empno} value={val.emailAddress}>
                  {`${val.empno} - ${val.fname} ${val.lname}`}
                </option>
              ))}
            </Form.Select>
            <Form.Group controlId="formUsername">
              <Form.Control
                ref={inputFocus}
                type="text"
                value={registerData.userName}
                placeholder="Username"
                size="sm"
                onChange={(e) => onChangeValue("userName", e)}
                isInvalid={errors.userName}
              />
              {errors.userName && <small>{errors.userName}</small>}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                value={registerData.password}
                placeholder="Password"
                size="sm"
                onChange={(e) => onChangeValue("password", e)}
                isInvalid={errors.password}
              />
              {errors.password && <small>{errors.password}</small>}
              <div className="d-grid gap-2 mt-3">
                <span
                  style={{
                    color: !checkMinimumCharacter(registerData.password)
                      ? "red"
                      : "green",
                  }}
                >
                  {!checkMinimumCharacter(registerData.password) ? (
                    <span> &#10005; </span>
                  ) : (
                    <span> &#10003; </span>
                  )}{" "}
                  Password minimum 6 characters{" "}
                </span>
                <span
                  style={{
                    color: !checkAtLeastOneDigit(registerData.password)
                      ? "red"
                      : "green",
                  }}
                >
                  {!checkAtLeastOneDigit(registerData.password) ? (
                    <span> &#10005; </span>
                  ) : (
                    <span> &#10003; </span>
                  )}
                  Password have at least 1 digit{" "}
                </span>
              </div>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                value={registerData.email}
                placeholder="Email"
                size="sm"
                disabled
                isInvalid={errors.email}
              />
              {errors.email && <small>{errors.email}</small>}
            </Form.Group>
            <Form.Group>
              <Form.Select
                onChange={(e) => onChangeValue("role", e)}
                isInvalid={errors.role}
                value={registerData.role}
                size="sm"
              >
                <option disabled value={""} hidden>
                  -- select role --
                </option>
                {roleList.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Select>
              {errors.role && <small>{errors.role}</small>}
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
