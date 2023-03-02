import { AuthContext } from "@/context/module/authContext";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }

  return context;
};

export default useAuth;
