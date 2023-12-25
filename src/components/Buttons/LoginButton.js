import React from "react";
import { Button } from "react-bootstrap";
import * as client from "../../auth/client";
import "./styles.css";

function LoginButton() {
  const login = async () => {
    try {
      await client.login();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button className="homecard-btn green-btn" onClick={login}>login</Button>
  );
}

export default LoginButton;