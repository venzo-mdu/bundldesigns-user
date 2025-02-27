import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { Questionnaire } from './Questionnaire';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigToken } from '../Auth/ConfigToken';
import { questionnaireAction5, questionnaireAnswers } from '../../Redux/Action';
import { ToastContainer, toast } from 'react-toastify';

export const Questionnaire5 = ({formData,setFormData}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentAnswer = useSelector((state) => state.questionnaire5)
  const answers1 = useSelector((state) => state.questionnaire1);
  const answers2 = useSelector((state) => state.questionnaire2);
  const answers3 = useSelector((state) => state.questionnaire3);
  const answers4 = useSelector((state) => state.questionnaire4);
  const [questions, setQuestions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [fetchQ5Answers, setFetchQ5Answers] = useState([]);

  const placeHolders = [
    "",
    "insert the link below or send it to our email info@bundldesigns.com",
    ""
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${base_url}/api/content?section=brand_questions&page=5`);
        const questionsData = response.data.map((question, index) => ({
          ...question,
          placeholder: placeHolders[index],
        }));
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    const fetchAnswers = async () => {
      try {
        if(location.state.orderId != undefined){
        const response = await axios.get(`${base_url}/api/questionnaire/update/${location.state.orderId}`, ConfigToken());
        setFetchQ5Answers(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    setFormData(currentAnswer)
    fetchQuestions();
    setSelectedLanguage(currentAnswer?.[24] ?currentAnswer[24]:null)
    fetchAnswers();
  }, []);
  console.log(formData,'form')

  const getAnswerValue = (questionId) => {

    const formValue = formData?.[questionId];
    if (formValue !== undefined) {
      return formValue;
    }

    const fetchedAnswer = fetchQ5Answers.find((answer) => answer.question_id === questionId)?.answer;
    if (fetchedAnswer !== undefined && formValue === undefined) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [questionId]: fetchedAnswer,
      }));
    }
    return fetchedAnswer ?? '';
  };

  const showToastMessage = () => {
    toast.error("The Value is required!", {
      position: toast?.POSITION?.TOP_RIGHT,
    });
  };

  const validateFields = () => {
    // Filter required questions that are either unanswered or contain invalid values
    const unansweredRequiredQuestions = questions.filter((q) => {
      return (
        q.required && // Check if the question is marked as required
        (!formData?.[q.id] || formData?.[q.id].trim() === "") // Check if there's no answer or only whitespace
      );
    });


    if (unansweredRequiredQuestions.length > 0) {
      showToastMessage(); // Display the error toast
      return false;
    }

    if((answers1 || answers2 || answers3 ||answers4) === null || undefined || {} || [] ){
      toast.error("You should fill all the mandatory fields", {
        position: toast?.POSITION?.TOP_RIGHT,
        style: { width: "400px",margin:'0 0 0 -25%' },
      });
    }

    return true; // All required fields are valid
  };

  const handleChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLanguageChange = (language, questionId) => {
    setSelectedLanguage(language);
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: language
    }))
  };


  const onBackClick = () => {
    navigate(`/questionnaire/${4}`, { state: { questionnaireData4: answers4,orderId:location.state?.orderId } });
  };
console.log(location.state?.orderId,'orderid')
  const FinishClick = async () => {
    if (!validateFields()) {
      return;
    }
    try {
      let finalFormData = {
        answers: {
          ...answers1,
          ...answers2,
          ...answers3,
          ...answers4,
          ...formData,
        },
        status: 'submit',
        orderId: location.state?.orderId
      };
      const response = await axios.post(
        `${base_url}/api/questionnaire/create`,
        finalFormData,
        ConfigToken()
      );
      dispatch(questionnaireAnswers(finalFormData));
      navigate("/thankyou");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const onSaveLaterClick = async () => {
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
    try {
      let data = {
        formData,
        status: 'not submitted',
        orderId: location.state.orderId
      };
      const response = await axios.post(
        `${base_url}/api/questionnaire/create`,
        data,
        ConfigToken()
      );
      dispatch(questionnaireAction5(formData))
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }




  return (
    <div>
      <ToastContainer />
      <Questionnaire
        pageNo={5}
        storeAnswers={answers4}
        orderId={location.state?.orderId}
        onBackClick={onBackClick}
        onNextClick={FinishClick}
        onSaveLaterClick={onSaveLaterClick}
        formData={formData}
        setFormData={setFormData}
        questions={questions.map((question,index) => (
          <div className="questions" key={question.id}>
            <p className={`questions-title  xs:w-[70%] sm:w-full md:w-full mx-auto ${index === 0 ? 'mt-[1%]' : 'mt-[4%]'}`}>
              {question.question}
              {question.required && (
                <span>
                  <sup>*</sup>
                </span>
              )}
            </p>
            {question.id === 24 && (
              <div className="flex items-center justify-center gap-[20px] mt-2">
                <div>
                  <button
                    onClick={() => handleLanguageChange("Arabic", question.id)}
                    className={`uppercase font-[18px] h-[45px] w-[150px] border-[1px] border-solid border-[#000000] ${selectedLanguage === "Arabic" ? "bg-[#000000] text-[#FFFFFF]" : "hover:bg-[#000000] hover:text-[#FFFFFF]"
                      }`}
                  >
                    Arabic
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleLanguageChange("English", question.id)}
                    className={`uppercase font-[18px] h-[45px] w-[150px] border-[1px] border-solid border-[#000000] ${selectedLanguage === "English" ? "bg-[#000000] text-[#FFFFFF]" : "hover:bg-[#000000] hover:text-[#FFFFFF]"
                      }`}
                  >
                    English
                  </button>
                </div>
                
              </div>
            )}

            {
              (question.id === 24) ?
                (
                  <div className="w-[100%] xl:h-[2px] lg:h-[2px] md:h-[2px] sm:h-[2px] xs:h-[1px]  bg-black mt-[3%]"></div>
                ) :
                (
                  <input
                    placeholder={question.placeholder}
                    className="question-input"
                    value={getAnswerValue(question.id)}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                )
            }

          </div>
        ))}
        bgTitle={'Final Thoughts'}
      />
    </div>
  );
};
