import { Spin } from "antd";
import { KanbanColumn } from "./components/KanbanColumn";
import SearchTem from "./components/SearchTem";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useKanbans } from "@/hooks/useKanbans";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";
import styles from "./index.module.scss";
import CreateKanban from "./components/CreateKanban";
import TaskModal from "./components/TaskModal";

const KanBan = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading } = useKanbans(useKanbanSearchParams());

  return (
    <div className={styles.kanbanContainer}>
      <h1>{currentProject?.name}看板</h1>
      <SearchTem />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div className={styles.kanbanColumnsContainer}>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </div>
      )}
      <TaskModal />
    </div>
  );
};

export default KanBan;
