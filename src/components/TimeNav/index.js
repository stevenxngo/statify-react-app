import { Link } from "react-router-dom";

function TimeNav(props) {
  const type = props.type;

  const links = [
    { text: "last 4 weeks", path: `/${type}/short_term` },
    { text: "last 6 months", path: `/${type}/medium_term` },
    { text: "all time", path: `/${type}/long_term` },
  ];

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
