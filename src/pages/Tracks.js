import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ListGroup, ListGroupItem, Container, Row, Col } from "react-bootstrap";
import TimeNav from "../components/TimeNav";
import { getTop } from "../services/userServices";
import Spinner from "../components/Spinner";
import { FaSpotify } from "react-icons/fa";
import "../styles/tracks.css";

// TODO: refactor with Artists.js
function Tracks() {
  const { timespan } = useParams();
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  const mapTracks = (tracks) => {
    return tracks.map((track) => ({
      id: track.id,
      name: track.name,
      images: track.album.images,
      artists: track.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
      })),
    }));
  };

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      const response = await getTop("tracks", timespan);
      const tracks = mapTracks(response.items);
      setTracks(tracks);
      setLoading(false);
    };
    fetchTracks();
  }, [timespan]);

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <h1 className="tracks-page-title">tracks</h1>
      </Container>
      <TimeNav type={"tracks"} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-3">
          <Row className="justify-content-center">
            {tracks.slice(0, 3).map((track, index) => (
              <Col
                key={track.id}
                xs={4}
                sm={4}
                md={3}
                className="text-center mb-3"
              >
                <img
                  src={track.images[0].url}
                  alt={track.name}
                  className="img-fluid"
                  loading="lazy"
                />
                <ListGroup className="">
                  <ListGroupItem className="rounded-0 track-item pb-0">
                    {`${index + 1}. ${track.name}`}
                    <a
                      href={`https://open.spotify.com/track/${track.id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="white ms-1"
                    >
                      <FaSpotify />
                    </a>
                  </ListGroupItem>
                  <ListGroupItem className="rounded-0 track-item">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            ))}
          </Row>

          {tracks.slice(3).map((track, index) => (
            <Row
              key={track.id}
              className="align-items-center justify-content-center mb-1"
            >
              <Col xs={1} className="text-center px-0 ">
                <p className="track-rank align-items-center mb-0">
                  {index + 4}
                </p>
              </Col>
              <Col xs="auto" className="text-center px-0">
                <img
                  src={track.images[0].url}
                  alt={track.name}
                  className="img-fluid other-track-img px-0"
                  style={{ height: "100%" }}
                  loading="lazy"
                />
              </Col>
              <Col xs={8} className="px-0">
                <ListGroup className="mb-0">
                  <ListGroupItem className="rounded-0 track-item pb-0 ">{`${track.name}`}</ListGroupItem>
                  <ListGroupItem className="rounded-0 track-item">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col xs={1} className="text-center px-0 ">
                <a
                  href={`https://open.spotify.com/track/${track.id}/`}
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

export default Tracks;
