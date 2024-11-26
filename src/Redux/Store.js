import { createStore } from "redux";
import reducer from "./Reducer";

const initialState = {
  userInfo: {},
  questionnaire1:[],
  questionnaire2:[],
  questionnaire3:[],
  questionnaire4:[],
};
function configureStore(state = initialState) {
  return createStore(reducer, state);
}

export default configureStore;
