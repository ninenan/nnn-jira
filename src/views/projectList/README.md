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

const Father = () => {
  return <div><Son onClick={setUser} /></div>;
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
