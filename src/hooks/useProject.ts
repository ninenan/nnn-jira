import { useMemo } from "react";
import { IProject } from "@typings/index";
import useHttp from "@hooks/useHttp";
import useUrlQueryParam, {
  useSetUrlSearchParams,
} from "@hooks/useUrlQueryParam";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "@hooks/useOptimisticOptions";

export const useProjects = (data?: Partial<IProject>) => {
  const http = useHttp();

  // data 变化的时候会重新发起请求
  // IProject[] 接口返回的数据类型
  // Error 接口错误的时候数据类型
  return useQuery<IProject[], Error>(["projects", data], () =>
    http("projects", { data })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (data: Partial<IProject>) =>
      http(`projects/${data.id}`, { method: "PATCH", data }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (data: Partial<IProject>) =>
      http(`projects`, {
        data,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      http(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
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

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const setSearchParams = useSetUrlSearchParams();
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(+editingProjectId);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () =>
    setSearchParams({ projectCreate: "", editingProjectId: "" }); // 关闭时清空地址栏数据
  const startEdit = (editingProjectId: number) =>
    setEditingProjectId({ editingProjectId });

  return {
    open,
    close,
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    isLoading,
    startEdit,
    editingProject,
  };
};
