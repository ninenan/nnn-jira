import useHttp from "@/hooks/useHttp";
import useAuth from "@hooks/useAuth";
import { useEffect, useState } from "react";

const Authenticated = () => {
  const [testVal, setTestVal] = useState("");
  const { logout } = useAuth();
  const http = useHttp();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setTestVal(event.target.value);
  };

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
        <input value={testVal} type="text" onChange={handleChange} />
        <button onClick={() => logout()}>退出</button>
      </div>
    </div>
  );
};

export default Authenticated;
