import { useEffect } from "react";
import { Dropdown, MenuProps, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAsync from "@hooks/useAsync";

const UserTemplate = () => {
  const { user, logout } = useAuth();
  const { run } = useAsync(undefined, {
    throwError: true,
  });

  const navigate = useNavigate();

  const handleLogout = async () => {
    run(logout());
  };

  useEffect(() => {
    if (!user && navigate) {
      navigate({
        pathname: "/login",
      });
    }
  }, [user, navigate]);

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

// 为什么组件中的组件可以提出来放在当前组件的下方
// 这里并不会不报错，因为没有执行 fn 函数
// const fn = () => d
// const d = '111'

export default UserTemplate;
