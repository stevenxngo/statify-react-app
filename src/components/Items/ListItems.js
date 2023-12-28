import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaSpotify } from "react-icons/fa";
import "./styles.css";

function ListItems({ items, type }) {
  return (
    <>
      {items.map((item, index) => (
        <Row
          key={item.id}
          className="align-items-center justify-content-center mb-1"
        >
          <Col xs={1} className="text-center px-0 ">
            <p className="item-rank align-items-center mb-0">{index + 4}</p>
          </Col>
          <Col xs="auto" className="text-center px-0">
            <img
              src={item.images[0].url}
              alt={item.name}
              className="img-fluid px-0 list-img-square"
              loading="lazy"
            />
          </Col>
          <Col xs={8} className="px-0">
            <ListGroup className="mb-0">
              <ListGroupItem className="rounded-0 item pb-0 ">{`${item.name}`}</ListGroupItem>
              <ListGroupItem className="rounded-0 item">
                {type === "track"
                  ? item.artists.map((artist) => artist.name).join(", ")
                  : item.genres.map((genre) => genre).join(", ")}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs={1} className="text-center px-0 ">
            <a
              href={
                type === "track"
                  ? `https://open.spotify.com/track/${item.id}/`
                  : `https://open.spotify.com/artist/${item.id}/`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="white"
            >
              <FaSpotify className="spotify-icon" />
            </a>
          </Col>
        </Row>
      ))}
    </>
  );
}

export default ListItems;
