import React from "react";
import AddContact from "./add_contact";
import MyContact from "./my_contact";

function Contact({ user }: any) {
  return (
    <div>
      <AddContact id={user.id}></AddContact>
      <MyContact id={user.id}></MyContact>
    </div>
  );
}

export default Contact;
