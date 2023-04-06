import { useEditTask } from "@/hooks/useTask";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useTasksModal, useTasksQueryKey } from "../../utils";
import { Modal, Form, Input } from "antd";
import TaskTypeSelect from "@/components/TaskTypeSelect";
import IdSelect from "@/components/IdSelect";
import useUsers from "@/hooks/useUsers";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TaskModal = () => {
  const { data: users } = useUsers();
  const [form] = useForm();
  const { editingTask, editingTaskId, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender
      onCancel={onCancel}
      onOk={onOk}
      okText="确认"
      cancelText="取消"
      confirmLoading={editLoading}
      title="编辑任务"
      open={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label="任务名"
          name="name"
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item label="任务组" name="epicId"></Form.Item> */}
        <Form.Item label="经办人" name="processorId">
          <IdSelect options={users} />
        </Form.Item>
        <Form.Item label="类型" name="typeId">
          <TaskTypeSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
