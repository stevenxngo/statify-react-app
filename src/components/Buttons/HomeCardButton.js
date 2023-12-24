import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

function HomeCardButton({ variant, mb }) {
  return (
    <Link to={variant} className={`d-flex justify-content-center link-btn mb-${mb}`}>
      <Button className="green-btn homecard-btn">top {variant}</Button>
    </Link>
  );
}

export default HomeCardButton;
