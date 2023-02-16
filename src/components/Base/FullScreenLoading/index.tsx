import React from "react";
import { Spin } from "antd";
import FullScreen from "../FullScreen";

const FullScreenLoading: React.FC = () => {
  return (
    <FullScreen>
      <Spin size="large" />
    </FullScreen>
  );
};

export default FullScreenLoading;
