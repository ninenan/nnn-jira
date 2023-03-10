import { useCallback, useState } from "react";

export const useUndo = <T,>(initialPresent: T) => {
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
        past: [...past, newPresnet],
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
