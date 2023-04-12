import { useEffect, FC } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { DrawerProps } from "antd/es/drawer";
import ErrorTemplate from "@components/Base/ErrorTemplate";
import { useAddEpic } from "@hooks/useEpic";
import { useEpicQueryKey } from "../../utils";
import { useProjectIdInUrl } from "../../utils";

export type ICreateEpicProps = DrawerProps & { onClose: () => void };

const CreateEpic: FC<ICreateEpicProps> = (props) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicQueryKey());
  const [form] = Form.useForm();
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.open]);

  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorTemplate error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入任务组名" }]}
              >
                <Input placeholder={"请输入任务组名称"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default CreateEpic;

// const Container = styled.div`
//   height: 80vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;
