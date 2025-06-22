import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Questionnaire } from "./Questionnaire";
import { base_url } from "../Auth/BackendAPIUrl";
import Load from "../../Images/Bundles/load_sticker.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { questionnaireAction1 } from "../../Redux/Action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfigToken } from "../Auth/ConfigToken";
import useToastMessage from "../Pages/Toaster/Toaster";
import { Toaster } from "react-hot-toast";
export const Questionnaire1 = ({
  formData,
  setFormData,
  changeLang,
  setChangeLang,
}) => {
  const { showToast, showErrorToast } = useToastMessage();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [formData, setFormData] = useState();
  const [errors, setErrors] = useState({});
  const [activeType, setActiveType] = useState(null);
  const [fetchQ1Answers, setFetchQ1Answers] = useState([]);
  const [requiredQuestions, setRequiredQuestions] = useState([]);
  const [isFilled, setIsFilled] = useState(null);
  const currentAnswer = useSelector((state) => state.questionnaire1);
  console.log(currentAnswer, "ee");
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
    "",
    "",
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/content?section=brand_questions&page=1`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const fetchAnswers = async () => {
      try {
        if (location?.state?.orderId != undefined) {
          const response = await axios.get(
            `${base_url}/api/questionnaire/update/${location.state.orderId}`,
            ConfigToken()
          );
          console.log(response);
          setFetchQ1Answers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    if (currentAnswer[4]?.product) {
      setActiveType("product");
    }
    if (currentAnswer[4]?.service) {
      setActiveType("service");
    }
    setFormData(currentAnswer);
    fetchQuestions();
    fetchAnswers();
  }, []);

  const showToastMessage = () => {
    if (!toast.isActive("required-value-toast")) {
      showErrorToast(
        changeLang === "ar" ? "القيمة مطلوب" : "The Value is required!",
        "#D83D99"
      );
    }
  };
  const handleTypeClick = (type) => {
    setActiveType((prevType) => (prevType === type ? null : type)); // Toggle state
    let brandingType = activeType;
    // setFormData((prev) => ({
    //   ...prev,
    //   type: type, // Update formData accordingly
    // }));
  };

  const handleInputChange = (questionId, value) => {
    if (questionId == "2" || questionId == "3") {
      if (/[0-9!@#$%^&*(),.?":{}|<>]/g.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [questionId]: "Should not contain numbers or special characters",
        }));
        return;
      } else {
        let temp_err = errors;
        delete temp_err[questionId];
        setErrors(temp_err);
      }
    }
    if (questionId == 4 || questionId === "4") {
      if (!activeType) {
        setErrors((prev) => ({
          ...prev,
          [questionId]: 'Please select either "Product" or "Service" first.',
        }));
        return;
      } else {
        let temp_err = { ...errors };
        delete temp_err[questionId];
        setErrors(temp_err);
      }

      setFormData((prev) => ({
        ...prev,
        [questionId]: {
          [activeType.toLowerCase()]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [questionId]: value,
      }));
    }
  };

  // const getAnswerValue = (questionId) => {
  //   const formValue = formData?.[questionId];

  //   if (questionId === 4 || questionId === '4') {
  //     if (formValue && typeof formValue === 'object' && activeType) {
  //       return formValue[activeType.toLowerCase()] || '';
  //     }

  //     // Check in fetched answers and parse if necessary
  //     const fetchedAnswer = fetchQ1Answers.find((answer) => Number(answer.question_id) === Number(questionId))?.answer;

  //     if (fetchedAnswer) {
  //       try {
  //         // Parse the stringified object
  //         const parsedAnswer = JSON.parse(fetchedAnswer.replace(/'/g, '"')) || fetchedAnswer;
  //         console.log(parsedAnswer)
  //         if (!activeType && typeof parsedAnswer === 'object') {
  //           if (parsedAnswer.product) {
  //             setActiveType("product");
  //           } else if (parsedAnswer.service) {
  //             setActiveType("service");
  //           }
  //         }
  //         setFormData((prevFormData) => ({
  //           ...prevFormData,
  //           [questionId]: activeType ? parsedAnswer?.[activeType] : JSON.stringify(parsedAnswer) ,
  //         }))

  //         // setFormData((prevFormData) => ({
  //         //   ...prevFormData,
  //         //   [questionId]: {
  //         //     [activeType]: activeType
  //         //       ? parsedAnswer?.[activeType]
  //         //       : JSON.stringify(parsedAnswer),
  //         //   },
  //         // }));
  //         return activeType ? parsedAnswer?.[activeType] : JSON.stringify(parsedAnswer);
  //       } catch (error) {
  //         console.error('Failed to parse fetchedAnswer:', error);
  //         return '';
  //       }
  //     }

  //     return '';
  //   }

  //   // Handle other questions normally
  //   if (formValue !== undefined) {
  //     return formValue;
  //   }

  //   // Check in fetched answers for other questionIds
  //   const fetchedAnswer = fetchQ1Answers.find((answer) => Number(answer.question_id) === Number(questionId))?.answer;
  //   if (fetchedAnswer !== undefined && formValue === undefined) {

  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [questionId]: fetchedAnswer,
  //     }));
  //   }

  //   return fetchedAnswer ?? '';
  // };

  const getAnswerValue = (questionId) => {
    const formValue = formData?.[questionId];

    if (questionId === 4 || questionId === "4") {
      // If formData already has the value, return based on activeType
      if (formValue && typeof formValue === "object" && activeType) {
        return formValue[activeType.toLowerCase()] || "";
      }

      // Try to get from initial answers
      const fetchedAnswerObj = fetchQ1Answers.find(
        (answer) => Number(answer.question_id) === Number(questionId)
      )?.answer;

      // if (fetchedAnswerObj && typeof fetchedAnswerObj === "object") {
      //   // Set activeType if not set
      //   if (!activeType) {
      //     if (fetchedAnswerObj.product) {
      //       setActiveType("product");
      //     } else if (fetchedAnswerObj.service) {
      //       setActiveType("service");
      //     }
      //   }

      //   // Store in formData
      //   setFormData((prev) => ({
      //     ...prev,
      //     [questionId]: fetchedAnswerObj,
      //   }));

      //   // return activeType ? fetchedAnswerObj[activeType] : "";
      // }

      if (
        !formValue &&
        fetchedAnswerObj &&
        typeof fetchedAnswerObj === "object"
      ) {
        // Set activeType if not set
        if (!activeType) {
          if (fetchedAnswerObj.product) {
            setActiveType("product");
          } else if (fetchedAnswerObj.service) {
            setActiveType("service");
          }
        }

        // Only set formData if it doesn't already exist
        setFormData((prev) => {
          if (!prev[questionId]) {
            return {
              ...prev,
              [questionId]: fetchedAnswerObj,
            };
          }
          return prev;
        });
      }

      return "";
    }

    // // For other fields (not question 4)
    if (formValue !== undefined) {
      return formValue;
    }

    const fetchedAnswer = fetchQ1Answers.find(
      (answer) => Number(answer.question_id) === Number(questionId)
    )?.answer;

    if (fetchedAnswer !== undefined) {
      setFormData((prev) => ({
        ...prev,
        [questionId]: fetchedAnswer,
      }));
    }

    return fetchedAnswer ?? "";
  };

  const validateFields = () => {
    // Filter required questions that are either unanswered or contain invalid values
    const unansweredRequiredQuestions = questions.filter((q) => {
      return (
        q.required && // Check if the question is marked as required
        (!formData?.[q.id] ||
          (typeof formData[q.id] === "string" && formData[q.id].trim() === "")) // Check if there's no answer or only whitespace
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

    return true; // All required fields are valid
  };

  const onNextClick = (e) => {
    e.stopPropagation();
    if (!validateFields()) {
      return; // Stop execution if validation fails
    } else {
      console.log(formData, "next");
      dispatch(questionnaireAction1(formData));
      navigate(`/questionnaire/${2}`, {
        state: {
          orderId: location.state?.orderId,
        },
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const onSaveLaterClick = async () => {
    let data = {
      answers: formData,
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

  // const getOrderDetails = async () => {
  //   if (location.state?.orderId) {
  //     const response = await axios.get(
  //       `${base_url}/api/order/${location.state?.orderId}/`,
  //       ConfigToken()
  //     );
  //     setFormData((prev) => ({
  //       ...prev,
  //       1: response.data.data.project_name,
  //     }));
  //   }
  // };
  // useEffect(() => {
  //   getOrderDetails();
  // }, []);

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
        questions={questions.map((question, index) => (
          <div className="questions" key={index} id={`question_${question.id}`}>
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
              <div style={{ display: "flex", gap: "10px", marginBottom: "3%" }}>
                <button
                  className={`product-btn ${
                    activeType === "product" ? "active" : ""
                  }`}
                  onClick={() => handleTypeClick("product")}
                >
                  {changeLang === "ar" ? "منتج" : "Product"}
                </button>
                <button
                  className={`service-btn ${
                    activeType === "service" ? "active" : ""
                  }`}
                  onClick={() => handleTypeClick("service")}
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
              // value={formData?.[question.id] || fetchQ1Answers[2].answer }
              value={getAnswerValue(question.id)}
              onChange={(e) => handleInputChange(question.id, e.target.value)} // Update Redux
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
        ))}
      ></Questionnaire>
    </div>
  );
};
