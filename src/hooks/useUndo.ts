import { useCallback, useReducer } from "react";

type State<T> = {
  past: T[];
  future: T[];
  present: T;
};

type StateType = "UNDO" | "REDO" | "SET" | "RESET";

type Action<T> = { newPresnet?: T; type: StateType };

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
        past: [...past, newPresnet],
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
    (newPresnet: T) => dispatch({ type: "SET", newPresnet }),
    []
  );

  return [{ ...state }, { set, reset, undo, redo, canUndo, canRedo }] as const;
};