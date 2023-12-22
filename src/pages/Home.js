import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import * as client from "../auth/client";
import { isLoggedIn } from "../services/userServices";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../reducers/userReducer";
import Login from "../components/Login";

function Home() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    try {
      await client.login();
    } catch (err) {
      console.log(err);
    }
  };

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
      {/* {loggedIn ? "Logged in from state" : "Not logged in from state"} */}
      {!loggedIn && <Button onClick={login}>Login</Button>}
      {/* <Login /> */}
    </div>
  );
}

export default Home;
