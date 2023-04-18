import Button, { Login } from "@/components/login_part/button";

import React from "react";
const url = "http://localhost:8080/login";

function Login() {
  let data: Login;
  //   data.email = "test@example.com";
  //   data.password = "password";
  return (
    <div>
      login page
      <Button
        name="login"
        url={url}
        data={{ email: "test@gmail.com", password: "password" }}
      ></Button>
    </div>
  );
}

export default Login;
