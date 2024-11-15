import React from 'react'
import '../Navbar/Navbar.css'
import NavLogo from '../../../Images/Navbar/Navlogo.svg'
import Search from '../../../Images/Navbar/searchicon.svg'
import Cart from '../../../Images/Navbar/cart.svg'
import User from '../../../Images/Navbar/usericon.svg'
import { NavLink } from 'react-router-dom'
export const Navbar = () => {
  return (
    <div className='common-navbar'>
        <div className='nav-logo'>
        <NavLink style={{color:'#000000'}} to="/"><img src={NavLogo}></img></NavLink>
        </div>

        <div className='nav-items'>
           <p><NavLink style={{color:'#000000'}} to="/">Home</NavLink></p>
           <p>About</p>
           <p>Work</p>
           <p>Bundls</p>
        </div>
        <div className='profile'>
          <input className='profile-input'></input>
          <img className='search-icon' src={Search}></img>
          <NavLink to="/mycart">
          <img className='cart-icon' src={Cart}></img>
          </NavLink>
          <img className='user-icon' src={User}></img>
          <div className='profile-name'>HS</div>
        </div>
    </div>
  )
}
