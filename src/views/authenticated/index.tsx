import { useEffect, useState } from "react";
import { Button } from "antd";
import useHttp from "@/hooks/useHttp";
import { IProject, IUser } from "@/typings";
import List from "@components/List";
import useAuth from "@hooks/useAuth";
import styles from "./index.module.scss";
import { ReactComponent as SoftwareLogo } from "@assets/img/software-logo.svg";
import UserCom from "./components/UserCom";

const Authenticated = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [list, setList] = useState<IProject[]>([]);
  const { logout } = useAuth();
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
            {/* {titleList.map((item) => { */}
            {/*   return <div key={item.title}>{item.title}</div>; */}
            {/* })} */}
          </div>
          <UserCom />
          {/* <Button onClick={() => logout()} type="primary"> */}
          {/*   退出 */}
          {/* </Button> */}
        </header>
        <List list={list} users={users} />
      </div>
    </div>
  );
};

export default Authenticated;
