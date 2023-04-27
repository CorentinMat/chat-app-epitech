import React, { useEffect, useState } from "react";
import Contact from "..";
import { useRouter } from "next/router";

type Contact = {
  id: number;
  username: string;
  photo: string;
};

type ContactReq = {
  id: number;
};
function MyContact({ id }: any) {
  const router = useRouter();
  const handleMessage = (id: number, username: string) => {
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

  if (contact === null) {
    return <div> loading ....</div>;
  } else {
    return (
      <div>
        Contact
        <ul>
          {contact.map((c) => {
            if (c.photo == "no_photo") {
              return (
                <div
                  key={c.id}
                  className=" flex items-center justify-start space-x-3 font-sans p-3 "
                >
                  <img className="w-12" src="./favicon.ico" alt="" />
                  <li>
                    {c.username + " "} {"#" + c.id}
                  </li>
                  <img
                    onClick={() => {
                      handleMessage(c.id, c.username);
                    }}
                    className=" w-6 absolute right-20  cursor-pointer"
                    src="./chat-icon.png"
                    alt=""
                  />
                </div>
              );
            } else {
              return (
                <div key={c.id}>
                  <img src={c.photo} alt="" />
                  <li>
                    {c.username + " "} {c.id}
                  </li>
                  <img
                    onClick={() => {
                      handleMessage(c.id, c.username);
                    }}
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
