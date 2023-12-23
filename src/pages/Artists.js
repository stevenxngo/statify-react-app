import React from "react";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import TimeNav from "../components/TimeNav";
import { getTop } from "../services/userServices";

function Artists() {
  const { timespan } = useParams();

  const getArtists = async () => {
    const response = await getTop("artists", timespan);
    console.log(response);
  }

  return (
    <div>
      <TimeNav type={ "artists" } />
      <h1>Artists</h1>
      <Button onClick={getArtists}>Get Artists</Button>
    </div>
  );
}

export default Artists;