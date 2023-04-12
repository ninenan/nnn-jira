import { useCallback } from "react";
import { Spin } from "antd";
import { KanbanColumn } from "./components/KanbanColumn";
import SearchTem from "./components/SearchTem";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useKanbans, useReorderKanban } from "@/hooks/useKanbans";
import {
  useKanbanQueryKey,
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./utils";
import styles from "./index.module.scss";
import CreateKanban from "./components/CreateKanban";
import TaskModal from "./components/TaskModal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "@components/DragAndDrop";
import { useReorderTask, useTasks } from "@/hooks/useTask";

const KanBan = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading } = useKanbans(useKanbanSearchParams());
  const onDragEnd = useDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.kanbanContainer}>
        <h1>{currentProject?.name}看板</h1>
        <SearchTem />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <div className={styles.kanbanColumnsContainer}>
            <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={"kanban" + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </div>
        )}
        <TaskModal />
      </div>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const referenceId = kanbans?.[destination.index].id;
        if (!fromId || !referenceId || fromId === referenceId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({
          fromId,
          referenceId,
          type,
        });
      }
      // 任务排序
      if (type === "ROW") {
        // console.log(source); // {index: 0, droppableId: '1'}
        // console.log(destination); // {droppableId: '1', index: 1}
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        // 加上下面的同一列的任务不能上下交换
        // if (fromKanbanId === toKanbanId) {
        //   return;
        // }
        const fromTask = allTasks?.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks?.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId: fromKanbanId,
          toKanbanId: toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};

export default KanBan;
