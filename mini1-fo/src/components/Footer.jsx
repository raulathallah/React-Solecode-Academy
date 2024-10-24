import "../styles/Footer.css";
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
        </div>
      </div>
      <div className="f-socials">
        <p>Find us!</p>
        <ul className="f-socials-ul">
          <li className="f-socials-li">
            <a href="">Instagram</a>
          </li>
          <li className="f-socials-li">
            <a href="">Facebook</a>
          </li>
          <li className="f-socials-li">
            <a href="">Tiktok</a>
          </li>
          <li className="f-socials-li">
            <a href="">X</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
