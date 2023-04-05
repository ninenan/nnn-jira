import { useProject } from "@/hooks/useProject";
import useUrlQueryParam from "@/hooks/useUrlQueryParam";
import { useMemo } from "react";
import { useParams } from "react-router";

export const useProjectIdInUrl: () => number = () => {
  // 第一种获取方式
  // const { pathname } = useLocation();
  // const id = pathname.match(/projects\/(\d+)/)?.[1];
  //
  // return Number(id);

  // 第二中获取方式
  const params = useParams();

  return Number(params.id); // 这里直接使用 id，是因为路由定义的时候字段名是 id
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();

  return useMemo(
    () => ({
      projectId,
      typeId: +param.typeId || undefined,
      processorId: +param.processorId || undefined,
      name: param.name,
      tagId: +param.tagId || undefined,
    }),
    [param, projectId]
  );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
