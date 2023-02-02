import { useAuth } from "@/context/module/authContext";
import React from "react";

const Authenticated = () => {
  const { logout } = useAuth();

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
