import useAsync from "@/hooks/useAsync";
import useAuth from "@hooks/useAuth";
import useHome from "@hooks/useHome";
import { Button, Form, Input } from "antd";
const Regiser = () => {
  const { register } = useAuth();
  const { isLoading, run, isSuccess } = useAsync();

  const handleSubmit = (val: { username: string; password: string }) => {
    run(register(val));
  };

  useHome(isSuccess);

  return (
    <div>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" type="text" id="username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input placeholder="请输入密码" type="password" id="password" />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Regiser;
