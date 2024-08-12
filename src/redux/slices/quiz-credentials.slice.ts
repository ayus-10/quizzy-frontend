import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizCredentials {
  id: string;
}

const initialState: QuizCredentials = {
  id: "",
};

const quizCredentialsSlice = createSlice({
  name: "quizCredentials",
  initialState,
  reducers: {
    setQuizCredentials: (_state, action: PayloadAction<QuizCredentials>) => {
      return action.payload;
    },
  },
});

export const { setQuizCredentials } = quizCredentialsSlice.actions;

export default quizCredentialsSlice.reducer;
