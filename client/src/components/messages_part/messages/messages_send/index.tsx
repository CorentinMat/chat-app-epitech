import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WebsocketContext } from "../../../../../modules/websocket_provider";
export type Message = {
  content: string;
  room_id: string;
  username: string;
  type: "recv" | "self";
};

function MessageSend({ myname }: any) {
  const { conn } = useContext(WebsocketContext);
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (conn === null) {
      router.push("/");
      return;
    }
    console.log(conn.url);
    const ws = new WebSocket(conn.url);

    ws.onopen = () => {
      console.log("its oppen bro ");
    };
    ws.onmessage = (e) => {
      console.log(e.data);
    };
    conn.onmessage = (e) => {
      // const message: Message = {
      //   content: e.data.content,
      //   room_id: e.data.room_id,
      //   username: e.data.username,
      //   type: "recv",
      // };
      // Faire comme ça mieux pour réact !
      // const newMessages = [...messages];
      // newMessages.push(message);

      console.log("received message : ", e.data);
      // setMessages(newMessages);
    };
  }, []);
  return (
    <div className="flex font-sans ">
      <img
        className="w-12 items-center	"
        src="./favicon.ico"
        alt="profile-picture"
      />
      <h4 className=" py-2 px-3 items-start font-semibold text-slate-800">
        {myname}
      </h4>
      <p className=" py-3 first-letter:items-start text-slate-400  text-xs	">
        {" "}
        surement enlever la date
      </p>
    </div>
  );
}

export default MessageSend;
