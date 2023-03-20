import { useMemo } from "react";
// import useAsync from "@hooks/useAsync";
import { IProject } from "@/typings";
import useHttp from "@hooks/useHttp";
import useUrlQueryParam from "@hooks/useUrlQueryParam";
import { useQuery, useMutation, useQueryClient } from "react-query";

// 旧版
// useAsync
/* export const useProjects = (param?: Partial<IProject>) => {
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
}; */

// react-query
export const useProjects = (data?: Partial<IProject>) => {
  const http = useHttp();

  // data 变化的时候会重新发起请求
  // IProject[] 接口返回的数据类型
  // Error 接口错误的时候数据类型
  return useQuery<IProject[], Error>(["projects", data], () =>
    http("projects", { data })
  );
};

export const useEditProject = () => {
  // const { run, ...restResult } = useAsync();
  // const http = useHttp();
  // const mutate = (params: Partial<IProject>) => {
  //   return run(
  //     http(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   );
  // };
  //
  // return {
  //   mutate,
  //   ...restResult,
  // };

  const http = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (data: Partial<IProject>) =>
      http(`projects/${data.id}`, { method: "PATCH", data }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  // const { run, ...restResult } = useAsync();
  // const http = useHttp();
  // const mutate = (params: Partial<IProject>) => {
  //   return run(
  //     http(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST",
  //     })
  //   );
  // };
  //
  // return {
  //   mutate,
  //   ...restResult,
  // };

  const http = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (data: Partial<IProject>) =>
      http(`projects`, {
        data,
        method: "POST",
      }),
    { onSuccess: () => queryClient.invalidateQueries("projects") }
  );
};

export const useProject = (id?: number) => {
  const http = useHttp();

  // enabled 当 id 不存在的时候不执行请求
  return useQuery<IProject>(["project", { id }], () => http(`projects/${id}`), {
    enabled: !!id,
  });
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

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(+editingProjectId);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setProjectCreate({ projectCreate: undefined });
    editingProjectId && setEditingProjectId({ editingProjectId: undefined });
  };
  const startEdit = (editingProjectId: number) => {
    setEditingProjectId({ editingProjectId });
  };

  return {
    open,
    close,
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    isLoading,
    startEdit,
    editingProject,
  };
};
