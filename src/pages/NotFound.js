import { Container } from "react-bootstrap";
import { MdErrorOutline } from "react-icons/md";

function NotFound() {
  return (
    <Container  className="d-flex flex-column justify-content-center align-items-center">
      <h1>Page Not Found</h1>
      <MdErrorOutline size={64} />
    </Container>
  );
}

export default NotFound;