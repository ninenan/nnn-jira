import { Table } from "antd";
import { useState, useEffect, FC, useMemo } from "react";
import SearchCom from "@components/SearchCom";
import { IUser } from "@/typings";
import dayjs from "dayjs";
import styles from "./index.module.scss";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";
// import type { ISearchParams } from "@components/SearchCom";
import useProjectsSearchParams from "./hooks/useProjectsSearchParams";
import useProject from "./hooks/useProject";
import { cleanObj } from "@/helpers/utils";
import useHttp from "@hooks/useHttp";

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
  const { list, isLoading } = useProject(
    useMemo(() => cleanObj(param), [param])
  );
  const http = useHttp();
  const navigate = useNavigate();

  const handleToTest = () => {
    debugger;
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
        res.push({ name: "负责人", id: 0 });
        setUsers(res);
      });
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <h1>项目列表</h1>
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
        dataSource={list}
      />
    </div>
  );
};

export default List;
