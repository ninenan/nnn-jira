import { useState } from "react";
import { Outlet } from "react-router-dom";
import ProjectModal from "@components/ProjectModal";
import Header from "./components/Header";
import ButtonProject from "@components/Base/ButtonProject";

const Authenticated = () => {
  const [isShowProjectModal, setIsShowModal] = useState(false);

  return (
    <>
      <Header
        projectButton={<ButtonProject onClick={() => setIsShowModal(true)} />}
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
