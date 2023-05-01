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
    <div className="h-full ">
      hello, {user.username}, id = {user.id}
      {/* Message container */}
      <div className="h-[50rem] overflow-scroll	 ">
        <MessageSend user={user}></MessageSend>
      </div>
      <div className=" flex items-center justify-center">
        {/* Message input */}
        <MessageInput></MessageInput>
      </div>
    </div>
  );
};

export default MessagePart;
