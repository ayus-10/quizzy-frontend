import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchedQuizQuestion } from "../../interfaces/fetched-quiz-question.interface";

const initialState: FetchedQuizQuestion[] = [];

const quizQuestionsSlice = createSlice({
  name: "quizQuestions",
  initialState,
  reducers: {
    setQuizQuestions: (
      _state,
      action: PayloadAction<FetchedQuizQuestion[]>
    ) => {
      return action.payload;
    },
  },
});

export const { setQuizQuestions } = quizQuestionsSlice.actions;

export default quizQuestionsSlice.reducer;
