import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../Auth/BackendAPIUrl";
import { Questionnaire } from "./Questionnaire";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ConfigToken } from "../Auth/ConfigToken";
import { questionnaireAction5, questionnaireAnswers } from "../../Redux/Action";
import { ToastContainer, toast } from "react-toastify";
import Blackupload from "../../Images/Questionnaire/upload.svg";
import useToastMessage from "../Pages/Toaster/Toaster";
import { Toaster } from "react-hot-toast";
import { fetchQuestionAnswer, updateOrderID } from "./questionnaire.slice";
import Loader from "../../Images/Home/load sticker.png";
import CloseIcon from "@mui/icons-material/Close";

export const Questionnaire5 = ({
  formData,
  setFormData,
  changeLang,
  setChangeLang,
}) => {
  const { showToast, showErrorToast } = useToastMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentAnswer = useSelector((state) => state.questionnaire5);
  const answers1 = useSelector((state) => state.questionnaire1);
  const answers2 = useSelector((state) => state.questionnaire2);
  const answers3 = useSelector((state) => state.questionnaire3);
  const answers4 = useSelector((state) => state.questionnaire4);
  const [uploadContent, setUploadContent] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isFilled, setIsFilled] = useState(null);
  const [fetchQ5Answers, setFetchQ5Answers] = useState([]);

  const [isFinishedQuestion, setIsFinished] = useState(false);

  const placeHolders = [
    "",
    "Upload the file/document or send it to our email info@bundldesigns.com",
    "",
  ];

  const placeHolders_arabic = [
    "",
    "من فضلك اكتب الرابط او ارسال ايميل على info@bundldesigns.com",
    "",
  ];

  /* NEW QUESTIONANSWER */

  const questionAndAnswers = useSelector(
    (state) => state?.questionAnswer?.questionAndAnswers || []
  );
  const orderId = useSelector((state) => state?.questionAnswer?.orderId);
  const [questionAnswer5, setQuestionAnswer5] = useState([]);

  useEffect(() => {
    if (questionAndAnswers.length > 0) {
      setQuestionAnswer5(questionAndAnswers);
    }
  }, [questionAndAnswers]);

  /* NEW QUESTIONANSWER */

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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/content?section=brand_questions&page=5`
        );
        const questionsData = response.data.map((question, index) => ({
          ...question,
          placeholder:
            changeLang === "ar"
              ? placeHolders_arabic[index]
              : placeHolders[index],
        }));
        setQuestions(questionsData);
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
          setFetchQ5Answers(response.data.data);

          const question24Answer = response.data.data.find(
            (answer) => answer.question_id === 24
          )?.answer;
          setSelectedLanguage(question24Answer.toLowerCase());
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    setFormData(currentAnswer);
    fetchQuestions();
    setSelectedLanguage(currentAnswer?.[24] ? currentAnswer[24] : null);
    fetchAnswers();
  }, []);
  console.log(formData, "form");

  const getAnswerValue = (questionId) => {
    const formValue = formData?.[questionId];
    if (formValue !== undefined) {
      return formValue;
    }

    const fetchedAnswer = fetchQ5Answers.find(
      (answer) => answer.question_id === questionId
    )?.answer;
    if (fetchedAnswer !== undefined && formValue === undefined) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [questionId]: fetchedAnswer,
      }));
    }
    return fetchedAnswer ?? "";
  };

  const showToastMessage = () => {
    showErrorToast(
      changeLang === "ar" ? "القيمة مطلوب" : "The Value is required!",
      "#D83D99"
    );
  };

  // const validateFields = () => {
  //   ;
  //   const unansweredRequiredQuestions = questionAnswer5
  //     .slice(21, 24)
  //     .filter((q) => {
  //       if (q.id === 23) {
  //         return (
  //           q.required && (q.answer.document || q.answer.document.trim() === "")
  //         );
  //       }
  //       else if (q.id === 24) {
  //         return (
  //           q.required && (q.answer && q.answer.trim() !== "")
  //         );
  //       } else {
  //         return q.required && (q.answer || q.answer.trim() === "");
  //       }
  //     });

  //   if (unansweredRequiredQuestions.length > 0) {
  //     const element = document.getElementById(
  //       `question_${unansweredRequiredQuestions[0]?.id}`
  //     );
  //     setIsFilled(unansweredRequiredQuestions[0]?.id);
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //     showToastMessage();
  //     return false;
  //   }
  //   return true;
  // };

  const validateFields = () => {
    const unansweredRequiredQuestions = questionAnswer5
      .slice(21, 24)
      .filter((q) => {
        if (!q.required) return false;

        if (q.id === 23) {
          const doc = q?.answer?.document?.trim?.();
          return !doc;
        }
        if (q.id === 24) {
          return !q.answer || q.answer.trim() === "";
        }
        return !q.answer || q.answer.trim() === "";
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

  const handleChange = (id, value) => {
    setQuestionAnswer5((prev) =>
      prev.map((ele) => (ele.id === id ? { ...ele, answer: value } : ele))
    );
  };

  const handleLanguageChange = (language, questionId) => {
    setQuestionAnswer5((prev) =>
      prev.map((ele) =>
        ele.id === questionId ? { ...ele, answer: language } : ele
      )
    );
    // Update the isFilled array only if questionId is not 24
    if (questionId === 24) {
      setIsFilled(null);
    }
  };

  // const uploadFile = async (e, id, field) => {
  //   if (e.target.files.length) {
  //     const formData = new FormData();
  //     formData.append("file", e.target.files[0]);
  //     formData.append("file_name", e.target.files[0]?.name);
  //     const response = await axios.post(
  //       `${base_url}/api/upload_file/`,
  //       formData,
  //       ConfigToken()
  //     );
  //     setQuestionAnswer5((prev) =>
  //       prev.map((ele) =>
  //         ele.id === id
  //           ? {
  //               ...ele,
  //               answer: {
  //                 ...ele.answer,
  //                 document: response.data.file_url,
  //                 docName: e.target.files[0]?.name || "",
  //               },
  //             }
  //           : ele
  //       )
  //     );
  //   }
  // };

  const onBackClick = async () => {
    dispatch(fetchQuestionAnswer(questionAnswer5));
    navigate(`/questionnaire/${4}`, {
      state: {
        questionnaireData4: answers4,
        orderId: location.state?.orderId,
      },
    });
  };

  const FinishClick = async () => {
    let finalFormData = {
      answers: newUpdatedAns,
      language: localStorage.getItem("lang") === "ar" ? "arabic" : "english",
      status: "submit",
      orderId: orderId,
    };
    if (!validateFields()) {
      return;
    }
    try {
      setIsFinished(true);
      const response = await axios.post(
        `${base_url}/api/questionnaire/create`,
        finalFormData,
        ConfigToken()
      );
      if (response.data.status === 200) {
        localStorage.removeItem("reduxState");
        localStorage.removeItem("orderId");
        dispatch(fetchQuestionAnswer([]));
        dispatch(updateOrderID(""));
      }
      setIsFinished(false);
      navigate("/thankyou");
    } catch (error) {
      setIsFinished(false);
      console.error("Error submitting data:", error);
    }
  };

  let newUpdatedAns = questionAnswer5.map((ele) => {
    return {
      id: ele.id,
      answers: ele.answer,
    };
  });

  const onSaveLaterClick = async () => {
    try {
      let data = {
        answers: newUpdatedAns,
        status: "not submitted",
        orderId: orderId,
      };
      const response = await axios.post(
        `${base_url}/api/questionnaire/create`,
        data,
        ConfigToken()
      );
      ;
      if (response.status === 200) {
        dispatch(questionnaireAction5(formData));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const removeDocument = (indexToRemove, id) => {
    setQuestionAnswer5((prev) =>
      prev.map((ele) =>
        ele.id === id
          ? {
              ...ele,
              answer: {
                ...ele.answer,
                documents: ele.answer.documents.filter(
                  (_, i) => i !== indexToRemove
                ),
              },
            }
          : ele
      )
    );
  };

  const uploadFile = async (e, id, field) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("file_name", file.name);

        const response = await axios.post(
          `${base_url}/api/upload_file/`,
          formData,
          ConfigToken()
        );

        return {
          docName: file.name,
          document: response.data.file_url,
        };
      })
    );

    setQuestionAnswer5((prev) =>
      prev.map((ele) =>
        ele.id === id
          ? {
              ...ele,
              answer: {
                ...ele.answer,
                documents: [
                  ...(ele.answer?.documents || []), // existing files
                  ...uploadedFiles, // new files
                ],
              },
            }
          : ele
      )
    );
  };

  return (
    <div>
      <div>
        {isFinishedQuestion && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // backgroundColor: "transparent",
              backgroundColor: "rgba(0, 0, 0, 0.4)",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "auto",
              userSelect: "none",
              zIndex: 9999,
            }}
          >
            {/* <img
              src={ourWorkBranding}
              alt="loader-round-icon"
              style={{ width: 200, height: 200 }}
              className="loader"
            /> */}
            <img className="loader" src={Loader} alt="loader-round-icon"></img>
          </div>
        )}
      </div>
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
        pageNo={5}
        Qlang={changeLang}
        setQLang={setChangeLang}
        storeAnswers={answers4}
        orderId={location.state?.orderId}
        onBackClick={onBackClick}
        onNextClick={FinishClick}
        onSaveLaterClick={onSaveLaterClick}
        formData={formData}
        setFormData={setFormData}
        questions={questionAnswer5.slice(21, 24).map((question, index) => (
          <div
            className="questions"
            key={question.id}
            id={`question_${question.id}`}
          >
            <p
              className={`questions-title  xs:w-[90%] sm:w-full md:w-full mx-auto ${
                index === 0 ? "mt-[1%]" : "mt-[2%]"
              }`}
            >
              {changeLang === "ar"
                ? question?.question_arabic
                : question.question}
              {question?.required && (
                <span>
                  <sup>*</sup>
                </span>
              )}
            </p>
            {question?.id === 24 && (
              <div className="flex items-center justify-center gap-[20px] mt-2">
                <div>
                  <button
                    onClick={() => handleLanguageChange("arabic", question.id)}
                    className={`uppercase font-[18px] lg:h-[45px] md:h-[45px] xs:h-[35px] w-[150px] border-[1px] border-solid border-[#000000] ${
                      question.answer === "arabic"
                        ? "bg-[#000000] text-[#FFFFFF]"
                        : "hover:bg-[#000000] hover:text-[#FFFFFF]"
                    }`}
                  >
                    {changeLang === "ar" ? "إنجليزي" : "Arabic"}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleLanguageChange("english", question.id)}
                    className={`uppercase font-[18px] lg:h-[45px] md:h-[45px] xs:h-[35px] w-[150px] border-[1px] border-solid border-[#000000] ${
                      question?.answer === "english"
                        ? "bg-[#000000] text-[#FFFFFF]"
                        : "hover:bg-[#000000] hover:text-[#FFFFFF]"
                    }`}
                  >
                    {changeLang === "ar" ? "عربي" : " English"}
                  </button>
                </div>
              </div>
            )}

            {question.id === 24 ? (
              <div
                className={`w-[100%] xl:h-[2px] lg:h-[2px] md:h-[2px] sm:h-[2px] xs:h-[1px] ${
                  isFilled === question.id ? "bg-[#D83D99]" : "bg-black"
                } lg:mt-[3%] md:mt-[3%] xs:mt-[5%]`}
              ></div>
            ) : question?.id === 23 ? (
              <>
                <div
                  className={`question-input ${
                    isFilled === question?.id
                      ? "border-[#D83D99] border-b-[2px]"
                      : `${
                          window?.innerWidth <= 475
                            ? "border-b-[1px]"
                            : "border-b-[2px]"
                        } border-black`
                  }`}
                >
                  <>
                    <p className="text-[#a9a9a9] mt-[-25px] text-[18px]">
                      {question?.placeholder}
                    </p>
                    <div className="flex justify-center items-center">
                      <p
                        className={`border-1 lg:text-[18px] md:text-[18px] xs:text-[14px] uppercase font-Helvetica font-[400]
                            ${
                              window?.innerWidth <= 500
                                ? "w-[75%]"
                                : "w-[300px]"
                            } 
                          !border-[#000000] flex items-center justify-center  text-[#000000] cursor-pointer ml-2 mt-3 p-2 `}
                        onClick={() =>
                          document.getElementById(`file-${question.id}`).click()
                        }
                      >
                        <input
                          type="file"
                          hidden
                          multiple
                          name="file"
                          id={`file-${question.id}`} // Use a unique ID for each input
                          onChange={(e) => uploadFile(e, question.id, "file")}
                        />

                        <img
                          className="h-[25px] w-[40px]"
                          src={Blackupload}
                          alt="Upload Icon"
                        />
                        {changeLang === "ar"
                          ? "تحميل المحتوى"
                          : "Upload Content"}
                      </p>
                    </div>
                    {/* <p className="lg:text-[18px] md:text-[18px] xs:text-[14px] font-[400]">
                      {question?.answer?.docName}
                    </p> */}
                    {question?.answer?.documents?.length > 0 && (
                      <div className="flex flex-wrap justify-center">
                        {question.answer.documents.map(({ docName }, i) => (
                          <div
                            key={i}
                            className="bg-black text-[14px] text-white py-1 px-2 mr-2 mb-2 flex items-center"
                          >
                            {docName}
                            <CloseIcon
                              onClick={() => removeDocument(i, question.id)}
                              className="ml-2 cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                </div>
              </>
            ) : (
              <input
                placeholder={question?.placeholder}
                className={`question-input ${
                  isFilled === question?.id
                    ? "border-[#D83D99] border-b-[2px]"
                    : `${
                        window?.innerWidth <= 475
                          ? "border-b-[1px]"
                          : "border-b-[2px]"
                      } border-black`
                }`}
                value={question?.answer}
                onChange={(e) => handleChange(question.id, e.target.value)}
              />
            )}
          </div>
        ))}
        bgTitle={changeLang === "ar" ? "أفكار ختامية" : "Final Thoughts"}
      />
    </div>
  );
};
