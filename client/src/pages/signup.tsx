import React, { useState } from "react";
import Button from "@/components/login_part/button";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-col items-center justify-center min-w-full min-h-screen">
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        type="text"
        placeholder="Username"
        className="p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-blue-600"
      />
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        placeholder="E-mail"
        className="p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-blue-600"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Password"
        className="p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-blue-600"
      />
      <Button name="signup" data={{ username, email, password }}></Button>
    </div>
  );
}

export default Signup;
