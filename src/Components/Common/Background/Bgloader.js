import React from 'react'
import '../Background/Bgloader.css'
import Loader from "../../../Images/Home/load sticker.png"
export const Bgloader = () => {
  return (
    <div className='loader-bg'>
      <img className='loader' src={Loader} alt='loader-round-icon'></img>
    </div>
  )
}
