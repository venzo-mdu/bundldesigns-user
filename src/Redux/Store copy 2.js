import { createStore, combineReducers } from "redux";
import oldReducer from "./Reducer"; // your original reducer for app
import questionAnswerReducer from "../Components/Questionnarie/questionnaire.slice";

// Combine reducers
const rootReducer = combineReducers({
  app: oldReducer,
  questionAnswer: questionAnswerReducer,
});

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error("Error loading state from localStorage", e);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.error("Error saving state to localStorage", e);
  }
};

// Load previously saved state
const persistedState = loadState();

// Create the Redux store with persisted state
const store = createStore(rootReducer, persistedState);

// Subscribe to changes and save specific slices to localStorage
store.subscribe(() => {
  saveState({
    app: store.getState().app,
    questionAnswer: store.getState().questionAnswer,
  });
});

export default store;
