export const loginAction = (payload) => {
    return {
      type: "login",
      payload,
    };
};

export const questionnaireAction1 = (payload) => {
  return {
    type: "questionnaire1",
    payload,
  };
};

export const questionnaireAction2 = (payload) => {
  return {
    type: "questionnaire2",
    payload,
  };
};