import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { register, reset } from "../../api/slices/authSlice";
import ErrorMessage from "../../utils/ErrorMessage";

const initialValue = {
  userName: "",
  password: "",
  email: "",
  role: "",
};

const availableRoles = ["Library User", "Librarian", "Library Manager"];

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState(initialValue);

  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      ErrorMessage(message);
    }

    if (isSuccess) {
      //navigate("/login");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onRegister = (e) => {
    e.preventDefault();
    console.log(registerData);
    dispatch(register(registerData));
  };

  const onChangeValue = (key, e) => {
    setRegisterData({ ...registerData, [key]: e.target.value });
  };
  return (
    <div className="container my-5 d-grid gap-3 w-25 text-center">
      <h3>Register</h3>
      <input
        type="text"
        placeholder="username"
        required
        value={registerData.userName}
        onChange={(e) => onChangeValue("userName", e)}
      />
      <input
        type="password"
        placeholder="password"
        value={registerData.password}
        minLength={6}
        required
        onChange={(e) => onChangeValue("password", e)}
      />
      <input
        type="email"
        placeholder="email"
        required
        value={registerData.email}
        onChange={(e) => onChangeValue("email", e)}
      />
      <select
        value={registerData.role}
        onChange={(e) => onChangeValue("role", e)}
      >
        <option value="" disabled hidden></option>
        {availableRoles.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
      <Button variant="primary" onClick={onRegister}>
        Register
      </Button>
    </div>
  );
};

export default Register;
