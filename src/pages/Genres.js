import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { isLoggedIn, getTop } from "../services/userServices";
import { Container } from "react-bootstrap";
import TimeNav from "../components/TimeNav";
import Spinner from "../components/Spinner";
import GenrePie from "../components/GenrePie";

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
        navigate("/statify-react-app");
        return;
      }

      const fetchItems = async () => {
        setLoading(true);
        const response = await getTop("genres", timespan);
        setItems(response);
        setLoading(false);
      };

      if (timespans.includes(timespan.toLowerCase())) {
        fetchItems();
      } else {
        navigate("/statify-react-app/genres");
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
      {loading && items.length > 0 ? (
        <Spinner />
      ) : (
        <GenrePie items={items}/>
      )}
    </div>
  );
}

export default Genres;
