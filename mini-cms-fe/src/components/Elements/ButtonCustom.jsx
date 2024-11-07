/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";

const ButtonCustom = ({ children, icon, ...props }) => {
  return (
    <Button {...props} className="">
      <span>{icon}</span>
      <span className={`${icon ? "tw-ml-1" : ""}`}>{children}</span>
    </Button>
  );
};

export default ButtonCustom;
