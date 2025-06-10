import React, { useEffect, useState } from "react";
import "../Purchase/Purchase.css";
import { Navbar } from "../Common/Navbar/Navbar";
import { Footer } from "../Common/Footer/Footer";
import { Accordian } from "../Common/Accordian";
import BlackDollor from "../../Images/BundlDetail/blackdollor.svg";
import BlackTime from "../../Images/BundlDetail/blacktime.svg";
import { ConfigToken } from "../Auth/ConfigToken";
import axios from "axios";
import { base_url } from "../Auth/BackendAPIUrl";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Popup } from "../Common/Popup/Popup";
import { amountDecimal } from "../Utils/amountDecimal";

let newToastId = null;
export const CustomBundl = ({ user, lang, setLang }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  const [brandError, setBrandError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 440);
  const [firstOrder, setFirstOrder] = useState(true);
  const location = useLocation();
  const { state } = location;
  const [addonPayLoads, setAddonPayLoads] = useState({});
  const [brandInput, setBrandInput] = useState("");
  const [isSameBundl, setIsSameBundl] = useState(false);
  const [showDetails, setDetails] = useState(false);
  const [isFromLogin, setIsFromLogin] = useState(state?.fromLogin);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
    // getprojects()
    if (state && "project_name" in state) {
      setBrandInput(state.project_name);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 440);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isFromLogin) {
      setBrandError(false);
      setBrandError(state?.project_name && false);
      // createPayload();
    }
  });

  useEffect(() => {
    if (user?.is_active) {
      getprojects();
    }
  }, [user]);

  const emptyCart = async () => {
    setBrandInput("");
    setOpenPopup(false);
    await axios.delete(`${base_url}/api/order/cart/`, ConfigToken());
    // addToCart(selectedIndex)
    toast.success("Cart updated successfully", {
      icon: false,
      style: {
        color: "#1BA56F",
        fontWeight: "700", // White text
      },
    });
    createPayload();
  };

  const toastErrorMessage = (msg) => {
    const message = msg;

    if (newToastId) {
      toast.dismiss(newToastId);
    }

    newToastId = toast(message, {
      duration: 3000,
      style: {
        color: "#1BA56F",
        border: `1px solid #1BA56F`,
        fontWeight: "700",
        background: "#fff",
        boxShadow: "none",
        borderRadius: "0px",
      },
    });
  };

  const createPayload = async () => {
    if (brandInput == "") {
      // toast.error(
      //   lang === "ar" ? "الحد اختر اسمًا لمشروعك" : `Name your brand`,
      //   {
      //     position: toast?.POSITION?.TOP_RIGHT,
      //     toastId: "required-value-toast",
      //     icon: false,
      //     style: {
      //       color: "#D83D99",
      //       fontWeight: "700",
      //     },
      //   }
      // );
      // toastErrorMessage(
      //   lang === "ar" ? "الحد اختر اسمًا لمشروعك" : `Name your brand`
      // );
      const element = document.getElementById("brandInput");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setBrandError(true);
      return false;
    }
    if (firstOrder && addonPayLoads.total_price < 800) {
      // toast.error(
      //   lang === "ar"
      //     ? "الأدنى للطلب يجب أن يكون 800"
      //     : `Minimum order amount should be 800`,
      //   {
      //     position: toast?.POSITION?.TOP_RIGHT,
      //     toastId: "required-value-toast",
      //     icon: false,
      //     style: {
      //       color: "#D83D99",
      //       fontWeight: "700",
      //     },
      //   }
      // );
      toastErrorMessage(
        lang === "ar"
          ? "الأدنى للطلب يجب أن يكون 800"
          : `Minimum order amount should be 800`
      );
      const element = document.getElementById("brandInput");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    if (addonPayLoads.item_list.length == 0) {
      // toast.error(
      //   lang === ""
      //     ? "التسوق يرجى إضافة عنصر إلى سلة"
      //     : `Please add an Item to Checkout`,
      //   {
      //     position: toast?.POSITION?.TOP_RIGHT,
      //     toastId: "required-value-toast",
      //     icon: false,
      //     style: {
      //       color: "#D83D99",
      //       fontWeight: "700",
      //     },
      //   }
      // );
      toastErrorMessage(
        lang === ""
          ? "التسوق يرجى إضافة عنصر إلى سلة"
          : `Please add an Item to Checkout`
      );
      return false;
    }
    const savedPayload = JSON.parse(localStorage.getItem("payloads") || "{}");
    const payload = isFromLogin
      ? savedPayload
      : {
          order_name: brandInput,
          // bundle_id: location.state.bundlDetail?.id,
          total_time: addonPayLoads.total_time,
          total_price: addonPayLoads.total_price,
          tax_treatment: addonPayLoads.tax_treatment,
          tax: addonPayLoads.tax,
          item_list: addonPayLoads.item_list,
          addons: addonPayLoads,
          bundle_id: null,
          order_status: "in_cart",
        };

    try {
      localStorage?.setItem("payloads", JSON.stringify(payload));
      const response = await axios.post(
        `${base_url}/api/order/create/`,
        payload,
        ConfigToken()
      );
      if (response.status === 201) {
        navigate("/mycart", { state: { orderData: response.data.data.data } });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      localStorage?.setItem("payloads", JSON.stringify(payload));
      navigate(`/login?next_url=custombundl`, {
        state: {
          project_name: brandInput,
        },
      });
    }
  };

  const getprojects = async () => {
    try {
      const response = await axios.get(`${base_url}/api/order/`, ConfigToken());
      if (response.data) {
        const resProjects = response.data.data.filter(
          (item) => item.order_status != "in_cart"
        );
        if (resProjects.length) {
          setFirstOrder(false);
        }
      }
    } catch (e) {
      console.log(e);
      navigate(`/login?next_url=custombundl`, {
        state: {
          project_name: brandInput,
        },
      });
    }
  };

  useEffect(() => {
    if (user?.is_active) {
      const getcartData = async () => {
        try {
          const response = await axios.get(
            `${base_url}/api/order/cart/`,
            ConfigToken()
          );
          if (
            response?.data?.order_status === "in_cart" &&
            response?.data?.bundle_id !== null &&
            response?.data?.bundle_name !== null &&
            !state?.isBackToCustom &&
            response?.data?.item_details?.bundle_id !== null &&
            response?.data?.item_details?.bundle_name !== null
          ) {
            setOpenPopup(true);
          }
          if (
            response?.data?.item_details?.bundle_items.length > 0 ||
            response?.data?.item_details?.addon_items.length > 0
          ) {
            setBrandInput(response?.data?.project_name);
            setIsSameBundl(true);
          } else {
            setIsSameBundl(false);
          }
        } catch (e) {
          console.log(e);
          navigate(`/login?next_url=custombundl`, {
            state: {
              project_name: brandInput,
            },
          });
        }
      };
      getcartData();
    }
  }, [user, lang]);

  return (
    <div>
      {/* <ToastContainer /> */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            color: "#1BA56F",
            fontWeight: "700",
            borderRadius: "0px !important",
            border: `1px solid #1BA56F`,
          },
        }}
      />
      <Navbar isLang={lang} setIsLang={setLang} />
      <div className="bundl-detail mt-3">
        <div style={{ borderBottom: "1.5px solid #000000", width: "100%" }}>
          <h2>
            {location?.state?.title ||
              (lang === "ar" ? "صمم البندل الخاص بك" : "Customize Bundl")}
          </h2>
          {/* <p className='bundl-desc-title'>Main outcomes: Brand Identity, Commerce Collateral, Social Media Starter Kit.</p> */}
          <p className="bundl-desc">
            {lang === "ar"
              ? "المحتويات الأساسية: الهوية البصرية، عناصر التجار، مجموعة السوشال ميديا"
              : "In this bundl, you have the freedom to mix and match from different add-ons that have been carefully curated to guarantee you find all the items needed for the success of your project."}
          </p>
          <p className="one-minor mt-3">
            {lang === "ar"
              ? "هذي الباقة تشمل تعديل مجاني واحد"
              : "* This Bundl includes one minor revision"}
          </p>
        </div>

        <div className="bundl-section" style={{ position: "relative" }}>
          <div className="brand-details">
            <p
              style={
                window.innerWidth <= 441
                  ? lang === "ar"
                    ? {
                        fontSize: "18px",
                        fontWeight: "700",
                        lineHeight: "1.2",
                        textAlign: "right",
                      }
                    : { fontSize: "18px", fontWeight: "700", lineHeight: "1.2" }
                  : {
                      textAlign: lang === "ar" ? "right" : "left",
                      fontSize: "24px",
                      fontWeight: "700",
                    }
              }
            >
              {lang === "ar"
                ? "ما هو اسم مشروعك؟"
                : "What is the name of your brand?"}
            </p>
            <input
              id="brandInput"
              className={`brand-input ${brandError && "!border-[#D83D99]"}`}
              value={brandInput}
              onChange={(e) => {
                setBrandInput(e.target.value);
                setBrandError(false);
              }}
            />
            {brandError && (
              <p className="text-[#D83D99]">Please enter name of the brand</p>
            )}
            <div style={{ margin: "5% 0 0 0" }}>
              <Accordian
                accordianTitle={
                  lang === "ar"
                    ? "صمم البندل الخاصة بك"
                    : "Customize your Bundl!"
                }
                textColor={"#1BA56F"}
                addOnPayload={setAddonPayLoads}
                extraQty={{}}
                searchParams={query}
                isLang={lang}
                bundlePackageId={"custombundl"}
                isSameBundl={isSameBundl}
              />
            </div>
          </div>

          <div
            className="bundl-summary  max-h-[80%]"
            style={{
              position: "sticky",
              ...(isMobile ? { border: "1px solid" } : {}),
              top: "0px",
              alignSelf: "flex-start",
            }}
          >
            <div className="bundl-name">
              <p
                className="sm:text-[24px] xs:mb-0 xs:flex xs:justify-between sm:block"
                style={{ fontWeight: "700", padding: "2% 0%", textAlign: lang === "ar" ? "right" : "left",}}
              >
                <span>{lang === "ar" ? "ملخص الطلب​" : "Summary"}</span>

                {isMobile && (
                  <button
                    onClick={() => setDetails(!showDetails)}
                    className="text-[14px] text-[#1BA56F] font-normal underline uppercase"
                  >
                    {showDetails ? "Hide Details" : "Show Details"}
                  </button>
                )}
              </p>
            </div>
            {!isMobile || (isMobile && showDetails) ? (
              <>
                <div className="bundl-name">
                  {addonPayLoads?.length > 0 && (
                    <p
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        padding: "2% 0%",
                      }}
                    >
                      {lang === "ar" ? "" : "Add ons"}
                    </p>
                  )}
                </div>
                {/* {addonPayLoads?.item_list?.map((addon, idx) => (
              <div key={idx} className='one-brand-identity block xs:flex sm:block'>
                <p className='text-[#000] sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[45%]' >{addon.qty} {addon.addon_name}</p>
                <div className='flex xs:w-[55%] sm:w-full w-full'>
                  <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[55%]' >+ {addon.unit_time * addon.qty} {lang === 'ar' ? 'يوما' : 'Days'}</p>
                  <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[45%]'>+ {addon.qty ==1 ? parseFloat(addon.unit_price): parseFloat(addon.unit_price) + ((parseFloat(addon.unit_price) / 100) * addon.price_increment * (addon.qty - 1)) } {lang === 'ar' ? 'ريال' : 'SAR'}</p>
                </div>
              </div>
            ))} */}
                {addonPayLoads?.item_list &&
                  Object.entries(
                    addonPayLoads.item_list.reduce((acc, addon) => {
                      acc[addon.category] = acc[addon.category] || [];
                      acc[addon.category].push(addon);
                      return acc;
                    }, {})
                  ).map(([category, addons]) => (
                    <div key={category}>
                      <p
                        className={`text-black sm:text-[20px] text-[20px] xs:text-[16px] font-[700] !mb-1 w-full px-[2%] mt-[3%] ${
                          lang === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {category}
                      </p>
                      {addons.map((addon, idx) => (
                        <div
                          key={idx}
                          className={`one-brand-identity 
                        ${idx !== addons.length - 1 && "h-[25px]"} 
                        ${
                          addons.length - 1 === idx &&
                          "border-b-[1px] border-black"
                        }
                        xs:flex sm:block block flex-wrap justify-around`}
                        >
                          <div className="flex xs:w-[100%] w-full">
                            <p
                              className={`text-black sm:text-[18px] text-[18px] xs:text-[16px] font-[400] !mb-1 xs:w-[75%]  lg:w-full md:w-full sm:w-full mt-[3px] ${
                                lang === "ar" ? "text-right" : "text-left"
                              }`}
                            >
                              {addon.qty}{" "}
                              {lang === "ar"
                                ? addon.addon_arabic
                                : addon.addon_name}
                            </p>
                            <p
                              className={`sm:text-[18px] text-[18px] xs:text-[16px] font-[400] lg:w-[40%] md:w-[50%] xs:w-[25%]  ${
                                lang === "ar" ? "text-left" : "text-right"
                              }`}
                            >
                              + {amountDecimal(addon.total_price)}{" "}
                              {lang === "ar" ? "ريال" : "SAR"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </>
            ) : (
              ""
            )}
            <div className="bundl-checkout sm:mt-3 xs:mt-0">
              <div className="total " style={{ display: "flex" }}>
                <p className="w-[60%] flex items-center sm:mb-2 xs:mb-0">
                  <img
                    src={BlackDollor}
                    alt="Total Price"
                    className="inline-block ml-1"
                  />
                  <span className="ml-3 font-bold">
                    {lang === "ar" ? "السعر الإجمالي :" : "Total Price :"}
                  </span>
                </p>
                <p className="w-[40%] xs:text-right sm:text-left !font-bold sm:mb-2 xs:mb-0">
                  {amountDecimal(addonPayLoads.total_price)}{" "}
                  {lang === "ar" ? "ريال" : "SAR"}
                </p>
              </div>
              <div className="total  flex items-center">
                <p className="w-[60%] flex items-center  sm:mb-2 xs:mb-0">
                  <img
                    src={BlackTime}
                    alt="Total Duration"
                    className="inline-block"
                  />
                  <span className="ml-1">
                    {lang === "ar" ? "المدة الإجمالية :" : "Total Duration :"}
                  </span>
                </p>
                <p className="w-[40%] xs:text-right sm:text-left sm:mb-2 xs:mb-0">
                  {addonPayLoads.total_time} {lang === "ar" ? "يوم" : "Days"}
                </p>
              </div>

              <div className="proceed-checkout mt-[3%]">
                <button
                  onClick={createPayload}
                  type="button"
                  className="proceed  bg-[#1BA56F] uppercase"
                >
                  {lang === "ar" ? " إتمام الشراء" : "Proceed To Cart"}
                </button>
                <button
                  className="proceed  bg-[#1BA56F] mt-[3%] uppercase"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  {lang === "ar" ? "المتابعة إلى السلة​" : "Empty Cart"}
                </button>
              </div>
              {/* {firstOrder && <p className='proceed-text'>{lang === 'ar' ? 'الحد الأدنى للطلب ٤٨٨٠ ريال سعوذي' : 'Your minimum total should be above 4880 SAR'}</p>} */}
            </div>
          </div>
        </div>
      </div>
      {window?.innerWidth >= 500 && <Footer isLang={lang} />}
      {openPopup && (
        <Popup
          openpopup={openPopup}
          setPopup={setOpenPopup}
          title={""}
          subTitle={"You already have items in your cart. Would you like to."}
          onClick={emptyCart}
          save={"Continue"}
          cancel={"Cancel"}
          cancelClick={setIsFromLogin}
          isLang={lang}
        />
      )}
    </div>
  );
};
