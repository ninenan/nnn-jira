import { useState } from "react";
import { Button } from "antd";
import Login from "@components/Login";
import Register from "@components/Register";

const UnAuthenticated = () => {
  const [isLogin, setIsLogin] = useState(true);
  const btnText = isLogin ? "切换到注册" : "切换到登录";

  return (
    <div>
      {isLogin ? <Login /> : <Register />}
      <Button onClick={() => setIsLogin(!isLogin)}>{btnText}</Button>
    </div>
  );
};

export default UnAuthenticated;
