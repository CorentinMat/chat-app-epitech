import React, { useEffect, useState } from "react";
type ContactReq = {
  contact_id: number;
  id: number;
};
const AddContact = ({ id }: any) => {
  const [contact_id, setContact_id] = useState(0);

  const handleSubmit = async () => {
    try {
      const addContact: ContactReq = {
        contact_id: contact_id,
        id: parseInt(id),
      };
      console.log(addContact);
      const res = await fetch("http://localhost:8080/addContact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addContact),
      });
      if (res.ok) {
        console.log(await res.json());

        alert("Successfully added contact");
      } else {
        alert("couldn't add contact");
      }
    } catch (e) {
      alert("ADD CONTACT FAILED MAYBE THE ID IS INCORRECT ");
    }
  };
  return (
    <div className=" flex flex-col w-full items-center justify-center space-y-6	font-sans	">
      <p className="text-2xl">Add contact</p>
      <input
        className="placeholder-gray-600 focus:placeholder-gray-500 p-2 rounded-md px-5"
        onChange={(e) => {
          setContact_id(parseInt(e.target.value));
        }}
        type="text"
        placeholder=" Only the number 🥸"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-400  rounded-md  p-3 px-5"
      >
        Ajouter
      </button>
    </div>
  );
};

export default AddContact;
