import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AlertMessage {
  status: "success" | "error" | "warning" | null;
  message: string | null;
}

const initialState: AlertMessage = {
  status: null,
  message: null,
};

export const alertMessageSlice = createSlice({
  name: "alertMessage",
  initialState,
  reducers: {
    setAlertMessage: (_state, action: PayloadAction<AlertMessage>) => {
      return action.payload;
    },
  },
});

export const { setAlertMessage } = alertMessageSlice.actions;

export default alertMessageSlice.reducer;
