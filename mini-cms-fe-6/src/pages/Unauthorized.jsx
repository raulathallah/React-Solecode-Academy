import { Button } from "react-bootstrap";
const user = localStorage.getItem("user");
const Unauthorized = () => {
  return (
    <div className="tw-grid tw-justify-center gap-4">
      <p>Unauthorized... please login!</p>

      <div className="d-flex gap-2 tw-justify-center">
        {!user && (
          <Button
            variant="primary"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Unauthorized;
