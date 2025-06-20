import React, { useEffect, useState } from "react";
import "../Footer/Footer.css";
import Bundllogo from "../../../Images/Footer/Footerbundllogo.svg";
import Message from "../../../Images/Footer/Messageicon.svg";
import Whatsapp from "../../../Images/Footer/Whatsapp.svg";
import Linkedin from "../../../Images/Footer/Linkedin.svg";
import Facebook from "../../../Images/Footer/Facebook.svg";
import TikTok from "../../../Images/Footer/Tiktok.svg";
import Pinterest from "../../../Images/Footer/Pinterest.svg";
import Instagram from "../../../Images/Footer/Instagram.svg";
import mailIcon from "../../../Images/Footer/mailicon.svg";
import WhatsappIcon from "../../../Images/Footer/WhatsappBlack.svg";
import X from "../../../Images/Footer/icons8-twitterx-16.svg";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../Auth/BackendAPIUrl";

export const Footer = ({ isLang }) => {
  const location = useLocation();
  const [mediaUrls, setmediaUrls] = useState({
    instagram: "",
    facebook: "",
    linked_in: "",
    twitter: "",
  });

  const getMediaUrls = async () => {
    const response = await axios.get(
      `${base_url}/api/content?section=settings`
    );
    if (response.data) {
      setmediaUrls(response.data);
    }
  };

  useEffect(() => {
    getMediaUrls();
  }, []);
  const socialIcons = [
    {
      icon: Instagram,
      path: mediaUrls.instagram,
    },
    {
      icon: TikTok,
      path: "https://www.tiktok.com/@bundl_designs",
      //path:mediaUrls.facebook
    },
    {
      icon: Pinterest,
      path: "https://id.pinterest.com/BundlDesigns/",
      //path:mediaUrls.twitter
    },
    {
      icon: Linkedin,
      path: mediaUrls.linked_in,
    },
    {
      icon: WhatsappIcon,
      path: "https://wa.me/547754124",
    },
    {
      icon: mailIcon,
      path: "mailto:info@bundldesigns.com",
    },
  ];
  return (
    <div className="footer-section"   >
      <div>
        <div className="footer">
          <div className="left-content">
            <a className="footer-brand" href="/">
            <img
              className="bundl-logo-footer" 
              src={Bundllogo}
              alt="footer-logo"
            ></img>
            </a>
            <p className="footer-text-left">
              {isLang === "ar"
                ? ".Elevating Brands & Shaping Legacies"
                : "Elevating Brands & Shaping Legacies."}
            </p>
          </div>
          <div className="right-content">
            <div className="platform">
              <p className="font-medium text-[20px] mb-1 text-[#ECEAEB]">
                {isLang === "ar" ? "المنصة​" : "Platform"}
              </p>
              <ul>
                <li>
                  <a
                    href="/our-work"
                    className="text-[#ECEAEB] hover:text-[#f175ad]"
                  >
                    {isLang === "ar" ? "أعمالنا" : "Our Work"}
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    href="/#ourBundl"
                    className="text-[#ECEAEB] hover:text-[#f175ad]"
                  >
                    {isLang === "ar" ? "باقاتنا" : "Bundls"}{" "}
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    href="/dashboard"
                    className="text-[#ECEAEB] hover:text-[#f175ad]"
                  >
                    {isLang === "ar" ? "لوحة التحكم​" : "Dashboard"}{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div className="information">
              <p className="font-medium text-[20px] mb-1 text-[#ECEAEB]">
                {isLang === "ar" ? "معلومات​" : "Information"}
              </p>
              <ul>
                <li>
                  {" "}
                  <a
                    href="/aboutus"
                    className="text-[#ECEAEB] font-normal hover:text-[#f175ad]"
                  >
                    {isLang === "ar" ? "عن بندل" : "About us"}
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    href="/faq"
                    className="text-[#ECEAEB] hover:text-[#f175ad]"
                  >
                    {isLang === "ar" ? "أسئلة شائعة​" : "FAQs"}
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    href="/jobs"
                    className="text-[#ECEAEB] hover:text-[#f175ad]"
                  >
                    {isLang === "ar" ? "وظائف" : "Jobs"}
                  </a>
                </li>
              </ul>
            </div>
            <div className="contact-us">
              <p className="font-medium !text-[20px] mb-1 text-[#ECEAEB]">
                {isLang === "ar" ? "تواصل معنا" : "Contact Us"}
              </p>
              <div
                className="xs:mt-3 sm:mt-auto"
                style={{ display: "flex", width: "100%" }}
              >
                {socialIcons.map((item, index) => {
                  return (
                    <NavLink
                      target="_blank"
                      to={item.path}
                      className={`!w-[32px] !h-[32px] social-icons ${
                        isLang === "ar" ? "ml-5" : "mr-5"
                      }`}
                    >
                      <img
                        style={{ width: "16px" }}
                        key={index}
                        src={item.icon}
                        alt="social-media"
                      ></img>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="footer-bottom" style={{justifyContent: 'space-between'}}>
          <p className="copyright">
            {" "}
            {isLang === "ar"
              ? `${new Date().getFullYear()} BundIDesigns، جميع الحقوق محفوظة`
              : `${new Date().getFullYear()} BundlDesigns, All rights reserved`}
            .
          </p>
          <div
            className={` flex`}
          >
            <a
              className="!text-[14px] !text-[#FFFFFFCC]"
              href="/terms-and-conditions"
            >
              {isLang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
            </a>
            <a
              className="!text-[14px] !text-[#FFFFFFCC] ml-3 rtl:ml-0 rtl:mr-3"
              href="/privacy-policy"
            >
              {isLang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
            <a
              className="!text-[14px] !text-[#FFFFFFCC] ml-3 rtl:ml-0 rtl:mr-3"
              href="/legal"
            >
              {isLang === "ar" ? "البيانات القانونية" : "Legal"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
