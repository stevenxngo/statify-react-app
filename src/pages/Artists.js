import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { getTop } from "../services/userServices";
import TimeNav from "../components/TimeNav";
import Spinner from "../components/Spinner";
import TopItems from "../components/Items/TopItems";
import ListItems from "../components/Items/ListItems";

function Artists() {
  const { timespan } = useParams();
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timespans = ["short_term", "medium_term", "long_term"];
    if (timespans.includes(timespan.toLowerCase())) {
      const fetchArtists = async () => {
        setLoading(true);
        const response = await getTop("artists", timespan);
        setArtists(response.items);
        setLoading(false);
      };
      fetchArtists();
    } else {
      navigate("/artists");
    }
  }, [timespan, navigate]);

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <h1>artists</h1>
      </Container>
      <TimeNav type={"artists"} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-3">
          <TopItems items={artists.slice(0, 3)} type={"artist"} />
          <ListItems items={artists.slice(3)} type={"artist"} />
        </div>
      )}
    </div>
  );
}

export default Artists;
