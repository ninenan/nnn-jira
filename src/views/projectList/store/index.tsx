import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

interface IState {
  projectModalVisible: boolean;
}

const initialState: IState = {
  projectModalVisible: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalVisible = true;
    },
    closeProjectModal(state) {
      state.projectModalVisible = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;
export const selectProjectModalVisible = (state: RootState) =>
  state.projectList.projectModalVisible;
