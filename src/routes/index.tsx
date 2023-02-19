import { createBrowserRouter, Navigate } from "react-router-dom";
import GridDemo from "@/views/gridDemo";
import Project from "@/views/project";
import Test from "@views/test";
import ErrorPage from "@views/errorPage";
import ProjectList from "@views/projectList";
import UnAuthenticated from "@views/unAuthenticated";
import DefaultPage from "@/views/defaultPage";
import Authenticated from "@views/authenticated";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authenticated />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/projects" />,
      },
      {
        path: "/projects",
        element: <ProjectList />,
      },
      {
        path: "/projects/:id",
        element: <Project />,
      },
    ],
  },
  {
    path: "/test",
    // element: <Test />,
    element: <Navigate to={{ pathname: "/projects", search: "?id=1" }} />,
  },
  {
    path: "/gridDemo",
    element: <GridDemo />,
  },
  {
    path: "/login",
    element: <UnAuthenticated />,
  },
  {
    path: "*",
    element: <DefaultPage />,
  },
]);

export default router;
