import MessagePart from "@/components/messages_part";
import { AuthContext } from "../../modules/auth_provider";

import React, { useContext, useEffect } from "react";

function Chat(props: any) {
  // const handleContact = () => {
  //   router.push("/");
  // };
  const { user } = useContext(AuthContext);

  // const router = useRouter();

  return (
    <div className="py-6 px-3">
      <a href={"/"} className="bg-blue-400 p-4 rounded-md">
        Go back to contact
      </a>

      <div className=" col-start-2 col-end-4 col-span-2 	">
        <MessagePart user={user}></MessagePart>
      </div>
    </div>
  );
}

export default Chat;
