import React, { useState, useEffect } from "react";
import "../ForgotpasswordMail/ForgotpasswordMail.css";
import Loginlogo from "../../../Images/Login/loginlogo.svg";
import { Footer } from "../../Common/Footer/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { base_url } from "../BackendAPIUrl";
import ClipLoader from "react-spinners/ClipLoader";

const PasswordResetSent = () => {
  const location = useLocation();
  const { email = "", lang = "en" } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  let language = localStorage.getItem("lang") === "ar" ? "arabic" : "english";

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  useEffect(() => {
    const direction = lang === "ar" ? "rtl" : "ltr";
    if (document.body.dir !== direction) {
      document.body.dir = direction;
    }
  }, [lang]);

  const resendMail = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const response = await axios.post(`${base_url}/api/forget-password/`, {
        email,
        language,
      });
      if (response.status === 200 || response.status === 201) {
        setResendStatus(
          lang === "ar"
            ? "تم إرسال الرابط مرة أخرى إلى بريدك الإلكتروني."
            : "Reset link resent successfully."
        );
      }
    } catch (err) {
      setResendStatus(
        lang === "ar"
          ? "حدث خطأ أثناء إعادة الإرسال."
          : "Failed to resend reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="login !mb-[8rem]">
        <div className="login-content">
          <p className="forgot-welcometext">
            {lang === "ar" ? "مرحبا بكم مجددا" : "Reset Password"}
          </p>
          <a className="Rest-brand" href="/">
            <img className="loginlogo" src={Loginlogo} alt="login" />
          </a>

          {/* Message block positioned similar to form in ForgotpasswordMail */}
          <div className="lg:mt-0 md:mt-0 xs:mt-[8%]">
            <p
              style={{
                textAlign: "center",
                fontSize: "18px",
                marginBottom: "20px",
              }}
            >
              {lang === "ar"
                ? "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني."
                : "Password reset link has been sent to your email."}
            </p>

            {resendStatus && (
              <p
                style={{
                  textAlign: "center",
                  color: resendStatus.includes("Failed") ? "red" : "green",
                  marginBottom: "15px",
                }}
              >
                {resendStatus}
              </p>
            )}

            <div style={{ textAlign: "center" }}>
              <button
                className="signin !text-[24px] uppercase"
                onClick={resendMail}
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={25} color={"#FFFFFF"} />
                ) : lang === "ar" ? (
                  "إعادة إرسال"
                ) : (
                  "Resend"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer isLang={lang} />
    </div>
  );
};

export default PasswordResetSent;
