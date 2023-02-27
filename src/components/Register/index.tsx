import { useState } from "react";
import useAsync from "@/hooks/useAsync";
import useAuth from "@hooks/useAuth";
import useHome from "@hooks/useHome";
import { Button, Form, Input } from "antd";
const Regiser = () => {
  const { register } = useAuth();
  const { isLoading, run, isSuccess } = useAsync(undefined, {
    throwError: true,
  });
  const [error, setError] = useState<Error>();

  const handleSubmit = async (val: { username: string; password: string }) => {
    try {
      await run(register(val));
    } catch (err) {
      console.log("err", err);
      setError(err as Error);
    }
  };

  useHome(isSuccess);

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
            register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Regiser;
