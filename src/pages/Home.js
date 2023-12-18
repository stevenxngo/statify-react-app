import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import * as client from "../auth/client";

function Home() {
  useEffect(() => {
    async function retrieveCode() {
      await client.retrieveCode();
    }
    retrieveCode();
  }, []);

  const login = async () => {
    await client.login();
  };

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={login}>Login</Button>
    </div>
  );
}

export default Home;
