import React, { useEffect } from "react";
import AddContact from "./add_contact";
import MyContact from "./my_contact";

function Contact({ user }: any) {
  return (
    <div className="flex flex-col space-y-8">
      <MyContact id={user.id}></MyContact>
      <AddContact id={user.id}></AddContact>
    </div>
  );
}

export default Contact;
