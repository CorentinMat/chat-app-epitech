import MessagePart from "@/components/messages_part";

export default function Home() {
  return (
    <main className="grid grid-rows-3 grid-flow-col gap-4">
      <div className=" row-span-2 col-span-1 	bg-lime-400		h-screen  ">
        contact part
      </div>
      <div className=" row-span-2  col-span-3 		">
        <MessagePart></MessagePart>
      </div>
      <div className=" row-span-2 bg-blue-400	 ">members part / groups info</div>
    </main>
  );
}
