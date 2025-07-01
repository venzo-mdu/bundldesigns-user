const initialState = {
    title:"",
    userInfo: {},
    questionnaire1:[],
    questionnaire2:[],
    questionnaire3:[],
    questionnaire4:[],
    questionnaire5:[],
    questionnaireanswers:[],
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
      case "questionnaire5":
        return Object.assign({}, state, { questionnaire5: action.payload }); 
      case "questionnaireanswers":
        return Object.assign({}, state, { questionnaireanswers: action.payload }); 
        case "questionnaireTitle":
        return Object.assign({}, state, { title: action.payload });    
      default:
        return state;
    }
  };
  