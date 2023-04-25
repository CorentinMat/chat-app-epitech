import React, { useEffect, useState } from "react";
import Contact from "..";
import { useQueryClient } from "react-query";

type Contact = {
  id: number;
  username: string;
  photo: string;
};

type ContactReq = {
  id: number;
};
function MyContact({ id }: any) {
  // let contact: Contact[] = [];
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
        console.log("ici", resJson);
        setContact(resJson);
      } catch (e) {
        console.log("Error loading contact: " + e);
      }
    };
    getContact();
  });

  //// ----------------------------------------------------------------
  const queryClient = useQueryClient();
  // const query = useQuery({ queryKey: ["contact"], queryFn: getContact });
  /////   ----------------------------------------------------------------
  if (contact.length <= 0) {
    return <div> loading ....</div>;
  } else {
    return (
      <div>
        Contact
        <ul>
          {contact.map((c) => {
            return (
              <div key={c.id}>
                <li>{c.username}</li>
                <li>{c.id}</li>
                <li>{c.photo}</li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MyContact;
