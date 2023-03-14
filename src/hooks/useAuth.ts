import { ISimpleUser } from "@/typings";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from "@/store/modules/auth";
import { useCallback } from "react";

const useAuth = () => {
  const dispatch: any = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: ISimpleUser) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: ISimpleUser) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return { login, register, logout, user };
};

export default useAuth;
