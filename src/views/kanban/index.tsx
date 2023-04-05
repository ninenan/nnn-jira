import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useKanbans } from "@/hooks/useKanbans";
import { KanbanColumn } from "./components/KanbanColumn";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";

const KanBan = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      {kanbans?.map((kanban) => (
        <KanbanColumn kanban={kanban} key={kanban.id} />
      ))}
    </div>
  );
};

export default KanBan;
