import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bgloader } from "../../Common/Background/Bgloader";
import { Footer } from "../../Common/Footer/Footer";
import "./verifyMail.css";

const VerifyMail = ({ lang }) => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!id) return;

    const base_url = process.env.REACT_APP_API_BASE_URL;

    const checkVerifyEmail = async () => {
      try {
        const response = await axios.get(
          `https://bundldesigns-ag7c3.ondigitalocean.app/api/verify-email/${id}/`
        );
        console.log(response, "response");

        if (response.status === 200) {
          navigate("/login");
        } else {
          setErrorMsg(response?.data?.message);
        }
      } catch (error) {
        console.error("Verification GET failed:", error);
        setErrorMsg("Email Verification failed");
      }
    };
    checkVerifyEmail();
  }, []);

  return (
    <div className={`verify-wrapper ${errorMsg && "relative"}`}>
      {errorMsg && (
        <div className="error-popup">
          <p>{errorMsg}</p>
          <button
            onClick={() => {
              setErrorMsg("");
              navigate("/login");
            }}
          >
            Close
          </button>
        </div>
      )}

      {!errorMsg && (
        <div className="verify-loader-center">
          <Bgloader />
        </div>
      )}
      <div className={`${errorMsg && "absolute bottom-0 w-full"}`}>
        <Footer isLang={lang} />
      </div>
    </div>
  );
};

export default VerifyMail;
