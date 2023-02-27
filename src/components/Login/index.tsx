import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import useAuth from "@hooks/useAuth";
import useAsync from "@/hooks/useAsync";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isLoading, run, isSuccess } = useAsync(undefined, {
    throwError: true,
  });
  const [error, setError] = useState<Error>();

  const handleSubmit = (val: { username: string; password: string }) => {
    // 这里可以使用 trycatch 或者 catch
    try {
      run(login(val));
    } catch (error) {
      setError(error as Error);
    }
  };

  useEffect(() => {
    if (isSuccess && navigate) {
      navigate({
        pathname: "/",
      });
    }
  }, [isSuccess, navigate]);

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
