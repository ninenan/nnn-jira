import { Outlet } from "react-router-dom";
import ProjectModal from "@components/ProjectModal";
import Header from "./components/Header";
import ButtonProject from "@components/Base/ButtonProject";
import { useProjectModal } from "@hooks/useProject";

const Authenticated = () => {
  const { open } = useProjectModal();

  return (
    <>
      <Header projectButton={<ButtonProject onClick={open} />} />
      <Outlet />
      <ProjectModal />
    </>
  );
};

export default Authenticated;
