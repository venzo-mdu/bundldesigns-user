import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Create from "../../../Images/Bundles/create-captivate-elevate.webp";
import Car from "../../../Images/Bundles/car.webp";
import Lemon from "../../../Images/Bundles/lemon.webp";
import Mouth from "../../../Images/Bundles/mouth.webp";
import Rocket from "../../../Images/Bundles/rocket-blue-for-animation.webp";
import Pinkpaint from "../../../Images/Bundles/pink-paint.webp";
import { Box, Button, Input, Typography, useMediaQuery } from "@mui/material";
import popupGIF from "../../../Images/popupGIF.gif";
import { BorderColor } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const Popup = ({
  title,
  subTitle,
  popupType = "default",
  onChange,
  save,
  cancel,
  openpopup,
  textArea,
  saveBtnBg,
  setPopup,
  onClick,
  sx,
  values,
  isCancel,
  cancelClick,
  isLang,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width:441px)");
  const imageArray = [Car, Lemon, Mouth, Rocket, Pinkpaint];
  const [slideImage, setSlideImage] = useState(imageArray[0]);
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "90%" : 475,
    bgcolor: "background.paper",
    border: "1px solid black",
    // borderRadius: '8px',
    boxShadow: 24,
    textAlign: "center",
    outline: "none",
    p: isSmallScreen ? 2 : 3,
    ...sx,
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setSlideImage(imageArray[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    if (openpopup) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.width = "100%";
    } else {
      const scrollY = parseInt(document.body.style.top || "0") * -1;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.width = "";
    };
  }, [openpopup]);

  const getPopupType = () => {
    if (popupType === "player") {
      return (
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Input
            sx={{ mt: 5, width: "250px" }}
            type="number"
            onChange={onChange}
          />
        </Box>
      );
    } else if (popupType === "payout") {
      return <Box>{/* Custom component inputs here */}</Box>;
    }
  };

  return (
    <div>
      <Modal
        open={openpopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="container">
            <div className="row justify-content-center">
              {/* <div className="home-img-rotation">
                                <p className="flex items-center justify-center m-auto">
                                    <img src={Create} style={{ maxWidth:isSmallScreen ? '45%' : '35%' }} alt="" className="img-fluid" />
                                </p>
                                <div className="mySlides">
                                    <img
                                        className="slideImages"
                                        style={{ width:'20%', margin:isSmallScreen ? '-60% 0 0 0' : '-30% 0 0 0' }}
                                        src={Mouth}
                                        alt="Image 1"
                                    />
                                </div>
                            </div> */}

              <section
                style={{ margin: "5% 0%" }}
                className="container-fluid py-1"
              >
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="relative flex justify-center text-center p-0 !pb-[14px]">
                      <img className="w-[100px] " src={popupGIF}></img>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 0 }}>
            {subTitle}
          </Typography>

          {popupType === "default" && textArea ? (
            <Box sx={{ mx: "auto", textAlign: "center" }}>
              <textarea
                className="rounded-none"
                placeholder="Enter the reason to deactivate"
                style={{
                  width: isSmallScreen ? "90%" : "500px",
                  height: "100px",
                  resize: "none",
                  border: "0px",
                  padding: "2%",
                }}
              />
            </Box>
          ) : (
            getPopupType()
          )}

          <Box sx={{ mt: 3 }}>
            <Button
              onClick={onClick}
              sx={{
                backgroundColor: saveBtnBg || "#1BA56F",
                borderRadius: "0px",
                color: "#fff",
                px: 6,
                fontSize: {
                  xs: "11px",
                  sm: "14px",
                },
                "&:hover": {
                  backgroundColor: saveBtnBg || "#1BA56F",
                  color: "#fff",
                },
              }}
            >
              {save}
            </Button>
            {!isCancel && (
              <Button
                onClick={() => {
                  const clickedItem = window.location.pathname.split("/")[1];
                  if (
                    clickedItem === "bundldetail" ||
                    clickedItem === "custombundl"
                  ) {
                    navigate("/mycart?direct=true");
                  } else {
                  }
                  setPopup(false);
                  cancelClick(false);
                  localStorage.removeItem("payloads");
                }}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "0px",
                  color: "#000",
                  border: "1px solid #000000",
                  ml: isLang === "ar" ? 0 : 2,
                  mr: isLang === "ar" ? 2 : 0,
                  mt: isSmallScreen ? 0 : 0,
                  width: "40%",
                }}
              >
                {cancel}
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
