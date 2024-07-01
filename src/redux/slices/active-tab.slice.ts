import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ActiveTab = "create" | "manage" | "result";

const initialState = "create" as ActiveTab;

const activeTabSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    setActiveTab: (_state, action: PayloadAction<ActiveTab>) => {
      return action.payload;
    },
  },
});

export const { setActiveTab } = activeTabSlice.actions;

export default activeTabSlice.reducer;
