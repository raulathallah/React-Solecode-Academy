import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../api/slices/authSlice";
import { Button } from "react-bootstrap";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
  };

  console.log(currentUser);
  return (
    <div>
      {currentUser && (
        <>
          <p>
            Username:{" "}
            <span className="fw-bold">{currentUser.user.userName}</span>
          </p>
          <p>
            Role: <span className="fw-bold">{currentUser.roles[0]}</span>
          </p>
        </>
      )}

      <Button variant="primary" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
