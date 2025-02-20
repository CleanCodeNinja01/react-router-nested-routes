import {
    ActionFunction,
    Form,
    Params,
    redirect,
    useLoaderData,
  } from "react-router-dom";
  import { deleteContact, getContactById, updateContact } from "../api/contactsApi";
  import { useState } from "react";
  
  export const contactByIdLoader = async ({ params }: { params: Params }) => {
    const { contactId } = params;
    const contact = await getContactById(contactId!);
    if (!contact) {
      throw new Error("Contact not found.");
    }
    return {
      contact,
    };
  };
  
  export const formEditActions: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const action = formData.get("actionType")?.toString();
    const contactId = formData.get("contactId")?.toString();
    const first = formData.get("first")?.toString();
    const last = formData.get("last")?.toString();
    const email = formData.get("email")?.toString();
  
    if (!contactId) {
      throw new Error("Contact ID is required.");
    }
  
    if (action === "delete") {
      await deleteContact(contactId);
    } else if (action === "editSubmit") {
      const contact = await getContactById(contactId);
      if (!contact) throw new Error("Contact not found.");
  
      const updatedContact = {
        ...contact,
        name: {
          first: first || contact.name.first,
          last: last || contact.name.last,
        },
        email: email || contact.email,
      };
  
      await updateContact(contactId, updatedContact);
    }
  
    return redirect("/contacts");
  };
  
  function ContactEditPage() {
    const { contact } = useLoaderData() as Awaited<ReturnType<typeof contactByIdLoader>>;
    const [first, setFirst] = useState<string>(contact.name.first);
    const [last, setLast] = useState<string>(contact.name.last);
    const [email, setEmail] = useState<string>(contact.email);
  
    return (
      <div className="card card-compact w-96 mx-auto bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className={`avatar ${contact.picture ? "" : "placeholder"}`}>
            {contact.picture ? (
              <div className="mask mask-squircle w-12 h-12">
                <img src={contact.picture.thumbnail} alt="Avatar" />
              </div>
            ) : (
              <div className="bg-neutral text-neutral-content rounded-full w-12">
                <span className="uppercase">{first[0]}{last[0]}</span>
              </div>
            )}
          </div>
          <Form method="POST" className="flex flex-col gap-2">
            <input type="hidden" name="contactId" value={contact.login.uuid} />
            <input
              name="first"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              placeholder="First Name"
              className="input input-bordered"
            />
            <input
              name="last"
              value={last}
              onChange={(e) => setLast(e.target.value)}
              placeholder="Last Name"
              className="input input-bordered"
            />
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input input-bordered"
            />
            <div className="flex gap-2 mt-4">
              <button className="btn btn-success btn-sm" type="submit" name="actionType" value="editSubmit">
                Save
              </button>
              <button
                className="btn btn-error btn-sm"
                type="submit"
                name="actionType"
                value="delete"
                onClick={(event) => {
                  if (!confirm("Confirm deletion of this contact?")) {
                    event.preventDefault();
                  }
                }}
              >
                Delete
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
  
  export default ContactEditPage;
  