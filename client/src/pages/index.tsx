import MessagePart from "@/components/messages_part";
import AuthContextProvider, { AuthContext } from "../../modules/auth_provider";
import { useContext } from "react";
import Contact from "@/components/contact_part";
import { useRouter } from "next/router";

export default function Home(props: any) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const handleDisconect = async () => {
    localStorage.setItem("user_info", "");
    router.push("/login");
  };
  return (
    <main className=" h-screen">
      <div className=" row-span-1 bg-blue-100	px-6 h-full ">
        <Contact user={user}></Contact>
        <a
          className="bg-red-300 p-3 rounded-md"
          onClick={handleDisconect}
          href="/"
        >
          Logout👋
        </a>
      </div>
    </main>
  );
}
