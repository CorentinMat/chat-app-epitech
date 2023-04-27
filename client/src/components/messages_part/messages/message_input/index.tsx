import React, { useState, useEffect } from "react";

function MessageInput({ ws }: any) {
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (message != "") {
      ws.send(message);
      setMessage("");
    }
  };
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };
  return (
    <div className="bg-slate-200 w-10/12	  h-14 flex  rounded-md items-center ">
      <input
        onChange={handleMessage}
        className="ps-6 w-full  bg-transparent focus:outline-none"
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
