import { useTasks } from "@/hooks/useTask";
import { useTaskTypes } from "@/hooks/useTaskType";
import { IKanban } from "@/typings";
import { FC } from "react";
import { useTasksSearchParams } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

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
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const currentTasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <div>
      <h3>{kanban.name}</h3>
      {currentTasks?.map((task) => (
        <div key={task.id}>
          {task.name} <TaskTypeIcon id={task.typeId} />
        </div>
      ))}
    </div>
  );
};
