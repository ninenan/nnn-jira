# 学习 `useRducer`

## 什么时候使用 `useReducer`

`useState` 可以做的操作，`useReducer` 也是可以做到的

当要定义多个互相影响的值，最好使用 `useReducer`，可以简化代码，使代码看起来更加的合理

### 1Version

使用 `useState`

```typescript
import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;

      if (past.length === 0) return currentState;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;

      if (future.length === 0) return currentState;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresnet: T) => {
    setState((currentState) => {
      const { past, present } = currentState;

      if (newPresnet === present) {
        return currentState;
      }

      return {
        past: [...past, present],
        present: newPresnet,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresnet: T) => {
    setState({
      past: [],
      future: [],
      present: newPresnet,
    });
  }, []);

  return [{ ...state }, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
```

### 2Version

使用 `useReducer`

```typescript
import { useCallback, useReducer } from "react";

type State<T> = {
  past: T[];
  future: T[];
  present: T;
};

type StateType = "UNDO" | "REDO" | "SET" | "RESET";

type Action<T> = { newPresnet?: T; type: StateType };

// useReducer 中 state 是上一个值，action 是传递的参数
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { type, newPresnet } = action;
  switch (type) {
    case "UNDO":
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case "REDO":
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    case "SET":
      if (newPresnet === present) {
        return state;
      }

      return {
        past: [...past, present],
        present: newPresnet,
        future: [],
      };
    case "RESET":
      return {
        past: [],
        present: newPresnet,
        future,
      };
    default:
      return state;
  }
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    future: [],
    present: initialPresent,
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);

  const redo = useCallback(() => dispatch({ type: "REDO" }), []);

  const set = useCallback(
    (newPresnet: T) => dispatch({ type: "SET", newPresnet }),
    []
  );

  const reset = useCallback(
    (newPresnet: T) => dispatch({ type: "RESET", newPresnet }),
    []
  );

  return [{ ...state }, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
```

## 使用方式

```typescript
import { Button } from "antd";
import useUndo from "@hooks/useUndo";

const Test = () => {
  const [state, { set, reset, undo, redo, canUndo, canRedo }] =
    useUndo<number>(0);
  let { present, future, past } = state as any;

  return (
    <div>
      <div>一共点击了{present}次</div>
      <Button type="primary" onClick={() => set(present + 1)}>
        +
      </Button> <Button type="primary" onClick={() => set(present - 1)}>
        -
      </Button> <Button type="primary" disabled={!canUndo} onClick={undo}>
        undo
      </Button> <Button type="primary" disabled={!canRedo} onClick={redo}>
        redo
      </Button> <Button onClick={() => reset(0)}>rest to 0</Button>
    </div>
  );
};

export default Test;
```
