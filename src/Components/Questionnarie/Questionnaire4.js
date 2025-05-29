import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../Auth/BackendAPIUrl";
import { Questionnaire } from "./Questionnaire";
import { useDispatch, useSelector } from "react-redux";
import { questionnaireAction4 } from "../../Redux/Action";
import { colorCodes } from "../../json/QuestionnaireColorCodes";
import { textStyle } from "../../json/QuestionnaireColorCodes";
import { textureImages1 } from "../../json/QuestionnaireColorCodes";
import { textureImages2 } from "../../json/QuestionnaireColorCodes";
import { textureImages3 } from "../../json/QuestionnaireColorCodes";
import { textureImages4 } from "../../json/QuestionnaireColorCodes";
import { textureImages5 } from "../../json/QuestionnaireColorCodes";
import { textureImages6 } from "../../json/QuestionnaireColorCodes";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import X from "../../Images/Questionnaire/x icon.png";
import Color1 from "../../Images/Questionnaire/img1.png";
import Color2 from "../../Images/Questionnaire/img2.png";
import Color3 from "../../Images/Questionnaire/img3.png";
import Link from "../../Images/Questionnaire/icons8-link-26.png";
import Blackupload from "../../Images/Questionnaire/upload.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfigToken } from "../Auth/ConfigToken";
import { ToastContainer, toast } from "react-toastify";
import useToastMessage from "../Pages/Toaster/Toaster";
import { Toaster } from "react-hot-toast";

