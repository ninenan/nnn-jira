import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

interface IState {
  projectModalVisible: boolean;
}

const initialState: IState = {
  projectModalVisible: false,
};

export const projecListSlice = createSlice({
  name: "projecListSlice",
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

export const projecListActions = projecListSlice.actions;
export const selectProjectModalVisible = (state: RootState) =>
  state.projectList.projectModalVisible;
