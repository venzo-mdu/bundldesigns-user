import React, { useEffect, useState } from "react";
import axios from "axios";
import { Questionnaire } from "./Questionnaire";
import { base_url } from "../Auth/BackendAPIUrl";
import Load from "../../Images/Bundles/load_sticker.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { questionnaireAction1, questionnaireTitle } from "../../Redux/Action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfigToken } from "../Auth/ConfigToken";
import useToastMessage from "../Pages/Toaster/Toaster";
import { Toaster } from "react-hot-toast";
import { fetchQuestionAnswer, updateOrderID } from "./questionnaire.slice";

export const Questionnaire1 = ({
  formData,
  setFormData,
  changeLang,
  setChangeLang,
  lang,
  setlang,
}) => {
  const { showErrorToast } = useToastMessage();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [formData, setFormData] = useState();
  const [errors, setErrors] = useState({});
  // const [activeType, setActiveType] = useState(null);
  const [isFilled, setIsFilled] = useState(null);

  /* NEW QUESTIONANSWER */

  const questionAndAnswers = useSelector(
    (state) => state?.questionAnswer?.questionAndAnswers || []
  );

  const orderId = useSelector((state) => state?.questionAnswer?.orderId);
  const [questionAnswer1, setQuestionAnswer1] = useState([]);

  useEffect(() => {
    if (questionAndAnswers.length > 0) {
      setQuestionAnswer1(questionAndAnswers);
    }
  }, [questionAndAnswers]);

  /* NEW QUESTIONANSWER */

  // ${location.state.orderId}

  useEffect(() => {
    if (location?.state?.orderId) {
      dispatch(updateOrderID(location?.state?.orderId));
    }
  }, [location?.state?.orderId]);

  const placeHolders = [
    "Project Name",
    "(ex:Fashion,Food,Services,Personal Brand,etc...)",
    "(ex:Riyadh , Saudi Arabia)",
    "List them here...",
    "(ex:Best quality, unique design)",
    "Type your website URL",
    "Share your social media link",
  ];

  const placeHolders_arabic = [
    "بندل",
    "الأزياء، المطاعم، الخدمات..الخ",
    "الرياض، السعودية",
    "اكتبهم هنا...",
    "الخامة، الأسعار، التصاميم...الخ",
    "أدخل رابط موقعك الإلكتروني",
    "شارك روابط حساباتك على السوشال ميديا",
  ];

  const showToastMessage = () => {
    if (!toast.isActive("required-value-toast")) {
      showErrorToast(
        changeLang === "ar" ? "القيمة مطلوب" : "The Value is required!",
        "#D83D99"
      );
    }
  };
  const handleTypeClick = (questionId, type, ans) => {
    setQuestionAnswer1((prev) =>
      prev.map((ele) =>
        ele.id === questionId
          ? {
              ...ele,
              answer: {
                type: type,
                answer: ans,
              },
            }
          : ele
      )
    );
  };

  const handleInputChange = (questionId, value) => {
    if (questionId == "2" || questionId == "3") {
      if (/[0-9!@#$%^&*(),.?":{}|<>]/g.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [questionId]:
            lang === "ar"
              ? "لا يجب أن يحتوي على أرقام أو رموز"
              : "Should not contain numbers or special characters",
        }));
        return;
      } else {
        let temp_err = errors;
        delete temp_err[questionId];
        setErrors(temp_err);
      }
    }
    if (questionId == 4 || questionId === "4") {
      setQuestionAnswer1((prev) =>
        prev.map((ele) => {
          if (ele.id !== questionId) return ele;

          // Check if `type` is selected first
          if (!ele.answer?.type || ele.answer.type.trim() === "") {
            // Show error and skip updating the answer
            setErrors((prev) => ({
              ...prev,
              [questionId]:
                'Please select either "Product" or "Service" first.',
            }));
            return ele; // return original without updating
          }
          // If type is selected, update the answer
          setErrors((prev) => {
            const updated = { ...prev };
            delete updated[questionId];
            return updated;
          });

          return {
            ...ele,
            answer: {
              ...ele.answer,
              answer: value,
            },
          };
        })
      );

      // Now handle validation
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          [questionId]:
            lang === "ar"
              ? 'يرجى اختيار "منتج" أو "خدمة" أولاً.'
              : 'Please select either "Product" or "Service" first.',
        }));
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[questionId];
          return updated;
        });
      }

      return;
    } else {
      setQuestionAnswer1((prev) =>
        prev.map((ele) =>
          ele.id === questionId ? { ...ele, answer: value } : ele
        )
      );
    }
  };

  const validateFields = () => {
    const unansweredRequiredQuestions = questionAnswer1
      .slice(0, 6)
      .filter((q) => {
        if (q?.id === 4 && q.required) {
          const type = q?.answer?.type?.trim?.();
          const answer = q?.answer?.answer?.trim?.();
          if (!type && !answer) {
            return true;
          }
          return !type || !answer;
        }
        return (
          q.required &&
          (!q.answer ||
            (typeof q.answer === "string" && q.answer.trim() === ""))
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
      if (!toast.isActive("required-value-toast")) {
        showToastMessage();
      }
      return false;
    }

    return true;
  };

  const onNextClick = (e) => {
    e.stopPropagation();
    if (!validateFields()) {
      return;
    } else {
      dispatch(fetchQuestionAnswer(questionAnswer1));

      navigate(`/questionnaire/${2}`);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  let newUpdatedAns = questionAnswer1.map((ele) => {
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

  return (
    <div className="ovrflw">
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
        Qlang={changeLang}
        setQLang={setChangeLang}
        pageNo={1}
        storeAnswers={location.state?.questionnaireData1}
        orderId={location.state?.orderId}
        bgTitle={changeLang === "ar" ? "عن مشروعك" : "About your business"}
        formData={formData}
        setFormData={setFormData}
        onNextClick={onNextClick}
        onSaveLaterClick={onSaveLaterClick}
        questions={questionAnswer1.slice(0, 7).map((question, index) => {
          return (
            <div
              className="questions"
              key={index}
              id={`question_${question.id}`}
            >
              <p
                className={`questions-title xs:w-[90%] sm:w-full md:w-full mx-auto ${
                  index === 0 ? "mt-[1%]" : "mt-[3%]"
                }`}
              >
                {changeLang === "ar"
                  ? question.question_arabic
                  : question.question}
                {question.required && (
                  <span>
                    <sup>*</sup>
                  </span>
                )}
              </p>
              {question.answer_type === "brand" && (
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "3%" }}
                >
                  <button
                    className={`product-btn ${
                      question?.answer?.type === "product" ? "active" : ""
                    }`}
                    onClick={() => {
                      handleTypeClick(
                        question?.id,
                        "product",
                        question?.answer?.answer
                      );
                    }}
                  >
                    {changeLang === "ar" ? "منتج" : "Product"}
                  </button>
                  <button
                    className={`service-btn ${
                      question?.answer?.type === "service" ? "active" : ""
                    }`}
                    onClick={() =>
                      handleTypeClick(
                        question.id,
                        "service",
                        question?.answer?.answer
                      )
                    }
                  >
                    {changeLang === "ar" ? "خدمة" : "Service"}
                  </button>
                </div>
              )}
              <input
                type="text"
                className={`question-input ${
                  isFilled === question?.id
                    ? "border-[#D83D99] border-b-[2px]"
                    : window?.innerWidth <= 475
                    ? "border-b-[1px] border-black"
                    : "border-b-[2px] border-black"
                }`}
                // className={`question-input ${
                //   isFilled === question?.id ||
                //   (question?.id === 4 &&
                //     !question?.answer?.type ||
                //     !question?.answer?.answer)
                //     ? "border-[#D83D99] border-b-[2px]"
                //     : `${
                //         window?.innerWidth <= 475
                //           ? "border-b-[1px]"
                //           : "border-b-[2px]"
                //       } border-black`
                // }`}
                placeholder={
                  changeLang === "ar"
                    ? placeHolders_arabic[index]
                    : placeHolders[index]
                }
                value={
                  question?.answer_type === "brand"
                    ? question?.answer?.answer
                    : question?.answer
                }
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
              {question.id in errors && (
                <p className="text-[#D83D99]">{errors[question.id]}</p>
              )}
              {index === 0 && window.innerWidth >= 500 ? (
                <div className="img-rotate-qf">
                  <img className="rotating-image" src={Load} alt="Loading" />
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      ></Questionnaire>
    </div>
  );
};
