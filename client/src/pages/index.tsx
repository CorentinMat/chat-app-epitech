import MessagePart from "@/components/messages_part";
import AuthContextProvider, { AuthContext } from "../../modules/auth_provider";
import { useContext } from "react";
import { WEBSOCKET_URL } from "../../constants";
import { WebsocketContext } from "../../modules/websocket_provider";
import Contact from "@/components/contact_part";
// changer le px-24 quand il y aura du contenu
export default function Home(props: any) {
  const { user } = useContext(AuthContext);

  return (
    <main className=" h-screen">
      <div className=" row-span-1 bg-blue-100	px-6 h-full ">
        <Contact user={user}></Contact>
      </div>
    </main>
  );
}
