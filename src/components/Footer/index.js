import { FaLinkedin, FaInstagram } from "react-icons/fa";
import "./index.css";

function Footer() {
  return (
    <footer className="text-center">
      <div>
        developed by{" "}
        <a
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/stevenxngo"
        >
          steven ngo
        </a>
        <a
          className="clean-link linkedin-icon ms-1"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/stevenxngo"
        >
          <FaLinkedin />
        </a>
        <a
          className="clean-link ig-icon ms-1"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/stevenxngo/"
        >
          <FaInstagram />
        </a>
      </div>
      <div>
        follow me on{" "}
        <a
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://open.spotify.com/user/a202jrbuwjn17aw171oymxokf"
        >
          spotify
        </a>
      </div>
    </footer>
  );
}

export default Footer;
