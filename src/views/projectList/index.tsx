import useDocumentTitle from "@/hooks/useDocumentTitle";
import SearchCom from "@components/SearchCom";
import { Row } from "antd";
import { FC } from "react";
import styles from "./index.module.scss";
import { useProjectModal, useProjectsSearchParams } from "./hooks/useProject";
import ProjectModal from "@components/ProjectModal";
import ButtonProject from "@components/Base/ButtonProject";
import List from "./components/List/index";
import useUsers from "@hooks/useUsers";

const ProjectList: FC = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  const { open } = useProjectModal();
  const { data: users } = useUsers() as any;

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
      <List users={users} />
      <ProjectModal />
    </div>
  );
};

export default ProjectList;
