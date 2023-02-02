import React, { useState } from "react";
import Login from "@components/Login";
import Register from "@components/Register";

const UnAuthenticated = () => {
  const [isLogin, setIsLogin] = useState(true);
  const btnText = isLogin ? "切换到注册" : "切换到登录";

  return (
    <div>
      {isLogin ? <Login /> : <Register />}
      <button onClick={() => setIsLogin(!isLogin)}>{btnText}</button>
    </div>
  );
};

export default UnAuthenticated;
