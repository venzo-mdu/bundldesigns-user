import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../Auth/BackendAPIUrl";
import { Questionnaire } from "./Questionnaire";
import { ToastContainer, toast } from "react-toastify";

import Male1 from "../../Images/Questionnaire/male1.png";
import Male2 from "../../Images/Questionnaire/male2.png";
import Male3 from "../../Images/Questionnaire/male3.png";
import Male4 from "../../Images/Questionnaire/male4.png";
import Male5 from "../../Images/Questionnaire/male5.png";
import Male6 from "../../Images/Questionnaire/male6.png";

import Female1 from "../../Images/Questionnaire/female1.png";
import Female2 from "../../Images/Questionnaire/female2.png";
import Female3 from "../../Images/Questionnaire/female3.png";
import Female4 from "../../Images/Questionnaire/female4.png";
import Female5 from "../../Images/Questionnaire/female5.png";
import Female6 from "../../Images/Questionnaire/female6.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { questionnaireAction2 } from "../../Redux/Action";
import { ConfigToken } from "../Auth/ConfigToken";
import useToastMessage from "../Pages/Toaster/Toaster";
import { Toaster } from "react-hot-toast";
import { fetchQuestionAnswer } from "./questionnaire.slice";
import { data } from "./1";

export const Questionnaire2 = ({
  formData,
  setFormData,
  changeLang,
  setChangeLang,
}) => {
  const { showToast, showErrorToast } = useToastMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const answers = useSelector((state) => state.questionnaire1);
  const currentAnswer = useSelector((state) => state.questionnaire2);

  const [questions, setQuestions] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [activeFemaleButtons, setActiveFemaleButtons] = useState([]);
  const [activeMaleButtons, setActiveMaleButtons] = useState([]);
  const [fetchQ2Answers, setFetchQ2Answers] = useState([]);
  const [isFilled, setIsFilled] = useState(null);
  const femaleImages = [Female1, Female2, Female3, Female4, Female5, Female6];
  const MaleImages = [Male1, Male2, Male3, Male4, Male5, Male6];
  const placeHolders = [
    "Enter your competitor name",
    "(ex: Colours too bright, Logo too playful, Identity too serious, etc...)",
    "",
    "(ex: Shopping, Painting, Sports, etc...)",
  ];

  const placeHolders_arabic = [
    "من هم منافسيك",
    "الألوان مملة، الرسومات جميلة...الخ",
    "",
    "التسوق، الرسم، السفر...الخ",
  ];

  /* NEW QUESTIONANSWER */

  const questionAndAnswers = useSelector(
    (state) => state?.questionAnswer?.questionAndAnswers
  );

  const [questionAnswer2, setQuestionAnswer2] = useState([]);

  useEffect(() => {
    if (questionAndAnswers.length > 0) {
      setQuestionAnswer2(questionAndAnswers);
    }
  }, [questionAndAnswers]);

  /* NEW QUESTIONANSWER */

  const [selectedGenderType, setSelectedGenderType] = useState({
    isFemale: false,
    isMale: false,
  });

  useEffect(() => {
    window.onbeforeunload = () => {
      sessionStorage.setItem("isReload", "true");
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  // Detect refresh on mount
  useEffect(() => {
    if (sessionStorage.getItem("isReload") === "true") {
      sessionStorage.removeItem("isReload");
      ;
      navigate("/questionnaire/1");
    }
  }, [navigate]);

  // const handleGenderChange = (id, selected, isSelected) => {
  //   console.log(questionAnswer2)
  //   
  //   setQuestionAnswer2((prev) =>
  //     prev.map((ele) => {
  //       if (ele.id !== id) return ele;

  //       const updatedAnswer = ele?.answer?.map((entry) => {
  //         if (entry[selected] !== undefined) {
  //           return {
  //             ...entry,
  //             [selected]: !isSelected,
  //             value: !isSelected ? [] : entry.value,
  //           };
  //         }
  //         return entry;
  //       });

  //       return {
  //         ...ele,
  //         answer: updatedAnswer,
  //       };
  //     })
  //   );

  //   if (selected === "female" && !selectedGenderType.isFemale) {
  //     setActiveFemaleButtons([]);
  //   }

  //   if (selected === "male" && !selectedGenderType.isMale) {
  //     setActiveMaleButtons([]);
  //   }

  //   if (selectedGender.includes("both")) {
  //     if (selected === "male") {
  //       setSelectedGender(["female"]);
  //     } else if (selected === "female") {
  //       setSelectedGender(["male"]);
  //     }
  //   } else if (selectedGender.includes(selected)) {
  //     setSelectedGender((prev) => prev.filter((gender) => gender !== selected));
  //   } else if (
  //     (selected === "male" && selectedGender.includes("female")) ||
  //     (selected === "female" && selectedGender.includes("male"))
  //   ) {
  //     setSelectedGender(["both"]);
  //   } else {
  //     setSelectedGender((prev) => {
  //       console.log(prev);
  //       return [...prev, selected];
  //     });
  //   }
  // };

  const handleGenderChange = (id, selected, isSelected) => {
    console.log(questionAnswer2);
    ;

    setQuestionAnswer2((prev) =>
      prev.map((ele) => {
        if (ele.id !== id) return ele;

        // Initialize answer if it's empty, null or undefined
        let initialAnswer = ele?.answer;
        if (
          !Array.isArray(initialAnswer) ||
          initialAnswer.length === 0 ||
          initialAnswer.some(
            (entry) => entry === null || typeof entry !== "object"
          )
        ) {
          initialAnswer = [
            { female: false, value: [] },
            { male: false, value: [] },
          ];
        }

        const updatedAnswer = initialAnswer.map((entry) => {
          if (entry[selected] !== undefined) {
            return {
              ...entry,
              [selected]: !isSelected,
              value: !isSelected ? [] : entry.value,
            };
          }
          return entry;
        });

        return {
          ...ele,
          answer: updatedAnswer,
        };
      })
    );

    // Handle gender toggle buttons and selectedGender state
    if (selected === "female" && !selectedGenderType.isFemale) {
      setActiveFemaleButtons([]);
    }

    if (selected === "male" && !selectedGenderType.isMale) {
      setActiveMaleButtons([]);
    }

    if (selectedGender.includes("both")) {
      if (selected === "male") {
        setSelectedGender(["female"]);
      } else if (selected === "female") {
        setSelectedGender(["male"]);
      }
    } else if (selectedGender.includes(selected)) {
      setSelectedGender((prev) => prev.filter((gender) => gender !== selected));
    } else if (
      (selected === "male" && selectedGender.includes("female")) ||
      (selected === "female" && selectedGender.includes("male"))
    ) {
      setSelectedGender(["both"]);
    } else {
      setSelectedGender((prev) => [...prev, selected]);
    }
  };

  const showToastMessage = () => {
    showErrorToast(
      changeLang === "ar" ? "القيمة مطلوب" : "The Value is required!",
      "#D83D99"
    );
  };

  const validateFields = () => {
    const unansweredRequiredQuestions = questionAnswer2
      .slice(7, 10)
      .filter((q) => {
        if (q.required) {
          // If it's an age-data question, ensure the correct buttons are selected
          // if (q.answer_type === "age-data") {
          //   if (q.answer[0]?.female) {
          //     return q.answer[0].value || q.answer[0].value.length === 0;
          //   }
          //   if (q.answer[1]?.female) {
          //     return !q.answer[1].value || q.answer[1].value.length === 0;
          //   }
          //   // if (selectedGender?.includes("both")) {
          //   //   return (
          //   //     !activeMaleButtons ||
          //   //     activeMaleButtons.length === 0 ||
          //   //     activeFemaleButtons.length === 0
          //   //   );
          //   // }
          // }

          // if (q.answer_type === "age-data") {
          //   const femaleEntry = q.answer.find((a) => a.female);
          //   const maleEntry = q.answer.find((a) => a.male);
          //   if (
          //     femaleEntry &&
          //     (!femaleEntry.value || femaleEntry.value.length === 0)
          //   ) {
          //     return true;
          //   }

          //   if (
          //     maleEntry &&
          //     (!maleEntry.value || maleEntry.value.length === 0)
          //   ) {
          //     return true;
          //   }

          //   return false; // valid
          // }

          if (q.answer_type === "age-data") {
            const femaleEntry = q?.answer?.find((a) => a?.female);
            const maleEntry = q?.answer?.find((a) => a?.male);

            const isFemaleSelected = !!femaleEntry;
            const isMaleSelected = !!maleEntry;

            const isFemaleValid =
              isFemaleSelected &&
              Array.isArray(femaleEntry?.value) &&
              femaleEntry?.value?.length > 0;

            const isMaleValid =
              isMaleSelected &&
              Array.isArray(maleEntry.value) &&
              maleEntry.value.length > 0;
            if (
              (isFemaleSelected && !isFemaleValid) ||
              (isMaleSelected && !isMaleValid)
            ) {
              return true;
            }
            if (!isFemaleSelected && !isMaleSelected) {
              return true;
            }
            return false;
          }

          // Default check for other required questions
          // return !formData?.[q.id] || formData?.[q.id]?.trim() === "";
          const value = q.answer;

          if (typeof value === "string") {
            return value.trim() === "";
          }

          if (Array.isArray(value)) {
            return (
              value?.length === 0 ||
              value?.every((item) => item.trim?.() === "")
            );
          }

          return !value;
        }
        return false;
      });

    if (unansweredRequiredQuestions.length > 0) {
      const element = document.getElementById(
        `question_${unansweredRequiredQuestions[0]?.id}`
      );
      setIsFilled(unansweredRequiredQuestions[0]?.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      showToastMessage();
      return false;
    }

    return true;
  };

  // const handleButtonClick = (buttonId, gender, label, questionId) => {
  //   setQuestionAnswer2((prev) => {
  //     return prev.map((ele) => {
  //       if (ele.id !== questionId) return ele;

  //       const updatedAnswer = ele.answer.map((entry) => {
  //         if (entry?.[gender] !== undefined) {
  //           return {
  //             ...entry,
  //             value: [...entry.value, label],
  //           };
  //         }
  //         return entry;
  //       });

  //       return {
  //         ...ele,
  //         answer: updatedAnswer,
  //       };
  //     });
  //   });
  // };

  const handleButtonClick = (buttonId, gender, label, questionId) => {
    setQuestionAnswer2((prev) => {
      return prev.map((ele) => {
        if (ele.id !== questionId) return ele;

        const updatedAnswer = ele.answer.map((entry) => {
          if (entry?.[gender] !== undefined) {
            const valueExists = entry.value.includes(label);

            return {
              ...entry,
              [gender]: true,
              value: valueExists
                ? entry.value.filter((v) => v !== label)
                : [...entry.value, label],
            };
          }
          return entry;
        });

        return {
          ...ele,
          answer: updatedAnswer,
        };
      });
    });
  };

  const handleChange = (questionId, value) => {
    setQuestionAnswer2((prev) =>
      prev.map((ele) =>
        ele.id === questionId ? { ...ele, answer: value } : ele
      )
    );
  };

  const onBackClick = async () => {
    dispatch(fetchQuestionAnswer(questionAnswer2));
    navigate(`/questionnaire/${1}`);
  };
  const onNextClick = () => {
    if (!validateFields()) {
      return;
    }
    dispatch(fetchQuestionAnswer(questionAnswer2));
    navigate(`/questionnaire/${3}`, {
      state: {
        orderId: location.state?.orderId,
      },
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const onSaveLaterClick = async () => {
    let data = {
      answers: questionAnswer2,
      orderId: location.state?.orderId,
      status: "not submitted",
    };
    try {
      const response = await axios.post(
        `${base_url}/api/questionnaire/create`,
        data,
        ConfigToken()
      );
      if (response.status === 200) {
        navigate("/dashboard", {
          state: {
            orderId: location.state?.orderId,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            // color: "#1BA56F",
            fontWeight: "700",
            borderRadius: "0px !important",
            border: `1px solid #1BA56F`,
          },
        }}
      />
      <ToastContainer />
      <Questionnaire
        pageNo={2}
        Qlang={changeLang}
        setQLang={setChangeLang}
        orderId={location.state?.orderId}
        onBackClick={onBackClick}
        onNextClick={onNextClick}
        onSaveLaterClick={onSaveLaterClick}
        storeAnswers={answers}
        formData={formData}
        setFormData={setFormData}
        questions={
          <>
            {questionAnswer2.slice(7, 11).map((question, index) => {
              return (
                <div
                  className="questions"
                  key={index}
                  id={`question_${question?.id}`}
                >
                  <p
                    className={`questions-title  xs:w-[90%] sm:w-full md:w-full mx-auto ${
                      index === 0 ? "mt-[1%]" : "mt-[2%]"
                    }`}
                  >
                    {changeLang === "ar"
                      ? question?.question_arabic
                      : question.question}
                    {question.required && (
                      <span>
                        <sup>*</sup>
                      </span>
                    )}
                  </p>
                  {question?.answer_type === "age-data" && (
                    <>
                      <div className="ideal-customers">
                        <div
                          style={{ display: "flex", gap: "25px" }}
                          className="mt-[5%]"
                        >
                          <button
                            className={
                              question?.answer?.[0]?.female
                                ? "female-active"
                                : "female"
                            }
                            value="female"
                            onClick={() => {
                              const femaleDisabled =
                                question?.answer?.[0]?.female;
                              handleGenderChange(
                                question.id,
                                "female",
                                femaleDisabled
                              );
                            }}
                          >
                            {changeLang === "ar" ? "انثى" : "Female"}
                          </button>
                          <button
                            className={
                              question?.answer?.[1]?.male
                                ? "male-active"
                                : "male"
                            }
                            value={"male"}
                            onClick={() => {
                              const maleDisabled = question?.answer?.[1]?.male;
                              handleGenderChange(
                                question?.id,
                                "male",
                                maleDisabled
                              );
                            }}
                          >
                            {changeLang === "ar" ? "ذكر" : "Male"}
                          </button>
                        </div>
                        <div className="border-b-[1px] border-solid border-[#000000] mb-4">
                          {question?.answer?.[0]?.female ? (
                            <div className="female-section mb-[5%]">
                              <div className="female-buttons">
                                {[
                                  "10 or Less",
                                  "11-17",
                                  "18-23",
                                  "24-30",
                                  "31-40",
                                  "41-60+",
                                ].map((label, index) => {
                                  return (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <div className="flex justify-center items-center">
                                        <img
                                          key={`female-img-${index}`}
                                          src={femaleImages[index]}
                                          alt={`Female ${index + 1}`}
                                          className="female-image"
                                          onClick={() => {
                                            handleButtonClick(
                                              `female-${index}`,
                                              "female",
                                              label,
                                              question.id
                                            );
                                          }}
                                        />
                                      </div>
                                      <button
                                        key={`female-${index}`}
                                        className={`female-btn uppercase ${
                                          question?.answer?.[0].value?.includes(
                                            label
                                          )
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleButtonClick(
                                            `female-${index}`,
                                            "female",
                                            label,
                                            question.id
                                          )
                                        }
                                      >
                                        {label}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="female-section mb-[5%]">
                              <div className="female-buttons">
                                {[
                                  "10 or Less",
                                  "11-17",
                                  "18-23",
                                  "24-30",
                                  "31-40",
                                  "41-60+",
                                ].map((label, index) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div className="flex justify-center items-center">
                                      <img
                                        key={`female-img-${index}`}
                                        src={femaleImages[index]}
                                        alt={`Female ${index + 1}`}
                                        className="female-image-disable"
                                      />
                                    </div>
                                    <button
                                      disabled
                                      key={`female-${index}`}
                                      className="female-btn uppercase"
                                    >
                                      {label}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {question?.answer?.[1].male ? (
                          <div className="male-section">
                            <div className="male-buttons">
                              {[
                                "10 or Less",
                                "11-17",
                                "18-23",
                                "24-30",
                                "31-40",
                                "41-60+",
                              ].map((label, index) => {
                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div className="flex justify-center items-center">
                                      <img
                                        key={`male-img-${index}`}
                                        src={MaleImages[index]}
                                        alt={`Male ${index + 1}`}
                                        className="male-image"
                                        onClick={() =>
                                          handleButtonClick(
                                            `male-${index}`,
                                            "male",
                                            label,
                                            question.id
                                          )
                                        }
                                      />
                                    </div>
                                    <button
                                      key={`male-${index}`}
                                      className={`male-btn uppercase ${
                                        question?.answer?.[1].value?.includes(
                                          label
                                        )
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleButtonClick(
                                          `male-${index}`,
                                          "male",
                                          label,
                                          question.id
                                        )
                                      }
                                    >
                                      {label}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="male-section">
                            <div className="male-buttons">
                              {[
                                "10 or Less",
                                "11-17",
                                "18-23",
                                "24-30",
                                "31-40",
                                "41-60+",
                              ].map((label, index) => (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <div className="flex justify-center items-center">
                                    <img
                                      key={`male-img-${index}`}
                                      src={MaleImages[index]}
                                      alt={`Male ${index + 1}`}
                                      className="male-image-disable"
                                    />
                                  </div>
                                  <button
                                    disabled
                                    key={`male-${index}`}
                                    className="male-btn uppercase"
                                  >
                                    {label}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <input
                    className={`question-input ${
                      isFilled === question?.id
                        ? "border-[#D83D99] border-b-[2px]"
                        : `${
                            window?.innerWidth <= 475
                              ? "border-b-[1px]"
                              : "border-b-[2px]"
                          } border-black`
                    }`}
                    placeholder={
                      changeLang === "ar"
                        ? placeHolders_arabic[index]
                        : placeHolders[index]
                    }
                    value={
                      question.answer_type === "age-data" ? "" : question.answer
                    }
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                </div>
              );
            })}
          </>
        }
        bgTitle={
          changeLang === "ar" ? "الجمهور والمنافسة" : "AUDIENCE & COMPETITION"
        }
      />
    </div>
  );
};
