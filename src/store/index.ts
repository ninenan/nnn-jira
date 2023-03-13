import { projecListSlice } from "@/views/projectList/store";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = {
  projectList: projecListSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
