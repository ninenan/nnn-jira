## react-router-dom V6

## Basic

### 一级路由

ACom.tsx

```typescriptreact
import React from "react";

const ACom = () => {
  return <div>ACom</div>;
};

export default ACom;
```

BCom.tsx

```typescriptreact
import React from "react";

const BCom = () => {
  return <div>BCom</div>;
};

export default BCom;
```

CCom.tsx

```typescriptreact
import React from "react";

const CCom = () => {
  return <div>CCom</div>;
};

export default CCom;
```

Home.tsx

```typescriptreact
import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <HashRouter>
        Home Content
        <Routes>
          {/*基于 element 渲染内容*/}
          <Route path="/a" element={<ACom />} />
          <Route path="/b" element={<BCom />} />
          <Route path="/c" element={<CCom />} />
          {/* 这里将会重定向到 a 页面，并且地址栏所带参数 id=1 */}
          <Route path="/d" element={<Navigate to={{ pathname: "/a", search: "?id=1" }} />}>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default Home;
```

### 嵌套路由

ACom.tsx

```typescriptreact
import React from "react";
import { Outlet } from "react-router-dom";

const ACom = () => {
  return (
    <div>
      ACom
      <div>
        {/* 路由组件容器，二级及以上组件显示内容的位置*/}
        <Outlet />
      </div>
    </div>
  );
};

export default ACom;
```

ACom1.tsx

```typescript
import React from "react";
import { Outlet } from "react-router-dom";

const ACom = () => {
  return <div>ACom1</div>;
};

export default ACom;
```

ACom2.tsx

```typescriptreact
import React from "react";
import { Outlet } from "react-router-dom";

const ACom = () => {
  return <div>ACom2</div>;
};

export default ACom;
```

Home.tsx

```typescriptreact
import React from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <HashRouter>
        Home Content
        <Routes>
          {/* 所有的路由（二级及以上）统一都写在一起进行处理 */}
          <Route path="/a" element={<ACom />}>
            <Route path="/a" element={<Navigate to="/a/a1">} />
            <Route path="/a/a1" element={<ACom1 />} />
            <Route path="/a/a2" element={<ACom2 />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default Home;
```

### 路由跳转 && 传参

#### 路由跳转方式

1. `<Link to="/a">` 点击跳转
2. `<NavLink to="/a" />` 点击跳转
3. `<Navigate to="/a/id:name" />` 遇到组件就会跳转 `id` 是必传，`name` 是可选
4. 编程式导航

```typescriptreact
import { useNavigate } from "react-router-dom";
import qs from "qs";

const navigate = useNavigate();

navigate("/a");
navigate("/a", { replace: true }); // 重定向
navigate({ pathname: "/c" });
navigate({ pathname: "/c", search: "?id=1" });
navigate({ pathname: "/c", search: qs.stringify({ id: "1", name: "xxx" }) });
```

#### 获取方式

1. 问号传参（地址栏可见）

   1. `useLocation`

   ```typescriptreact
   import { useLocation, useNavigate } from "react-router-dom";

   // 跳转方式
   const navigate = useNavigate();
   navigate({
     pathname: "/c",
     search: "?id=1&name:xxx",
   });

   // 获取方式
   // location 当中会有 search 属性，可以直接获取到地址栏中的信息
   const location = useLocation();
   console.log(location.search); //  {id: 1, name: 'xxx'}
   ```

   2. `useSearchParams`

   ```typescriptreact
   import { useSearchParams, useNavigate } from "react-router-dom";
   import qs from "qs";

   // 跳转方式
   const navigate = useNavigate();
   navigate({
     pathname: "/c",
     search: qs.stringify({
       id: 1,
       name: "xxx",
     }),
   });

   // 获取方式
   // useSearchParams 当中返回的第一个就是地址栏中的属性
   const [searchParams] = useSearchParams();
   console.log(qs.parse(searchParams.toString())); // {id: 1, name: 'xxx'}
   ```

2. 路径传参（地址栏可见）

```typescriptreact
import { useParams, Route, useNavigate } from "react-router-dom";

// 路由中的配置
<Route to="/c/id:name" />;

// 跳装方式
const navigate = useNavigate();
navigate("/c/1/xxx");

// 获取方式
const params = useParams();
console.log(params); // {id: 1, name: xxx}
```

4. 隐式传参（地址栏不可见，但是也会一直保持信息）

```typescriptreact
import { useNavigate, useLocation } from 'react-router-dom';

// 跳转方式
const navigate = usenavigate();
navigate('/c', state: {id: 1, name: 'xxx'})

// 获取方式
const location = useLocation()
console.log(location.state) //  {id: 1, name: 'xxx'}

```

