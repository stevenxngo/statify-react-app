import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { FaSpotify } from "react-icons/fa";
import "./styles.css";

function TopItems({ items, type }) {
  return (
    <>
      <Row className="justify-content-center">
        {items.map((item) => (
          <Col key={item._id} xs={4} sm={4} md={3} className="text-center mb-3">
            <div className="square-image-container">
              <img
                src={item.images[0].url}
                alt={item.name}
                className="img-fluid square-image"
                loading="lazy"
              />
            </div>
            <ListGroup className="">
              <ListGroupItem className="rounded-0 item pb-0">
                {`${item.rank + 1}. ${item.name}`}
                <a
                  href={
                    type === "track"
                      ? `https://open.spotify.com/track/${item._id}/`
                      : `https://open.spotify.com/artist/${item._id}/`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="white ms-1"
                >
                  <FaSpotify />
                </a>
              </ListGroupItem>
              <ListGroupItem className="rounded-0 item">
                {type === "track"
                  ? item.artists.map((artist) => artist.name).join(", ")
                  : item.genres.map((genre) => genre).join(", ")}
              </ListGroupItem>
            </ListGroup>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default TopItems;
