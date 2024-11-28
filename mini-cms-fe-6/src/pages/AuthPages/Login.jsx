import { useNavigate } from "react-router";
import { login, reset } from "../../api/slices/authSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

const initialValue = {
  userName: "",
  password: "",
};

const initialError = {
  userName: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);
  const [loginData, setLoginData] = useState(initialValue);
  const [errors, setErrors] = useState(initialError);

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  const onChangeValue = (key, e) => {
    let errorMessages = {};

    if (key === "userName") {
      if (!e.target.value) {
        errorMessages.userName = "Username must be filled!";
      }
    }

    if (key === "password") {
      if (!e.target.value) {
        errorMessages.password = "Password must be filled!";
      }
    }

    setErrors(errorMessages);
    setLoginData({ ...loginData, [key]: e.target.value });
  };

  return (
    <div className="container my-5 d-grid gap-3 w-25">
      <div className="border p-4 rounded d-grid gap-4">
        <h3>CMS Login</h3>
        <Form onSubmit={onLogin}>
          <div className="d-grid gap-3">
            <Form.Group controlId="formUsername">
              <Form.Control
                ref={inputFocus}
                type="text"
                value={loginData.userName}
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
                value={loginData.password}
                placeholder="Password"
                size="sm"
                onChange={(e) => onChangeValue("password", e)}
                isInvalid={errors.password}
              />
              {errors.password && <small>{errors.password}</small>}
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
