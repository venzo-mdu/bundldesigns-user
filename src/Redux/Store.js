import { createStore } from "redux";
import reducer from "./Reducer";

const initialState = {
  userInfo: {},
  questionnaire1 :[]
};
function configureStore(state = initialState) {
  return createStore(reducer, state);
}

export default configureStore;
