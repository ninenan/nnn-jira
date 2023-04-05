import { Input, Button, Form } from "antd";
import { useSetUrlSearchParams } from "@hooks/useUrlQueryParam";
import { useTasksSearchParams } from "../utils";
import IdSelect from "@components/IdSelect";
import useUsers from "@/hooks/useUsers";
import { useTaskTypes } from "@/hooks/useTaskType";

const SearchTem = () => {
  const { data: users } = useUsers();
  const { data: taskTypes } = useTaskTypes();
  const searchParmas = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParams();
  const reset = () => {
    setSearchParams({
      projectId: undefined,
      typeId: undefined,
      tagId: undefined,
      processorId: undefined,
      name: undefined,
    });
  };

  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          style={{ width: "20rem" }}
          placeholder="任务名"
          value={searchParmas.name}
          onChange={(e) => setSearchParams({ name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <IdSelect
          defaultOptionName="负责人"
          placeholder="负责人"
          value={searchParmas.processorId}
          options={users}
          onChange={(val: any) => setSearchParams({ processorId: val })}
        />
      </Form.Item>
      <Form.Item>
        <IdSelect
          defaultOptionName="类型"
          placeholder="类型"
          value={searchParmas.typeId}
          options={taskTypes}
          onChange={(val: any) => setSearchParams({ typeId: val })}
        />
      </Form.Item>
      <Button onClick={reset}>重置</Button>
    </Form>
  );
};

export default SearchTem;
