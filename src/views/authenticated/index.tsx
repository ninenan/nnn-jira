import { useEffect } from "react";
import useAuth from "@hooks/useAuth";
import useHttp from "@/hooks/useHttp";

const Authenticated = () => {
  const { logout } = useAuth();
  const http = useHttp();

  useEffect(() => {
    if (http) {
      const init = async () => {
        http(["projects", { data: { name: "", personId: "" } }]).then((res) => {
          console.log(res);
        });

        http(["users"]).then((res) => console.log("users:", res));
      };

      init();
    }
  }, [http]);

  return (
    <div>
      success
      <div>
        <button onClick={() => logout()}>退出</button>
      </div>
    </div>
  );
};

export default Authenticated;
