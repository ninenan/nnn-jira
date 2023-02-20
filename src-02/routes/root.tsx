import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { getContacts, createContact } from "@/contacts.js";
import { IContact } from "@/typings";

// params 可以获取路径参数中的内容，当前地址栏的显示形式 http://localhost:3001/contacts/k4fagtv
export const loader = async ({ params }: any) => {
  console.log("params", params); // {contactId: xxx}
  const contacts = await getContacts();
  return {
    contacts,
  };
};

export const action = async () => {
  const contact = await createContact();
  return {
    contact,
  };
};

const Root = () => {
  const { contacts } = useLoaderData() as { contacts: IContact[] };
  console.log(contacts);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
