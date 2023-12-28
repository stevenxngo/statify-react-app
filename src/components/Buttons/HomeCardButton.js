import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./styles.css";

function HomeCardButton({ variant, className }) {
  return (
    <Link to={variant} className={`d-flex justify-content-center link-btn ${className}`}>
      <Button className="green-btn homecard-btn">top {variant}</Button>
    </Link>
  );
}

export default HomeCardButton;
