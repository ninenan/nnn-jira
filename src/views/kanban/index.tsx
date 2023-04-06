import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useKanbans } from "@/hooks/useKanbans";
import { KanbanColumn } from "./components/KanbanColumn";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";
import styles from "./index.module.scss";
import SearchTem from "./components/searchTem";

const KanBan = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());

  return (
    <div className={styles.kanbanContainer}>
      <h1>{currentProject?.name}看板</h1>
      <SearchTem />
      <div className={styles.kanbanColulmnsContainer}>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </div>
    </div>
  );
};

export default KanBan;
