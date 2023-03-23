import { useEffect } from "react";
import { Drawer, Button, Spin, Form, Input } from "antd";
import {
  useAddProject,
  useEditProject,
  useProjectModal,
} from "@/views/projectList/hooks/useProject";
import ErrorTemplate from "@components/Base/ErrorTemplate";
import IdSelect from "@components/IdSelect";
import useUsers from "@hooks/useUsers";
import styles from "./index.module.scss";

const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const title = editingProject ? "编辑项目" : "创建项目";
  const useMutateProjet = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, isLoading: mutateLoading, error } = useMutateProjet();
  const [form] = Form.useForm();
  const { data: users } = useUsers();

  const onFinish = (formValue: any) => {
    mutateAsync({ ...editingProject, ...formValue }).then(() => {
      form.resetFields();
      close();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [form, editingProject]);

  const handleOnClose = () => {
    form.resetFields();
    close();
  };

  return (
    <Drawer
      forceRender
      open={projectModalOpen}
      width={"100%"}
      onClose={handleOnClose}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div className={styles.container}>
          <h1>{title}</h1>
          <ErrorTemplate error={error} />
          <Form
            form={form}
            layout={"vertical"}
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <Form.Item
              label={"名称"}
              name="name"
              rules={[{ required: true, message: "请输入项目名" }]}
            >
              <Input placeholder={"请输入项目名称"} />
            </Form.Item>

            <Form.Item
              label={"部门"}
              name="organization"
              rules={[{ required: true, message: "请输入部门名" }]}
            >
              <Input placeholder={"请输入部门名"} />
            </Form.Item>

            <Form.Item label={"负责人"} name="personId">
              <IdSelect options={users} />
            </Form.Item>

            <Form.Item style={{ textAlign: "right" }}>
              <Button
                loading={mutateLoading}
                type={"primary"}
                htmlType={"submit"}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Drawer>
  );
};

export default ProjectModal;
