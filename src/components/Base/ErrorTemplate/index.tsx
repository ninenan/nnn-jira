import { Typography } from "antd";

// 类型守卫
export const isError = (error: any): error is Error => error?.message;

const ErrorTemplate = ({ error }: { error: unknown }) => {
  return (
    <div>
      {isError(error) ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
    </div>
  );
};

export default ErrorTemplate;
