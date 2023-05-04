import React, { useContext, useEffect } from "react";
import MessageSend from "./messages/messages_send";
import MessageInput from "./messages/message_input";
import { WebsocketContext } from "../../../modules/websocket_provider";

import { useRouter } from "next/router";

const MessagePart = ({ user }: any) => {
  const router = useRouter();
  const contact = {
    id: router.query.id,
    username: router.query.username,
  };

  return (
    <div className="h-full flex flex-col  justify-center ">
      {/* Message container */}
      <div className="flex flex-col items-center  space-y-2 mb-3 ">
        <img className="w-20" src="./favicon.ico" alt="" />
        <h2 className=" text-center">
          {contact.username} #{contact.id}
        </h2>
      </div>

      <div className="h-[44rem] overflow-scroll mx-10 border-t-2 border-slate-300 p-3 ">
        <MessageSend user={user}></MessageSend>
      </div>
      <div className=" flex items-center justify-center  py-4 ">
        {/* Message input */}
        <MessageInput></MessageInput>
      </div>
    </div>
  );
};

export default MessagePart;
