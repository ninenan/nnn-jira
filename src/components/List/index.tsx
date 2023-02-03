import { Table } from "antd";
import React, { PropsWithChildren } from "react";
import { IProject, IUser } from "@/typings";

interface IProps {
  list: IProject[];
  users: IUser[];
}

const List: React.FC<PropsWithChildren<IProps>> = ({ list, users }) => {
  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
        },
        {
          title: "负责人",
          render(_, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
};

export default List;
