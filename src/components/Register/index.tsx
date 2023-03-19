import useHome from "@hooks/useHome";
import { Button, Form, Input } from "antd";
import ErrorTemplate from "@components/Base/ErrorTemplate";

const Regiser = () => {
  const { isLoading, error, handleRegister } = useHome();

  return (
    <div>
      {error && <ErrorTemplate error={error} />}
      <Form onFinish={handleRegister}>
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
