### prop drilling（prop 下钻）

当一个组件需要的属性是从爷爷（或者以上）组件传入的时候

App.tsx

```typescript
import Father from Father;
import {useState} from "react";

const App = () => {
  const [user, setUser] = useState();

  return <div><Father onClick={setUser} /></div>;
};
```

Father.tsx

```typescript
import Son from Son;
import {FC} from 'react';

const Father:FC<{onClick:() => void}> = ({onClick}) => {
  return <div><Son onClick={onClick} /></div>;
};

export default Father;
```

Son.tsx

```typescript
import { FC } from "react";

const Son: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div>
      <buton onClick={onClick} >click</button>
    </div>
  );
};

export default Son;
```

`Son` 组件中接受到的 `onClick` 一直是从 `App` 组件中传过来的

### 组件组合（component composition）

这里如果孙子组件其实用的内容完全就是爷爷组件传入进来的，其实可以直接传入一个组件进来

修改如下

Son.tsx

```typescript
import { FC, ReactNode } from "react";

const Son: FC<{Button: ReactNode}> = ({ Button }) => {
  return (
    <div>
      <buton onClick={onClick} >click</button>
      {Button}
    </div>
  );
};

export default Son;

```

Father.tsx

```typescript
import Son from Son;
import { FC, ReactNode } from 'react';

const Father:FC<{Button: ReactNode}> = ({ Button }) => {
  return <div>{Button}</div>;
};

export default Father;
```

App.tsx

```typescript
import Father from Father;
import {useState} from "react";

const App = () => {
  const [user, setUser] = useState();

  return (
    <div>
      <Father
        onClick={
          <button onClick={() => setUser({ name: "test" })}>click</button>
        }
      />
    </div>
  );
};
```
