## react-router-dom V6

## Basic

### 一级路由

ACom.tsx

```typescript
import React from "react";

const ACom = () => {
  return <div>ACom</div>;
};

export default ACom;
```

BCom.tsx

```typescript
import React from "react";

const BCom = () => {
  return <div>BCom</div>;
};

export default BCom;
```

CCom.tsx

```typescript
import React from "react";

const CCom = () => {
  return <div>CCom</div>;
};

export default CCom;
```

Home.tsx

```typescript
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

```typescript
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

```typescript
import React from "react";
import { Outlet } from "react-router-dom";

const ACom = () => {
  return <div>ACom2</div>;
};

export default ACom;
```

Home.tsx

```typescript
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
3. `<Navigate to="/a" />` 遇到组件就会跳转
4. 编程式导航

```typescript
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

navigate("/a");
navigate("/a", { replace: true });
navigate({ pathname: "/c" });
navigate({ pathname: "/c", search: "?id=1" });
```

#### 获取方式

1. `useLocation`

```typescript
import { useLocation } from "react-router-dom";
// location 当中会有 search 属性，可以直接获取到地址栏中的信息
const location = useLocation();
```

2. `useSearchParams`

```typescript
import { useSearchParams } from "react-router-dom";
// useSearchParams 当中返回的第一个就是地址栏中的属性
const [usp] = useSearchParams();
```

ACom.tsx

```typescript
import React from "react";

const ACom = () => {
  return <div>ACom</div>;
};

export default ACom;
```

BCom.tsx

```typescript
import React from "react";

const BCom = () => {
  return <div>BCom</div>;
};

export default BCom;
```

HeaderCom.tsx

```typescript
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

```typescript
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

## 移除的内容

- Switch -> Routes
- Redirect -> Navigate
- withRouter -> 自己手动实现
