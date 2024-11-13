/* eslint-disable import/no-anonymous-default-export */

const initialState = {
    userInfo: {},
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case "login":
        return Object.assign({}, state, { userInfo: action.payload });
      default:
        return state;
    }
  };
  