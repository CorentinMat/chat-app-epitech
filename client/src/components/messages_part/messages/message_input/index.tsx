import React, { useState, useEffect, useContext } from "react";
import { WebsocketContext } from "../../../../../modules/websocket_provider";
import { useRouter } from "next/router";
import { Message } from "../messages_send";
import { AuthContext } from "../../../../../modules/auth_provider";

type SaveMsgReq = {
  from_user: string;
  message_text: string;
  sent_datetime: string;
  conversation_id: number;
};
function MessageInput() {
  const { conn } = useContext(WebsocketContext);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  const saveMsg = async (req: SaveMsgReq) => {
    try {
      req.conversation_id = Number(router.query.roomId);
      console.log("final : ", req.conversation_id);
      const res = await fetch("http://localhost:8080/saveMsg", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (!res.ok) {
        console.log("could'nt save the msg ");
      }
      const data = await res.json();

      // message.id = Number(await data.id);
    } catch (e) {
      console.log("catch error = " + e);
    }
  };
  const handleClick = () => {
    if (conn === null) {
      router.push("/");
      return;
    }
    if (message != "") {
      conn.send(message);
      const date = new Date();
      const minute = date.getMinutes().toString();
      const hour = date.getHours().toString();
      const second = date.getSeconds().toString();
      const all = hour + ":" + minute + ":" + second;

      const msgReq = {
        from_user: user.username,
        message_text: message,
        sent_datetime: all,
        conversation_id: 0,
      };
      saveMsg(msgReq);
      setMessage("");
    }
  };
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };
  return (
    <div className="bg-slate-200 w-6/12	  h-14 flex  rounded-md items-center  ">
      <input
        onChange={handleMessage}
        className="ps-6 w-full  bg-transparent focus:outline-none "
        type="text"
        value={message}
        placeholder="Type Something ..."
      />
      <img
        onClick={handleClick}
        className="w-12  pe-5  cursor-pointer"
        src="send.png"
        alt="Send Icon"
      />
    </div>
  );
}

export default MessageInput;
