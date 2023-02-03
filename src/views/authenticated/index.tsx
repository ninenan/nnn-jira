import { useEffect, useState } from "react";
import { Button } from "antd";
import useHttp from "@/hooks/useHttp";
import { IProject, IUser } from "@/typings";
import List from "@components/List";
import useAuth from "@hooks/useAuth";
import SearchCom from "@components/SearchCom";

const Authenticated = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [list, setList] = useState<IProject[]>([]);
  const { logout } = useAuth();
  const http = useHttp();

  useEffect(() => {
    const init = async () => {
      http(["projects", { data: { name: "", personId: "" } }]).then((res) => {
        setList(res);
      });

      http(["users"]).then((res) => {
        setUsers(res);
      });
    };

    init();
  }, []);

  return (
    <div>
      <div>
        <SearchCom users={users} />
        <List list={list} users={users} />
        <Button onClick={() => logout()} type="primary">
          退出
        </Button>
      </div>
    </div>
  );
};

export default Authenticated;
