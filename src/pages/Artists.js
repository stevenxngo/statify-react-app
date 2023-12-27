import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import TimeNav from "../components/TimeNav";
import { Container, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { FaSpotify } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { getTop } from "../services/userServices";
import "../styles/tracks.css";

// TODO: refactor with Tracks.js
function Artists() {
  const { timespan } = useParams();
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);

  const mapArtists = (artists) => {
    return artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      images: artist.images,
      genres: artist.genres,
      popularity: artist.popularity,
    }));
  };

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      const response = await getTop("artists", timespan);
      const artists = mapArtists(response.items);
      setArtists(artists);
      setLoading(false);
    };
    fetchArtists();
  }, [timespan]);

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <h1 className="tracks-page-title">artists</h1>
      </Container>
      <TimeNav type={"artists"} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-3">
          <Row className="justify-content-center">
            {artists.slice(0, 3).map((artist, index) => (
              <Col
                key={artist.id}
                xs={4}
                sm={4}
                md={3}
                className="text-center mb-3"
              >
                <div className="square-image-container">
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="img-fluid square-image"
                    loading="lazy"
                  />
                </div>
                <ListGroup className="">
                  <ListGroupItem className="rounded-0 track-item pb-0">
                    {`${index + 1}. ${artist.name}`}
                    <a
                      href={`https://open.spotify.com/artist/${artist.id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="white ms-1"
                    >
                      <FaSpotify />
                    </a>
                  </ListGroupItem>
                  <ListGroupItem className="rounded-0 track-item">
                    {artist.genres.map((genre) => genre).join(", ")}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            ))}
          </Row>

          {artists.slice(3).map((artist, index) => (
            <Row
              key={artist.id}
              className="align-items-center justify-content-center mb-1"
            >
              <Col xs={1} className="text-center px-0 ">
                <p className="track-rank align-items-center mb-0">
                  {index + 4}
                </p>
              </Col>
              <Col xs="auto" className="text-center px-0">
                <div className="">
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="img-fluid other-track-img px-0 other-img-square"
                    style={{
                      width: "72px",
                      objectFit: "cover",
                      height: "100%",
                    }}
                    loading="lazy"
                  />
                </div>
              </Col>
              <Col xs={8} className="px-0">
                <ListGroup className="mb-0">
                  <ListGroupItem className="rounded-0 track-item pb-0 ">{`${artist.name}`}</ListGroupItem>
                  <ListGroupItem className="rounded-0 track-item">
                    {artist.genres.map((genre) => genre).join(", ")}
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col xs={1} className="text-center px-0 ">
                <a
                  href={`https://open.spotify.com/artist/${artist.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="white"
                >
                  <FaSpotify className="spotify-icon" />
                </a>
              </Col>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
}

export default Artists;
