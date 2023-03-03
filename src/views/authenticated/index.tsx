import { useState } from "react";
import { Button } from "antd";
import { ReactComponent as SoftwareLogo } from "@assets/img/software-logo.svg";
import UserTemplate from "./components/UserTemplate";
import styles from "./index.module.scss";
import { Outlet } from "react-router-dom";
import { resetRoute } from "@helpers/utils";
import ProjectModal from "@components/ProjectModal";

const Authenticated = () => {
  const [isShowProjectModal, setIsShowProjectModal] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerItemContainer}>
          <SoftwareLogo width={"18rem"} onClick={resetRoute} />
          <h2>项目</h2>
          <h2>用户</h2>
        </div>
        <UserTemplate />
      </header>
      <Button onClick={() => setIsShowProjectModal(true)}>showModal</Button>
      <Outlet />
      <ProjectModal
        isShowProjectModal={isShowProjectModal}
        onClose={() => setIsShowProjectModal(false)}
      />
    </>
  );
};

export default Authenticated;
