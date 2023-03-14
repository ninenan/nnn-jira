import useDocumentTitle from "@/hooks/useDocumentTitle";
import { IUser } from "@/typings";
import SearchCom from "@components/SearchCom";
import { Row } from "antd";
import { FC, useEffect, useState } from "react";
import styles from "./index.module.scss";
import useHttp from "@hooks/useHttp";
import { useProjectsSearchParams } from "./hooks/useProject";
// import ProjectModal from "@components/ProjectModal";
import ButtonProject from "@components/Base/ButtonProject";
import List from "./components/List/index";
import { useDispatch } from "react-redux";
import { projectListActions } from "@views/projectList/store";

const ProjectList: FC = () => {
  useDocumentTitle("项目列表", false);
  const dispatch = useDispatch();
  const [users, setUsers] = useState<IUser[]>([]);
  const [param, setParam] = useProjectsSearchParams();
  const http = useHttp();
  // const [isShowProjectModal, setIsShowProjectModal] = useState(false);

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
        <ButtonProject
          onClick={() => dispatch(projectListActions.openProjectModal())}
        />
      </Row>
      <SearchCom
        searchParam={param}
        onSearch={setParam}
        users={users}
        styles={{ marginBottom: "2rem" }}
      />
      <List users={users} />
      {/* <ProjectModal */}
      {/*   isShowProjectModal={isShowProjectModal} */}
      {/*   onClose={() => setIsShowProjectModal(false)} */}
      {/* /> */}
    </div>
  );
};

export default ProjectList;
