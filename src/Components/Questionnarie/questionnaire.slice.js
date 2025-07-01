import { createSlice } from "@reduxjs/toolkit";

const questionAnswerSlice = createSlice({
  name: "questionAnswer",
  initialState: {
    orderId: "",
    questionAndAnswers: [],
  },
  reducers: {
    fetchQuestionAnswer: (state, action) => {
      state.questionAndAnswers = action.payload;
    },
    updateOrderID: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const { fetchQuestionAnswer, updateOrderID } =
  questionAnswerSlice.actions;

export default questionAnswerSlice.reducer;
