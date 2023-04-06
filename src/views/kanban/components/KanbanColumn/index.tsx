import { useTasks } from "@/hooks/useTask";
import { useTaskTypes } from "@/hooks/useTaskType";
import { IKanban } from "@/typings";
import { FC } from "react";
import { Card } from "antd";
import { useTasksModal, useTasksSearchParams } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.scss";
import CreateTask from "../CreateTask";

export interface IProps {
  kanban: IKanban;
}

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;

  if (!name) {
    return null;
  }
  const iconName = name === "task" ? "tasks" : "bug";
  return <FontAwesomeIcon icon={iconName} />;
};

export const KanbanColumn: FC<IProps> = ({ kanban }) => {
  const { startEdit } = useTasksModal();
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const currentTasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <div className={styles.kanbanColumnContainer}>
      <h3>{kanban.name}</h3>
      <div className="styles.tasksConatainer">
        {currentTasks?.map((task) => (
          <Card
            onClick={() => startEdit(task.id)}
            style={{ marginBottom: "0.5rem" }}
            key={task.id}
          >
            {task.name} <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </div>
    </div>
  );
};
