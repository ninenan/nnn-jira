import { useState } from "react";
import { List, Button, Row, Col, Modal } from "antd";
import { Link } from "react-router-dom";
import { useDeleteEpic, useEpics } from "@/hooks/useEpic";
import { useEpicQueryKey, useEpicSearchParams, useProjectInUrl } from "./utils";
import dayjs from "dayjs";
import { useTasks } from "@/hooks/useTask";
import { IEpic } from "@/typings/modules/epic";
import CreateEpic from "./components/CreateEpic";

const Epic = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey());
  const [modal, contextHolder] = Modal.useModal();
  const [createEpicOpen, setCreateEpicOpen] = useState(false);

  const confirmDeleteEpic = (epic: IEpic) => {
    modal.confirm({
      title: `warning`,
      content: `确定删除项目组：${epic.name}`,
      onOk: () => deleteEpic({ id: epic.id }),
    });
  };

  return (
    <div>
      {contextHolder}
      <Row justify="space-between">
        <Col>
          <h1>{currentProject?.name}任务组</h1>
        </Col>
        <Col>
          <Button onClick={() => setCreateEpicOpen(true)}>创建任务组</Button>
        </Col>
      </Row>
      <List
        style={{ overflow: "auto" }}
        dataSource={epics}
        itemLayout="vertical"
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row justify="space-between">
                  <Col>
                    <span>{epic.name}</span>
                  </Col>

                  <Col>
                    <Button
                      type="text"
                      danger
                      onClick={() => confirmDeleteEpic(epic)}
                    >
                      删除
                    </Button>
                  </Col>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    style={{ marginRight: "5px" }}
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        open={createEpicOpen}
        onClose={() => setCreateEpicOpen(false)}
      />
    </div>
  );
};

export default Epic;
