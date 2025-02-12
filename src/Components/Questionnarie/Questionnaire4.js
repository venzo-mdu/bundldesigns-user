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

export const Questionnaire4 = ({formData,setFormData}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.questionnaire3);
  const currentAnswer = useSelector((state) => state.questionnaire4)
  const [questions, setQuestions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]); // To store selected color codes
  const [inputValue, setInputValue] = useState(''); // For input field
  const [activeButtons, setActiveButtons] = useState([]);
  const [shadeBackgroundColor, setShadeBackgroundColor] = useState('rgb(228, 222, 216)');
  const [shadeColor, setshadeColor] = useState('rgb(0, 0, 0)');
  const [shadeType, setShadeType] = useState('');
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
        if(location.state.orderId != undefined){
        const response = await axios.get(`${base_url}/api/questionnaire/update/${location.state.orderId}`, ConfigToken());
        setFetchQ4Answers(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    setFormData(currentAnswer)
    console.log(Object.values(currentAnswer),'swwwewe')
    if(Object.values(currentAnswer).length){
      setActiveButtons(currentAnswer[17])
      let currentColor = currentAnswer[18]
      if(currentColor =='suprise'){
        currentColor ='rgb(255, 45, 45)'
      }
      const bgcolor = {
        'rgb(9, 50, 108)':'rgb(255, 98, 10)',
        'rgb(228, 222, 216)':'rgb(0, 0, 0)',
        'rgb(255, 45, 45)':'rgb(221, 124, 124)'
      }
      console.log(currentColor)
      setShadeBackgroundColor(currentColor === undefined ? 'rgb(228, 222, 216)':currentColor);
      setshadeColor(bgcolor[currentColor]);
      setSelectedColors(currentAnswer[19])
    }
    fetchQuestions();
    fetchAnswers();
  }, []);

  const displayedColors = colorCodes.slice(0, 90);
  console.log(formData,'formData')


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
    let updatedColors = [];
    const isHexCode = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
    if (!isHexCode && color !== "Surprise") {
      toast.error("Allows only HEX Code!", {
        position: toast?.POSITION?.TOP_RIGHT,
      });
      setInputValue('');
      return;
    }
    if(selectedColors?.includes(color)){
      toast.error("You have already added!", {
        position: toast?.POSITION?.TOP_RIGHT,
      });
    }
    let colorsArray = selectedColors || [];
    // If "Surprise" is selected, clear all other colors and set only "Surprise"
    if (color === "Surprise") {
      updatedColors = ["Surprise"];
    } else {
      // If any other color is selected, remove "Surprise" if it's in the list
      updatedColors = colorsArray?.includes("Surprise")
        ? colorsArray.filter(item => item !== "Surprise") // Remove "Surprise"
        : [...colorsArray];
  
      // Add the selected color if it's not already in the list
      if (!updatedColors?.includes(color)) {
        updatedColors = [...updatedColors, color];
      }
    }
  
    // Update selected colors
    setSelectedColors(updatedColors);
    setInputValue('');
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
      [questionId]: e.target.value
    }))
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
  
    setActiveButtons((prevButtons=[]) =>
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
    setShadeType('');
    if (type === 'surprise') {
      setShadeType(type)
      setShadeBackgroundColor('rgb(228, 222, 216)');
    }else{
      setShadeBackgroundColor(color);
    }
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: type === 'surprise' ? 'surprise':color
    }))
  };

  const handleChange = (questionId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: value
    }))
  }

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
            [questionId]: [...currentSelections.filter((item) => item !== "Surprise"), value],
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
  
  const onBackClick = () => {
    navigate(`/questionnaire/${3}`, { state: { questionnaireData3: answers,orderId:location.state?.orderId } });
  }
  console.log(location.state?.orderId,'orderid')

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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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
        formData={formData}
        setFormData={setFormData}
        questions={
          <>
          {/* ${question.id == 21 ?'!text-[22px]':''} */}
            {questions?.map((question, index) => (
              <div className="questions" key={index}>
                {
                  question.answer_type === 'shade' ? '' :
                  <p className={`questions-title  xs:w-[70%] sm:w-full md:w-full mx-auto ${index === 0 ? 'mt-[1%]' : 'mt-[4%]'} `}>
                      {question.question}
                      {
                        question.required && (
                          <span><sup className={`${question.id == 21 ?'!text-[22px]':''}`}>*</sup></span>
                        )
                      }
                    </p>
                }

                {
                  question.answer_type === 'shade' && (
                    <>

                      <div className='shade-background py-5' style={{ backgroundColor: shadeBackgroundColor }}>
                        <p style={{ color: shadeBackgroundColor === 'rgb(228, 222, 216)' ? '' : '#FFFFFF',width:'100%' }} className={`questions-title mb-3 ${index === 0 ? 'mt-[1%]' : 'mt-[4%]'}`}>
                          {question.question}
                          <span>
                            <sup>*</sup>
                          </span>
                        </p>
                        <div className='shade-buttons'>
                          <div className='button-shade-group'>
                            <img src={Color1}></img>
                            <button className={shadeBackgroundColor === 'rgb(228, 222, 216)' && shadeType !== 'surprise' ? 'shade-btn-active' : 'shade-btn'} onClick={() =>
                               handleShadeButtonClick('rgb(228, 222, 216)', 'rgb(0, 0, 0)', '', question.id)}>CLEAN & CLASSIC</button>
                          </div>
                          <div className='button-shade-group'>
                            <img src={Color2}></img>
                            <button className={shadeBackgroundColor === 'rgb(9, 50, 108)' && shadeType !== 'surprise' ? 'shade-btn-active' : 'shade-btn'} onClick={() => handleShadeButtonClick('rgb(9, 50, 108)', 'rgb(255, 98, 10)', '', question.id)}>CONTRASTING COLORS</button>
                          </div>
                          <div className='button-shade-group'>
                            <img src={Color3}></img>
                            <button className={shadeBackgroundColor === 'rgb(255, 45, 45)' && shadeType !== 'surprise' ? 'shade-btn-active' : 'shade-btn'} onClick={() => handleShadeButtonClick('rgb(255, 124, 124)','rgb(221, 45, 45)' ,'', question.id)}>ONE COLOR SHADES</button>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                          <p className='shade-bundl-text' style={{ color: shadeColor }}>Bundl</p>
                          <b><p className='text-[12px] leading-1 font-[500]'>Not sure ? It’s okay!</p></b>
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
                          textStyle?.map((font, index) => {
                            return (
                              <>
                                <div className='font-background'>
                                  <img style={{ margin: '6% 0 0% 0' }} src={font.img}></img>
                                  <button className={`font-buttons ${activeButtons?.includes(font?.fontStyle) ? 'font-buttons-active' : ''
                                    }`} onClick={() => handleButtonClick(index, question.id, font.fontStyle)}>{font?.fontStyle}</button>
                                </div>
                              </>
                            )
                          })
                        }
                      </div>
                      <figure className='mt-[5%]'>
                        <b><i className='text-[12px] leading-1 font-[500]'>Not sure ? It's okay!</i></b>
                      </figure>
                      <button className={`${activeButtons?.includes("Surprise") ? 'surprise-active':'surprise'}`} onClick={() => handleButtonClick("", question.id, "Surprise")}>surprise me !</button>
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
                              className={`specific-color ${selectedColors?.includes(color)?'border-[1px] border-black':''}`}
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
                        {
                          selectedColors?.[0] === 'Surprise' ?'' :
                          selectedColors?.map((color, index) => (
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
                          ))
                        }
                       
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
                          onClick={()=>handleColorClick(inputValue,question.id)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#000000',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            margin:window.innerWidth <=441 ?   '-54px 0px 0px 51.5%' :'-54px 0px 0px 52.5%'
                          }}
                        >
                          <AddCircleRoundedIcon  onClick={()=>handleColorClick(inputValue,question.id)} />
                        </button>
                        <figure className='mt-[3%]'>
                          <b><i className='text-[12px] leading-1 font-[500]'>Not sure ? It's okay!</i></b>
                        </figure>
                        <button className={`${selectedColors?.includes("Surprise") ? 'surprise-active':'surprise'}`} onClick={() => handleColorClick("Surprise", question.id)}>surprise me !</button>
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
                            <input type="checkbox" name="13" checked={formData?.[20]?.includes('patterns') ?true:false} value="patterns" id="patterns" className="validThis" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="patterns">
                              <figure className="image-container img-animation">
                                {
                                  textureImages1?.map((images) => {
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
                            <input type="checkbox" name="13" checked={formData?.[20]?.includes('textures') ?true:false} value="textures" id="textures" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="textures">
                              <figure className="image-container img-animation">
                                {
                                  textureImages2?.map((images) => {
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
                            <input type="checkbox" name="13" checked={formData?.[20]?.includes('collages') ?true:false} value="collages" id="collages" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="collages">
                              <figure className="image-container img-animation">
                                {
                                  textureImages3?.map((images) => {
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
                            <input type="checkbox" name="13" checked={formData?.[20]?.includes('cleanvisual') ?true:false} value="cleanvisual" id="cleanvisual" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="cleanvisual">
                              <figure className="image-container img-animation">
                                {
                                  textureImages4?.map((images) => {
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
                            <input type="checkbox" name="13" checked={formData?.[20]?.includes('illustrations') ?true:false} value="illustrations" id="illustrations" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="illustrations">
                              <figure className="image-container img-animation">
                                {
                                  textureImages5?.map((images) => {
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
                            <input type="checkbox" name="13" checked={formData?.[20]?.includes('frames') ?true:false} value="frames" id="frames" onChange={(e) => handleTextureChange(e, question.id)}></input>
                            <label for="frames">
                              <figure className="image-container img-animation">
                                {
                                  textureImages6?.map((images) => {
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
                          <b><i className='text-[12px] leading-1 font-[500]'>Not sure ? It's okay!</i></b>
                        </figure>
                        <button className={`${formData[question.id]?.includes('Surprise')?'surprise-active':'surprise'}`} onClick={()=>handleTextureChange(null,question.id,true)}>surprise me !</button>
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

