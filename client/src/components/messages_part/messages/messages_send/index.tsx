import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WebsocketContext } from "../../../../../modules/websocket_provider";
import { Message } from "../message_input";

export type Messages = {
  text: string;
  user: string;
  // photo: string;
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
    conn.onmessage = (e) => {
      const message: Messages = {
        text: e.data,
        user: e.data.username,
      };
      console.log("received message : ", message);
      // setMessages(message);
    };
  }, [conn]);
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
