import React, { ReactNode, FC } from "react";
import styles from "./index.module.scss";
import ProjectPopover from "@components/ProjectPopover";
import { ReactComponent as SoftwareLogo } from "@assets/img/software-logo.svg";
import { resetRoute } from "@helpers/utils";
import UserTemplate from "../UserTemplate";

interface IProps {
  projectButton: ReactNode;
}

const Header: FC<IProps> = ({ projectButton }) => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerItemContainer}>
          <SoftwareLogo width={"18rem"} onClick={resetRoute} />
          <ProjectPopover projectButton={projectButton} />
          <span>用户</span>
        </div>
        <UserTemplate />
      </header>
    </div>
  );
};

export default Header;
