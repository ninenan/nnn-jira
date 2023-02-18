import { createBrowserRouter } from "react-router-dom";
import GridDemo from "@/views/gridDemo";
import Project from "@/views/project";
import Test from "@views/test";
import App from "../App";
import ErrorPage from "@views/errorPage";
import Projects from "@views/projects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "/projects/:id",
        element: <Project />,
      },
    ],
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/gridDemo",
    element: <GridDemo />,
  },
]);

export default router;
