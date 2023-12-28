import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Container } from "react-bootstrap";
import { getTop } from "../services/userServices";
import TimeNav from "../components/TimeNav";
import Spinner from "../components/Spinner";
import TopItems from "../components/Items/TopItems";
import ListItems from "../components/Items/ListItems";

function Tracks() {
  const { timespan } = useParams();
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      const response = await getTop("tracks", timespan);
      setTracks(response.items);
      setLoading(false);
    };
    fetchTracks();
  }, [timespan]);

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <h1>tracks</h1>
      </Container>
      <TimeNav type={"tracks"} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-3">
          <TopItems items={tracks.slice(0, 3)} type={"track"} />
          <ListItems items={tracks.slice(3)} type={"track"} />
        </div>
      )}
    </div>
  );
}

export default Tracks;
