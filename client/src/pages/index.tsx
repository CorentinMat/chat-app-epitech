import MessagePart from "@/components/messages_part";
import AuthContextProvider, { AuthContext } from "../../modules/auth_provider";
import { useContext } from "react";
// changer le px-24 quand il y aura du contenu
export default function Home(props: any) {
  const { user } = useContext(AuthContext);

  return (
    <main
      className="grid grid-col-4 grid-flow-col-dense
    		gap-4"
    >
      <div className="bg-lime-400 h-screen  px-24">contact part</div>
      <div className=" col-start-2 col-end-4 col-span-2 	">
        <MessagePart user={user}></MessagePart>
      </div>
      <div className=" row-span-1 bg-blue-400	px-6 ">
        members part / groups info
      </div>
    </main>
  );
}
