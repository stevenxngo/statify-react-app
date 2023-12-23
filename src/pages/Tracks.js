import React, { useState } from "react";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import TimeNav from "../components/TimeNav";
import { getTop } from "../services/userServices";

function Tracks() {
  const { timespan } = useParams();
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    const response = await getTop("tracks", timespan);
    console.log(response);
  }

  return (
    <div>
      <TimeNav type={ "tracks" } />
      <h1>Tracks</h1>
      <Button onClick={getTracks}>Get Tracks</Button>
    </div>
  );
}

export default Tracks;
