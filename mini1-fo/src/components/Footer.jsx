import {
  faFacebookSquare,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Footer = () => {
  return (
    <div className="f-container">
      <div>
        <p>Online Food Ordering &#169; 2024</p>
        <div>
          <p className="f-text">support@fo.com</p>
          <a href="https://google.com" className="f-text">
            fo.support.co.id
          </a>
          <ul className="f-socials-ul">
            <li className="f-socials-li">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="f-icons"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li className="f-socials-li">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="f-icons"
              >
                <FontAwesomeIcon icon={faFacebookSquare} />
              </a>
            </li>
            <li className="f-socials-li">
              <a
                href="https://www.tiktok.com/?lang=en"
                target="_blank"
                className="f-icons"
              >
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <ul className="f-menus-ul">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/menu">Menu</a>
          </li>
          <li>
            <a href="/customer">Customer</a>
          </li>
          <li>
            <a href="/order">Order</a>
          </li>
          <li>
            <a href="/cart">My Cart</a>
          </li>
          <li>
            <a href="/promotion">Promotion</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="f-menus-ul">
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
