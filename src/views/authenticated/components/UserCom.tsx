import React, { ChangeEvent } from "react";
import { Dropdown, MenuProps, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";

const UserCom = () => {
  const { user, logout } = useAuth();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button onClick={logout} type={"link"}>
          登出
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Dropdown menu={{ items }}>
        <Button type="link" onClick={(e) => e.preventDefault()}>
          <Space>
            hello,{user?.name}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserCom;
