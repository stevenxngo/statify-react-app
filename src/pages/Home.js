import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import * as client from "../auth/client";
import { isLoggedIn } from "../services/userServices";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { saveAccountData } from "../services/userServices";
import Login from "../components/Login";

function Home() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function retrieveCode() {
      const success = await client.retrieveCode();
      if (success) {
        try {
          await saveAccountData();
          dispatch(loginUser());
        } catch (err) {
          console.error("Error logging in:", err);
        }
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
