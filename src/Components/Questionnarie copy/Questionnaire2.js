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

  /* NEW QUESTIONANSWER */

  const [selectedGenderType, setSelectedGenderType] = useState({
    isFemale: false,
    isMale: false,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/content?section=brand_questions&page=2`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const fetchAnswers = async () => {
      try {
        if (location.state?.orderId) {
          const response = await axios.get(
            `${base_url}/api/questionnaire/update/${location.state.orderId}`,
            ConfigToken()
          );
          const answers = response.data.data;
          setFetchQ2Answers(answers);

          // Extract age-data answer
          const ageDataQuestion = answers.find(
            (item) => item.answer_type === "age-data"
          );

          if (ageDataQuestion?.answer?.female) {
            setActiveFemaleButtons(ageDataQuestion.answer.female);
            if (ageDataQuestion.answer.female.length > 0) {
              setSelectedGender((prev) =>
                prev.includes("female") ? prev : [...prev, "female"]
              );
            }
          }
          if (ageDataQuestion?.answer?.male) {
            setActiveMaleButtons(ageDataQuestion.answer.male);
            if (ageDataQuestion.answer.male.length > 0) {
              setSelectedGender((prev) =>
                prev.includes("male") ? prev : [...prev, "male"]
              );
            }
          }
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    // Process currentAnswer if available
    const processCurrentAnswer = () => {
      if (currentAnswer && "10" in currentAnswer) {
        const answer = currentAnswer["10"];
        setActiveMaleButtons(answer.male || []);
        setActiveFemaleButtons(answer.female || []);

        if (answer.female?.length && answer.male?.length) {
          setSelectedGender(["both"]);
        } else if (answer.male?.length) {
          setSelectedGender(["male"]);
        } else if (answer.female?.length) {
          setSelectedGender(["female"]);
        }
      }
    };

    // Initialize form data
    setFormData(location.state?.questionnaireData2 || currentAnswer);

    // Fetch data
    if (!location.state.isBackBtn) {
      fetchAnswers();
    }
    fetchQuestions();

    processCurrentAnswer();
  }, [location.state?.orderId, currentAnswer]);

  const getAnswerValue = (questionId) => {
    const formValue = formData?.[questionId];
    if (formValue !== undefined) {
      return formValue;
    }

    const fetchedAnswer = fetchQ2Answers.find(
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

  const handleGenderChange = (selected, isSelected) => {
    setFormData((prev) => {
      let updatedData = { ...prev };
      if (!updatedData["10"]) {
        updatedData["10"] = { male: [], female: [] };
      }

      if (selected === "male") {
        if (selectedGenderType.isMale) {
          updatedData["10"].male = updatedData["10"].male;
        } else {
          updatedData["10"].male = [];
        }
      } else if (selected === "female") {
        if (selectedGenderType.isFemale) {
          updatedData["10"].female = updatedData["10"].female;
        } else {
          updatedData["10"].female = [];
        }
      }
      return updatedData;
    });

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
      setSelectedGender((prev) => {
        console.log(prev);
        return [...prev, selected];
      });
    }
  };
  const showToastMessage = () => {
    showErrorToast(
      changeLang === "ar" ? "القيمة مطلوب" : "The Value is required!",
      "#D83D99"
    );
  };

  const validateFields = () => {
    const unansweredRequiredQuestions = questions.filter((q) => {
      if (q.required) {
        // If it's an age-data question, ensure the correct buttons are selected
        if (q.answer_type === "age-data") {
          if (selectedGender?.includes("female")) {
            return !activeFemaleButtons || activeFemaleButtons.length === 0;
          }
          if (selectedGender?.includes("male")) {
            return !activeMaleButtons || activeMaleButtons.length === 0;
          }
          if (selectedGender?.includes("both")) {
            return (
              !activeMaleButtons ||
              activeMaleButtons.length === 0 ||
              activeFemaleButtons.length === 0
            );
          }
        }

        // Default check for other required questions
        // return !formData?.[q.id] || formData?.[q.id]?.trim() === "";
        const value = formData?.[q.id];

        if (typeof value === "string") {
          return value.trim() === "";
        }

        if (Array.isArray(value)) {
          return (
            value.length === 0 || value.every((item) => item.trim?.() === "")
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

  const handleButtonClick = (buttonId, gender, label, questionId) => {
    setFormData((prevFormData) => {
      const currentFemaleData = activeFemaleButtons || [];
      const currentMaleData = activeMaleButtons || [];

      let updatedGenderData;
      if (gender === "female") {
        updatedGenderData = currentFemaleData.includes(label)
          ? currentFemaleData.filter((item) => item !== label)
          : [...currentFemaleData, label];
        setActiveFemaleButtons(updatedGenderData);
        return {
          ...prevFormData,
          [questionId]: {
            female: updatedGenderData,
            male: currentMaleData,
          },
        };
      }

      if (gender === "male") {
        updatedGenderData = currentMaleData.includes(label)
          ? currentMaleData.filter((item) => item !== label) // Remove if already selected
          : [...currentMaleData, label]; // Add if not present

        setActiveMaleButtons(updatedGenderData); // Update active male buttons

        return {
          ...prevFormData,
          [questionId]: {
            female: currentFemaleData, // Preserve female data
            male: updatedGenderData, // Update male data
          },
        };
      }

      return prevFormData; // Default case (shouldn't occur)
    });
  };

  const handleChange = (questionId, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [questionId]: value,
    }));
  };

  const onBackClick = async () => {
    navigate(`/questionnaire/${1}`, {
      state: {
        questionnaireData1: answers,
        orderId: location.state?.orderId,
      },
    });
  };
  const onNextClick = () => {
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
    dispatch(questionnaireAction2(formData));
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
            {questionAndAnswers.slice(7, 11).map((question, index) => {
              ;
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
                  {question.answer_type === "age-data" && (
                    <>
                      <div className="ideal-customers">
                        {/* <p className='customer-text'>Who is your ideal customer?</p> */}
                        <div
                          style={{ display: "flex", gap: "25px" }}
                          className="mt-[5%]"
                        >
                          <button
                            className={
                              selectedGender.includes("female") ||
                              selectedGender.includes("both")
                                ? "female-active"
                                : "female"
                            }
                            value="female"
                            onClick={() => {
                              const femaleDisabled =
                                !selectedGender.includes("female");
                              setSelectedGenderType((prev) => !prev.isFemale);
                              handleGenderChange("female", femaleDisabled);
                            }}
                          >
                            {changeLang === "ar" ? "انثى" : "Female"}
                          </button>
                          <button
                            className={
                              selectedGender.includes("male") ||
                              selectedGender.includes("both")
                                ? "male-active"
                                : "male"
                            }
                            value={"male"}
                            onClick={() => {
                              const maleDisabled =
                                !selectedGender.includes("male");
                              setSelectedGenderType((prev) => !prev.isMale);
                              handleGenderChange("male", maleDisabled);
                            }}
                          >
                            {changeLang === "ar" ? "ذكر" : "Male"}
                          </button>
                        </div>
                        <div className="border-b-[1px] border-solid border-[#000000] mb-4">
                          {selectedGender.includes("female") ||
                          selectedGender.includes("both") ? (
                            <div className="female-section mb-[5%]">
                              {/* Render female images */}
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
                                          activeFemaleButtons?.includes(label)
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
                        {selectedGender.includes("male") ||
                        selectedGender.includes("both") ? (
                          <div className="male-section">
                            {/* Render female images */}
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
                                      activeMaleButtons.includes(label)
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
                              ))}
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
                      question.answer_type === "age-data"
                        ? ""
                        : getAnswerValue(question.id)
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
