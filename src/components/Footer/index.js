import { FaLinkedin, FaInstagram } from "react-icons/fa";
import "./index.css";

function Footer() {
  return (
    <footer className="text-center mt-md-3 mt-lg-3 mt-xl-3  mt-xxl-3">
      <div>
        developed by{" "}
        <a
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
