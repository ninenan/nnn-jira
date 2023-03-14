import { projectListSlice } from "@/views/projectList/store";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./modules/auth";

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
