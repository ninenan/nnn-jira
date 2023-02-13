import { useState } from "react";
import { Button, Form, Input } from "antd";
import useAuth from "@hooks/useAuth";
import useAsync from "@/hooks/useAsync";

const Login = () => {
  const { login } = useAuth();
  const { isLoading, run } = useAsync(undefined, { throwError: true });
  const [error, setError] = useState<Error>();

  const handleSubmit = async (val: { username: string; password: string }) => {
    // 这是可以使用 trycatch 或者 catch
    try {
      await run(login(val));
    } catch (error) {
      setError(error as Error);
    }
  };

  return (
    <div>
      {error && error.message}
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
            login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
