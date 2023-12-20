import { Link } from "react-router-dom";

function TimeNav(props) {
  const links = props.links;

  return (
    <nav>
      {links.map((link, index) => (
        <Link key={index} className="navbar-link" to={link.path}>
          {link.text}
        </Link>
      ))}
    </nav>
  );
}

export default TimeNav;
