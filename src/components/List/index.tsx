import { Table, TableProps } from "antd";
import React, { PropsWithChildren } from "react";
import SearchCom from "@components/SearchCom";
import { IProject, IUser } from "@/typings";
import dayjs from "dayjs";
import styles from "./index.module.scss";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";
import type { ISearchParams } from "@components/SearchCom";

// 直接在 antd 中的 table 组件的属性上添加一个 users 属性
interface IProps extends TableProps<IProject> {
  users: IUser[];
  searchParam: ISearchParams;
  onSearch: (param: IProps["searchParam"]) => void;
}

const List: React.FC<PropsWithChildren<IProps>> = ({ users, ...restProps }) => {
  useDocumentTitle("项目列表", false);
  const navigate = useNavigate();

  const handleToTest = () => {
    navigate({
      pathname: "/test",
      search: qs.stringify({
        name: "xxx",
        age: 28,
      }),
    });
  };

  return (
    <div className={styles.container}>
      <h1>项目列表</h1>
      <SearchCom
        searchParam={restProps.searchParam}
        onSearch={restProps.onSearch}
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
        {...restProps}
      />
    </div>
  );
};

export default List;
