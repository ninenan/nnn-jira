import { ReactComponent as SoftwareLogo } from "@assets/img/software-logo.svg";
import UserTem from "./components/UserTem";
import styles from "./index.module.scss";
import { Outlet } from "react-router-dom";

const Authenticated = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerItemContainer}>
          <SoftwareLogo width={"18rem"} />
          <h2>项目</h2>
          <h2>用户</h2>
        </div>
        <UserTem />
      </header>
      <Outlet />
    </>
  );
};

export default Authenticated;
