import MessagePart from "@/components/messages_part";
import { AuthContext } from "../../modules/auth_provider";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

function Chat(props: any) {
  console.log("hello");
  const handleContact = () => {
    router.push("/");
  };
  const { user } = useContext(AuthContext);

  const router = useRouter();

  return (
    <div>
      <button className="bg-red-400 p-3" onClick={handleContact}>
        Go back to contact
      </button>

      <div className=" col-start-2 col-end-4 col-span-2 	">
        <MessagePart user={user}></MessagePart>
      </div>
    </div>
  );
}

export default Chat;
