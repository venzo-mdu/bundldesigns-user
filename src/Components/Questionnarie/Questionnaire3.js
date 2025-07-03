import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../Auth/BackendAPIUrl";
import { Questionnaire } from "./Questionnaire";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { questionnaireAction3 } from "../../Redux/Action";
import { ConfigToken } from "../Auth/ConfigToken";
import { ToastContainer, toast } from "react-toastify";
import useToastMessage from "../Pages/Toaster/Toaster";
import { Toaster } from "react-hot-toast";
import { fetchQuestionAnswer } from "./questionnaire.slice";

export const Questionnaire3 = ({
  formData,
  setFormData,
  changeLang,
  setChangeLang,
}) => {
  const { showToast, showErrorToast } = useToastMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const answers = useSelector((state) => state.questionnaire2);
  const currentAnswer = useSelector((state) => state.questionnaire3);
  const [questions, setQuestions] = useState([]);
  const [sliderValues, setSliderValues] = useState({});
  const [fetchQ3Answers, setFetchQ3Answers] = useState([]);
  const [isFilled, setIsFilled] = useState(null);

  /* NEW QUESTIONANSWER */

  const questionAndAnswers = useSelector(
    (state) => state?.questionAnswer?.questionAndAnswers
  );
  const orderId = useSelector((state) => state?.questionAnswer?.orderId);
  const [questionAnswer3, setQuestionAnswer3] = useState([]);

  useEffect(() => {
    if (questionAndAnswers.length > 0) {
      setQuestionAnswer3(questionAndAnswers);
    }
  }, [questionAndAnswers]);

  /* NEW QUESTIONANSWER */

  const progressLabels = [
    {
      left: changeLang === "ar" ? "ذكوري" : "Masculine",
      right: changeLang === "ar" ? "أنثوي" : "Feminine",
    },
    {
      left: changeLang === "ar" ? "اقتصادي" : "Economical",
      right: changeLang === "ar" ? "فاخر" : "Luxurious",
    },
    {
      left: changeLang === "ar" ? "لعوب" : "Playful",
      right: changeLang === "ar" ? "راقي" : "Sophisticated",
    },
    {
      left: changeLang === "ar" ? "كلاسيكي" : "Classics",
      right: changeLang === "ar" ? "حديث" : "Modern",
    },
    {
      left: changeLang === "ar" ? "ناضج" : "Mature",
      right: changeLang === "ar" ? "شبابي" : "Youthful",
    },
    {
      left: changeLang === "ar" ? "رسمي" : "Formal",
      right: changeLang === "ar" ? "غير رسمي" : "Casual",
    },
  ];

  const placeHolders = [
    "Your project story",
    "The story behind the name",
    "BUNDL",
    "(ex: was always passionate about creating my own perfume business)",
  ];

  const placeHolders_arabic = ["", "", "", ""];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/content?section=brand_questions&page=3`
        );
        // Initialize sliderValues for all questions with "bar" answer_type
        // const initialSliderValues = response.data
        //   .filter((q) => q.answer_type === 'bar')
        //   .reduce((acc, question, index) => {
        //     acc[index] = 50; // Default slider value
        //     return acc;
        //   }, {});

        // setSliderValues(initialSliderValues);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    const fetchAnswers = async () => {
      try {
        if (location.state.orderId != undefined) {
          const response = await axios.get(
            `${base_url}/api/questionnaire/update/${location.state.orderId}`,
            ConfigToken()
          );
          setFetchQ3Answers(response.data.data);
          const question14Answer = response.data.data.find(
            (answer) => answer.question_id === 14
          )?.answer;

          if (question14Answer && typeof question14Answer === "object") {
            setSliderValues((prev) => ({
              ...prev,
              ...question14Answer,
            }));
          }
          setFormData((prev) => ({
            ...prev,
            [14]: question14Answer,
          }));
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    setFormData(currentAnswer);
    setSliderValues(
      currentAnswer && currentAnswer[14] ? currentAnswer[14] : {}
    );
    fetchQuestions();
    fetchAnswers();
  }, []);

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
      navigate("/questionnaire/1");
    }
  }, [navigate]);

  // const getAnswerValue = (questionId) => {
  //   const formValue = formData?.[questionId];
  //   if (formValue !== undefined) {
  //     return formValue;
  //   }

  //   const fetchedAnswer = fetchQ3Answers.find(
  //     (answer) => answer.question_id === questionId
  //   )?.answer;
  //   if (fetchedAnswer !== undefined && formValue === undefined) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [questionId]: fetchedAnswer,
  //     }));
  //   }
  //   return fetchedAnswer ?? "";
  // };

  const handleChange = (questionId, value) => {
    // setFormData((formValues) => ({
    //   ...formValues,
    //   [questionId]: value,
    // }));
    setQuestionAnswer3((prev) =>
      prev.map((ele) =>
        ele.id === questionId ? { ...ele, answer: value } : ele
      )
    );
  };

  const showToastMessage = () => {
    showErrorToast(
      changeLang === "ar" ? "القيمة مطلوب" : "The Value is required!",
      "#D83D99"
    );
  };

  const validateFields = () => {
    const unansweredRequiredQuestions = questionAnswer3
      .slice(11, 14)
      .filter((q) => {
        return (
          q.required &&
          (!q.answer ||
            (typeof q?.answer === "string" && q?.answer.trim() === ""))
        );
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
  const onBackClick = async () => {
    dispatch(fetchQuestionAnswer(questionAnswer3));
    navigate(`/questionnaire/${2}`, {
      state: {
        questionnaireData2: answers,
        orderId: location.state?.orderId,
        isBackBtn: true,
      },
    });
  };
  const onNextClick = () => {
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
    dispatch(fetchQuestionAnswer(questionAnswer3));
    navigate(`/questionnaire/${4}`, {
      state: {
        orderId: location.state?.orderId,
      },
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  let newUpdatedAns = questionAnswer3.map((ele) => {
    return {
      id: ele.id,
      answers: ele.answer,
    };
  });

  const onSaveLaterClick = async () => {
    let data = {
      answers: newUpdatedAns,
      orderId: orderId,
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

  const isArabic = changeLang === "ar"; // Replace with your actual language check

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
        pageNo={3}
        Qlang={changeLang}
        setQLang={setChangeLang}
        storeAnswers={answers}
        orderId={location.state?.orderId}
        onBackClick={onBackClick}
        onNextClick={onNextClick}
        onSaveLaterClick={onSaveLaterClick}
        formData={formData}
        setFormData={setFormData}
        questions={questionAnswer3.slice(11, 14).map((question, index) => (
          <div className="questions" key={index} id={`question_${question.id}`}>
            <p
              className={`questions-title  xs:w-[90%] sm:w-full md:w-full mx-auto ${index === 1 && 'mt-[3%]'} ${
                index === 0 ? "mt-[1%]" : "mt-[0%]" 
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
            {question.answer_type === "bar" ? (
              ""
            ) : (
              <input
                // value={getAnswerValue(question.id)}
                value={question.answer}
                placeholder={
                  changeLang === "ar"
                    ? placeHolders_arabic[index]
                    : placeHolders[index]
                }
                className={`question-input ${
                  isFilled === question?.id
                    ? "border-[#D83D99] border-b-[2px]"
                    : `${
                        window?.innerWidth <= 475
                          ? "border-b-[1px]"
                          : "border-b-[2px]"
                      } border-black`
                }`}
                onChange={(e) => handleChange(question.id, e.target.value)}
              />
            )}
            {/* <div className=" flex items-center justify-center flex-col w-[100%] md:w-[100% xl:w-[100%] lg:w-[100%] mt-[3%] px-2">
              {question.answer_type === "bar" &&
                progressLabels.map((data, index) => {
                  const sliderValue = sliderValues[data?.right] || 50;
                  const leftValue = 100 - sliderValue;
                  const rightValue = sliderValue;

                  const handleSliderChange = (newValue, id) => {
                    const adjustedValue = parseInt(newValue, 10);
                    const newSlideValues = {
                      ...sliderValues,
                      [data?.left]: 100 - adjustedValue,
                      [data?.right]: adjustedValue,
                    };
                    setSliderValues(newSlideValues);
                    // setFormData((prevFormData) => ({
                    //   ...prevFormData,
                    //   [id]: newSlideValues,
                    // }));
                    setQuestionAnswer3((prev) =>
                      prev.map((ele) =>
                        ele.id === id ? { ...ele, answer: newSlideValues } : ele
                      )
                    );
                  };
                  const leftTextStyle = {
                    textAlign: "left",
                    fontSize: window?.innerWidth <= 475 ? "10px" : "18px",
                    //fontSize: leftValue > rightValue ? "18px" : "14px",
                  };

                  const rightTextStyle = {
                    textAlign: "left",
                    fontSize: window?.innerWidth <= 475 ? "10px" : "18px",
                    //fontSize: rightValue > leftValue ? "18px" : "14px",
                  };

                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                      className="progress-section-q3"
                      key={index}
                    >
                      <p className="progress-text" style={leftTextStyle}>
                        {data?.left}
                      </p>
                      <input
                        type="range"
                        value={sliderValue}
                        className="question-progress"
                        min={0}
                        max={100}
                        onChange={(e) =>
                          handleSliderChange(e.target.value, question.id)
                        }
                      />
                      <p className="progress-text" style={rightTextStyle}>
                        {data?.right}
                      </p>
                    </div>
                  );
                })}

              {question.answer_type === "bar" && (
                <div
                  className={`w-[100%] xl:h-[2px] lg:h-[2px] md:h-[2px] sm:h-[2px] xs:h-[1px] ${
                    isFilled === question?.id ? "bg-[#D83D99]" : "bg-black"
                  } mt-[3%]`}
                ></div>
              )}
            </div> */}

            {/* <div className="flex items-center justify-center flex-col w-[100%] md:w-[100%] xl:w-[100%] lg:w-[100%] mt-[3%] px-2">
              {question.answer_type === "bar" &&
                progressLabels.map((data, index) => {
                  
                  // Initialize slider value from answer or default to 50
                  const sliderValue = question?.answer?.[data?.right] ?? 50;
                  const leftValue = 100 - sliderValue;
                  const rightValue = sliderValue;

                  const handleSliderChange = (newValue, id) => {
                    const adjustedValue = parseInt(newValue, 10);

                    const newSlideValues = {
                      [data?.left]: 100 - adjustedValue,
                      [data?.right]: adjustedValue,
                    };

                    // Update questionAnswer3 state
                    console.log(questionAnswer3[13])
                    setQuestionAnswer3((prev) =>
                      prev.map((ele) =>
                        ele.id === id
                          ? {
                              ...ele,
                              answer: {
                                ...ele.answer,
                                ...newSlideValues,
                              },
                            }
                          : ele
                      )
                    );
                  };

                  const leftTextStyle = {
                    textAlign: "left",
                    fontSize: window?.innerWidth <= 475 ? "10px" : "18px",
                  };

                  const rightTextStyle = {
                    textAlign: "left",
                    fontSize: window?.innerWidth <= 475 ? "10px" : "18px",
                  };

                  return (
                    <div
                      key={index}
                      className="progress-section-q3"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <p className="progress-text" style={leftTextStyle}>
                        {data?.left}
                      </p>
                      <input
                        type="range"
                        value={sliderValue}
                        className="question-progress"
                        min={0}
                        max={100}
                        onChange={(e) =>
                          handleSliderChange(e.target.value, question.id)
                        }
                      />
                      <p className="progress-text" style={rightTextStyle}>
                        {data?.right}
                      </p>
                    </div>
                  );
                })}

              {question.answer_type === "bar" && (
                <div
                  className={`w-[100%] xl:h-[2px] lg:h-[2px] md:h-[2px] sm:h-[2px] xs:h-[1px] ${
                    isFilled === question?.id ? "bg-[#D83D99]" : "bg-black"
                  } mt-[3%]`}
                ></div>
              )}
            </div> */}

            <div
              className="flex items-center justify-center flex-col w-full mt-[3%] px-2"
              dir={isArabic ? "rtl" : "ltr"}
            >
              {question.answer_type === "bar" &&
                progressLabels.map((data, index) => {
                  const sliderValue = question?.answer?.[data?.right] ?? 50;
                  const leftValue = 100 - sliderValue;
                  const rightValue = sliderValue;

                  const handleSliderChange = (newValue, id) => {
                    const adjustedValue = parseInt(newValue, 10);

                    const newSlideValues = {
                      [data?.left]: 100 - adjustedValue,
                      [data?.right]: adjustedValue,
                    };

                    setQuestionAnswer3((prev) =>
                      prev.map((ele) =>
                        ele.id === id
                          ? {
                              ...ele,
                              answer: {
                                ...ele.answer,
                                ...newSlideValues,
                              },
                            }
                          : ele
                      )
                    );
                  };

                  const textStyle = (align) => ({
                    textAlign: align,
                    fontSize: window?.innerWidth <= 475 ? "10px" : "18px",
                  });

                  return (
                    <div
                      key={index}
                      className="progress-section-q3"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: isArabic ? "row-reverse" : "row",
                        gap: "10px",
                      }}
                    >
                      <p
                        className="progress-text"
                        style={textStyle(isArabic ? "right" : "left")}
                      >
                        {data?.left}
                      </p>
                      <input
                        type="range"
                        value={sliderValue}
                        className="question-progress"
                        min={0}
                        max={100}
                        onChange={(e) =>
                          handleSliderChange(e.target.value, question.id)
                        }
                      />
                      <p
                        className="progress-text"
                        style={textStyle(isArabic ? "left" : "right")}
                      >
                        {data?.right}
                      </p>
                    </div>
                  );
                })}

              {question.answer_type === "bar" && (
                <div
                  className={`w-full ${
                    isFilled === question?.id ? "bg-[#D83D99]" : "bg-black"
                  } mt-[3%] h-[2px] `}
                />
              )}
            </div>
          </div>
        ))}
        bgTitle={
          changeLang === "ar" ? "تصميم هوية مشروعك" : "YOUR project BRANDING"
        }
      />
    </div>
  );
};
