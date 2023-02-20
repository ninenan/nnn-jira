import { Dropdown, MenuProps, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserTem = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({
      pathname: "/login",
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button onClick={() => handleLogout()} type="link">
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
