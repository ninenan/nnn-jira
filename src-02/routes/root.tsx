import { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "@/contacts.js";
import { IContact } from "@/typings";

// params 可以获取路径参数中的内容，当前地址栏的显示形式 http://localhost:3001/contacts/k4fagtv
export const loader = async ({ params, request }: any) => {
  // console.log("params", params); // {contactId: xxx}

  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);

  return {
    contacts,
    q,
  };
};

export const action = async () => {
  const contact = await createContact();

  return redirect(`/contacts/${contact.id}/edit`);
};

const Root = () => {
  const { contacts, q } = useLoaderData() as {
    contacts: IContact[];
    q: string;
  };
  const navigation = useNavigation();
  const submit = useSubmit();
  // console.log(contacts);

  // const [searchParams] = useSearchParams();
  // const location = useLocation();
  //
  // console.log(location); // location.search 将会返回问号之后的内容
  // console.log("searchParams:", qs.parse(searchParams.toString())); // 用于获取地址栏问号之后的内容

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    (document.getElementById("q") as HTMLInputElement).value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              className={searching ? "loading" : ""}
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(e) => {
                const isFirstSearch = q === null;

                submit(e.currentTarget.form, { replace: !isFirstSearch }); // 设置 replace 为 true 就不会替换当前最新的一条历史堆栈
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
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
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Root;
