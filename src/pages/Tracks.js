import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ListGroup, ListGroupItem, Container, Row, Col } from "react-bootstrap";
import TimeNav from "../components/TimeNav";
import { getTop } from "../services/userServices";
import Spinner from "../components/Spinner";
import "../styles/tracks.css";

function Tracks() {
  const { timespan } = useParams();
  const [fetchingData, setFetchingData] = useState(true);
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
      setFetchingData(true);
      const response = await getTop("tracks", timespan);
      const tracks = mapTracks(response.items);
      setTracks(tracks);
      setFetchingData(false);
    };
    fetchTracks();
  }, [timespan]);

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <h1 className="tracks-page-title">tracks</h1>
      </Container>
      <TimeNav type={"tracks"} />
      {fetchingData ? (
        <Spinner />
      ) : (
        <div>
          <Row>
            {tracks.slice(0, 3).map((track, index) => (
              <Col key={track.id} md={4} className="text-center mb-3">
                <img
                  src={track.images[0].url}
                  alt={track.name}
                  className="img-fluid"
                />
                <ListGroup className="mt-2">
                  <ListGroupItem as="h5">{`#${index + 1} ${
                    track.name
                  }`}</ListGroupItem>
                  <ListGroupItem>
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            ))}
          </Row>

          {tracks.slice(3).map((track, index) => (
            <Row key={track.id} className="mb-3">
              <Col md={1} className="text-center">
                {index + 4}
              </Col>
              <Col md={5}>
                <a
                  href={`https://open.spotify.com/track/${track.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="track-link"
                >
                  <ListGroupItem as="h5">{track.name}</ListGroupItem>
                </a>
              </Col>
              <Col md={6}>
                <ListGroupItem>
                  {track.artists.map((artist) => artist.name).join(", ")}
                </ListGroupItem>
              </Col>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tracks;
