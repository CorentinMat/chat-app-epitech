import React from "react";
import { API_URL } from "../../../constants";
import { useRouter } from "next/router";
export type Login = {
  email: string;
  password: string;
};
export type SignUp = {
  username: string;
  email: string;
  password: string;
};

function Button(props: any) {
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    console.log("test = ", props.data);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props.data),
      });
      const data = res.json();
      if (res.ok) {
        return router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button className="bg-slate-400" onClick={handleSubmit}>
        {props.name}
      </button>
    </div>
  );
}

export default Button;
