import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { Questionnaire } from './Questionnaire';
import { useDispatch, useSelector } from 'react-redux';
import { questionnaireAction4 } from '../../Redux/Action'
import { colorCodes } from '../../json/QuestionnaireColorCodes';
import { textStyle } from '../../json/QuestionnaireColorCodes';
import { textureImages1 } from '../../json/QuestionnaireColorCodes';
import { textureImages2 } from '../../json/QuestionnaireColorCodes';
import { textureImages3 } from '../../json/QuestionnaireColorCodes';
import { textureImages4 } from '../../json/QuestionnaireColorCodes';
import { textureImages5 } from '../../json/QuestionnaireColorCodes';
import { textureImages6 } from '../../json/QuestionnaireColorCodes';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import X from '../../Images/Questionnaire/x icon.png'
import Color1 from '../../Images/Questionnaire/img1.png'
import Color2 from '../../Images/Questionnaire/img2.png'
import Color3 from '../../Images/Questionnaire/img3.png'
import Link from '../../Images/Questionnaire/icons8-link-26.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfigToken } from '../Auth/ConfigToken';
import { ToastContainer, toast } from 'react-toastify';

export const Questionnaire4 = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.questionnaire3);

  const [questions, setQuestions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]); // To store selected color codes
  const [inputValue, setInputValue] = useState(''); // For input field
  const [activeButtons, setActiveButtons] = useState([]);
  const [shadeBackgroundColor, setShadeBackgroundColor] = useState('rgb(228, 222, 216)');
  const [shadeColor, setshadeColor] = useState('rgb(0, 0, 0)');
  const [shadeType, setShadeType] = useState('');
  const [formData, setFormData] = useState({});
  const [fetchQ4Answers, setFetchQ4Answers] = useState([]);

  const placeHolders = [
    "BUNDL",
    "(ex: Luxury shopping made easy)",
  ]

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${base_url}/api/content?section=brand_questions&page=4`);

        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };


    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`${base_url}/api/questionnaire/update/${location.state.orderId}`, ConfigToken());
        setFetchQ4Answers(response.data.data)
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
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

    const fetchedAnswer = fetchQ4Answers.find((answer) => answer.question_id === questionId)?.answer;
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
    // Filter required questions that are either unanswered or contain invalid data
    const unansweredRequiredQuestions = questions.filter((q) => {
      const answer = formData?.[q.id];
      if (!q.required) {
        return false;
      }

      return !answer || answer.toString().trim() === "";
    });


    if (unansweredRequiredQuestions.length > 0) {
      showToastMessage(); // Display the error toast
      return false;
    }

    return true; // All required fields are valid
  };


  const handleColorClick = (color, questionId) => {
    let updatedColors;

    // Add the color if not already selected
    if (!selectedColors.includes(color)) {
      updatedColors = [...selectedColors, color];
      setSelectedColors(updatedColors);
    } else {
      updatedColors = selectedColors;
    }

    // Update formData with the selected colors for the specific questionId
    setFormData((prevFormData) => ({
      ...prevFormData, // Keep existing form data
      [questionId]: updatedColors, // Update the selected colors for this questionId
    }));
  };



  // const handleRemoveColor = (color) => {
  //   setSelectedColors(selectedColors.filter((c) => c !== color));
  // };

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
      [questionId]: e.target.value
    }))
  };

  const handleAddColor = () => {
    if (colorCodes.includes(inputValue) && !selectedColors.includes(inputValue)) {
      setSelectedColors([...selectedColors, inputValue]);
      setInputValue('');
    }
    else {
      setSelectedColors([...selectedColors, inputValue]);
      setInputValue('');
    }
  };


  const handleButtonClick = (index, questionId, font) => {
    // Determine the new active buttons array
    const updatedActiveButtons = activeButtons.includes(font)
      ? activeButtons.filter((i) => i !== font) // Remove index if already selected
      : [...activeButtons, font]; // Add index if not selected

    // Update the state for active buttons
    setActiveButtons(updatedActiveButtons);

    // Update the form data with the new value for the selected question
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: updatedActiveButtons,
    }));
  };


  const handleShadeButtonClick = (color, textColor, type, questionId) => {
    setShadeBackgroundColor(color);
    setshadeColor(textColor);
    setShadeType('');
    if (type === 'surprise') {
      setShadeType(type)
    }
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: shadeBackgroundColor
    }))
  };

  const handleChange = (questionId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: value
    }))
  }

  const handleTextureChange = (e, questionId) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      // Get the current selections for this questionId or initialize to an empty array
      const currentSelections = prevData[questionId] || [];

      if (checked) {
        // Add the selected value if checked
        return {
          ...prevData,
          [questionId]: [...currentSelections, value],
        };
      } else {
        // Remove the value if unchecked
        return {
          ...prevData,
          [questionId]: currentSelections.filter((item) => item !== value),
        };
      }
    });
  };


  const onBackClick = () => {
    navigate(`/questionnaire/${3}`, { state: { questionnaireData3: answers } });
  }

  const onNextClick = () => {
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
    dispatch(questionnaireAction4(formData))
    navigate(`/questionnaire/${5}`, {
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
        pageNo={4}
        storeAnswers={answers}
        orderId={location.state?.orderId}
        onBackClick={onBackClick}
        onNextClick={onNextClick}
        onSaveLaterClick={onSaveLaterClick}
        questions={
          <>
            {questions.map((question, index) => (
              <div className="questions" key={index}>
                {
                  question.answer_type === 'shade' ? '' :
                    <p className="questions-title">
                      {question.question}
                      {
                        question.required && (
                          <span><sup>*</sup></span>
                        )
                      }
                    </p>
                }

                {
                  question.answer_type === 'shade' && (
                    <>

                      <div className='shade-background py-5' style={{ backgroundColor: shadeBackgroundColor }}>
                        <p style={{ color: shadeBackgroundColor === 'rgb(228, 222, 216)' ? '' : '#FFFFFF',width:'100%' }} className="questions-title mb-3">
                          {question.question}
                          <span>
                            <sup>*</sup>
                          </span>
                        </p>
                        <div className='shade-buttons'>
                          <div className='button-shade-group'>
                            <img src={Color1}></img>
                            <button className={shadeBackgroundColor === 'rgb(228, 222, 216)' && shadeType !== 'surprise' ? 'shade-btn-active' : 'shade-btn'} onClick={() => handleShadeButtonClick('rgb(228, 222, 216)', 'rgb(0, 0, 0)', '', question.id)}>CLEAN & CLASSIC</button>
                          </div>
                          <div className='button-shade-group'>
                            <img src={Color2}></img>
                            <button className={shadeBackgroundColor === 'rgb(9, 50, 108)' && shadeType !== 'surprise' ? 'shade-btn-active' : 'shade-btn'} onClick={() => handleShadeButtonClick('rgb(9, 50, 108)', 'rgb(255, 98, 10)', '', question.id)}>CONTRASTING COLORS</button>
                          </div>
                          <div className='button-shade-group'>
                            <img src={Color3}></img>
                            <button className={shadeBackgroundColor === 'rgb(221, 45, 45)' && shadeType !== 'surprise' ? 'shade-btn-active' : 'shade-btn'} onClick={() => handleShadeButtonClick('rgb(221, 45, 45)', 'rgb(255, 136, 136)', '', question.id)}>ONE COLOR SHADES</button>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                          <p className='shade-bundl-text' style={{ color: shadeColor }}>Bundl</p>
                          <b><p className='not-sure'>Not sure ? It’s okay!</p></b>
                          <button className={shadeType === 'surprise' ? 'surprise-active' : 'surprise'} onClick={() => handleShadeButtonClick('rgb(228, 222, 216)', 'rgb(0, 0, 0)', 'surprise', question.id)}>surprise me !</button>
                        </div>
                      </div>
                    </>
                  )
                }
                {
                  question.answer_type === 'font' && (
                    <>
                      <div
                        className='font-grid'
                      >
                        {
                          textStyle.map((font, index) => {
                            return (
                              <>
                                <div className='font-background'>
                                  <img style={{ margin: '6% 0 0% 0' }} src={font.img}></img>
                                  <button className={`font-buttons ${activeButtons.includes(font.fontStyle) ? 'font-buttons-active' : ''
                                    }`} onClick={() => handleButtonClick(index, question.id, font.fontStyle)}>{font.fontStyle}</button>
                                </div>
                              </>
                            )
                          })
                        }
                      </div>
                      <figure className='mt-[5%]'>
                        <b><i className='text-[28px]'>Not sure ? It's okay!</i></b>
                      </figure>
                      <button className='surprise'>surprise me !</button>
                    </>
                  )
                }
                {
                  question.answer_type === 'color' && (
                    <>
                      <div
                        className="color-grid"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(9, 1fr)',
                          margin: '2% 0 0 0',
                          padding: '0% 10%',
                          columnGap: '10px'
                        }}
                      >
                        {/* {displayedColors.map((color, index) => (
                <div
                  key={index}
                  className="specific-color"
                  style={{ backgroundColor: `${colorCodes[index]}` }}
                  onClick={() => handleColorClick(color)}
                ></div>
              ))} */}
                        {displayedColors.map((color, index) => {

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
                              className="specific-color"
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
                          display: 'flex',
                          gap: '10px',
                          marginTop: '20px',
                          flexWrap: 'wrap',
                          width: '100%',
                          height: '40px',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 'inherit'
                        }}
                      >
                        {selectedColors.map((color, index) => (
                          <div
                            key={index}
                            className="selected-color"
                            style={{
                              backgroundColor: color,
                              width: '120px',
                              height: '30px',
                              border: '1px solid #000000',
                            }}
                          >
                            <span
                              style={{
                                // margin: '-5% 1% 0 0',
                                float: 'right',
                                cursor: 'pointer'
                              }}
                            >
                              <img src={X} alt='X-icon' onClick={() => handleRemoveColor(color, question.id)}></img>
                            </span>
                          </div>
                        ))}
                      </div>
                      <div
                        className="color-input"
                        style={{
                          marginTop: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '10px',
                          position: 'relative'
                        }}
                      >
                        <p className='enter-colors'>OR enter the hex code of colours you want.</p>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={handleInputChange}
                          placeholder="ex: #E1483D"
                          style={{
                            padding: '8px',
                            border: '1px solid #ccc',
                            outline: 'none',
                            width: window.innerWidth <= 441 ? '250px' : '400px',
                            height: '44.5px'
                          }}
                        />
                        <button
                          onClick={handleAddColor}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#343a40',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            margin:window.innerWidth <=441 ?   '-54px 0px 0px 51.5%' :'-54px 0px 0px 52.5%'
                          }}
                        >
                          <AddCircleRoundedIcon onClick={handleAddColor} />
                        </button>
                        <figure className='mt-1'>
                          <b><i className='text-[28px]'>Not sure ? It's okay!</i></b>
                        </figure>
                        <button className='surprise'>surprise me !</button>
                      </div>
                    </>
                  )
                }
                {
                  question.answer_type === 'texture' && (
                    <>
                      <div className="form-group">
                        <span className="font-error valid-error text-purple"></span>

                        <ul className="h-list select-btns grid-view padding-top-20 checkbox-btn-img h-list-check">
                          <li className="checkbox checkbox-btn">
                            <input type="checkbox" name="13" value="patterns" id="patterns" className="validThis" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="patterns">
                              <figure className="image-container img-animation">
                                {
                                  textureImages1.map((images) => {
                                    return (
                                      <img src={images} alt="Clean"></img>

                                    )
                                  })
                                }
                              </figure>
                              <span className="button-text">Patterns</span>
                            </label>
                          </li>
                          <li className="checkbox checkbox-btn">
                            <ul className="valid-error text-purple"></ul>
                            <input type="checkbox" name="13" value="textures" id="textures" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="textures">
                              <figure className="image-container img-animation">
                                {
                                  textureImages2.map((images) => {
                                    return (
                                      <img src={images} alt="Clean"></img>

                                    )
                                  })
                                }
                              </figure>
                              <span className="button-text">Textures</span>
                            </label>
                          </li>
                          <li className="checkbox checkbox-btn">
                            <ul className="valid-error text-purple"></ul>
                            <input type="checkbox" name="13" value="collages" id="collages" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="collages">
                              <figure className="image-container img-animation">
                                {
                                  textureImages3.map((images) => {
                                    return (
                                      <img src={images} alt="Clean"></img>

                                    )
                                  })
                                }
                              </figure>
                              <span className="button-text">
                                Collages
                              </span>
                            </label>
                          </li>
                          <li className="checkbox checkbox-btn">
                            <ul className="valid-error text-purple"></ul>
                            <input type="checkbox" name="13" value="cleanvisual" id="cleanvisual" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="cleanvisual">
                              <figure className="image-container img-animation">
                                {
                                  textureImages4.map((images) => {
                                    return (
                                      <img src={images} alt="Clean"></img>

                                    )
                                  })
                                }
                              </figure>
                              <span className="button-text">
                                Clean
                              </span>
                            </label>
                          </li>
                          <li className="checkbox checkbox-btn">
                            <ul className="valid-error text-purple"></ul>
                            <input type="checkbox" name="13" value="illustrations" id="illustrations" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="illustrations">
                              <figure className="image-container img-animation">
                                {
                                  textureImages5.map((images) => {
                                    return (
                                      <img src={images} alt="Clean"></img>

                                    )
                                  })
                                }
                              </figure>
                              <span className="button-text">
                                Illustrations
                              </span>
                            </label>
                          </li>
                          <li className="checkbox checkbox-btn">
                            <ul className="valid-error text-purple"></ul>
                            <input type="checkbox" name="13" value="frames" id="frames" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="frames">
                              <figure className="image-container img-animation">
                                {
                                  textureImages6.map((images) => {
                                    return (
                                      <img src={images} alt="Clean"></img>

                                    )
                                  })
                                }
                              </figure>
                              <span className="button-text">
                                Frames
                              </span>
                            </label>
                          </li>

                        </ul>
                        <figure className='mt-1'>
                          <b><i className='text-[28px]'>Not sure ? It's okay!</i></b>
                        </figure>
                        <button className='surprise'>surprise me !</button>
                      </div>
                    </>
                  )
                }
                {
                  question.id === 21 ?
                    <div
                      className="color-input"
                      style={{
                        marginTop: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        position: 'relative',
                        height:'65px'
                      }}
                    >
                      <input
                        type="text"
                        value={getAnswerValue(question.id)}
                        onChange={(e) => handleInputChange(e, question.id)}
                        style={{
                          padding: '8px',
                          border: '1px solid #ccc',
                          outline: 'none',
                          width: window.innerWidth <= 441 ? '250px' : '400px'
                        }}
                      />
                      <button
                        // onClick={handleAddColor}
                        style={{
                          padding:window.innerWidth <=441 ? '0': '8px 16px',
                          backgroundColor: 'transparent',
                          color: '#fff',
                          border: 'none',
                          cursor: 'pointer',
                          margin:window.innerWidth <=441 ?  '-45px 0px 0px 80%' : '-55px 0px 0px 80%'
                        }}
                      >
                        <img src={Link}></img>
                      </button>
                    </div> : ''
                }
                {
                  (question.id === 15 || question.id === 16) ? (
                    <input
                      placeholder={placeHolders[index]}
                      value={question.id === 21 ? '' : getAnswerValue(question.id)}
                      className="question-input"
                      onChange={(e) => handleChange(question.id, e.target.value)}
                    />
                  ) : (
                    <div className="w-[100%] xl:h-[2px] lg:h-[2px] md:h-[2px] sm:h-[2px] xs:h-[1px] bg-black mt-[3%]"></div>
                  )
                }


              </div>
            ))}

          </>
        }
        bgTitle={'Your visual identity'}
      />
    </div>
  );
};