ACom.tsx

```typescriptreact
import React from "react";

const ACom = () => {
  return <div>ACom</div>;
};

export default ACom;
```

BCom.tsx

```typescriptreact
import React from "react";

const BCom = () => {
  return <div>BCom</div>;
};

export default BCom;
```

HeaderCom.tsx

```typescriptreact
import React from "react";
import { useLocation } from "react-router-dom";

const BCom = () => {
  // 通过 useLocation 钩子获取到对应的地址栏信息
  const location = useLocation();
  return <div>HeaderCom</div>;
};

export default BCom;
```

Home.tsx

```typescriptreact
import React from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* 注意点 */}
      {/* 使用 useLocation 钩子函数必须只能在 Router（HashRouter, BrowserRouter）中，否则会报错 */}
      {/* 不再通过 props 来获取对应的路由信息，只能通过路由 hooks 来获取 */}
      <HashRouter>
        Home Content
        <HeaderCom>
        <Routes>
          <Route path="/a" element={<ACom />} />
          <Route path="/b" element={<BCom />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default Home;
```

### 路由表及统一管理

One.tsx

```typescriptreact
import React from "react";

const One = () => {
  return <div>OneOneOneOneOneOneOne</div>;
};

export default One;
```

OneSon.tsx

```typescriptreact
import React from "react";

const OneSon = () => {
  return <div>OneSon</div>;
};

export default OneSon;
```

Two.tsx

```typescriptreact
import React from "react";

const Two = () => {
  return <div>Two</div>;
};

export default Two;
```

router.config.ts

```typescriptreact
import { lazy } from "react";

export interface IRoute {
  name?: string;
  path: string;
  element: any;
  meta?: Record<string, any>;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: "/one",
    name: "one",
    element: lazy(() => import(/* webpackChunkName: "one" */ "../views/one")), // Network 可以看到对应加载的 one.chunk.js 文件
    children: [
      {
        path: "/one/oneSon/:name/:height?/:weight?", // name是必传参数 height 和 weight 是可选参数
        name: "oneSon",
        element: lazy(() => import("../views/oneSon")),
      },
    ],
  },
  {
    path: "/two",
    name: "two",
    element: lazy(() => import("../views/two")),
  },
  {
    path: "*",
    element: lazy(() => import("../views/defaultPage")),
  },
];

export default routes;
```

router.index.tsx

```typescriptreact
import React, { Suspense } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
  Route,
  Routes,
} from "react-router-dom";
import routes from "./config";
import type { IRoute } from "./config";
import qs from "qs";

// 统一渲染组件：可以进行权限验证，登录状态校验处理，增加传递的路由信息...
// 这里只要是 Routes 中的 Route 组件中 props 都会加上路由信息，保证了 class 组件的一致性，兼容老版本
const Element = (props: Record<string, any>) => {
  const { element: Component } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const usp = qs.parse(searchParams.toString());

  return (
    <Component
      navigate={navigate}
      location={location}
      params={params}
      usp={usp}
    />
  );
};

// 递归创建路由
const createRoute = (routes: IRoute[]) => {
  return (
    <>
      {routes.map((item, index) => {
        const { path, children = [] } = item;

        return (
          <Route key={index} path={path} element={<Element {...item} />}>
            {Array.isArray(children) && children.length
              ? createRoute(children)
              : null}
          </Route>
        );
      })}
    </>
  );
};

// 如果 Routes 中存在不是 Route 包裹的组件，可以使用以下方式来获取到对应的路由信息
export const withRouter = (Component: any) => {
  const HOC = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [searchParams] = useSearchParams();
    const usp = qs.parse(searchParams.toString());

    return (
      <Component
        {...props}
        navigate={navigate}
        location={location}
        params={params}
        usp={usp}
      />
    );
  };

  return HOC;
};

const RouterView = () => {
  return (
    <>
      {/*当使用组件懒加载的时候，需要在外部增加 Suspense 组件，可以每个懒加载的地方，也可以是全局*/}
      <Suspense fallback={<>loading</>}>
        <Routes>{createRoute(routes)}</Routes>
      </Suspense>
    </>
  );
};

export default RouterView;
```

App.tsx

```typescriptreact
import { HashRouter } from "react-router-dom";
import RouterView from "./router";

export const ThemeContext = createContext(theme.light);

function App() {
  return (
    <div className="App">
      <HashRouter>
        <RouterView />
      </HashRouter>
    </div>
  );
}

export default App;
```

## 移除的内容

- Switch -> Routes
- Redirect -> Navigate
- withRouter -> 自己手动实现
