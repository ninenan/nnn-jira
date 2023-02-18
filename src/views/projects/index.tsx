import { useEffect, useState } from "react";
import useHttp from "@hooks/useHttp";
import { IProject, IUser } from "@/typings";
import styles from "./index.module.scss";
import useProject from "./hooks/useProject";
import { cleanObj } from "@/helpers/utils";
import List from "@components/List";

const Projects = () => {
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
    <div className={styles.main}>
      <List
        onSearch={setParam}
        searchParam={param}
        dataSource={list}
        users={users}
        loading={isLoading}
      />
    </div>
  );
};

export default Projects;
