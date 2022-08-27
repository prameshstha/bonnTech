import React from "react";
import "./Contacts.css";
import { useEffect, useState } from "react";
import { getAllContacts } from "../../Services/ContactsAPI";
import { ContactForm, ContactTable } from "../../Components";

const Contacts = () => {
  const [contacts, setContacts] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    mobile: "",
    postcode: "",
  });
  const [allContacts, setAllContacts] = useState();
  const [message, setMessage] = useState();
  //   const message = document.getElementById("message");
  const clearContact = () => {
    setContacts({
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      mobile: "",
      postcode: "",
    });
  };
  const getContacts = async () => {
    const con = await getAllContacts();
    setAllContacts(con);
  };
  useEffect(() => {
    getContacts();
  }, []);
  setTimeout(() => setMessage(""), 10000);
  //   console.log(contacts);
  return (
    <div className="container d-flex p-2 mt-4">
      <ContactForm
        setAllContacts={setAllContacts}
        clearContact={clearContact}
        getContacts={getContacts}
        setContacts={setContacts}
        contacts={contacts}
        setMessage={setMessage}
      />
      <ContactTable
        allContacts={allContacts}
        clearContact={clearContact}
        getContacts={getContacts}
        setContacts={setContacts}
        setMessage={setMessage}
        message={message}
      />
    </div>
  );
};

export default Contacts;
