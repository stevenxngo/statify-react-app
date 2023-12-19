import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import * as auth from "../server/auth";

function Home() {
  useEffect(() => {
    async function retrieveCode() {
      await auth.retrieveCode();
    }
    retrieveCode();
  }, []);

  const login = async () => {
    await auth.login();
  };

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={login}>Login</Button>
    </div>
  );
}

export default Home;
