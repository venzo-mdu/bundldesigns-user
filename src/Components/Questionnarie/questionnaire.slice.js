import { createSlice } from "@reduxjs/toolkit";

const questionAnswer = createSlice({
  name: "questionAnswer",
  initialState: {
    questionAndAnswers: [],
  },
  reducers: {
    fetchQuestionAnswer: (state, action) => {
      debugger
      state.questionAndAnswers = action.payload;
    },
  },
});

export const { fetchQuestionAnswer } = questionAnswer.actions;
export default questionAnswer.reducer;
