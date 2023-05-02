import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WebsocketContext } from "../../../../../modules/websocket_provider";
import { AuthContext } from "../../../../../modules/auth_provider";
import { formatId } from "@/components/contact_part/my_contact";
import { json } from "stream/consumers";

export type Message = {
  content: string;
  conversation_id: number;
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
        sent_datetime: message.sent_datetime,
        // 🚨 A CHANGER PAR LA SUITE !!! 🚨
        conversation_id: message.conversation_id,
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
      const newMessages = [...messages];

      for (let i = 0; i < data.length; i++) {
        const newMessages = [...messages];

        newMessages.push(message);
      }
      console.log("messages = " + newMessages);
      // setMessages(newMessages);
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
        const date = new Date();
        const minute = date.getMinutes().toString();
        const hour = date.getHours().toString();
        const second = date.getSeconds().toString();
        const all = hour + ":" + minute + ":" + second;
        message = {
          content: data.content,
          //🚨 à changer quand convd sera mis a jour / mettre le meme id pour la conv id que room id 🚨
          conversation_id: parseInt(data.room_id),
          username: data.username,
          id: 1,
          sent_datetime: all,
        };
        if (message.content != "New user has joined this room") {
          saveMsg(message);

          const newMessages = [...messages];

          newMessages.push(message);

          setMessages(newMessages);
        } else {
          getMsg(message.conversation_id);
        }
        console.log("msg :", message);
      };
      return () => {
        socket.close();
      };
    }
  }, [messages]);
  let lastmsg = "";

  return (
    <div className="">
      {messages.map((msg) => {
        if (lastmsg != msg.username) {
          lastmsg = msg.username;
          return (
            <div key={msg.id} className="flex font-sans  pr-6 ">
              <img
                className="w-12 items-center	"
                src="./favicon.ico"
                alt="profile-picture"
              />
              <h4 className=" py-2 px-3 items-start font-semibold text-slate-800">
                {msg.username} :
              </h4>
              <p className="py-2 px-3 items-start break-words">{msg.content}</p>
              <p className=" py-3 first-letter:items-start text-slate-400  text-xs	">
                {msg.sent_datetime}
              </p>
            </div>
          );
        } else {
          lastmsg = msg.username;
          return (
            <div key={msg.id} className="flex font-sans   pr-6 space-x-3">
              <p className="py-2  pl-message  items-start break-words">
                {msg.content}
              </p>
              <p className=" py-3 first-letter:items-start text-slate-400  text-xs	">
                {msg.sent_datetime}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
}

export default MessageSend;
