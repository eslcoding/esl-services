import { Link } from "react-router-dom";
import eslLogo from "../assets/esl_logo1.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://www.eswlab.com/"
        className="logo"
        target="_blank"
        rel="noreferrer"
      >
        <img className="esl-logo-img" src={eslLogo} alt="logo" />
      </a>
      <p className="contact-us-p">
        Contact us:{" "}
        <a href="mailto:appsupport@eswlab.com">appsupport@eswlab.com</a>
      </p>
    </footer>
  );
};

export default Footer;
