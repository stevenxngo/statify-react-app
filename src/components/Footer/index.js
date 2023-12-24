import { FaLinkedin, FaInstagram } from "react-icons/fa";
import "../../styles/global.css";
import "./index.css";

function Footer() {
  return (
    <footer>
      <div>
        Developed by{" "}
        <a
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/stevenxngo"
        >
          Steven Ngo
        </a>
        <a
          className="clean-link linkedin-icon"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/stevenxngo"
        >
          <FaLinkedin />
        </a>
        <a
          className="clean-link ig-icon"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/stevenxngo/"
        >
          <FaInstagram />
        </a>
      </div>
      <div>
        Follow me on{" "}
        <a
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://open.spotify.com/user/a202jrbuwjn17aw171oymxokf"
        >
          Spotify
        </a>
      </div>
    </footer>
  );
}

export default Footer;
