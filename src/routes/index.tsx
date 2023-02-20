import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const UnAuthenticated = lazy(
  /* webpackChunkName: "unAuthenticated" */ () =>
    import("@views/unAuthenticated")
);
const ErrorPage = lazy(() => import("@views/errorPage"));
const ProjectList = lazy(
  () => import(/* webpackChunkName: "projectList" */ "@views/projectList")
);
const Project = lazy(
  /* webpackChunkName: "project" */ () => import("@views/project")
);
const Authenticated = lazy(
  /* webpackChunkName: "authenticated" */ () => import("@views/authenticated")
);
const DefaultPage = lazy(
  /* webpackChunkName: "defaultPage" */ () => import("@views/defaultPage")
);
const GridDemo = lazy(
  /* webpackChunkName: "gridDemo" */ () => import("@views/gridDemo")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authenticated />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "/",
      //   element: <Navigate to="/projects" />,
      // },
      {
        path: "/projects",
        element: <ProjectList />,
      },
      {
        path: "/projects/:id",
        element: (
          <Suspense fallback={<h2>loading...</h2>}>
            <Project />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/test",
    // element: <Test />,
    element: <Navigate to={{ pathname: "/projects/1" }} />,
  },
  {
    path: "/gridDemo",
    element: <GridDemo />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<h2>loading...</h2>}>
        <UnAuthenticated />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <DefaultPage />,
  },
]);

export default router;
