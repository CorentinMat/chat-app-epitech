import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WebsocketContext } from "../../../../../modules/websocket_provider";
import { AuthContext } from "../../../../../modules/auth_provider";
import { formatId } from "@/components/contact_part/my_contact";
import { json } from "stream/consumers";

export type Message = {
  content: string;
  room_id: string;
  username: string;
  id: number;
  sent_datetime: string;
  // type: "recv" | "self";
};
type SaveMsgReq = {
  from_user: string;
  message_text: string;
  sent_datetime: string;
  conversation_id: number;
};
type GetMsgReq = {
  conversation_id: number;
};

function MessageSend({ myname }: any) {
  const { user } = useContext(AuthContext);

  // const { conn } = useContext(WebsocketContext);
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);

  const contact = {
    username: router.query.username,
    id: router.query.id,
  };
  // let msg = {
  //   id: 0,
  //   sent_datetime: "no datetime",
  // };
  let message: Message;
  const saveMsg = async (message: Message) => {
    try {
      const req: SaveMsgReq = {
        from_user: message.username,
        message_text: message.content,
        sent_datetime: "pas d'heure pour le moment",
        // 🚨 A CHANGER PAR LA SUITE !!! 🚨
        conversation_id: parseInt(message.room_id),
      };
      const res = await fetch("http://localhost:8080/saveMsg", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (!res.ok) {
        console.log("could'nt save the msg ");
      }
      const data = await res.json();

      message.id = data.message_id;
      message.sent_datetime = data.sent_datetime;
    } catch (e) {
      console.log("catch error = " + e);
    }
  };

  const getMsg = async (conv_id: number) => {
    try {
      const req: GetMsgReq = {
        conversation_id: conv_id,
      };
      const res = await fetch("http://localhost:8080/getMsg", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (!res.ok) {
        console.log("getMsg error = " + res);
      }
      const data = await res.json();
      console.log("get all msg from conv 2 = ", data);
    } catch (e) {
      console.log("getting message error = " + e);
    }
  };
  useEffect(() => {
    if (contact.id) {
      let roomId = parseInt(
        formatId(contact.id.toString(), user.id.toString())
      );
      const url = `ws://127.0.0.1:8080/ws/joinRoom/${roomId}?userId=${user.id}&username=${user.username}`;
      const socket = new WebSocket(url);
      socket.onopen = () => {
        console.log("opened");
      };
      socket.onclose = () => {
        console.log("closed");
      };
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log("data => ", data);
        message = {
          content: data.content,
          //🚨 à changer quand conv id sera mis a jour / mettre le meme id pour la conv id que room id 🚨
          room_id: data.room_id,
          username: data.username,
          id: 1,
          sent_datetime: "no datetime",
        };
        if (message.content != "New user has joined this room") {
          saveMsg(message);

          const newMessages = [...messages];

          newMessages.push(message);

          setMessages(newMessages);
          console.log(messages);
        } else {
          getMsg(parseInt(message.room_id));
        }
        console.log("msg :", message);
      };
      return () => {
        socket.close();
      };
    }
  }, []);

  return (
    <div className="flex font-sans ">
      <img
        className="w-12 items-center	"
        src="./favicon.ico"
        alt="profile-picture"
      />
      <h4 className=" py-2 px-3 items-start font-semibold text-slate-800">
        {user.username}
      </h4>
      <p className=" py-3 first-letter:items-start text-slate-400  text-xs	">
        {" "}
        surement enlever la date
      </p>
      <ul className="bg-red-200">
        message ==
        {messages.map((msg) => {
          return <li key={msg.id}>{msg.content}</li>;
        })}
      </ul>
    </div>
  );
}

export default MessageSend;
