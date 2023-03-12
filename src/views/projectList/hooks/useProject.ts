import { useCallback, useEffect, useMemo } from "react";
import useAsync from "@hooks/useAsync";
import { IProject } from "@/typings";
import useHttp from "@hooks/useHttp";
import useUrlQueryParam from "@hooks/useUrlQueryParam";

export const useProjects = (param?: Partial<IProject>) => {
  const { run, ...restResult } = useAsync<IProject[]>();
  const http = useHttp();
  const fetchProjects = useCallback(
    () =>
      http([
        "projects",
        { data: { name: param?.name, personId: param?.personId } },
      ]),
    [http, param?.name, param?.personId]
  );
  // 基本类型和组件状态可以放到依赖中
  // 非组件状态的对象，不可以放到依赖中
  // 因此这里的 param 包裹了一层 useMemo
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param, run, http, fetchProjects]);

  return {
    ...restResult,
  };
};

export const useEditProject = () => {
  const { run, ...restResult } = useAsync();
  const http = useHttp();
  const mutate = (params: Partial<IProject>) => {
    return run(
      http([
        `projects/${params.id}`,
        {
          data: params,
          method: "PATCH",
        },
      ])
    );
  };

  return {
    mutate,
    ...restResult,
  };
};

export const useAddProject = () => {
  const { run, ...restResult } = useAsync();
  const http = useHttp();
  const mutate = (params: Partial<IProject>) => {
    return run(
      http([
        `projects/${params.id}`,
        {
          data: params,
          method: "POST",
        },
      ])
    );
  };

  return {
    mutate,
    ...restResult,
  };
};

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  return [
    useMemo(
      () => ({ ...param, personId: +param.personId || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
