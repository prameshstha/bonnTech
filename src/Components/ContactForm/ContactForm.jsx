import { useState, React } from "react";
import { cur } from "../../Services/ContactsAPI";

const ContactForm = ({
  clearContact,
  getContacts,
  setContacts,
  contacts,
  setMessage,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async (e) => {
    setIsLoading(true);
    setMessage("Saving...");
    e.preventDefault();
    const ed = await cur(contacts);
    if (ed.status === 200) {
      setMessage("Contact Saved");
      document.getElementById("message").classList.add("text-success");
      clearContact();
    }
    getContacts();
    setIsLoading(false);
  };

  return (
    <div className="h-50 w-25">
      <h3>Contact Form</h3>
      <span>{contacts.id ? "Update Contact" : "Add New Contact"}</span>

      <form
        id="contactForm"
        className="form-control p-2 "
        onSubmit={submitHandler}
      >
        <div className="">
          <label htmlFor="fname">First Name</label>
          <input
            className="form-control"
            type="text"
            id="fname"
            name="first_name"
            placeholder="Your name.."
            required
            value={contacts.first_name}
            onChange={(e) =>
              setContacts({ ...contacts, first_name: e.target.value })
            }
          />
        </div>

        <label htmlFor="lname">Last Name</label>
        <input
          className="form-control"
          type="text"
          id="lname"
          name="last_name"
          placeholder="Your last name.."
          required
          value={contacts.last_name}
          onChange={(e) =>
            setContacts({ ...contacts, last_name: e.target.value })
          }
        />
        <label htmlFor="Mobile">Mobile</label>
        <input
          className="form-control"
          type="number"
          id="Mobile"
          name="mobile"
          placeholder="Your Mobile number.."
          required
          value={contacts.mobile}
          onChange={(e) => setContacts({ ...contacts, mobile: e.target.value })}
        />
        <label htmlFor="Email">Email</label>
        <input
          className="form-control"
          type="email"
          id="Email"
          name="email"
          value={contacts.email}
          placeholder="Your Email address.."
          onChange={(e) => setContacts({ ...contacts, email: e.target.value })}
        />
        <label htmlFor="Postcode">Postcode</label>
        <input
          className="form-control"
          id="Postcode"
          name="postcode"
          placeholder="Postcode..."
          value={contacts.postcode}
          onChange={(e) =>
            setContacts({ ...contacts, postcode: e.target.value })
          }
        ></input>
        <input
          className="form-control btn btn-primary mt-2"
          type="submit"
          value={isLoading ? "Saving..." : "Save"}
          // defaultValue={}
        />
        <input
          className="form-control btn btn-primary mt-2"
          role="button"
          defaultValue="Clear"
          onClick={clearContact}
        />
      </form>
    </div>
  );
};

export default ContactForm;
