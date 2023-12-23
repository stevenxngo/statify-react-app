import React from "react";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import TimeNav from "../components/TimeNav";
import { getTop } from "../services/userServices";

function Artists() {

  const links = [
    { text: "last 4 weeks", path: "/tracks/short_term" },
    { text: "last 6 months", path: "/tracks/medium_term" },
    { text: "all time", path: "/tracks/long_term" },
  ];

  const { timespan } = useParams();

  const getArtists = async () => {
    const response = await getTop("artists", timespan);
    console.log(response);
  }

  return (
    <div>
      <TimeNav links={ links } />
      <h1>Artists</h1>
      <Button onClick={getArtists}>Get Artists</Button>
    </div>
  );
}

export default Artists;