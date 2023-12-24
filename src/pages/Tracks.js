import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import TimeNav from "../components/TimeNav";
import { getTop } from "../services/userServices";
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
      <TimeNav type={"tracks"} />
      <h1>Tracks</h1>
      {fetchingData ? (
        <p>Fetching data...</p>
      ) : (
        <ListGroup as="ol" numbered className="tracks-list">
          {tracks.map((track) => (
            <a
              key={track.id}
              href={`https://open.spotify.com/track/${track.id}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="track-link"
            >
              <ListGroupItem as="li">{track.name}</ListGroupItem>
            </a>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default Tracks;
