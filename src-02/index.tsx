import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "@/routes/contact";
import { action as destroyAction } from "@/routes/destroy";
import EditContact, { action as editAction } from "@/routes/edit";
import Index from "@/routes/index";
// import Destroy from "@/routes/destroy";
import ErrorPage from "@views/errorPage";
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
      // 在子路由外层包裹一层 errorElement 的组件，当自组件内部出现 error 的时候，ErrorPage 将会替换对应的显示内容
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
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
            // errorElement: <div>Oops! an error</div>,
          },
          // index 用于设置开始页面
          {
            index: true,
            element: <Index />,
          },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    {/* fallbackElement 全局 loading */}
    <RouterProvider
      router={router}
      fallbackElement={<div>loding....</div>}
    ></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
