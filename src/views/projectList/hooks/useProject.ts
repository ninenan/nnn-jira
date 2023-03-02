import { useEffect } from "react";
import useAsync from "@hooks/useAsync";
import { IProject } from "@/typings";
import useHttp from "@hooks/useHttp";

const useProject = (param?: Partial<IProject>) => {
  const { data, isLoading, run } = useAsync<IProject[]>();
  const http = useHttp();

  // 基本类型和组件状态可以放到依赖中
  // 非组件状态的对象，不可以放到依赖中
  // 因此这里的 param 包裹了一层 useMemo
  useEffect(() => {
    run(
      http([
        "projects",
        { data: { name: param?.name, personId: param?.personId } },
      ])
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return {
    list: data || [],
    isLoading,
  };
};

export default useProject;
