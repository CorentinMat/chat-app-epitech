import React, { useState, useEffect } from "react";

function MessageInput() {
  const [message, setMessage] = useState("");

  const [data, setData] = useState("");
  const [ws, setWS] = useState(null);
  useEffect(() => {
    const newWS: any = new WebSocket("wss://echo.websocket.org");
    newWS.onerror = (err: any) => console.error(err);
    newWS.onopen = () => setWS(newWS);
    newWS.onmessage = (msg: any) => {
      setData(JSON.parse(msg.data));
      console.log(msg.data);
    };
  }, []);

  const handleClick = () => {
    if (message != "") {
    }
  };
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };
  return (
    <div className="bg-slate-200 w-full   h-14 flex  rounded-md items-center">
      <input
        onChange={handleMessage}
        className="ps-6 w-full  bg-transparent focus:outline-none"
        type="text"
        placeholder="Type Something ..."
      />
      <img
        onClick={handleClick}
        className="w-12  pe-5 "
        src="send.png"
        alt="Send Icon"
      />
    </div>
  );
}

export default MessageInput;
