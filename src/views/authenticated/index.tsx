import { useEffect, useState } from "react";
import useHttp from "@hooks/useHttp";
import useAsync from "@hooks/useAsync";
import { IProject, IUser } from "@/typings";
import { ReactComponent as SoftwareLogo } from "@assets/img/software-logo.svg";
import List from "@components/List";
import UserTem from "./components/UserTem";
import styles from "./index.module.scss";

const Authenticated = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const http = useHttp();
  const { data: list, run, isLoading } = useAsync<IProject[]>();

  useEffect(() => {
    const init = async () => {
      run(http(["projects", { data: { name: "", personId: "" } }]));

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
        <List dataSource={list || []} users={users} loading={isLoading} />
      </div>
    </div>
  );
};

export default Authenticated;
