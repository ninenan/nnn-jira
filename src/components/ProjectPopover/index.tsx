import React from "react";
import { Popover, Typography } from "antd";

type IProps = {};

const ProjectPopver = (props: IProps) => {
  const { Paragraph } = Typography;

  const content = (
    <div>
      <Typography>
        <Paragraph>收藏项目</Paragraph>
      </Typography>
    </div>
  );
  return (
    <Popover placement="bottom" content={content}>
      项目
    </Popover>
  );
};

export default ProjectPopver;
