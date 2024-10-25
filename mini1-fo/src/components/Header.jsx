import "../styles/Header.css";
import { options } from "../utils/DateOptions";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
export const Header = () => {
  const header = {
    title: "Online Food Ordering",
    dateNow: new Date().toLocaleDateString("en-US", options),
  };
  let { title: NAMA_WEBSITE, dateNow: WAKTU_SEKARANG } = header;
  return (
    <div className="header-container">
      <div className="h-left">
        <a href="/">
          <img className="image" src={logo} alt="logo-fo" />
        </a>
        <div className="h-title">
          <h2>{NAMA_WEBSITE}</h2>
          <p className="text">{WAKTU_SEKARANG}</p>
        </div>
      </div>

      <div className="h-middle">
        <ul className="h-ul">
          <li>
            <a className="h-a" href="/menu">
              Menu
            </a>
          </li>
          <li>
            <a className="h-a" href="/customer">
              Customer
            </a>
          </li>
          <li>
            <a className="h-a" href="/order">
              Order
            </a>
          </li>

          <li>
            <a className="h-a" href="/promotion">
              Promotion
            </a>
          </li>
          <li>
            <a className="h-a" href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </div>

      <div className="h-right">
        <a
          className="h-a"
          href="/cart"
          style={{ textDecoration: "underline", fontSize: "30px" }}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </a>
        <div>
          <button
            className="button"
            style={{ background: "none", color: "white", border: "none" }}
            onClick={() => (window.location.pathname = "/register")}
          >
            Register
          </button>
          <button
            className="button"
            onClick={() => (window.location.pathname = "/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
