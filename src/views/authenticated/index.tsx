import { Outlet } from "react-router-dom";
import ProjectModal from "@components/ProjectModal";
import Header from "./components/Header";
import ButtonProject from "@components/Base/ButtonProject";
import { useProjectModal } from "@hooks/useProject";
import styles from "./index.module.scss";

const Authenticated = () => {
  const { open } = useProjectModal();

  return (
    <div className={styles.authorizedContainer}>
      <Header projectButton={<ButtonProject onClick={open} />} />
      <div className={styles.main}>
        <Outlet />
      </div>
      <ProjectModal />
    </div>
  );
};

export default Authenticated;
