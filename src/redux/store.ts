import { configureStore } from "@reduxjs/toolkit";
import alertMessageReducer from "./slices/alert-message.slice";
import quizCredentialsReducer from "./slices/quiz-credentials.slice";

export const reduxStore = configureStore({
  reducer: {
    alertMessage: alertMessageReducer,
    quizCredentials: quizCredentialsReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
