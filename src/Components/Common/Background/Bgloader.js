import React from 'react'
import '../Background/Bgloader.css'
import Loader from "../../../Images/Background/loadsticker.svg"
export const Bgloader = () => {
  return (
    <div className='loader-bg'>
      <img className='loader' src={Loader} alt='loader-round-icon'></img>
    </div>
  )
}
