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

  useEffect(() => {
    const fetchTracks = async () => {
      setFetchingData(true);
      const response = await getTop("tracks", timespan);
      let tracks = response.items;
      tracks = tracks.map((track) => ({
        id: track.id,
        name: track.name,
        images: track.album.images,
        artists: track.artists.map((artist) => ({
          id: artist.id,
          name: artist.name,
        })),
      }));
      console.log(tracks);
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
              href={`https://open.spotify.com/track/${track.id}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="track-link"
            >
              <ListGroupItem key={track.id} as="li">
                {track.name}
              </ListGroupItem>
            </a>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default Tracks;
