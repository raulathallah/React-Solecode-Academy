import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../api/slices/authSlice";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {currentUser && (
        <>
          <p>
            Username:{" "}
            <span className="fw-bold">{currentUser.user.userName}</span>
          </p>
          <p>
            Employee Number:{" "}
            <span className="fw-bold">{currentUser.employee.empno}</span>
          </p>
          <p>
            Role: <span className="fw-bold">{currentUser.roles[0]}</span>
          </p>
        </>
      )}

      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={onLogout}>
          Logout
        </Button>
        <Button
          variant="primary"
          as={Link}
          to={`/employees/${currentUser?.employee?.empno}/edit`}
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default Profile;
