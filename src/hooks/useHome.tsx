import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import useAsync from "@hooks/useAsync";

const useHome = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { isLoading, run, isSuccess } = useAsync(undefined, {
    throwError: true,
  });
  const [error, setError] = useState<Error>();

  const handleLogin = async (val: { username: string; password: string }) => {
    // 这里可以使用 trycatch 或者 catch
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
    if (navigate && isSuccess) {
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
