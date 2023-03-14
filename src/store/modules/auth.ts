import { IUser, ISimpleUser } from "@/typings";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import * as auth from "@helpers/auth";
import { initUser } from "@/context/module/authContext";

interface State {
  user: IUser | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      // action: {type: 'auth/setUser', payload: 传递的参数}
      console.log("action: ", action);
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

// 异步 thunk
export const login = (form: ISimpleUser) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));
export const register = (form: ISimpleUser) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));
export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));
export const bootstrap = () => (dispatch: AppDispatch) =>
  initUser().then((user) => dispatch(setUser(user)));
