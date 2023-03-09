import { FC } from "react";
import { Button } from "antd";

interface IProps {
  onClick: () => void;
}

const ButtonProject: FC<IProps> = ({ onClick }) => {
  return (
    <div>
      <Button type="link" onClick={onClick}>
        创建项目
      </Button>
    </div>
  );
};

export default ButtonProject;
