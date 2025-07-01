import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { Questionnaire1 } from './Questionnaire1'
import { Questionnaire2 } from './Questionnaire2';
import { Questionnaire3 } from './Questionnaire3';
import { Questionnaire4 } from './Questionnaire4';
import { Questionnaire5 } from './Questionnaire5';
import { fetchQuestionAnswer } from './questionnaire.slice';
import { data } from './1';

export const QuestionnaireLayout = ({lang,setLang}) => {
  const dispatch = useDispatch();
 useEffect(()=>{
  document.documentElement.scrollTo({
    top: 0,
    left: 0
  })
 },[])



  const {pageno} = useParams();
  const [formData, setFormData] = useState()
  const questionnairePages = {
    1:<Questionnaire1 setFormData={setFormData} formData={formData} changeLang={lang} setChangeLang={setLang}/>,
    2:<Questionnaire2 setFormData={setFormData} formData={formData} changeLang={lang} setChangeLang={setLang}/>,
    3:<Questionnaire3 setFormData={setFormData} formData={formData} changeLang={lang} setChangeLang={setLang}/>,
    4:<Questionnaire4 setFormData={setFormData} formData={formData} changeLang={lang} setChangeLang={setLang}/>,
    5:<Questionnaire5 setFormData={setFormData} formData={formData} changeLang={lang} setChangeLang={setLang}/>
  }
    
  return (
    <div>
        {questionnairePages[pageno]}
    </div>
  )
}
