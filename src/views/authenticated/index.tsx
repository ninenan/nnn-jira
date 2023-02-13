import { useEffect, useState } from "react";
import useHttp from "@hooks/useHttp";
import { IUser } from "@/typings";
import { ReactComponent as SoftwareLogo } from "@assets/img/software-logo.svg";
import List from "@components/List";
import UserTem from "./components/UserTem";
import styles from "./index.module.scss";
import useProject from "./hooks/useProject";

const Authenticated = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { list, isLoading } = useProject();
  const http = useHttp();

  useEffect(() => {
    const init = async () => {
      http(["users"]).then((res) => {
        setUsers(res);
      });
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <header className={styles.header}>
          <div className={styles.headerItemContainer}>
            <SoftwareLogo width={"18rem"} />
            <h2>项目</h2>
            <h2>列表</h2>
          </div>
          <UserTem />
        </header>
        <List dataSource={list} users={users} loading={isLoading} />
      </div>
    </div>
  );
};

export default Authenticated;
