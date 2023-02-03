import useAuth from "@hooks/useAuth";
import { Button, Card, Form, Input } from "antd";

const Login = () => {
  const { login } = useAuth();

  const handleSubmit = (val: { username: string; password: string }) => {
    login(val);
  };

  return (
    <div>
      <Card style={{ width: "450px" }}>
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="username"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input type="text" id="username" />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input type="password" id="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
