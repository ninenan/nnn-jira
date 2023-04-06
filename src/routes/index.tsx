import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import projects from "./modules/projects";

const UnAuthenticated = lazy(
  // 增加 webpackChunkName: "unAuthenticated"，可以在对应的 netWork 中看到对应的 js 文件，相当于是重命名 js 文件操作
  /* webpackChunkName: "unAuthenticated" */ () =>
    import("@views/unAuthenticated")
);
const ErrorPage = lazy(() => import("@views/errorPage"));
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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<h2>loading...</h2>}>
        <Authenticated />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [...projects],
  },
  {
    path: "/test",
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
