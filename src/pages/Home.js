import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import * as client from "../auth/client";
import { isLoggedIn } from "../services/userServices";
import { useDispatch } from "react-redux";
import { loginUser  } from "../reducers/userReducer";
import Login from "../components/Login";

function Home() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function retrieveCode() {
      const success = await client.retrieveCode();
      if (success) {
        dispatch(loginUser());
      }
    }
    async function fetchAccount() {
      const res = await isLoggedIn();
      setLoggedIn(res);
    }
    retrieveCode();
    fetchAccount();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {!loggedIn && <Login />}
    </div>
  );
}

export default Home;
