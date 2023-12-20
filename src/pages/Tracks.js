import React from "react";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import TimeNav from "../components/TimeNav";
import { getTop } from "../services/userServices";

function Tracks() {

  const links = [
    { text: "last 4 weeks", path: "/tracks/short_term" },
    { text: "last 6 months", path: "/tracks/medium_term" },
    { text: "all time", path: "/tracks/long_term" },
  ];

  const { timespan } = useParams();

  const getTracks = async () => {
    const response = await getTop("tracks", timespan);
    console.log(response);
  }

  return (
    <div>
      <TimeNav links={ links } />
      <h1>Tracks</h1>
      <Button onClick={getTracks}>Get Tracks</Button>
    </div>
  );
}

export default Tracks;
