import { useState } from "react";
import { useAddKanban } from "@/hooks/useKanbans";
import { useProjectIdInUrl, useTasksQueryKey } from "../../utils";
import { Input } from "antd";
import styles from "../KanbanColumn/index.module.scss";

const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useTasksQueryKey());
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <div className={styles.kanbanColumnContainer}>
      <Input
        size="large"
        placeholder="新建看板名称"
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </div>
  );
};

export default CreateKanban;
