import useDocumentTitle from "@/hooks/useDocumentTitle";
import { IUser } from "@/typings";
import SearchCom from "@components/SearchCom";
import { Row, Button } from "antd";
import { FC, useEffect, useState } from "react";
import styles from "./index.module.scss";
import useHttp from "@hooks/useHttp";
import { useProjectModal, useProjectsSearchParams } from "./hooks/useProject";
import ProjectModal from "@components/ProjectModal";
import ButtonProject from "@components/Base/ButtonProject";
import List from "./components/List/index";

const ProjectList: FC = () => {
  useDocumentTitle("项目列表", false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [param, setParam] = useProjectsSearchParams();
  const http = useHttp();
  const { open } = useProjectModal();

  useEffect(() => {
    const init = async () => {
      http(["users"]).then((res) => {
        setUsers(res);
      });
    };

    init();
  }, [http]);

  return (
    <div className={styles.container}>
      <Row justify="space-between" align="middle">
        <h1>项目列表</h1>
        <ButtonProject onClick={open} />
      </Row>
      <SearchCom
        searchParam={param}
        onSearch={setParam}
        users={users}
        styles={{ marginBottom: "2rem" }}
      />
      <List
        users={users}
        projectButton={
          <Button onClick={open} type="link">
            创建项目
          </Button>
        }
      />
      <ProjectModal />
    </div>
  );
};

export default ProjectList;
