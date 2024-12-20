import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { Questionnaire } from './Questionnaire';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { questionnaireAction3 } from '../../Redux/Action';
import { ConfigToken } from "../Auth/ConfigToken"
import { ToastContainer, toast } from 'react-toastify';

export const Questionnaire3 = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const answers = useSelector((state) => state.questionnaire2);
  const [questions, setQuestions] = useState([]);
  const [sliderValues, setSliderValues] = useState({});
  const [formData, setFormData] = useState(location.state?.questionnaireData3?.formData);
  const [fetchQ3Answers, setFetchQ3Answers] = useState([]);

  const progressLabels = [
    { left: "Masculine", right: "Feminine" },
    { left: "Economical", right: "Luxurious" },
    { left: "Playful", right: "Sophisticated" },
    { left: "Classics", right: "Modern" },
    { left: "Mature", right: "Youthful" },
    { left: "Formal", right: "Casual" },
  ];

  const placeHolders = [
    "",
    "BUNDL",
    "(ex: was always passionate about creating my own perfume business)",
  ]

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
        const response = await axios.get(`${base_url}/api/questionnaire/update/${location.state.orderId}`, ConfigToken());
        setFetchQ3Answers(response.data.data)
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
    fetchAnswers();
  }, []);

  const getAnswerValue = (questionId) => {

    const formValue = formData?.[questionId];
    if (formValue !== undefined) {
      return formValue;
    }

    const fetchedAnswer = fetchQ3Answers.find((answer) => answer.question_id === questionId)?.answer;
    if (fetchedAnswer !== undefined && formValue === undefined) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [questionId]: fetchedAnswer,
      }));
    }
    return fetchedAnswer ?? '';
  };

  const handleSliderChange = (index, value, questionId) => {
    const key = progressLabels[index] && value < 50 ? progressLabels[index].left : progressLabels[index].right;

    setSliderValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));

    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [questionId]: sliderValues
    // }));
  };

  console.log(sliderValues, "values")
  const handleChange = (questionId, value) => {
    setFormData((formValues) => ({
      ...formValues,
      [questionId]: value,
    }));
  }

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

    return true; // All required fields are valid
  };
  const onBackClick = () => {
    navigate(`/questionnaire/${2}`, { state: { questionnaireData2: answers } });
  }
  const onNextClick = () => {
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
    dispatch(questionnaireAction3(formData))
    navigate(`/questionnaire/${4}`, {
      state: {
        orderId: location.state?.orderId
      }
    });
  }

  const onSaveLaterClick = async () => {
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
    let data = {
      answers: formData,
      orderId: location.state?.orderId,
      status: 'not submitted'
    }
    try {
      const response = await axios.post(`${base_url}/api/questionnaire/create`, data, ConfigToken());
      if (response.status === 200) {
        navigate('/dashboard', {
          state: {
            orderId: location.state?.orderId
          }
        })
      }
    }
    catch (e) {
      console.log(e)
    }
  }


  return (
    <div>
      <ToastContainer />
      <Questionnaire
        pageNo={3}
        storeAnswers={answers}
        orderId={location.state?.orderId}
        onBackClick={onBackClick}
        onNextClick={onNextClick}
        onSaveLaterClick={onSaveLaterClick}
        questions={
          questions.map((question, index) => (
            <div className="questions" key={index}>
              <p className="questions-title">
                {question.question}
                {
                  question.required && (
                    <span><sup>*</sup></span>
                  )
                }
              </p>
              {
                question.answer_type === 'bar' ? '' :
                  <input value={getAnswerValue(question.id)} placeholder={placeHolders[index]} className="question-input" onChange={(e) => handleChange(question.id, e.target.value)} />
              }
              <div className=' flex items-center justify-center flex-col w-[100%] md:w-[100% xl:w-[100%] lg:w-[100%] mt-[3%]'>
                {/* {question.answer_type === 'bar' && (
                  progressLabels.map((data, index) => {
                    console.log(sliderValues[data?.left]  ,"&", sliderValues[data?.right] )
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                          className='progress-section-q3'
                        >
                          <p className="progress-text" style={{ textAlign: 'left' }}>{data?.left}</p>
                          <input
                            type="range"
                            // value={sliderValues[data?.left || data?.right] || 50}
                            value={sliderValues[data?.left] < 50 ? sliderValues[data?.left] : sliderValues[data?.right] > 50 ? sliderValues[data?.right]:''}
                            className="question-progress"
                            min={0}
                            max={100}
                            // value={sliderValues[index] || 50}
                            onChange={(e) => handleSliderChange(index, e.target.value, question.id)}
                          />
                          
                          <p className="progress-text" style={{ textAlign: 'right' }}>{data?.right}</p>
                        </div>
                      </>
                    )

                  })

                )} */}


                {question.answer_type === 'bar' && (
                  progressLabels.map((data, index) => {
                    const sliderValue = sliderValues[data?.right] || 50; 
                    const leftValue =100 - sliderValue;
                    const rightValue =sliderValue;

                    const handleSliderChange = (newValue, id) => {
                      const adjustedValue = parseInt(newValue, 10);

                      setSliderValues({
                        ...sliderValues,
                        [data?.left]:100 - adjustedValue, 
                        [data?.right]: adjustedValue, 
                      });
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        [id]: sliderValues
                      }));
                    };

                    const leftTextStyle = {
                      textAlign: "left",
                      fontSize: leftValue > rightValue ? "18px" : "14px", 
                    };
                
                    const rightTextStyle = {
                      textAlign: "right",
                      fontSize: rightValue > leftValue ? "18px" : "14px", 
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
                          onChange={(e) => handleSliderChange(e.target.value, question.id)}
                        />
                        <p className="progress-text" style={rightTextStyle}>
                          {data?.right}
                        </p>
                      </div>
                    );
                  })
                )}

                {
                  question.answer_type === 'bar' && (
                    <div className="w-[100%] xl:h-[2px] lg:h-[2px] md:h-[2px] sm:h-[2px] xs:h-[1px] bg-black mt-[3%]"></div>
                  )
                }
              </div>

            </div>
          ))
        }
        bgTitle={"YOUR project BRANDING"}
      />
    </div>
  );
};
