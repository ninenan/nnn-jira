import { useState } from "react";
import { Button } from "antd";
import { Outlet } from "react-router-dom";
import ProjectModal from "@components/ProjectModal";
import Header from "./components/Header";

const Authenticated = () => {
  const [isShowProjectModal, setIsShowModal] = useState(false);

  return (
    <>
      <Header
        projectButton={
          <Button type="link" onClick={() => setIsShowModal(true)}>
            创建项目
          </Button>
        }
      />
      <Outlet />
      <ProjectModal
        isShowProjectModal={isShowProjectModal}
        onClose={() => setIsShowModal(false)}
      />
    </>
  );
};

export default Authenticated;
