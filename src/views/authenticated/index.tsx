import { useEffect, useState } from "react";
import useHttp from "@/hooks/useHttp";
import { IProject, IUser } from "@/typings";
import List from "@components/List";
import styles from "./index.module.scss";
import { ReactComponent as SoftwareLogo } from "@assets/img/software-logo.svg";
import UserTem from "./components/UserTem";

const Authenticated = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [list, setList] = useState<IProject[]>([]);
  const http = useHttp();

  useEffect(() => {
    const init = async () => {
      http(["projects", { data: { name: "", personId: "" } }]).then((res) => {
        setList(res);
      });

      http(["users"]).then((res) => {
        setUsers(res);
      });
    };

    init();
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
        <List list={list} users={users} />
      </div>
    </div>
  );
};

export default Authenticated;
