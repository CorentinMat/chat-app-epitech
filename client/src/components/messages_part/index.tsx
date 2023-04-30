import React, { useContext } from "react";
import MessageSend from "./messages/messages_send";
import MessageInput from "./messages/message_input";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { WebsocketContext } from "../../../modules/websocket_provider";

const MessagePart = ({ user }: any) => {
  const router = useRouter();
  const contact = {
    id: router.query.id,
    username: router.query.username,
  };

  const { setConn } = useContext(WebsocketContext);

  // useEffect(() => {
  //   createRoom();

  //   joinRoom();
  // }, []);

  // 🚨 CHANGE ROOM ID 🚨

  return (
    <div className="h-full ">
      hello, {user.username}, id = {user.id}
      {/* Message container */}
      <div className="h-[50rem] overflow-scroll	 ">
        <MessageSend myname={user.username}></MessageSend>
      </div>
      <div className=" flex items-center justify-center">
        {/* Message input */}
        <MessageInput></MessageInput>
      </div>
    </div>
  );
};

export default MessagePart;
