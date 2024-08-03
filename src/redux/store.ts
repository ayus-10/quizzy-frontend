import { configureStore } from "@reduxjs/toolkit";
import alertMessageReducer from "./slices/alert-message.slice";
import quizCredentialsReducer from "./slices/quiz-credentials.slice";
import quizQuestionsReducer from "./slices/quiz-questions.slice";
import submittedQuizIdsReducer from "./slices/submitted-quiz-ids.slice";

export const reduxStore = configureStore({
  reducer: {
    alertMessage: alertMessageReducer,
    quizCredentials: quizCredentialsReducer,
    quizQuestions: quizQuestionsReducer,
    submittedQuizIds: submittedQuizIdsReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
