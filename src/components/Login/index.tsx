import { Button, Form, Input } from "antd";
import useHome from "@hooks/useHome";

const Login = () => {
  const { handleLogin, error, isLoading } = useHome();

  return (
    <div>
      {error && error.message}
      <Form onFinish={handleLogin}>
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
            login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
