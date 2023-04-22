import React from "react";

function MessageReceive() {
  return (
    <div className="flex 	 font-sans ">
      <img
        className="w-12 items-center	"
        src="./favicon.ico"
        alt="profile-picture"
      />
      <h4 className=" py-2 px-3 items-start font-semibold text-slate-800">
        Michael
      </h4>
      <p className=" py-3 first-letter:items-start text-slate-400  text-xs	">
        19:20
      </p>
    </div>
  );
}

export default MessageReceive;
