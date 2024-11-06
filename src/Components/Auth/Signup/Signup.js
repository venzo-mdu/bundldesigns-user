import React, { useState } from 'react'
import '../Signup/Signup.css'
import Loginlogo from '../../../Images/Login/loginlogo.svg'
import Anchor from '../../../Images/Login/anchor.svg'
import Googleicon from '../../../Images/Login/google.svg'
import { Footer } from '../../Common/Footer/Footer'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Signup = () => {

  const {userInfo} = useSelector((state)=>state);
  const [isAgree , setIsAgree] = useState(true);

  const [registerData , setregisterData] = useState({
    name:'',
    email:'',
    password:''
  })


  const signUp = () =>{  

    // let data 
 
  }
  return (
    <div>
      <div className='login'>
        <img className='anchor' src={Anchor} alt='login-anchor'></img>
        <div className='signup-content'>
          <p className='welcometext'>Welcome to <span className='bundle-designs'>Bundle Designs</span></p>
          <img className='loginlogo' src={Loginlogo} alt='login'></img>
          <form>
            <label style={{width:'100%'}}>Name</label>
            <input placeholder='Name' name='name'></input>
            <label style={{ margin: '3% 0 0 0' }}>Email address</label>
            <input placeholder='Email' name='email'></input>
            <label style={{ margin: '3% 0 0 0' }}>Password</label>
            <input placeholder='Password' name='password'></input>
            <div style={{ display: 'flex' }} className='terms-policy'>
              <input className='checkbox' type='checkbox' onChange={()=>setIsAgree(!isAgree)}></input>
              <p > I agree to the terms & policy</p>
            </div>
            <button disabled={true} className='signin'>Signup</button>
            <p className='or' style={{ margin: '2% 0 0 0' }}>Or</p>
            <p className='signinwithgoogle'><img src={Googleicon} alt='google-icon'></img> Sign in with Google</p>
            <p className='dont'>Have an account ? <span><NavLink className='signup' to={'/login'} onClick={signUp}>&nbsp;Signin</NavLink></span></p>
          </form>
        </div>
        <img className='anchor1' src={Anchor} alt='login-anchor'></img>
      </div>
      <Footer />
    </div>
  )
}
