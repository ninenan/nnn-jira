import router from "@/routes";
import ErrorBoundary from "@components/Base/ErrorBoundary";
import FullScreenErrorCallback from "@components/Base/FullScreenErrorFallback";
import { AppProvider } from "@context/index";
import { DevTools, loadServer } from "jira-dev-tool";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
// import "antd/dist/reset.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "antd/dist/reset.css";
library.add(fas);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

loadServer(() => {
  root.render(
    <ErrorBoundary fallbackRender={FullScreenErrorCallback}>
      <AppProvider>
        <React.StrictMode>
          <RouterProvider router={router}></RouterProvider>
          <DevTools />
        </React.StrictMode>
      </AppProvider>
    </ErrorBoundary>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
