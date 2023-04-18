import React from "react";
import MessageSend from "./messages/messages_send";
import MessageInput from "./messages/message_input";

function MessagePart() {
  return (
    <div className="h-full relative">
      {/* Message container */}
      <div>
        <MessageSend></MessageSend>
      </div>

      <div className=" absolute inset-x-0 bottom-6 flex  flex-col items-center ">
        {/* Message input */}
        <MessageInput></MessageInput>
      </div>
    </div>
  );
}

export default MessagePart;
