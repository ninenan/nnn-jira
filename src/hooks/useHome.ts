import { useEffect, useState } from "react";
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
    // 这里可以使用 try catch 或者 catch
    try {
      await run(login(val));
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleRegister = async (val: {
    username: string;
    password: string;
  }) => {
    run(register(val)).catch((error) => setError(error));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate({
        pathname: "/",
      });
    }
  }, [isSuccess, navigate]);

  return {
    handleLogin,
    handleRegister,
    isLoading,
    isSuccess,
    error,
  };
};

export default useHome;
