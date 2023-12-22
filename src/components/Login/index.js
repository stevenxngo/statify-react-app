import React from "react";
import { Button } from "react-bootstrap";
import * as client from "../../auth/client";

function Login() {
  const login = async () => {
    try {
      await client.login();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button onClick={login}>Login</Button>
    </div>
  );
}

export default Login;