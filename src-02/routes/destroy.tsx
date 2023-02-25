import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }: any) {
  // 抛出错误外部可以捕获到
  // throw new Error("custom destroy error message");

  await deleteContact(params.contactId);

  return redirect("/");
}
