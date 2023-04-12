import { useProject } from "@/hooks/useProject";
import { useParams } from "react-router";

export const useProjectIdInUrl = () => {
  const params = useParams();

  return Number(params.id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useEpicQueryKey = () => ["epics", useEpicSearchParams()];
