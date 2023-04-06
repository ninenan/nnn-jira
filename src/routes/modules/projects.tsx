import { RouteObject, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const ProjectList = lazy(
  () => import(/* webpackChunkName: "projectList" */ "@views/projectList")
);
const Project = lazy(
  /* webpackChunkName: "project" */ () => import("@views/project")
);
const KanBan = lazy(
  /* webpackChunkName: "kanban" */ () => import("@views/kanban")
);
const Epic = lazy(/* webpackChunkName: "epic" */ () => import("@views/epic"));

const router: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="/projects" />,
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
      // 这里增加一个重定向的操作
      {
        index: true,
        element: <Navigate to="kanban" />,
      },
      {
        path: "kanban",
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
];

export default router;
