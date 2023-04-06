import React from "react";
import { useTaskTypes } from "@hooks/useTaskType";
import IdSelect from "@components/IdSelect";

const TaskTypeSelect = (restProps: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes} {...restProps} />;
};
export default TaskTypeSelect;