export const Questionnaire4 = ({
  formData,
  setFormData,
  changeLang,
  setChangeLang,
}) => {
  const { showToast, showErrorToast } = useToastMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.questionnaire3);
  const currentAnswer = useSelector((state) => state.questionnaire4);
  const [uploadContent, setUploadContent] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]); // To store selected color codes
  const [inputValue, setInputValue] = useState(""); // For input field
  const [activeButtons, setActiveButtons] = useState([]);
  const [shadeBackgroundColor, setShadeBackgroundColor] =
    useState("rgb(228, 222, 216)");
  const [shadeColor, setshadeColor] = useState("rgb(0, 0, 0)");
  const [shadeType, setShadeType] = useState("");
  const [fetchQ4Answers, setFetchQ4Answers] = useState([]);
  const [isFilled, setIsFilled] = useState(null);
  const [columnGap, setColumnGap] = useState("10px");

  const placeHolders = ["BUNDL", "(ex: Luxury shopping made easy)"];
  const placeHolders_arabic = ["", ""];

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      [18]: shadeBackgroundColor || "rgb(228, 222, 216)",
    }));
  }, [formData]);

  useEffect(() => {
    const updateColumnGap = () => {
      if (window.innerWidth <= 375) {
        setColumnGap("8px");
      } else if (window.innerWidth >= 375 && window.innerWidth <= 500) {
        setColumnGap("13px");
      } else {
        setColumnGap("10px");
      }
    };

    updateColumnGap(); // Initial call
    window.addEventListener("resize", updateColumnGap);

    return () => window.removeEventListener("resize", updateColumnGap);
  }, [window?.innerWidth]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/content?section=brand_questions&page=4`
        );

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
          setFetchQ4Answers(response.data.data);
          const answers = response.data.data;

          answers.forEach((item) => {
            const { question_id, answer, answer_type } = item;

            setFormData((prevFormData) => ({
              ...prevFormData,
              [question_id]: answer,
            }));

            switch (question_id) {
              case 17:
                setActiveButtons(answer);
                break;

              case 18:
                const bgcolor = {
                  "rgb(9, 50, 108)": "rgb(255, 98, 10)",
                  "rgb(228, 222, 216)": "rgb(0, 0, 0)",
                  "rgb(255, 45, 45)": "rgb(221, 124, 124)",
                  "rgb(255, 124, 124)": "rgb(200, 100, 100)",
                };
                setShadeBackgroundColor(answer);
                setshadeColor(bgcolor[answer] || "rgb(228, 222, 216)"); // Set a mapped or default color
                break;

              case 19: // Colors (array of hex values)
                if (Array.isArray(answer)) {
                  setSelectedColors(answer); // Update selected colors
                }
                break;

              case 20: // Textures (array of strings)
                if (Array.isArray(answer)) {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [question_id]: answer, // Set the answer directly in formData
                  })); // Assume a `setSelectedTextures` state handler
                }
                break;

              default:
                console.warn(`Unhandled question_id: ${question_id}`);
                break;
            }
          });
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    setFormData(currentAnswer);

    if (Object.values(currentAnswer).length) {
      setActiveButtons(currentAnswer[17]);
      let currentColor = currentAnswer[18];
      if (currentColor == "suprise") {
        currentColor = "rgb(255, 45, 45)";
      }
      const bgcolor = {
        "rgb(9, 50, 108)": "rgb(255, 98, 10)",
        "rgb(228, 222, 216)": "rgb(0, 0, 0)",
        "rgb(255, 45, 45)": "rgb(221, 124, 124)",
      };
      setShadeBackgroundColor(
        currentColor === undefined ? "rgb(228, 222, 216)" : currentColor
      );
      setshadeColor(bgcolor[currentColor]);
      setSelectedColors(currentAnswer[19]);
    }
    fetchQuestions();
    fetchAnswers();
  }, []);

  const displayedColors = colorCodes.slice(0, 90);

  const getAnswerValue = (questionId) => {
    const formValue = formData?.[questionId];
    if (formValue !== undefined) {
      return formValue;
    }

    const fetchedAnswer = fetchQ4Answers.find(
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
    // toast.error(changeLang === 'ar' ? '•القيمة مطلوب' :"The Value is required!", {
    //   position: toast?.POSITION?.TOP_RIGHT,
    //   toastId: 'required-value-toast',
    //   icon: false,
    //   style: {
    //     color: '#D83D99',
    //     fontWeight: '700'
    //   }
    // });
    showErrorToast(
      changeLang === "ar" ? "•القيمة مطلوب" : "The Value is required!",
      "#D83D99"
    );
  };
  const validateFields = () => {
    // Filter required questions that are either unanswered or contain invalid data
    const unansweredRequiredQuestions = questions.filter((q) => {
      const answer = formData?.[q.id];
      console.log(formData[q?.id], q.id);
      if (!q.required) {
        return false;
      }

      // return !answer || answer.toString().trim() === "";
      if (
        answer === undefined ||
        answer === null ||
        (typeof answer === "string" && answer.trim() === "") ||
        (Array.isArray(answer) && answer.length === 0) ||
        (typeof answer === "object" &&
          !Array.isArray(answer) &&
          Object.keys(answer).length === 0)
      ) {
        return true;
      }

      return false; // Valid answer
    });

    if (unansweredRequiredQuestions?.length > 0) {
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

  const handleColorClick = (color, questionId) => {
    let updatedColors = [];
    const isHexCode = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
    if (!isHexCode && color !== "Surprise") {
      toast.error(
        changeLang === "ar" ? "HEX يُسمح فقط بكود  " : "Allows only HEX Code!",
        {
          position: toast?.POSITION?.TOP_RIGHT,
          toastId: "required-value-toast",
          icon: false,
          style: {
            color: "#D83D99",
            fontWeight: "700",
          },
        }
      );
      setInputValue("");
      return;
    }
    if (selectedColors?.includes(color)) {
      toast.error(
        changeLang === "ar"
          ? "تمت إضافة اللون مسبقا!"
          : "You have already added!",
        {
          position: toast?.POSITION?.TOP_RIGHT,
          toastId: "required-value-toast",
          icon: false,
          style: {
            color: "#D83D99",
            fontWeight: "700",
          },
        }
      );
    }
    let colorsArray = selectedColors || [];
    // If "Surprise" is selected, clear all other colors and set only "Surprise"
    if (color === "Surprise") {
      updatedColors = ["Surprise"];
    } else {
      // If any other color is selected, remove "Surprise" if it's in the list
      updatedColors = colorsArray?.includes("Surprise")
        ? colorsArray.filter((item) => item !== "Surprise") // Remove "Surprise"
        : [...colorsArray];

      // Add the selected color if it's not already in the list
      if (!updatedColors?.includes(color)) {
        updatedColors = [...updatedColors, color];
      }
    }

    // Update selected colors
    setSelectedColors(updatedColors);
    setInputValue("");
    // Update formData with the selected colors for the specific questionId
    setFormData((prevFormData) => ({
      ...prevFormData, // Keep existing form data
      [questionId]: updatedColors, // Update the selected colors for this questionId
    }));
  };

  const handleRemoveColor = (color, questionId) => {
    // Remove the color from the selectedColors
    const updatedColors = selectedColors.filter((c) => c !== color);
    setSelectedColors(updatedColors);

    // Update formData to reflect the change for the specific questionId
    setFormData((prevFormData) => ({
      ...prevFormData, // Keep the existing form data
      [questionId]: updatedColors, // Update the colors for this specific questionId
    }));
  };

  const handleInputChange = (e, questionId) => {
    setInputValue(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: e.target.value,
    }));
  };

  const handleButtonClick = (index, questionId, font) => {
    setFormData((prevData) => {
      let updatedFonts;

      if (font === "Surprise") {
        updatedFonts = ["Surprise"];
      } else {
        updatedFonts = prevData[questionId]?.includes("Surprise")
          ? [font]
          : prevData[questionId]?.includes(font)
          ? prevData[questionId].filter((f) => f !== font)
          : [...(prevData[questionId] || []), font];
      }

      return {
        ...prevData,
        [questionId]: updatedFonts,
      };
    });

    setActiveButtons((prevButtons = []) =>
      font === "Surprise"
        ? ["Surprise"]
        : prevButtons?.includes("Surprise")
        ? [font]
        : prevButtons?.includes(font)
        ? prevButtons?.filter((btn) => btn !== font)
        : [...prevButtons, font]
    );
  };

  const handleShadeButtonClick = (color, textColor, type, questionId) => {
    setShadeBackgroundColor(color);
    setshadeColor(textColor);
    setShadeType("");
    if (type === "surprise") {
      setShadeType(type);
      setShadeBackgroundColor("rgb(228, 222, 216)");
    } else {
      setShadeBackgroundColor(color);
    }
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: type === "surprise" ? "surprise" : color,
    }));
  };

  const handleChange = (questionId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: value,
    }));
  };

  const handleTextureChange = (e, questionId, isSurprise = false) => {
    if (isSurprise) {
      // Set "Surprise" as the only selected value and clear all others
      setFormData((prevData) => ({
        ...prevData,
        [questionId]: ["Surprise"],
      }));
      document.querySelectorAll('input[name="13"]').forEach((checkbox) => {
        checkbox.checked = false; // Uncheck all checkboxes with name="13"
      });
    } else {
      const { value, checked } = e.target;

      setFormData((prevData) => {
        const currentSelections = prevData[questionId] || [];

        if (checked) {
          // If a non-Surprise option is selected, clear "Surprise" and add the new value
          return {
            ...prevData,
            [questionId]: [
              ...currentSelections.filter((item) => item !== "Surprise"),
              value,
            ],
          };
        } else {
          // Remove the value if unchecked
          return {
            ...prevData,
            [questionId]: currentSelections.filter((item) => item !== value),
          };
        }
      });
    }
  };

  const uploadFile = async (e, id, field) => {
    if (e.target.files.length) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("file_name", e.target.files[0]?.name);
      const response = await axios.post(
        `${base_url}/api/upload_file/`,
        formData,
        ConfigToken()
      );
      console.log(response.data, "res");
      setUploadContent((prev) => ({
        ...prev,
        [id]: {
          ...prev[id], // Preserve other fields for this ID
          [field]: response.data.file_url, // Update the file or other field
          ...(field === "file" && { filename: e.target.files[0]?.name || "" }), // Update filename if file is changed
        },
      }));
      setFormData((prev) => ({
        ...prev,
        [id]: response.data.file_url,
      }));
    }
  };

  const onBackClick = () => {
    navigate(`/questionnaire/${3}`, {
      state: { questionnaireData3: answers, orderId: location.state?.orderId },
    });
  };

  const onNextClick = () => {
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
    dispatch(questionnaireAction4(formData));
    navigate(`/questionnaire/${5}`, {
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
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
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
        pageNo={4}
        Qlang={changeLang}
        setQLang={setChangeLang}
        storeAnswers={answers}
        orderId={location.state?.orderId}
        onBackClick={onBackClick}
        onNextClick={onNextClick}
        onSaveLaterClick={onSaveLaterClick}
        formData={formData}
        setFormData={setFormData}
        questions={
          <>
            {/* ${question.id == 21 ?'!text-[22px]':''} */}
            {questions?.map((question, index) => (
              <div
                className="questions"
                key={index}
                id={`question_${question.id}`}
              >
                {question.answer_type === "shade" ? (
                  ""
                ) : (
                  <p
                    className={`questions-title  xs:w-[90%] sm:w-full md:w-full mx-auto ${
                      index === 0 ? "mt-[1.5%]" : "mt-[2%]"
                    } `}
                  >
                    {changeLang === "ar"
                      ? question?.question_arabic
                      : question.question}
                    {question.required && (
                      <span>
                        <sup
                          className={`${
                            question.id == 21 ? "!text-[22px]" : ""
                          }`}
                        >
                          *
                        </sup>
                      </span>
                    )}
                  </p>
                )}

                {question.answer_type === "shade" && (
                  <>
                    <div
                      className="shade-background "
                      style={{ backgroundColor: shadeBackgroundColor }}
                    >
                      <p
                        style={{
                          color:
                            shadeBackgroundColor === "rgb(228, 222, 216)"
                              ? ""
                              : "#FFFFFF",
                          width: "100%",
                        }}
                        className={`questions-title mb-3 ${
                          index === 0 ? "mt-[1%]" : "mt-[2%]"
                        }`}
                      >
                        {changeLang === "ar"
                          ? question?.question_arabic
                          : question.question}
                        <span>
                          <sup>*</sup>
                        </span>
                      </p>
                      <div className="shade-buttons">
                        <div className="button-shade-group">
                          <img src={Color1}></img>
                          <button
                            className={
                              shadeBackgroundColor === "rgb(228, 222, 216)" &&
                              shadeType !== "surprise"
                                ? "shade-btn-active"
                                : "shade-btn"
                            }
                            onClick={() =>
                              handleShadeButtonClick(
                                "rgb(228, 222, 216)",
                                "rgb(0, 0, 0)",
                                "",
                                question.id
                              )
                            }
                          >
                            {changeLang === "ar"
                              ? "كلاسيكي وأنيق "
                              : "CLEAN & CLASSIC"}
                          </button>
                        </div>
                        <div className="button-shade-group">
                          <img src={Color2}></img>
                          <button
                            className={
                              shadeBackgroundColor === "rgb(9, 50, 108)" &&
                              shadeType !== "surprise"
                                ? "shade-btn-active"
                                : "shade-btn"
                            }
                            onClick={() =>
                              handleShadeButtonClick(
                                "rgb(9, 50, 108)",
                                "rgb(255, 98, 10)",
                                "",
                                question.id
                              )
                            }
                          >
                            {changeLang === "ar"
                              ? "ألوان متناقضة "
                              : "CONTRASTING COLORS"}
                          </button>
                        </div>
                        <div className="button-shade-group">
                          <img src={Color3}></img>
                          <button
                            className={
                              shadeBackgroundColor === "rgb(255, 124, 124)" &&
                              shadeType !== "surprise"
                                ? "shade-btn-active"
                                : "shade-btn"
                            }
                            onClick={() =>
                              handleShadeButtonClick(
                                "rgb(255, 124, 124)",
                                "rgb(221, 45, 45)",
                                "",
                                question.id
                              )
                            }
                          >
                            {changeLang === "ar"
                              ? "درجات لون واحد"
                              : "ONE COLOR SHADES"}
                          </button>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <p
                          className="shade-bundl-text"
                          style={{ color: shadeColor }}
                        >
                          Bundl
                        </p>
                        <p className="lg:text-[24px] md:text-[18px] xs:text-[14px] leading-1 font-[500] lg:mt-[1%] md:mt-[0%] xs:mt-[1%] mb-[.5rem]">
                          {changeLang === "ar"
                            ? "غير متأكد ؟ لا بأس!"
                            : "Not sure ? It's okay!"}
                        </p>
                        <button
                          className={`lg:mb-[2%] md:mb-[2%] xs:mb-[2%] ${
                            shadeType === "surprise"
                              ? "surprise-active"
                              : "surprise"
                          }`}
                          onClick={() =>
                            handleShadeButtonClick(
                              "rgb(228, 222, 216)",
                              "rgb(0, 0, 0)",
                              "surprise",
                              question.id
                            )
                          }
                        >
                          {changeLang === "ar" ? "فاجأني!" : "surprise me !"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {question.answer_type === "font" && (
                  <>
                    <div className="font-grid">
                      {textStyle?.map((font, index) => {
                        return (
                          <>
                            <div className="font-background">
                              <img
                                className="lg:m-[6%_0_0_0] md:m-[6%_0_0_0] xs:m-[35%_0_0_0] lg:p-0 md:p-0 xs:p-[0_5%]"
                                src={font.img}
                                onClick={() =>
                                  handleButtonClick(
                                    index,
                                    question.id,
                                    font.fontStyle
                                  )
                                }
                              ></img>
                              <button
                                className={`font-buttons ${
                                  activeButtons?.includes(font?.fontStyle)
                                    ? "font-buttons-active"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleButtonClick(
                                    index,
                                    question.id,
                                    font.fontStyle
                                  )
                                }
                              >
                                {changeLang === "ar"
                                  ? font?.fontStyle_arabic
                                  : font?.fontStyle}
                              </button>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <p className="lg:text-[24px] md:text-[18px] xs:text-[14px] leading-1 font-[500] lg:mt-[4%] md:mt-[5%] xs:mt-[8%] xs:mb-[.5rem]">
                      {changeLang === "ar"
                        ? "غير متأكد ؟ لا بأس!"
                        : "Not sure ? It's okay!"}
                    </p>
                    <button
                      className={`${
                        activeButtons?.includes("Surprise")
                          ? "surprise-active"
                          : "surprise"
                      }`}
                      onClick={() =>
                        handleButtonClick("", question.id, "Surprise")
                      }
                    >
                      {changeLang === "ar" ? "فاجأني!" : "surprise me !"}
                    </button>
                  </>
                )}
                {question.answer_type === "color" && (
                  <>
                    <div
                      className="color-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(9, 1fr)",
                        margin: "2% 0 0 0",
                        padding: "0% 10%",
                        columnGap: columnGap,
                      }}
                    >
                      {displayedColors?.map((color, index) => {
                        const isTopRow = index < 9;
                        const isBottomRow = index >= displayedColors.length - 9;

                        const borderRadiusStyle = {
                          borderTopLeftRadius: isTopRow ? "8px" : "0", // Top-left corner
                          borderTopRightRadius: isTopRow ? "8px" : "0", // Top-right corner
                          borderBottomLeftRadius: isBottomRow ? "8px" : "0", // Bottom-left corner
                          borderBottomRightRadius: isBottomRow ? "8px" : "0", // Bottom-right corner
                        };

                        return (
                          <div
                            key={index}
                            className={`specific-color ${
                              selectedColors?.includes(color)
                                ? "border-[1px] border-black"
                                : ""
                            }`}
                            style={{
                              backgroundColor: `${colorCodes[index]}`,
                              ...borderRadiusStyle,
                            }}
                            onClick={() => handleColorClick(color, question.id)}
                          ></div>
                        );
                      })}
                    </div>
                    <div
                      className="selected-colors"
                      style={{
                        display: "flex",
                        gap: window?.innerWidth <= 475 ? "5px" : "10px",
                        marginTop: "20px",
                        flexWrap: "wrap",
                        width: window?.innerWidth <= 475 ? "100%" : "75%",
                        height: "40px",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "inherit",
                      }}
                    >
                      {selectedColors?.[0] === "Surprise"
                        ? ""
                        : selectedColors?.map((color, index) => (
                            <div
                              key={index}
                              className="selected-color"
                              style={{
                                backgroundColor: color,
                                width: "120px",
                                height: "30px",
                                border: "1px solid #000000",
                              }}
                            >
                              <span
                                style={{
                                  // margin: '-5% 1% 0 0',
                                  float: "right",
                                  cursor: "pointer",
                                }}
                              >
                                <img
                                  src={X}
                                  alt="X-icon"
                                  onClick={() =>
                                    handleRemoveColor(color, question.id)
                                  }
                                ></img>
                              </span>
                            </div>
                          ))}
                    </div>
                    <div
                      className="color-input"
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                        position: "relative",
                      }}
                    >
                      <p className="enter-colors">
                        {changeLang === "ar"
                          ? "او اكتب الكود الخاص للألوان اللي تفضل نستخدمها للهوية"
                          : "OR enter the hex code of colours you want."}
                      </p>
                      <div className="flex justify-center items-center">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={handleInputChange}
                          placeholder="ex: #E1483D"
                          style={{
                            padding: "8px",
                            border: "1px solid #000",
                            outline: "none",
                            width: window.innerWidth <= 441 ? "250px" : "400px",
                            height: "44.5px",
                            borderRadius: "0px",
                          }}
                        />
                        <button
                          onClick={() =>
                            handleColorClick(inputValue, question.id)
                          }
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#000000",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            margin:
                              window.innerWidth <= 441
                                ? "0 0 0 -18%"
                                : "0 0px 0px -12%",
                          }}
                        >
                          <AddCircleRoundedIcon
                            onClick={() =>
                              handleColorClick(inputValue, question.id)
                            }
                          />
                        </button>
                      </div>
                      <p className="lg:text-[24px] md:text-[18px] xs:text-[14px] leading-1 font-[500] mb-0 lg:mt-[8%] md:mt-[7%] xs:mt-[8%]">
                        {changeLang === "ar"
                          ? "غير متأكد ؟ لا بأس!"
                          : "Not sure ? It's okay!"}
                      </p>
                      <button
                        className={`${
                          selectedColors?.includes("Surprise")
                            ? "surprise-active"
                            : "surprise"
                        }`}
                        onClick={() =>
                          handleColorClick("Surprise", question.id)
                        }
                      >
                        {changeLang === "ar" ? "فاجأني!" : "surprise me !"}
                      </button>
                    </div>
                  </>
                )}
                {question.answer_type === "texture" && (
                  <>
                    <div className="form-group lg:w-[75%] md:w-[100%]">
                      <span className="font-error valid-error text-purple"></span>

                      <ul
                        style={
                          window?.innerWidth <= 500
                            ? {
                                display: "grid",
                                gridTemplateColumns: "repeat(3,1fr)",
                              }
                            : {}
                        }
                        className={
                          window?.innerWidth <= 500
                            ? "checkbox-btn-img"
                            : `h-list select-btns grid-view padding-top-20 checkbox-btn-img h-list-check`
                        }
                      >
                        <li className="checkbox checkbox-btn">
                          <input
                            type="checkbox"
                            name="13"
                            checked={
                              formData?.[20]?.includes("patterns")
                                ? true
                                : false
                            }
                            value="patterns"
                            id="patterns"
                            className="validThis"
                            onChange={(e) =>
                              handleTextureChange(e, question.id)
                            }
                          ></input>
                          <label for="patterns">
                            <figure className="image-container img-animation">
                              {textureImages1?.map((images) => {
                                return (
                                  <img
                                    className={
                                      window?.innerWidth >= 475
                                        ? "!object-none"
                                        : ""
                                    }
                                    src={images}
                                    alt="Clean"
                                  ></img>
                                );
                              })}
                            </figure>
                            <span className="button-text">
                              {changeLang === "ar" ? "انماط" : "Patterns"}
                            </span>
                          </label>
                        </li>
                        <li className="checkbox checkbox-btn">
                          <ul className="valid-error text-purple"></ul>
                          <input
                            type="checkbox"
                            name="13"
                            checked={
                              formData?.[20]?.includes("textures")
                                ? true
                                : false
                            }
                            value="textures"
                            id="textures"
                            onChange={(e) =>
                              handleTextureChange(e, question.id)
                            }
                          ></input>
                          <label for="textures">
                            <figure className="image-container img-animation">
                              {textureImages2?.map((images) => {
                                return (
                                  <img
                                    className={
                                      window?.innerWidth >= 475
                                        ? "!object-none"
                                        : ""
                                    }
                                    src={images}
                                    alt="Clean"
                                  ></img>
                                );
                              })}
                            </figure>
                            <span className="button-text">
                              {changeLang === "ar" ? "خلفيات" : "Textures"}
                            </span>
                          </label>
                        </li>
                        <li className="checkbox checkbox-btn">
                          <ul className="valid-error text-purple"></ul>
                          <input
                            type="checkbox"
                            name="13"
                            checked={
                              formData?.[20]?.includes("collages")
                                ? true
                                : false
                            }
                            value="collages"
                            id="collages"
                            onChange={(e) =>
                              handleTextureChange(e, question.id)
                            }
                          ></input>
                          <label for="collages">
                            <figure className="image-container img-animation">
                              {textureImages3?.map((images) => {
                                return (
                                  <img
                                    className={
                                      window?.innerWidth >= 475
                                        ? "!object-none"
                                        : ""
                                    }
                                    src={images}
                                    alt="Clean"
                                  ></img>
                                );
                              })}
                            </figure>
                            <span className="button-text">
                              {changeLang === "ar" ? "كولاج " : " Collages"}
                            </span>
                          </label>
                        </li>
                        <li className="checkbox checkbox-btn">
                          <ul className="valid-error text-purple"></ul>
                          <input
                            type="checkbox"
                            name="13"
                            checked={
                              formData?.[20]?.includes("cleanvisual")
                                ? true
                                : false
                            }
                            value="cleanvisual"
                            id="cleanvisual"
                            onChange={(e) =>
                              handleTextureChange(e, question.id)
                            }
                          ></input>
                          <label for="cleanvisual">
                            <figure className="image-container img-animation">
                              {textureImages4?.map((images) => {
                                return (
                                  <img
                                    className={
                                      window?.innerWidth >= 475
                                        ? "!object-none"
                                        : ""
                                    }
                                    src={images}
                                    alt="Clean"
                                  ></img>
                                );
                              })}
                            </figure>
                            <span className="button-text">
                              {changeLang === "ar" ? "بسيط" : "Clean"}
                            </span>
                          </label>
                        </li>
                        <li className="checkbox checkbox-btn">
                          <ul className="valid-error text-purple"></ul>
                          <input
                            type="checkbox"
                            name="13"
                            checked={
                              formData?.[20]?.includes("illustrations")
                                ? true
                                : false
                            }
                            value="illustrations"
                            id="illustrations"
                            onChange={(e) =>
                              handleTextureChange(e, question.id)
                            }
                          ></input>
                          <label for="illustrations">
                            <figure className="image-container img-animation">
                              {textureImages5?.map((images) => {
                                return (
                                  <img
                                    className={
                                      window?.innerWidth >= 475
                                        ? "!object-none"
                                        : ""
                                    }
                                    src={images}
                                    alt="Clean"
                                  ></img>
                                );
                              })}
                            </figure>
                            <span className="button-text">
                              {changeLang === "ar" ? "رسومات" : "Illustrations"}
                            </span>
                          </label>
                        </li>
                        <li className="checkbox checkbox-btn">
                          <ul className="valid-error text-purple"></ul>
                          <input
                            type="checkbox"
                            name="13"
                            checked={
                              formData?.[20]?.includes("frames") ? true : false
                            }
                            value="frames"
                            id="frames"
                            onChange={(e) =>
                              handleTextureChange(e, question.id)
                            }
                          ></input>
                          <label for="frames">
                            <figure className="image-container img-animation">
                              {textureImages6?.map((images) => {
                                return (
                                  <img
                                    className={
                                      window?.innerWidth >= 475
                                        ? "!object-none"
                                        : ""
                                    }
                                    src={images}
                                    alt="Clean"
                                  ></img>
                                );
                              })}
                            </figure>
                            <span className="button-text">
                              {changeLang === "ar" ? "إطارات" : "Frames"}
                            </span>
                          </label>
                        </li>
                      </ul>
                      <p className="lg:text-[24px] md:text-[18px] xs:text-[14px] leading-1 font-[500] lg:mt-[2%] md:mt-[1%] xs:mt-[8%] xs:mb-[.5rem] ">
                        {changeLang === "ar"
                          ? "غير متأكد ؟ لا بأس!"
                          : "Not sure ? It's okay!"}
                      </p>
                      <button
                        className={`${
                          formData[question.id]?.includes("Surprise")
                            ? "surprise-active"
                            : "surprise"
                        }`}
                        onClick={() =>
                          handleTextureChange(null, question.id, true)
                        }
                      >
                        {changeLang === "ar" ? "فاجأني!" : "surprise me !"}
                      </button>
                    </div>
                  </>
                )}
                {question.id === 21 ? (
                  <>
                    <div
                      className={`${
                        window?.innerWidth <= 500 ? "flex-col" : "flex-row"
                      } gap-[20px] flex w-full justify-center items-center`}
                    >
                      <div
                        className="color-input"
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "10px",
                          position: "relative",
                          height: "65px",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Links"
                          value={getAnswerValue(question.id)}
                          onChange={(e) =>
                            handleChange(question.id, e.target.value)
                          }
                          style={{
                            padding: "8px",
                            border: "1px solid #000",
                            outline: "none",
                            width: window.innerWidth <= 441 ? "250px" : "300px",
                            borderRadius: "0px",
                          }}
                        />
                        <button
                          // onClick={handleAddColor}
                          style={{
                            padding:
                              window.innerWidth <= 441 ? "0" : "8px 16px",
                            backgroundColor: "transparent",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            margin:
                              window.innerWidth <= 441
                                ? changeLang === "ar"
                                  ? "-45px 80% 0px 0%"
                                  : "-45px 0px 0px 80%"
                                : changeLang === "ar"
                                ? "-55px 80% 0px 0%"
                                : "-55px 0px 0px 80%",
                          }}
                        >
                          <img src={Link}></img>
                        </button>
                      </div>
                      <>
                        <p
                          className={`border-1  h-[45px] lg:text-[18px] md:text-[18px] xs:text-[14px] uppercase
                            ${
                              window?.innerWidth <= 500
                                ? "w-[61%]"
                                : "w-[300px]"
                            } 
                          !border-[#000000] flex items-center justify-center text-[#000000] cursor-pointer lg:ml-2 lg:mt-4  md:ml-2 md:mt-4  xs:ml-0 xs:mt-0 p-[5px]`}
                          onClick={() =>
                            document
                              .getElementById(`file-${question.id}`)
                              .click()
                          }
                        >
                          <input
                            type="file"
                            hidden
                            name="file"
                            id={`file-${question.id}`} // Use a unique ID for each input
                            onChange={(e) => uploadFile(e, question.id, "file")}
                            className=""
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
                      </>
                    </div>
                    {uploadContent?.[question?.id]?.filename}
                  </>
                ) : (
                  ""
                )}
                {question.id === 15 || question.id === 16 ? (
                  <input
                    placeholder={
                      changeLang === ""
                        ? placeHolders_arabic[index]
                        : placeHolders[index]
                    }
                    value={
                      question.id === 21 ? "" : getAnswerValue(question.id)
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
                ) : (
                  <div
                    className={`w-[100%] xl:h-[2px] lg:h-[2px] md:h-[2px] sm:h-[2px] xs:h-[1px] ${
                      isFilled === question?.id ? "bg-[#D83D99]" : "bg-black"
                    } mt-[3%]`}
                  ></div>
                )}
              </div>
            ))}
          </>
        }
        bgTitle={changeLang === "ar" ? "هويتك البصرية" : "Your visual identity"}
      />
    </div>
  );
};
