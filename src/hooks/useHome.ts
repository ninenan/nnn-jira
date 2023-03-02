import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import useAsync from "@hooks/useAsync";
import useDocumentTitle from "@hooks/useDocumentTitle";

const useHome = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { isLoading, run, isSuccess } = useAsync(undefined, {
    throwError: true,
  });
  const [error, setError] = useState<Error>();
  useDocumentTitle("请登录或者注册");

  const handleLogin = async (val: { username: string; password: string }) => {
    // 这里可以使用 trycatch 或者 catch
    try {
      await run(login(val), () =>
        navigate({
          pathname: "/",
        })
      );
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleRegister = async (val: {
    username: string;
    password: string;
  }) => {
    run(register(val), () => navigate("/")).catch((error) => setError(error));
  };

  return {
    handleLogin,
    handleRegister,
    isLoading,
    isSuccess,
    error,
  };
};

export default useHome;