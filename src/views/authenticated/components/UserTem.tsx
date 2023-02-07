import { Dropdown, MenuProps, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";

const UserTem = () => {
  const { user, logout } = useAuth();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button onClick={() => logout()} type="link">
          登出
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Dropdown menu={{ items }}>
        <Button type="link" onClick={(e) => e.preventDefault()}>
          hello,{user?.name}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserTem;
