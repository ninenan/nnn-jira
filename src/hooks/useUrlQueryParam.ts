import { useSearchParams } from "react-router-dom";

const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {} as Record<string, string>),
    setSearchParams,
  ];
};

export default useUrlQueryParam;
