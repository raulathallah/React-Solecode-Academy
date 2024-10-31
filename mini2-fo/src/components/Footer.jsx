import {
  faFacebookSquare,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Footer = () => {
  return (
    <div className="mt-auto fs-6 bg-dark text-white d-flex justify-content-center gap-5 p-3 text-white">
      <div className="d-flex flex-column gap-0 text-center">
        <p>Online Food Ordering &#169; 2024</p>
        <p className="">support@fo.com</p>
        <a href="https://google.com" className="text-white">
          fo.support.co.id
        </a>
        <div className="d-flex gap-4 justify-content-center mt-3">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="text-white fs-4"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            className="text-white fs-4"
          >
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>
          <a
            href="https://www.tiktok.com/?lang=en"
            target="_blank"
            className="text-white fs-4"
          >
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>
      </div>
      <hr />
      <div className="d-flex flex-column justify-content-lg-start">
        <a href="/">Home</a>
        <a href="/customer">Customer</a>
        <a href="/order">Order</a>
        <a href="/cart">My Cart</a>
        <a href="/promotion">Promotion</a>
        <a href="/contact">Contact</a>
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
