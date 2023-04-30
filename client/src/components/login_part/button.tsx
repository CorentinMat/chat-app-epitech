import React from "react";
import { API_URL } from "../../../constants";
import { useRouter } from "next/router";
import { UserInfo } from "../../../modules/auth_provider";

function Button(props: any) {
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    if (
      props.data.email === "" ||
      props.data.username === "" ||
      props.data.password === ""
    ) {
      alert("Something went wrong ! please correctly entered your information");
    } else {
      try {
        const res = await fetch(`${API_URL}/` + props.route, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props.data),
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          const user: UserInfo = {
            username: data.username,
            id: data.id,
          };
          localStorage.setItem("user_info", JSON.stringify(user));
          return router.push("/");
        } else {
          console.log("server error");
        }
      } catch (err) {
        console.log("password or email not found");
        alert("password or email incorrect");
        console.log("catch= ", err);
      }
    }
  };
  return (
    <div className=" flex items-center justify-center p-4 ">
      <button
        className="bg-blue-400 p-3 px-7 rounded-md   "
        onClick={handleSubmit}
      >
        {props.name}
      </button>
    </div>
  );
}

export default Button;
