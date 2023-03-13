import styles from "./index.module.scss";
import ProjectPopover from "@components/ProjectPopover";
import { ReactComponent as SoftwareLogo } from "@assets/img/software-logo.svg";
import { resetRoute } from "@helpers/utils";
import UserTemplate from "../UserTemplate";

const Header = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerItemContainer}>
          <SoftwareLogo width={"18rem"} onClick={resetRoute} />
          <ProjectPopover />
          <span>用户</span>
        </div>
        <UserTemplate />
      </header>
    </div>
  );
};

export default Header;
