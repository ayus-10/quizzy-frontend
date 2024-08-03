import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

const submittedQuizIdsSlice = createSlice({
  name: "submittedQuizIds",
  initialState,
  reducers: {
    setSubmittedQuizIds: (_state, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
});

export const { setSubmittedQuizIds } = submittedQuizIdsSlice.actions;

export default submittedQuizIdsSlice.reducer;
