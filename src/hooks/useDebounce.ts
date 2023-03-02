import { useEffect, useState } from "react";

const useDebounce = <T>(val: T, delay = 300) => {
  const [debounceVal, setDebounceVal] = useState<T>(val);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => clearTimeout(timer);
  }, [val, delay]);

  return debounceVal;
};

export default useDebounce;
