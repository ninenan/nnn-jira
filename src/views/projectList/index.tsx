import useDocumentTitle from "@/hooks/useDocumentTitle";
import { IUser } from "@/typings";
import SearchCom from "@components/SearchCom";
import { Table, Row, Button } from "antd";
import dayjs from "dayjs";
import qs from "qs";
import { FC, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
// import type { ISearchParams } from "@components/SearchCom";
import { cleanObj } from "@/helpers/utils";
import useHttp from "@hooks/useHttp";
import {
  useProjects,
  useEditProject,
  useProjectsSearchParams,
} from "./hooks/useProject";
import Pin from "@components/Base/Pin";
import ProjectModal from "@components/ProjectModal";

// 直接在 antd 中的 table 组件的属性上添加一个 users 属性
// interface IProps extends TableProps<IProject> {
//   users: IUser[];
//   searchParam: ISearchParams;
//   onSearch: (param: IProps["searchParam"]) => void;
// }

// const List: React.FC<PropsWithChildren<IProps>> = ({ users, ...restProps }) => {
const List: FC = () => {
  useDocumentTitle("项目列表", false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [param, setParam] = useProjectsSearchParams();
  const {
    data: list,
    isLoading,
    retry,
  } = useProjects(useMemo(() => cleanObj(param), [param]));
  const http = useHttp();
  const navigate = useNavigate();
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(retry);
  const [isShowProjectModal, setIsShowProjectModal] = useState(false);

  const handleToTest = () => {
    navigate({
      pathname: "/test",
      search: qs.stringify({
        name: "xxx",
        age: 28,
      }),
    });
  };

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
        <Button onClick={() => setIsShowProjectModal(true)} type="link">
          创建项目
        </Button>
      </Row>
      <SearchCom
        searchParam={param}
        onSearch={setParam}
        users={users}
        styles={{ marginBottom: "2rem" }}
      />
      <Table
        pagination={false}
        rowKey={"id"}
        columns={[
          {
            title: <Pin checked={true} disabled={true}></Pin>,
            render(_, project) {
              return (
                <Pin
                  checked={project.pin}
                  onCheckedChange={pinProject(project.id)}
                />
              );
            },
          },
          {
            title: "名称",
            dataIndex: "name",
            render(_, record) {
              return (
                <Link to={`/projects/${String(record.id)}`}>{record.name}</Link>
              );
            },
          },
          {
            title: "部门",
            dataIndex: "organization",
          },
          {
            title: "负责人",
            render(_, project) {
              return (
                <span onClick={() => handleToTest()}>
                  {users.find((user) => user.id === project.personId)?.name ||
                    "未知"}
                </span>
              );
            },
          },
          {
            title: "创建时间",
            dataIndex: "created",
            render(_, project) {
              return <span>{dayjs(project.created).format("YYYY-MM-DD")}</span>;
            },
          },
        ]}
        loading={isLoading}
        dataSource={list || []}
      />
      <ProjectModal
        isShowProjectModal={isShowProjectModal}
        onClose={() => setIsShowProjectModal(false)}
      />
    </div>
  );
};

export default List;
