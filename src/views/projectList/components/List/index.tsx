import React, { useMemo, PropsWithChildren, ReactNode, FC } from "react";
import { TableProps, Table, MenuProps, Button, Dropdown } from "antd";
import {
  useProjects,
  useProjectsSearchParams,
  useEditProject,
  useProjectModal,
} from "../../hooks/useProject";
import { Link, useNavigate } from "react-router-dom";
import Pin from "@components/Base/Pin";
import type { IProject, IUser } from "@/typings";
import { cleanObj } from "@helpers/utils";
import qs from "qs";
import dayjs from "dayjs";
import ErrorTemplate from "@components/Base/ErrorTemplate";

// 直接在 antd 中的 table 组件的属性上添加一个 users 属性
interface IProps extends TableProps<IProject> {
  users: IUser[];
  projectButton: ReactNode;
}

const List: FC<PropsWithChildren<IProps>> = ({
  users,
  projectButton,
  ...restProps
}) => {
  const [param] = useProjectsSearchParams();
  const {
    data: list,
    isLoading,
    error,
  } = useProjects(useMemo(() => cleanObj(param), [param]));
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const navigate = useNavigate();
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);

  const handleToTest = () => {
    navigate({
      pathname: "/test",
      search: qs.stringify({
        name: "xxx",
        age: 28,
      }),
    });
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "add",
      label: projectButton,
    },
  ];

  return (
    <div>
      {error ? (
        <ErrorTemplate error={error} />
      ) : (
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
                  <Link to={`/projects/${String(record.id)}`}>
                    {record.name}
                  </Link>
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
                  <div>
                    {users ? (
                      <span onClick={() => handleToTest()}>
                        {users.find((user) => user.id === project.personId)
                          ?.name || "未知"}
                      </span>
                    ) : null}
                  </div>
                );
              },
            },
            {
              title: "创建时间",
              dataIndex: "created",
              render(_, project) {
                return (
                  <span>{dayjs(project.created).format("YYYY-MM-DD")}</span>
                );
              },
            },
            {
              title: "操作",
              render(value, project) {
                return (
                  <Dropdown
                    menu={{
                      items: menuItems,
                    }}
                    dropdownRender={(menu) => (
                      <div>
                        {React.cloneElement(menu as React.ReactElement)}
                        <Button onClick={editProject(project.id)}>编辑</Button>
                      </div>
                    )}
                  >
                    <Button type={"link"}>...</Button>
                  </Dropdown>
                );
              },
            },
          ]}
          loading={isLoading}
          dataSource={list || []}
          {...restProps}
        />
      )}
    </div>
  );
};

export default List;
