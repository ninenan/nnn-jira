import { useTasks } from "@/hooks/useTask";
import { useTaskTypes } from "@/hooks/useTaskType";
import { IKanban, ITask } from "@/typings";
import { FC } from "react";
import { Card, MenuProps, Dropdown, Row, Col, Modal, Button } from "antd";
import {
  useKanbanQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.scss";
import CreateTask from "../CreateTask";
import Mark from "@components/Base/Mark";
import { useDeleteKanban } from "@/hooks/useKanbans";

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

export const TaskCard = ({ task }: { task: ITask }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();

  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <Mark keyword={keyword} name={task.name} />
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const More = ({ kanban }: { kanban: IKanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbanQueryKey());
  const [modal, contextHolder] = Modal.useModal();
  const confirmDeleteKanban = () => {
    modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "提示",
      content: `确定删除${kanban.name}吗`,
      onOk: () => {
        deleteKanban({ id: kanban.id });
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button type="text" danger onClick={() => confirmDeleteKanban()}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <Dropdown menu={{ items }} placement="bottomLeft" arrow>
        <span style={{ cursor: "pointer" }}>...</span>
      </Dropdown>
    </div>
  );
};

export const KanbanColumn: FC<IProps> = ({ kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const currentTasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <div className={styles.kanbanColumnContainer}>
      <h3>
        <Row justify="space-between">
          <Col>
            <span>{kanban.name}</span>
          </Col>
          <Col>
            <More kanban={kanban} />
          </Col>
        </Row>
      </h3>
      <div className="styles.tasksConatainer">
        {currentTasks?.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </div>
    </div>
  );
};
