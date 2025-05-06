import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Purchase/Purchase.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { Accordian } from '../Common/Accordian'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'
import greenIcon from '../../Images/green staked coin.svg'
import pinkIcon from '../../Images/pink staked coin.svg'
import blueIcon from '../../Images/blue staked coin.svg'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { base_url } from '../Auth/BackendAPIUrl'
import { ConfigToken } from '../Auth/ConfigToken'
import { ToastContainer, toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Bgloader } from '../Common/Background/Bgloader'
import { Popup } from '../Common/Popup/Popup'
import './1.css'
function Sticky({ user, lang, setLang }) {
  return (
    <div>
      <ToastContainer />
      <Navbar isLang={lang} setIsLang={setLang} />
      <div>
      <div class="block">
      <h2>Brand Identity</h2>
      <p>Logo Design, Colors, Typography, and more...</p>
      <h2>Brand Identity</h2>
      <p>Logo Design, Colors, Typography, and more...</p>
      <h2>Brand Identity</h2>
      <p>Logo Design, Colors, Typography, and more...</p>
      <h2>Brand Identity</h2>
      <p>Logo Design, Colors, Typography, and more...</p>
      <h2>Brand Identity</h2>
      <p>Logo Design, Colors, Typography, and more...</p>

    </div>
    <div class="wrapper">
      <div class="left-section">
        <div class="block">
          <h2>Brand Identity</h2>
          <p>Logo Design, Colors, Typography, and more...</p>
        </div>
        <div class="block">
          <h2>Food & Beverage Collateral</h2>
          <p>Bags, Stickers, Boxes, and other assets.</p>
        </div>
        <div class="block">
            <h2>Food & Beverage Collateral</h2>
            <p>Bags, Stickers, Boxes, and other assets.</p>
          </div>
          <div class="block">
            <h2>Food & Beverage Collateral</h2>
            <p>Bags, Stickers, Boxes, and other assets.</p>
          </div>
          <div class="block">
            <h2>Food & Beverage Collateral</h2>
            <p>Bags, Stickers, Boxes, and other assets.</p>
          </div>
        <div class="block">
          <h2>Social Media Designs</h2>
          <p>Posts, Templates, Story Highlights.</p>
        </div>
        <div class="block">
          <h2>Extras</h2>
          <p>Brand guidelines, usage tips, print-ready files.</p>
        </div>
      </div>

      {/* <!-- Right Side (Sticky Summary) --> */}
      <div class="right-section">
        <h3>Summary</h3>
        <p><strong>The Foodie Bundl:</strong> 8000 SAR</p>
        <hr />
        <p><strong>Brand Identity:</strong> +4400 SAR</p>
        <p><strong>Food & Beverage:</strong></p>
        <ul>
          <li>Bag: +480 SAR</li>
          <li>Sticker: +120 SAR</li>
          <li>Box: +480 SAR</li>
        </ul>
        <ul>
            <li>Bag: +480 SAR</li>
            <li>Sticker: +120 SAR</li>
            <li>Box: +480 SAR</li>
          </ul>
        
        <h3>Summary</h3>
        <p><strong>The Foodie Bundl:</strong> 8000 SAR</p>
        <hr />
        <p><strong>Brand Identity:</strong> +4400 SAR</p>
        <p><strong>Food & Beverage:</strong></p>
        <ul>
          <li>Bag: +480 SAR</li>
          <li>Sticker: +120 SAR</li>
          <li>Box: +480 SAR</li>
        </ul>
        <h3>Summary</h3>
        <p><strong>The Foodie Bundl:</strong> 8000 SAR</p>
        <hr />
        <p><strong>Brand Identity:</strong> +4400 SAR</p>
        <p><strong>Food & Beverage:</strong></p>
        <ul>
          <li>Bag: +480 SAR</li>
          <li>Sticker: +120 SAR</li>
          <li>Box: +480 SAR</li>
        </ul>
        <h3>Summary</h3>
        <p><strong>The Foodie Bundl:</strong> 8000 SAR</p>
        <hr />
        <p><strong>Brand Identity:</strong> +4400 SAR</p>
        <p><strong>Food & Beverage:</strong></p>
        <ul>
          <li>Bag: +480 SAR</li>
          <li>Sticker: +120 SAR</li>
          <li>Box: +480 SAR</li>
        </ul>
        <h3>Summary</h3>
        <p><strong>The Foodie Bundl:</strong> 8000 SAR</p>
        <hr />
        <p><strong>Brand Identity:</strong> +4400 SAR</p>
        <p><strong>Food & Beverage:</strong></p>
        <ul>
          <li>Bag: +480 SAR</li>
          <li>Sticker: +120 SAR</li>
          <li>Box: +480 SAR</li>
        </ul>
      </div>
    </div>
    <div class="block">
      <h2>Brand Identity</h2>
      <p>Logo Design, Colors, Typography, and more...</p>
      <h2>Brand Identity</h2>
      <p>Logo Design, Colors, Typography, and more...</p>
      <h2>Brand Identity</h2>
      <p>Logo Design, Colors, Typography, and more...</p>
    </div>
      </div>
    </div>
  );
}

export default Sticky;
