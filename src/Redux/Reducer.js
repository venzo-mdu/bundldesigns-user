/* eslint-disable import/no-anonymous-default-export */

const initialState = {
    userInfo: {},
    questionnaire1:[],
    questionnaire2:[]
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case "login":
        return Object.assign({}, state, { userInfo: action.payload });
      case "questionnaire1":
        return Object.assign({}, state, { questionnaire1: action.payload });
      case "questionnaire2":
      return Object.assign({}, state, { questionnaire2: action.payload });
      default:
        return state;
    }
  };
  