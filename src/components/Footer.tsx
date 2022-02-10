import { Link } from "react-router-dom";
import eslLogo from "../assets/esl_logo1.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <Link
        to="https://www.eswlab.com/"
        className="logo"
        target="_blank"
        rel="noreferrer"
      >
        <img className="esl-logo-img" src={eslLogo} alt="logo" />
      </Link>
      <p className="contact-us-p">
        Contact us:{" "}
        <Link to="mailto:appsupport@eswlab.com">appsupport@eswlab.com</Link>
      </p>
    </footer>
  );
};

export default Footer;
