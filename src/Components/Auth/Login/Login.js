import React from 'react'
import '../Login/Login.css'
import Loginlogo from '../../../Images/Login/loginlogo.svg'
import Anchor from '../../../Images/Login/anchor.svg'
import Googleicon from '../../../Images/Login/google.svg'
import { Footer } from '../../Common/Footer/Footer'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {loginAction} from '../../../Redux/Action'

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () =>{
     dispatch(loginAction('Harish'));
     navigate('/')
  }

  return (
    <div>
       <div className='login'>
       <img className='anchor' src={Anchor} alt='login-anchor'></img>
        <div className='login-content'>
        <p className='welcometext'>Welcome Back Sarah  !</p>
        <img className='loginlogo' src={Loginlogo} alt='login'></img>
        <div>
          <label>Email address</label>
          <input placeholder='Email'></input>
          <label style={{margin:'3% 0 0 0'}}>Password</label>
          <input placeholder='Password'></input> 
          <button className='signin' onClick={onSubmit}>Sign In</button>
          <p className='or' style={{margin:'2% 0 0 0'}}>Or</p>
          <p className='signinwithgoogle'><img src={Googleicon} alt='google-icon'></img> Sign in with Google</p>
          <p className='dont'>Don't have an account ? <span><NavLink className='signup' to={'/signup'}>&nbsp;Signup</NavLink></span></p>
        </div>
        </div>
       <img className='anchor1' src={Anchor} alt='login-anchor'></img>
       </div>
        <Footer/> 
    </div> 
  )
}
