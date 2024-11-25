import { useNavigate } from "react-router";
import { login, reset } from "../../api/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../utils/ErrorMessage";
import { Button } from "react-bootstrap";

const initialValue = {
  userName: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState(initialValue);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      ErrorMessage(message);
    }

    if (isSuccess || user) {
      navigate("/profile");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  return (
    <div className="container my-5 d-grid gap-3 w-25 rounded">
      <h3>Login</h3>
      <input
        type="text"
        placeholder="username"
        value={loginData.userName}
        onChange={(e) =>
          setLoginData({ ...loginData, userName: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="password"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
      />
      <Button variant="primary" onClick={onLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
