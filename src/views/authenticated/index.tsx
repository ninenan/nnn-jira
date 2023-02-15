import { useEffect, useState } from "react";
import useHttp from "@hooks/useHttp";
import { IProject, IUser } from "@/typings";
import { ReactComponent as SoftwareLogo } from "@assets/img/software-logo.svg";
import List from "@components/List";
import UserTem from "./components/UserTem";
import styles from "./index.module.scss";
import useProject from "./hooks/useProject";
import { cleanObj } from "@/helpers/utils";

const Authenticated = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [param, setParam] = useState<Partial<IProject>>({
    name: "",
    personId: 0,
  });
  const { list, isLoading } = useProject(cleanObj(param));
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
        <List
          onSearch={setParam}
          searchParam={param}
          dataSource={list}
          users={users}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Authenticated;
