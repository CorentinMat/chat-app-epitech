import React from "react";
import MessageSend from "./messages/messages_send";
import MessageInput from "./messages/message_input";
import MessageContentReceive from "./messages/message_content_receive";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

type CreateRoomReq = {
  id: string; // maybe number ?
  name: string;
};

const formatId = (id1: any, id2: string) => {
  if (typeof id1 === "string") {
    const int_id1 = parseInt(id1);
    const int_id2 = parseInt(id2);
    if (int_id1 > int_id2) {
      return id2 + id1;
    }
    return id1 + id2;
  }
  return "error";
};
const MessagePart = ({ user }: any) => {
  const router = useRouter();
  const contact = {
    id: router.query.id,
    username: router.query.username,
  };
  const [data, setData] = useState();
  const [ws, setWS] = useState<WebSocket>();
  useEffect(() => {
    joinRoom();
  }, []);

  // 🚨 CHANGE ROOM ID 🚨
  let roomId: number;
  const createRoom = async () => {
    //🚨 ADD NEW CONVERSATION IN THE DATA BASE  AND NEW END POINT IN BACK END🚨
    const contact_id = contact.id;

    if (typeof contact_id === "string") {
      const req = {
        id: formatId(contact_id, user.id),
        // 🚨 surement changer le nom  car mauvais technique .....🚨 le contact du contact n'est pas mon contact ^^
        name: contact.username,
      };

      try {
        const res = await fetch("http://localhost:8080/ws/createRoom", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        });
        const resJson = await res.json();

        console.log("resultat fetch createRoom", resJson);
      } catch (e) {
        console.log("Error loading contact: " + e);
      }

      roomId = parseInt(req.id);
    } else {
      console.log(" type of contact_id != string ... ");
    }
  };
  const joinRoom = () => {
    // if (!roomId) {
    //   createRoom();
    // }
    roomId = parseInt(formatId(contact.id, user.id));
    const url = `ws://127.0.0.1:8080/ws/joinRoom/${roomId}?user=${user.id}&username=${user.username}`;
    console.log(url);
    const ws = new WebSocket(url);
    ws.onerror = (err) => {
      console.error(err);

      // ❌ peut être a changer d'endroit createRoom ❌
      createRoom();
    };
    ws.onmessage = (e) => {
      console.log("message received : ", e.data);
    };
    ws.onclose = () => {
      console.log("closed");
    };
    ws.onopen = () => {
      setWS(ws);
      // ws.send("ceci est un test du client :" + user.username);
    };
    return () => {
      ws.close();
    };
  };

  return (
    <div className="h-full ">
      hello, {user.username}, id = {user.id}
      {/* Message container */}
      <div className="h-[50rem] overflow-scroll	 ">
        <MessageSend myname={user.username}></MessageSend>
        <MessageSend></MessageSend>
        <MessageContentReceive></MessageContentReceive>
      </div>
      <div className=" flex items-center justify-center">
        {/* Message input */}
        <MessageInput ws={ws}></MessageInput>
      </div>
    </div>
  );
};

export default MessagePart;
