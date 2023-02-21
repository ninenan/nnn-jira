import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact, { loader as contactLoader } from "@/routes/contact";
import { action as destroyAction } from "@/routes/destroy";
import EditContact, { action as editAction } from "@/routes/edit";
import ErrorPage from "@views/errorPage";
import Index from "@/routes/index";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./routes/root";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader, // 把当前页面需要初始化的操作可以放到 loader 中，组件当中通过使用 useLoaderData 来获取对应的返回内容
    action: rootAction, // 这里的 action 是当前组件中的
    errorElement: <ErrorPage />, // 当页面出现错误的时候会使用当前的组件
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "/contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! an error</div>,
      },
      // index 用于设置开始页面
      {
        index: true,
        element: <Index />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
