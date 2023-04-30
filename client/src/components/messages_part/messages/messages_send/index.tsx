import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { WebsocketContext } from "../../../../../modules/websocket_provider";
import { Message } from "../message_input";
function MessageSend({ myname }: any) {
  const { conn } = useContext(WebsocketContext);
  const router = useRouter();
  useEffect(() => {
    if (conn === null) {
      router.push("/");
      return;
    }
    conn.onmessage = (message) => {
      const m: Message = JSON.parse(message.data);
      console.log("on message = ", m);
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
