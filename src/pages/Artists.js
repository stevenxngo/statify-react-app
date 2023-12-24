import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import TimeNav from "../components/TimeNav";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { getTop } from "../services/userServices";

function Artists() {
  const { timespan } = useParams();
  const [fetchingData, setFetchingData] = useState(true);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      setFetchingData(true);
      const response = await getTop("artists", timespan);
      let artists = response.items;
      artists = artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        images: artist.images,
        genres: artist.genres,
        popularity: artist.popularity,
      }));
      console.log(artists);
      setArtists(artists);
      setFetchingData(false);
    };
    fetchArtists();
  }, [timespan]);

  return (
    <div>
      <TimeNav type={"artists"} />
      <h1>Artists</h1>
      {fetchingData ? (
        <p>Fetching data...</p>
      ) : (
        <ListGroup as="ol" numbered className="tracks-list">
          {artists.map((artist) => (
            <a
              href={`https://open.spotify.com/artist/${artist.id}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="track-link"
            >
              <ListGroupItem key={artist.id} as="li">
                {artist.name}
              </ListGroupItem>
            </a>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default Artists;
