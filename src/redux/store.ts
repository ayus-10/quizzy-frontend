import { configureStore } from "@reduxjs/toolkit";
import alertMessageReducer from "./slices/alert-message.slice";

export const reduxStore = configureStore({
  reducer: {
    alertMessage: alertMessageReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
