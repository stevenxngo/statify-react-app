import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { isLoggedIn, getTop } from "../services/userServices";
import { Container } from "react-bootstrap";
import TimeNav from "../components/TimeNav";
import Spinner from "../components/Spinner";

function Genres() {
  const { timespan } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timespans = ["short_term", "medium_term", "long_term"];
    const fetchData = async () => {
      const loggedIn = await isLoggedIn();
      if (!loggedIn) {
        navigate("/");
        return;
      }

      const fetchItems = async () => {
        setLoading(true);
        const response = await getTop("genres", timespan);
        setItems(response);
        setLoading(false);
        console.log(response);
      };

      if (timespans.includes(timespan.toLowerCase())) {
        fetchItems();
      } else {
        navigate("/genres");
      }
    };

    fetchData();
  }, [timespan, navigate]);

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <h1>genres</h1>
      </Container>
      <TimeNav type={"genres"} />
      {loading ? <Spinner /> : <div className="mt-3">genres found</div>}
    </div>
  );
}

export default Genres;
