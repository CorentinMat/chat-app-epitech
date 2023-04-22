import React from "react";

function MessageSend({ myname }: any) {
  console.log(myname);
  return (
    <div className="flex font-sans ">
      <p className=" py-3 first-letter:items-start text-slate-400  text-xs	">
        {" "}
        surement enlever la date
      </p>
      <h4 className=" py-2 px-3 items-start font-semibold text-slate-800">
        {myname}
      </h4>

      <img
        className="w-12 items-center	"
        src="./favicon.ico"
        alt="profile-picture"
      />
    </div>
  );
}

export default MessageSend;
