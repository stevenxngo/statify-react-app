import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { getTop } from "../services/userServices";
import TimeNav from "../components/TimeNav";
import Spinner from "../components/Spinner";
import TopItems from "../components/Items/TopItems";
import ListItems from "../components/Items/ListItems";

function Data({ type }) {
  const { timespan } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timespans = ["short_term", "medium_term", "long_term"];
    if (timespans.includes(timespan.toLowerCase())) {
      const fetchItems = async () => {
        setLoading(true);
        const response = await getTop(`${type}s`, timespan);
        setItems(response.items);
        setLoading(false);
      };
      fetchItems();
    } else {
      navigate(`/${type}s`);
    }
  }, [timespan, navigate, type]);

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <h1>{type}s</h1>
      </Container>
      <TimeNav type={`${type}s`} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-3">
          <TopItems items={items.slice(0, 3)} type={type} />
          <ListItems items={items.slice(3)} type={type} />
        </div>
      )}
    </div>
  );
}

export default Data;
