import { options } from "../utils/DateOptions";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
export const Header = () => {
  const header = {
    title: "Online Food Ordering",
    dateNow: new Date().toLocaleDateString("en-US", options),
  };
  let { title: NAMA_WEBSITE, dateNow: WAKTU_SEKARANG } = header;
  return (
    <div
      className="px-5 py-2 d-flex justify-content-between mb-4"
      style={{ background: "red" }}
    >
      <div className="text-white d-flex gap-2 align-items-center">
        <a href="/">
          <img className="image" src={logo} alt="logo-fo" />
        </a>
        <div className="">
          <h2>{NAMA_WEBSITE}</h2>
          <p className="text">{WAKTU_SEKARANG}</p>
        </div>
      </div>

      <div className="d-flex gap-3 align-items-center">
        <a className="" href="/menu">
          Menu
        </a>
        <a className="" href="/customer">
          Customer
        </a>
        <a className="" href="/order">
          Order
        </a>
        <a className="" href="/promotion">
          Promotion
        </a>
        <a className="" href="/contact">
          Contact
        </a>
      </div>

      <div className="d-flex gap-3 align-items-center">
        <a
          className="h-a"
          href="/cart"
          style={{ textDecoration: "underline", fontSize: "30px" }}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </a>
        <div className="d-flex gap-2">
          <Button
            variant="light"
            onClick={() => (window.location.pathname = "/register")}
          >
            Register
          </Button>
          <Button
            variant="light"
            onClick={() => (window.location.pathname = "/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
