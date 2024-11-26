const initialState = {
    userInfo: {},
    questionnaire1:[],
    questionnaire2:[],
    questionnaire3:[],
    questionnaire4:[],
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case "login":
        return Object.assign({}, state, { userInfo: action.payload });
      case "questionnaire1":
        return Object.assign({}, state, { questionnaire1: action.payload });
      case "questionnaire2":
        return Object.assign({}, state, { questionnaire2: action.payload });
      case "questionnaire3":
        return Object.assign({}, state, { questionnaire3: action.payload });
      case "questionnaire4":
        return Object.assign({}, state, { questionnaire4: action.payload });  
      default:
        return state;
    }
  };
  