import React from "react";
import { useState } from "react";
import "./ContactTable.css";
import { deleteContact } from "../../Services/ContactsAPI";

const ContactTable = ({
  allContacts,
  clearContact,
  getContacts,
  setContacts,
  message,
  setMessage,
  isLoading,
  setIsLoading,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteCont = async (contact) => {
    setIsDeleting(true);
    if (
      window.confirm(
        "Are you sure you wanto to delete '" +
          contact.first_name +
          " " +
          contact.last_name +
          "'"
      )
    ) {
      const deleted = await deleteContact(contact.id);

      if (deleted === "success") {
        clearContact();
        getContacts();
        setMessage("Contact Deleted");
        document.getElementById("message").classList.add("text-success");
      } else {
        setMessage("Contact Not deleted");
        document.getElementById("message").classList.add("text-danger");
      }
    }
    setIsDeleting(false);
  };
  return (
    <div className="container mb-4">
      <div className="d-flex">
        <span className="d-flex">
          <label className="m-2" htmlFor="searchValue">
            Search Contact:
          </label>
          <input
            name="searchValue"
            className="form-control m-3"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Contact"
          />
        </span>
        <span className="font-weight-bold m-3" id="message">
          <strong>{isDeleting ? "Deleting..." : message}</strong>
        </span>
      </div>

      <div className="table__wrapper">
        <table className="table border table-striped table-hover">
          <thead className="bg-warning">
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Postcode</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {allContacts &&
              allContacts.map(
                (a) =>
                  (a.first_name + a.last_name + a.email + a.mobile + a.postcode)
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) && (
                    <tr key={a.id}>
                      <td>{a.first_name}</td>
                      <td>{a.last_name}</td>
                      <td>{a.mobile}</td>
                      <td> {a.email === "" ? "NA" : a.email}</td>
                      <td> {a.postcode === "" ? "NA" : a.postcode}</td>
                      <td>
                        {" "}
                        <span
                          className="text-primary m-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setMessage(
                              "'" +
                                a.first_name +
                                " " +
                                a.last_name +
                                "'" +
                                " selected"
                            );
                            setContacts({
                              id: a.id,
                              email: a.email,
                              first_name: a.first_name,
                              last_name: a.last_name,
                              mobile: a.mobile,
                              postcode: a.postcode,
                            });
                          }}
                        >
                          Edit
                        </span>
                        <span
                          className="text-danger m-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteCont(a)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;
