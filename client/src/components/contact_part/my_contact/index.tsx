import React, { useEffect, useState, useContext } from "react";
import Contact from "..";
import { useRouter } from "next/router";
import { WebsocketContext } from "../../../../modules/websocket_provider";
import { AuthContext } from "../../../../modules/auth_provider";

type Contact = {
  id: number;
  username: string;
  photo: string;
};

type ContactReq = {
  id: number;
};
const formatId = (id1: string, id2: string) => {
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
const getRooms = async (roomId: string) => {
  const res = await fetch("http://localhost:8080/ws/getRooms");
  const resJon = await res.json();
  for (let i = 0; i < resJon.length; i++) {
    if (resJon[i].id === roomId) {
      console.log(resJon[i].id + "===" + roomId);
      return false;
    }
  }
  console.log("ROOM ==== ", resJon);
  return true;
};
type Room = {
  socket?: WebSocket;
  id: number;
};

// -------------------------------- START COMPONENT --------------------------------
function MyContact({ id }: any) {
  const router = useRouter();
  const handleChatRoom = (id: number, username: string) => {
    router.push(
      {
        pathname: "/chat",
        query: { username, id },
      },
      undefined,
      { shallow: true }
    );
  };
  const [contact, setContact] = useState<Contact[]>([]);
  const req: ContactReq = {
    id: parseInt(id),
  };

  useEffect(() => {
    const getContact = async () => {
      try {
        const res = await fetch("http://localhost:8080/getContact", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        });
        const resJson = await res.json();

        setContact(resJson);
      } catch (e) {
        console.log("Error loading contact: " + e);
      }
    };
    getContact();
  }, [id]);
  // --------------------------- websocket part  ------------------------------------

  const { setConn } = useContext(WebsocketContext);
  const { conn } = useContext(WebsocketContext);

  let Rooms: Room[] = [];
  const { user } = useContext(AuthContext);

  const createRoom = async (contact_id: string) => {
    //🚨 ADD NEW CONVERSATION IN THE DATA BASE  AND NEW END POINT IN BACK END🚨

    if (typeof contact_id === "string") {
      const req = {
        id: formatId(contact_id, user.id.toString()),
        // 🚨 surement changer le nom  car mauvais technique .....🚨 le contact du contact n'est pas mon contact ^^
        name: formatId(contact_id, user.id.toString()),
      };

      // -----------------------pas scalable .... 🚨
      const checkRooms = await getRooms(req.id);
      if (checkRooms) {
        try {
          const res = await fetch("http://localhost:8080/ws/createRoom", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
          });
          // const resJson = await res.json();

          // console.log("resultat fetch createRoom", resJson);
        } catch (e) {
          console.log("Error loading contact: " + e);
        }
      }
      // -----------------------pas scalable .... 🚨

      console.log("roomId: " + roomId);
      console.log("ROOM CREATED");
    } else {
      console.log(" A ROOMD ALREADY EXIST !!!!");
    }
  };
  let roomId: number;

  const joinRoom = (contact_id: string) => {
    roomId = parseInt(formatId(contact_id, user.id.toString()));
    // console.log(roomId);
    createRoom(roomId.toString());
    const url = `ws://127.0.0.1:8080/ws/joinRoom/${roomId}?userId=${user.id}&username=${user.username}`;

    const ws = new WebSocket(url);
    const room: Room = {
      socket: ws,
      id: roomId,
    };
    ws.onerror = (err) => {
      console.error(err);
    };

    ws.onclose = () => {
      console.log(" websocket closed .. ");
    };
    ws.onopen = () => {
      // setConn(ws);
      // console.log(roomId);

      Rooms.push(room);
    };
    return () => {
      ws.close();
    };
  };

  // --------------------------- websocket part  ------------------------------------

  if (contact === null) {
    return <div> No contact 🥱 </div>;
  } else {
    for (let i = 0; i < contact.length; i++) {
      const req = {
        id: contact[i].id,
        username: contact[i].username,
      };
      joinRoom(req.id.toString());
    }
    console.log(Rooms);
    return (
      <div className=" flex flex-col items-center font-sans">
        <h2 className="text-2xl items-center text-center">Contact</h2>
        <ul className="flex  flex-col ">
          {contact.map((c) => {
            if (c.photo == "no_photo") {
              return (
                <div
                  onClick={() => {
                    handleChatRoom(c.id, c.username);
                  }}
                  key={c.id}
                  className="  flex items-center space-x-3 font-sans p-3 cursor-pointer "
                >
                  <img className="w-12" src="./favicon.ico" alt="" />
                  <li>
                    {c.username + " "} {"# " + c.id}
                  </li>
                  <img className=" w-6  " src="./chat-icon.png" alt="" />
                </div>
              );
            } else {
              return (
                <div
                  onClick={() => {
                    handleChatRoom(c.id, c.username);
                  }}
                  key={c.id}
                  className="cursor-pointer"
                >
                  <img src={c.photo} alt="" />
                  <li>
                    {c.username + " "} {c.id}
                  </li>
                  <img
                    className=" w-6 absolute right-20 "
                    src="./chat-icon.png"
                    alt=""
                  />
                </div>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

export default MyContact;
