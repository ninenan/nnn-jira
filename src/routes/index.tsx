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
const Test = lazy(
  /* webpackChunkName: "gridDemo" */ () => import("@views/test")
);
const KanBan = lazy(
  /* webpackChunkName: "kanban" */ () => import("@views/kanban")
);
const Epic = lazy(/* webpackChunkName: "epic" */ () => import("@views/epic"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<h2>loading...</h2>}>
        <Authenticated />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<h2>loading...</h2>}>
            <ProjectList />
          </Suspense>
        ),
      },
      {
        path: "/projects",
        element: (
          <Suspense fallback={<h2>loading...</h2>}>
            <ProjectList />
          </Suspense>
        ),
      },
      {
        path: "/projects/:id",
        element: (
          <Suspense fallback={<h2>loading...</h2>}>
            <Project />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<h2>loading...</h2>}>
                <KanBan />
              </Suspense>
            ),
          },
          {
            path: "epic",
            element: (
              <Suspense fallback={<h2>loading...</h2>}>
                <Epic />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/test",
    // element: <Navigate to={{ pathname: "/projects/1" }} />,
    element: (
      <Suspense fallback={<h2>loading...</h2>}>
        <Test />
      </Suspense>
    ),
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
