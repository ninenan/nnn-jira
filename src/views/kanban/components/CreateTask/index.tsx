import { useAddTask } from "@hooks/useTask";
import { FC, PropsWithChildren, useState, useEffect } from "react";
import { useProjectIdInUrl, useTasksQueryKey } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Card } from "antd";

interface IProps {
  kanbanId: number;
}

const CreateTask: FC<PropsWithChildren<IProps>> = ({ kanbanId }) => {
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ projectId, kanbanId, name });
    setInputMode(false);
    setName("");
  };
  const toggle = () => {
    setInputMode((mode) => !mode);
  };

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return (
      <Card onClick={toggle} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon="add" style={{ marginRight: "2px" }} />
        创建事务
      </Card>
    );
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder="需要做什么"
        autoFocus
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};

export default CreateTask;
