import { useEffect } from "react";
import useAsync from "@hooks/useAsync";
import { IProject } from "@/typings";
import useHttp from "@hooks/useHttp";

const useProject = (param?: Partial<IProject>) => {
  const { data, isLoading, run } = useAsync<IProject[]>();
  const http = useHttp();

  useEffect(() => {
    const init = async () => {
      run(
        http([
          "projects",
          { data: { name: param?.name, personId: param?.personId } },
        ])
      );
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    list: data || [],
    isLoading,
  };
};

export default useProject;
