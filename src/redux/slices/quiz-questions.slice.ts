import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JoinedQuizQuestions } from "../../interfaces/joined-quiz-questions.interface";

const initialState: JoinedQuizQuestions = {
  endTime: 0,
  questions: [],
};

const quizQuestionsSlice = createSlice({
  name: "quizQuestions",
  initialState,
  reducers: {
    setQuizQuestions: (_state, action: PayloadAction<JoinedQuizQuestions>) => {
      return action.payload;
    },
  },
});

export const { setQuizQuestions } = quizQuestionsSlice.actions;

export default quizQuestionsSlice.reducer;
