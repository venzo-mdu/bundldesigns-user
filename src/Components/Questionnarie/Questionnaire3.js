import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { Questionnaire } from './Questionnaire';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { questionnaireAction3 } from '../../Redux/Action';
import { ConfigToken } from "../Auth/ConfigToken"

export const Questionnaire3 = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const answers = useSelector((state) => state.questionnaire2);
  const [questions, setQuestions] = useState([]);
  const [sliderValues, setSliderValues] = useState({});
  const [formData, setFormData] = useState(location.state?.questionnaireData3?.formData);

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
    fetchQuestions();
  }, []);

  // const handleSliderChange = (index, value) => {
  //   setSliderValues((prevValues) => {
  //     const newSliderValues = { ...prevValues, [index]: value };

  //     // Update the formData with the new slider value
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [`slider-${index}`]: value, // Store the slider value in formData with the question ID as a key
  //     }));

  //     return newSliderValues;
  //   });
  // };

  const handleSliderChange = (index, value, questionId) => {
    const key = progressLabels[index] && value < 50 ? progressLabels[index].left : progressLabels[index].right;

    setSliderValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      [questionId]: sliderValues
    }));
  };



  const handleChange = (questionId, value) => {
    setFormData((formValues) => ({
      ...formValues,
      [questionId]: value,
    }));
  }
  const onBackClick = () => {
    navigate(`/questionnaire/${2}`, { state: { questionnaireData2: answers } });
  }
  const onNextClick = () => {
    let dataQ3 = {
      sliderValues: sliderValues,
      formData: formData
    }
    dispatch(questionnaireAction3(dataQ3))
    navigate(`/questionnaire/${4}`);
  }

  const onSaveLaterClick = async () => {
    let data = {
      answers: formData,
      orderId: 16,
      status: 'not submitted'
    }
    try {
      const response = await axios.post(`${base_url}/api/questionnaire/create`, data, ConfigToken());
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Questionnaire
        pageNo={3}
        storeAnswers={answers}
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
                  <input value={formData?.[question.id]} placeholder={placeHolders[index]} className="question-input" onChange={(e) => handleChange(question.id, e.target.value)} />
              }
              <div className=' flex items-center justify-center flex-col w-[100%] md:w-[100% xl:w-[100%] lg:w-[100%]'>
                {question.answer_type === 'bar' && (
                  progressLabels.map((data, index) => {
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
                            value={sliderValues[data?.left] < 50 ? sliderValues[data?.left] : sliderValues[data?.right]}
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

                )}
                {
                  question.answer_type === 'bar' && (
                    <div style={{ borderBottom: '1px solid #000000', width: '100%', margin: '2% 0 0 0' }}></div>
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
