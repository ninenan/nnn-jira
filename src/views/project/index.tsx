import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu } from "antd";
import styles from "./index.module.scss";

const Project = () => {
  const units = useLocation().pathname.split("/");
  const selectedKeys = units[units.length - 1];

  return (
    <div className={styles.projectDetailContainer}>
      <div className={styles.projectDetailAside}>
        <Menu mode="inline" selectedKeys={[selectedKeys]}>
          <Menu.Item key="kanban">
            <Link to="">看板</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to="epic">任务组</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className={styles.projectDetailMain}>
        <Outlet />
      </div>
    </div>
  );
};

export default Project;
