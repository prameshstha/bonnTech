import { contactEditDelete, contactListCreate } from "../Constants";

export const getAllContacts = async () => {
  try {
    const a = await fetch(contactListCreate);
    if (a.status === 200) {
      return await a.json();
    } else return {};
  } catch (error) {
    return {};
  }
};

export const cur = async (contact) => {
  let url = "";
  let method = "";
  if (contact.id === "") {
    url = contactListCreate;
    method = "POST";
  } else {
    url = contactEditDelete + contact.id + "/";
    method = "PATCH";
  }
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    const res = await response.json();
    if (response.status === 200 || response.status === 201) {
      return { data: res, status: 200 };
    } else {
      return { data: "Error", status: 400 };
    }
  } catch (erro) {
    return { data: "Server Error", status: 500 };
  }
};
export const deleteContact = async (id) => {
  try {
    const response = await fetch(contactEditDelete + id + "/", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 204 || response.status === 202) {
      return "success";
    } else {
      return "error";
    }
  } catch (erro) {
    return "Server Error";
  }
};
