import { createStore } from "redux";
import reducer from "./Reducer";

const initialState = {
  userInfo: {},
};
function configureStore(state = initialState) {
  return createStore(reducer, state);
}

export default configureStore;
