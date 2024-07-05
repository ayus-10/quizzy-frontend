import { configureStore } from "@reduxjs/toolkit";
import activeTabReducer from "./slices/active-tab.slice";
import alertMessageReducer from "./slices/alert-message.slice";

export const reduxStore = configureStore({
  reducer: {
    activeTab: activeTabReducer,
    alertMessage: alertMessageReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
