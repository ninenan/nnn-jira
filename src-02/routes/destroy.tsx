import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }: any) {
  throw new Error("custom destroy error message");

  await deleteContact(params.contactId);

  return redirect("/");
}
