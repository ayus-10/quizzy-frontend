import { configureStore } from "@reduxjs/toolkit";
import activeTabReducer from "./slices/active-tab.slice";

export const reduxStore = configureStore({
  reducer: {
    activeTab: activeTabReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
