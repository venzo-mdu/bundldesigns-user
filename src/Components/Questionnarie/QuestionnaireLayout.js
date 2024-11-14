import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { Questionnaire1 } from './Questionnaire1'
import { Questionnaire2 } from './Questionnaire2';
import { Questionnaire3 } from './Questionnaire3';
import { Questionnaire4 } from './Questionnaire4';
import { Questionnaire5 } from './Questionnaire5';


export const QuestionnaireLayout = () => {

  const {pageno} = useParams();
  const questionnairePages = {
    1:<Questionnaire1/>,
    2:<Questionnaire2/>,
    3:<Questionnaire3/>,
    4:<Questionnaire4/>,
    5:<Questionnaire5/>
  }
    
  return (
    <div>
        {questionnairePages[pageno]}
    </div>
  )
}
