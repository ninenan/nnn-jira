import { useEffect } from "react";
import { Dropdown, MenuProps, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAsync from "@hooks/useAsync";

const UserTem = () => {
  const { user, logout } = useAuth();
  const { run, isSuccess } = useAsync(undefined, {
    throwError: true,
  });

  const navigate = useNavigate();

  const handleLogout = async () => {
    run(logout());
  };

  useEffect(() => {
    if (isSuccess && navigate) {
      navigate({
        pathname: "/login",
      });
    }
  }, [navigate, isSuccess]);

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
