import { useState } from "react";

const useArray = <T,>(params: T[]) => {
  const [val, setVal] = useState<T[]>(params);
  const add = (params: T) => {
    setVal([...val, params]);
  };
  const removeIndex = (index: number) => {
    const nextVal = val.slice();
    nextVal.splice(index, 1);

    setVal(nextVal);
  };
  const clear = () => setVal([]);

  return {
    val,
    add,
    removeIndex,
    clear,
  };
};

export default useArray;
