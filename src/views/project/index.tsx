import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuProps } from "antd";
import styles from "./index.module.scss";

const items: MenuProps["items"] = [
  {
    label: "看板",
    key: "kanban",
  },
  {
    label: "任务组",
    key: "epic",
  },
];

const Project = () => {
  const units = useLocation().pathname.split("/");
  const selectedKeys = units[units.length - 1];
  const navigate = useNavigate();

  const onClick = ({ key }: any) => {
    navigate({
      pathname: key,
    });
  };

  return (
    <div className={styles.projectDetailContainer}>
      <div className={styles.projectDetailAside}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKeys]}
          items={items}
          onClick={onClick}
        />
      </div>
      <div className={styles.projectDetailMain}>
        <Outlet />
      </div>
    </div>
  );
};

export default Project;
