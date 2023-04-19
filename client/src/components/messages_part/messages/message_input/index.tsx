import React, { MouseEventHandler, useState } from "react";

function MessageInput() {
  const [message, setMessage] = useState("");
  const handleClick = () => {};
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
    console.log(message);
  };
  return (
    <div className="bg-slate-200 w-full  h-10 flex  rounded-md">
      <input
        onChange={handleMessage}
        className=" w-3/4 h-full bg-transparent focus:outline-none"
        type="text"
        placeholder="Type Something ..."
      />
      <img
        onClick={handleClick}
        className="w-12  "
        src="send.png"
        alt="send Icon  "
      />
    </div>
  );
}

export default MessageInput;
