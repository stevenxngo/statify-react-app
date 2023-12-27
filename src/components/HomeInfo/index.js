import { Container, Row, Col } from "react-bootstrap";
import { MdMobileFriendly } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaListOl } from "react-icons/fa";
import "./styles.css";

function HomeInfo() {
  return (
    <Container sm="auto" className="home-info mt-3 mt-sm-4">
      <Row className="mb-2">
        <Col
          sm="auto"
          className="d-flex align-items-center justify-content-center home-icon-col p-0"
        >
          <FaListOl size={50} className="home-icon" />
        </Col>
        <Col className="d-flex align-items-center">
          View your top tracks, artists and genres, from the last 4 weeks, 6
          months and all time.
        </Col>
      </Row>
      <Row className="mb-2">
        <Col
          sm="auto"
          className="d-flex align-items-center justify-content-center home-icon-col p-0"
        >
          <IoMdTime size={50} className="home-icon" />
        </Col>
        <Col className="d-flex align-items-center">
          Updated approximately every 24 hours.
        </Col>
      </Row>
      <Row className="">
        <Col
          sm="auto"
          className="d-flex align-items-center justify-content-center home-icon-col p-0"
        >
          <MdMobileFriendly size={50} className="home-icon" />
        </Col>
        <Col className="d-flex align-items-center">
          Optimized for both desktop and mobile devices.
        </Col>
      </Row>
    </Container>
  );
}

export default HomeInfo;
