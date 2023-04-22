import React from "react";
import MessageSend from "./messages/messages_send";
import MessageInput from "./messages/message_input";
import MessageReceive from "./messages/message_receive";
import MessageContentReceive from "./messages/message_content_receive";

const MessagePart = ({ user }: any) => {
  return (
    <div className="h-full ">
      hello, {user.username}, id = {user.id}
      {/* Message container */}
      <div className="h-[56rem] ">
        <MessageSend myname={user.username}></MessageSend>
        <MessageReceive></MessageReceive>
        <MessageContentReceive></MessageContentReceive>
      </div>
      <div className="">
        {/* Message input */}
        <MessageInput></MessageInput>
      </div>
    </div>
  );
};

export default MessagePart;
