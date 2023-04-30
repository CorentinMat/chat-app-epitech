import Button from "@/components/login_part/button";
import { AuthContext, UserInfo } from "../../modules/auth_provider";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
const url = "http://localhost:8080/login";

// Refaire les components si le temps
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticated } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (authenticated) {
      router.push("/");
    }
  }, [authenticated]);

  return (
    <div className="flex flex-col items-center justify-center min-w-full min-h-screen">
      <h2 className="text-5xl	 font-sans py-2">Login</h2>
      <div>
        <iframe
          src="https://giphy.com/embed/xTiIzJSKB4l7xTouE8"
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>
      </div>

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
      <Button name="Login" route="login" data={{ email, password }}></Button>
      <a className="bg-blue-400 p-3 px-5 rounded-md " href="/signup">
        Signup
      </a>
    </div>
  );
}

export default Login;
