import React, { useState, useEffect } from "react";
import { isLoggedIn } from "../services/userServices";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { saveAccountData } from "../services/userServices";
import * as client from "../auth/client";
import HomeCard from "../components/HomeCard";

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
    <HomeCard loggedIn={loggedIn} />
  );
}

export default Home;
