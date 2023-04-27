import MessagePart from "@/components/messages_part";
import AuthContextProvider, { AuthContext } from "../../modules/auth_provider";
import { useContext } from "react";
import { WEBSOCKET_URL } from "../../constants";
import { WebsocketContext } from "../../modules/websocket_provider";
import Contact from "@/components/contact_part";
// changer le px-24 quand il y aura du contenu
export default function Home(props: any) {
  const { user } = useContext(AuthContext);
  const { setConn } = useContext(WebsocketContext);

  const joinRoom = (roomdID: string) => {
    const ws = new WebSocket(
      `${WEBSOCKET_URL}/ws/joinRoom/${roomdID}?user=${user.id}&username=${user.username}`
    );
    if (ws.OPEN) {
      setConn(ws);

      console.log("connection open ", ws);
    }
  };

  const handleJoinRoom = () => {
    joinRoom("2");
  };

  return (
    <main
      className="grid grid-col-4 grid-flow-col-dense
    		gap-4"
    >
      <div className="bg-lime-400 h-screen  px-24">contact part</div>

      <div className=" row-span-1 bg-blue-100	px-6 ">
        members part / groups info
        <button className="bg-red-400 p-3" onClick={handleJoinRoom}>
          test WebSocket
        </button>
        <Contact user={user}></Contact>
      </div>
    </main>
  );
}
