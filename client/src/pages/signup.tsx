import React, { useState } from "react";
import Button from "@/components/login_part/button";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-col items-center justify-center min-w-full min-h-screen">
      <h2 className="text-5xl	font-sans py-2">Sign Up 🤌 </h2>

      <iframe
        src="https://giphy.com/embed/VtDRXohjexcyCDlL6Z"
        width="400"
        height="250"
        allowFullScreen
      ></iframe>
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
      <Button
        name="Sign up"
        route="signup"
        data={{ username, email, password }}
      ></Button>
    </div>
  );
}

export default Signup;
