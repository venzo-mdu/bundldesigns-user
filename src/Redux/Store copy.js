// import { createStore } from "redux";
// import reducer from "./Reducer";

// const initialState = {
//   userInfo: {},
//   questionnaire1:[],
//   questionnaire2:[],
//   questionnaire3:[],
//   questionnaire4:[],
//   questionnaire5:[],
//   questionnaireanswers:[],
//   title:""
// };
// function configureStore(state = initialState) {
//   return createStore(reducer, state);
// }

// export default configureStore;

/* NEW STORE*/

// src/Redux/Store.js
import { createStore, combineReducers } from "redux";
import oldReducer from "./Reducer";
import questionAswerReducer from "../Components/Questionnarie/questionnaire.slice";

// Combine your existing reducer as one key
const rootReducer = combineReducers({
  app: oldReducer, 
  questionAnswer: questionAswerReducer,
});

// Optional: Initial state for new slice
const initialState = {
  app: {
    userInfo: {},
    questionnaire1: [],
    questionnaire2: [],
    questionnaire3: [],
    questionnaire4: [],
    questionnaire5: [],
    questionnaireanswers: [],
    title: "",
  },
  theme: {
    mode: "light",
  },
};

function configureStore(state = initialState) {
  return createStore(rootReducer, state);
}

export default configureStore;
