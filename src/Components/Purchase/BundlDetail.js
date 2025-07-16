import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../Purchase/Purchase.css";
import { Navbar } from "../Common/Navbar/Navbar";
import { Footer } from "../Common/Footer/Footer";
import { Accordian } from "../Common/Accordian";
import BlackDollor from "../../Images/BundlDetail/blackdollor.svg";
import BlackTime from "../../Images/BundlDetail/blacktime.svg";
import greenIcon from "../../Images/green staked coin.svg";
import pinkIcon from "../../Images/pink staked coin.svg";
import blueIcon from "../../Images/blue staked coin.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { base_url } from "../Auth/BackendAPIUrl";
import { ConfigToken } from "../Auth/ConfigToken";
// import { ToastContainer } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Bgloader } from "../Common/Background/Bgloader";
import { Popup } from "../Common/Popup/Popup";
import { amountDecimal } from "../Utils/amountDecimal";
import toast, { Toaster } from "react-hot-toast";
import { processArabicText } from "../Utils/arabicFontParenthesisChecker";

let newToastId = null;

export const BundlDetail = ({ user, lang, setLang }) => {
  const location = useLocation();
  const { state } = location;
  const { packageID } = useParams();
  const [packageDetail, setPackageDetail] = useState([]);
  const navigate = useNavigate();
  const [brandError, setBrandError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bundlAddons, setBundlAddons] = useState([]);
  const [minError, setMinError] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [addonPayLoads, setAddonPayLoads] = useState({});
  const [extraQty, setExtraQty] = useState({});
  const [brandInput, setBrandInput] = useState("");
  const [isSameBundl, setIsSameBundl] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [firstOrder, setFirstOrder] = useState(true);
  const [actual, setactual] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isFromLogin, setIsFromLogin] = useState(state?.fromLogin);
  const requiredToastShown = useRef(false);
  const activeToasts = useRef({});
  const [routeId, setRouteId] = useState({
    newbie: 12,
    foodie: 4,
    socialite: 22,
    boutiquer: 13,
  });
  const [routeNames, setRouteNames] = useState({
    4: "foodie",
    12: "newbie",
    13: "boutiquer",
    22: "socialite",
  });

  const [addOnLang, setAddOnLang] = useState([
    { id: 1, language: "English", label: "English", isChecked: true },
    { id: 2, language: "Arabic", label: "Arabic", isChecked: false },
    { id: 3, language: "both", label: "Both (+2,000 SAR)", isChecked: false },
  ]);

  const [coinIcon, setCoinIcon] = useState(greenIcon);
  const [textColor, setTextColor] = useState("#1BA56F");
  const [showDetails, setDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 440);
  const [openPopup, setOpenPopup] = useState(false);
  const selectedItems = bundlAddons.bundle_details?.flatMap((bundle) =>
    bundle.design_list.map((design) => ({
      ...design,
      quantity: quantities[design.name_english] || design.quantity,
      total_price: design.total_price,
      total_time: (quantities[design.name_english] || 1) * design.time,
    }))
  );

  const handleAddOnChange = (id, language) => {
    setAddOnLang((prev) =>
      prev.map((ele) =>
        ele.id === id && ele.language === language
          ? { ...ele, isChecked: true }
          : { ...ele, isChecked: false }
      )
    );
  };

  const toastErrorMessage = (msg) => {
    const message = msg;

    if (newToastId) {
      toast.dismiss(newToastId);
    }

    newToastId = toast(message, {
      duration: 3000,
      style: {
        color: "#f175ad",
        border: `1px solid #f175ad`,
        fontWeight: "700",
        background: "#fff",
        boxShadow: "none",
        borderRadius: "0px",
      },
    });
  };

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0 });
    getBundlData();
    // getprojects()
  }, []);

  useEffect(() => {
    if (user?.is_active) {
      getprojects();
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 440);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRadioChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const validateFields = async () => {
    const isToast = await getprojects();
    if (isToast === false) {
      return false;
    }

    if (brandInput === undefined || brandInput?.trim() == "") {
      // if (!toast.isActive("required-value-toast")) {
      //   toast.error(
      //     lang === "ar" ? "الحد اختر اسمًا لمشروعك" : `Name your brand`,
      //     {
      //       position: toast?.POSITION?.TOP_RIGHT,
      //       toastId: "required-value-toast",
      //       autoClose: 3000,
      //       icon: false,
      //       style: {
      //         color: "#D83D99",
      //         fontWeight: "700",
      //       },
      //     }
      //   );
      // }

      if (!activeToasts.current["required-value-toast"]) {
        activeToasts.current["required-value-toast"] = true;

        // Do your validation logic here — no popup, no toast
        const element = document.getElementById("brandInput");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        setBrandError(true);

        // Reset the flag after 3 seconds
        setTimeout(() => {
          activeToasts.current["required-value-toast"] = false;
        }, 3000);
      }

      const element = document.getElementById("brandInput");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setBrandError(true);
      return false;
    }

    return true;
  };
  const getBundlData = async () => {
    setLoading(true);
    const colors = {
      // '12':'#f175ad',
      // '4':'#1BA56F',
      // '22':"#00A8C8",
      // '13':'#f175ad',
      newbie: "#f175ad",
      foodie: "#1BA56F",
      socialite: "#00A8C8",
      boutiquer: "#f175ad",
    };
    if (state && "project_name" in state) {
      setBrandInput(state.project_name);
    }
    if (packageID == "newbie") {
      setCoinIcon(pinkIcon);
    } else if (packageID == "foodie") {
      setCoinIcon(greenIcon);
    } else if (packageID == "socialite") {
      setCoinIcon(blueIcon);
    } else if (packageID == "boutiquer") {
      setCoinIcon(pinkIcon);
    }
    setTextColor(colors[packageID]);
    const response = await axios.get(
      `${base_url}/api/package/?bundle_id=${routeId[packageID]}`
      // ConfigToken()
    );
    setBundlAddons(response?.data);
    setPackageDetail(response?.data);
    const flatList = response?.data?.bundle_details?.flatMap(
      (item) => item.design_list
    );

    const data = flatList?.reduce((acc, item) => {
      acc[item.name_english] = item.quantity;
      return acc;
    }, {});
    setQuantities(data);
    setactual(data);
    setLoading(false);
  };
  const getprojects = async () => {
    const total_price =
      parseFloat(packageDetail?.package?.price) +
      addonPayLoads.total_price +
      (selectedLanguage === "Both" ? 2000 : 0);

    try {
      const response = await axios.get(`${base_url}/api/order/`, ConfigToken());
      if (response.data) {
        const resProjects = response.data.data.filter(
          (item) => item.order_status != "in_cart"
        );
        if (
          resProjects?.length === 0 &&
          total_price < 4880 &&
          packageID == "newbie"
        ) {
          toastErrorMessage(
            lang === "ar"
              ? "الأدنى للطلب يجب أن يكون 4,880"
              : `Minimum order amount should be 4880`
          );
          return false;
        }
      }
    } catch (e) {
      navigate(`/login?next_url=bundldetail/${packageID}`, {
        state: {
          project_name: brandInput,
        },
      });
    }
  };

  const colors = {
    newbie: "#f175ad",
    foodie: "#1BA56F",
    socialite: "#00A8C8",
    boutiquer: "#f175ad",
  };

  const [themeColor, setThemeColor] = useState("#000");

  useEffect(() => {
    const path = window.location.href.split("/")[4];
    if (colors[path]) {
      setThemeColor(colors[path]);
    }
  }, []);

  const toastMessage = () => {
    const message =
      lang === "ar" ? "تم تحديث السلة بنجاح." : "Cart updated successfully";

    if (newToastId) {
      toast.dismiss(newToastId);
    }

    newToastId = toast(message, {
      duration: 3000,
      style: {
        color: themeColor,
        border: `1px solid ${themeColor}`,
        fontWeight: "700",
        background: "#fff",
        boxShadow: "none",
        borderRadius: "0px",
      },
    });
  };

  const NewToastSuccMessage = (msg) => {
    const message = msg;

    if (newToastId) {
      toast.dismiss(newToastId);
    }

    newToastId = toast(message, {
      duration: 3000,
      style: {
        color: themeColor,
        border: `1px solid ${themeColor}`,
        fontWeight: "700",
        background: "#fff",
        boxShadow: "none",
        borderRadius: "0px",
      },
    });
  };

  const calculateAmount = (id, amount, payload) => {
    if (id === "1") {
      if (payload === "convertPayload") {
        return Number(amount) + 2000;
      } else {
        return amountDecimal(Number(amount) + 2000);
      }
    } else {
      const totalQty = Number(id) - 1;
      const cal = totalQty * ((Number(amount) + 2000) / 2); // 2000 / 2 = 1000
      if (payload === "convertPayload") {
        return cal + Number(amount) + 2000;
      } else {
        return amountDecimal(cal + Number(amount) + 2000);
      }
    }
  };

  const handleQuantityChange = (designName, change) => {
    const colors = {
      // '12':'#f175ad',
      // '4':'#1BA56F',
      // '22':"#00A8C8",
      // '13':'#f175ad',
      newbie: "#f175ad",
      foodie: "#1BA56F",
      socialite: "#00A8C8",
      boutiquer: "#f175ad",
    };

    if (designName in extraQty == false && change < 0) {
      setMinError([...minError, designName]);
      return;
    } else if (extraQty[designName] == 0 && change < 0) {
      setMinError([...minError, designName]);
      return;
    } else {
      setMinError((prevErrors) =>
        prevErrors.filter((error) => error !== designName)
      );
    }

    toastMessage();
    // toast.success(`Cart updated successfully`, {
    //   position: toast?.POSITION?.TOP_RIGHT,
    //   toastId: "required-value-toast1",
    //   autoClose: 3000,
    //   icon: false,
    //   style: {
    //     color: colors[packageID],
    //     fontWeight: "700",
    //     border: `1px solid ${colors[packageID]}`,
    //     borderRadius: "0px",
    //   },
    // });
    setExtraQty((prevQuantities) => {
      let newQuantity = (prevQuantities[designName] || 0) + change;
      return {
        ...prevQuantities,
        [designName]: newQuantity,
      };
    });
  };

  const emptyCart = async () => {
    setOpenPopup(false);
    await axios.delete(`${base_url}/api/order/cart/`, ConfigToken());
    // addToCart(selectedIndex)
    // toast.success("Cart emptied,Now Checkout", {
    //   icon: false,
    //   style: {
    //     color: "#1BA56F",
    //     fontWeight: "700", // White text
    //   },
    // });
    NewToastSuccMessage(
      lang === "ar"
        ? "التسوق يرجى إضافة عنصر إلى سلة"
        : `Please add an Item to Checkout`
    );
    createPayload();
  };

  // <<<<<<< cartChanges-V.4
  //   const createPayload = async () => {
  //     if (brandInput?.trim() === "") {
  //       const element = document?.getElementById("brandInput");
  //       if (element) {
  //         element.scrollIntoView({ behavior: "smooth", block: "center" });
  //       }
  //       setBrandError(true);
  //       return;
  // =======
  const createPayload = async () => {
    if (brandInput?.trim() === "") {
      const element = document?.getElementById("brandInput");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setBrandError(true);
      return;
    }

    const isValid = await validateFields();
    if (!isValid) {
      return;
    }

    if (!bundlAddons.bundle_details) {
      console.warn("No bundle details available yet.");
      return;
    }

    const item_list = bundlAddons.bundle_details.flatMap((bundle) =>
      bundle.design_list.map((design) => {
        const quantity = quantities[design.name_english] || 1;
        return {
          design_id: design.id,
          unit_price: design.price.toString(),
          unit_time: design.time.toString(),
          qty: quantity.toString(),
          item_type: "bundl",
        };
      })
    );

    const savedPayload = JSON.parse(localStorage.getItem("payloads") || "{}");
    const payload = isFromLogin
      ? savedPayload
      : {
          order_name: brandInput,
          bundle_id: routeId[packageID],
          total_time: packageDetail?.package?.time + addonPayLoads.total_time,
          total_price:
            parseFloat(packageDetail?.package?.price) +
            addonPayLoads.total_price +
            (selectedLanguage === "Both" ? 2000 : 0),
          item_list: item_list,
          addons: addonPayLoads,
          order_status: "in_cart",
          language: selectedLanguage,
          isBackToBundl: state?.isBackToBundl,
        };

    try {
      const response = await axios.get(
        `${base_url}/api/order/cart/`,
        ConfigToken()
      );

      const isCartConflict =
        response?.data?.order_status &&
        !state?.project_name &&
        routeId[packageID] !== response.data.bundle_id;

      const isReLoginFlow =
        response?.data?.order_status && state?.project_name && state?.fromLogin;

      if (isCartConflict || isReLoginFlow) {
        setOpenPopup(true);
      } else {
        localStorage?.setItem("payloads", JSON.stringify(payload));
        const updatedItemList = payload.addons.item_list.map((ele) => {
          if (
            ele.addon_name === "Logo & Identity" &&
            ele.category === "Branding" &&
            addOnLang.find((ele) => ele.id === 3)?.isChecked
          ) {
            return {
              ...ele,
              language: addOnLang.find((ele) => ele.isChecked).language,
              total_price: calculateAmount(
                ele.qty,
                ele.unit_price,
                "convertPayload"
              ),
            };
          } else {
            return ele;
          }
        });

        payload.addons.item_list = updatedItemList;
        const createResponse = await axios.post(
          `${base_url}/api/order/create/`,
          payload,
          ConfigToken()
        );
        navigate("/mycart", {
          state: { orderData: createResponse.data.data.data, selectedLanguage },
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      localStorage?.setItem("payloads", JSON.stringify(payload));
      navigate(`/login?next_url=bundldetail/${packageID}`, {
        state: { project_name: brandInput },
      });
    }
  };

  useEffect(() => {
    if (user?.is_active) {
      const getcartData = async () => {
        const response = await axios.get(
          `${base_url}/api/order/cart/`,
          ConfigToken()
        );
        if (
          (lang === "ar"
            ? packageDetail?.package?.name_arabic
            : packageDetail?.package?.name_english) ===
          (lang === "ar"
            ? response?.data?.bundl_arabic
            : response?.data?.bundl_english)
        ) {
          setBrandInput(response?.data?.project_name);
          setIsSameBundl(true);
        } else {
          setIsSameBundl(false);
        }
      };
      getcartData();
    }
  }, [user, lang, packageDetail]);

  useEffect(() => {
    const {
      headers: { authorization },
    } = ConfigToken();
    if (authorization !== "Token null") {
      const getcartData = async () => {
        const response = await axios.get(
          `${base_url}/api/order/cart/`,
          ConfigToken()
        );
        // const clickedItem = window.location.pathname.split("/")[2];
        // const cartItem = response?.data?.bundle_name
        //   ?.split(" ")[1]
        //   .toLowerCase();
        if (
          response.data.order_status === "in_cart" &&
          routeId[packageID] !== response?.data.bundle_id
        ) {
          setOpenPopup(response.data.order_status === "in_cart");
        } else {
          setOpenPopup(false);
        }
      };
      getcartData();
    }
  }, []);

  let isSelectedLanguage = selectedLanguage === "Both" && 2000;

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 475);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 475);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {loading ? (
        <Bgloader />
      ) : (
        <div style={{overflowX:"hidden"}}>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                color: themeColor,
                fontWeight: "700",
                border: `1px solid ${themeColor}`,
                borderRadius: "0px !important",
              },
            }}
          />
          {/* <ToastContainer /> */}
          <Navbar isLang={lang} setIsLang={setLang} />
          <div className="bundl-detail mt-3">
            <div
              className="xs:px-2 sm:px-auto px-auto"
              style={{ borderBottom: "1.5px solid #000000", width: "100%" }}
            >
              <h2 className="sm:text-[38px] text-[38px] xs:text-[24px]">
                {lang === "ar"
                  ? packageDetail?.package?.name_arabic
                  : packageDetail?.package?.name_english || ""}
              </h2>
              <div className="bundl-amount">
                <p style={{ color: textColor }} className="flex items-center">
                  <img
                    src={coinIcon}
                    alt="Dollar icon"
                    className={`inline-block ${
                      lang === "ar" ? "ml-3" : "mr-3"
                    }`}
                  />
                  <span>
                    {" "}
                    <span className="mr-0 font-[400]">
                      {packageID === "newbie"
                        ? lang === "ar"
                          ? "تبدأ من​"
                          : "Starting from"
                        : ""}
                    </span>{" "}
                    {packageID === "newbie"
                      ? amountDecimal(4880)
                      : amountDecimal(
                          Math.round(packageDetail?.package?.price)
                        ) || `${amountDecimal(3750)} SAR`}{" "}
                    {lang === "ar" ? "ريال" : "SAR"}
                  </span>
                </p>
                <p style={{ color: textColor }} className="items-center flex">
                  <AccessTimeIcon
                    className={`${lang === "ar" ? "ml-1" : "mr-1"}`}
                  />
                  <span>
                    {" "}
                    {packageDetail?.package?.time || "30 Days"}{" "}
                    {lang === "ar" ? "يوما" : "Days"}
                  </span>
                </p>
              </div>
              {/* <p className="bundl-desc-title text-[20px] sm:text-[20px] xs:text-[16px] w-full sm:w-full xs:w-[350px] mx-auto">
                {lang === "ar"
                  ? "نتائج تصميم الهوية والعناصر الإضافية."
                  : "Outcomes to Brand Identity + Add-ons."}
              </p> */}
              <p className="bundl-desc">
                {lang === "ar"
                  ? processArabicText(
                      packageDetail?.package?.description_arabic
                    )
                  : packageDetail?.package?.description_english || ""}
              </p>
              <p className="one-minor my-3">
                {lang === "ar"
                  ? "هذي الباقة تشمل تعديل مجاني واحد"
                  : "* This Bundl includes one minor revision"}
              </p>
            </div>

            <div className="bundl-section" style={{ position: "relative" }}>
              <div className="brand-details lg:!pt-16 md:!pt-[16] xs:!pt-8">
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
                        : {
                            fontSize: "18px",
                            fontWeight: "700",
                            lineHeight: "1.2",
                          }
                      : {
                          textAlign: lang === "ar" ? "right" : "left",
                          fontSize: "24px",
                          fontWeight: "700",
                        }
                  }
                >
                  {lang === "ar"
                    ? "ماهو اسم مشروعك؟​"
                    : "What is the name of your brand?"}
                </p>
                <input
                  id="brandInput"
                  className={`brand-input rounded-none ${
                    brandError && "!border-[#D83D99] rounded-none"
                  }`}
                  value={brandInput}
                  onChange={(e) => {
                    setBrandInput(e.target.value);
                    setBrandError(false);
                  }}
                />
                {brandError && (
                  <p className="text-[#D83D99]">
                    {lang === "ar"
                      ? "يرجى إدخال اسم المشروع"
                      : "Please enter name of the brand"}
                  </p>
                )}
                <div className="commerce-collateral">
                  {bundlAddons.bundle_details?.map((bundle, index) => {
                    return (
                      <div
                        key={index}
                        className="bundle-section"
                        // style={

                        //   window.innerWidth <= 475
                        //     ? { margin: "5% 0 0 0" }
                        //     : { margin: "3% 0 0 0" },
                        //     {cursor: "pointer"}
                        // }
                        style={{
                          margin:
                            window.innerWidth <= 475 ? "5% 0 0 0" : "3% 0 0 0",
                          cursor: "pointer",
                        }}
                      >
                        <p
                          className={`collateral-text mb-[2px] leading-[1.2] ${
                            lang === "ar" ? "text-right" : "text-left"
                          } ${
                            bundle.name_english === "Social Media Starter Kit"
                              ? "w-[80%]"
                              : "w-full"
                          }`}
                        >
                          {lang === "ar"
                            ? bundle.name_english === "Brand Identity"
                              ? "تصميم الهوية"
                              : bundle?.name_arabic
                            : bundle.name_english}
                        </p>
                        <p
                          className={`text-[16px] sm:text-[16px] xs:text-[16px] ${
                            lang === "ar" ? "text-right" : "text-left"
                          }`}
                          style={{ opacity: "50%" }}
                        >
                          {lang === "ar"
                            ? bundle.slogan_arabic
                            : bundle.slogan_english}
                        </p>
                        {bundle.name_english === "Brand Identity" ? (
                          <div
                            className={`${
                              lang === "ar" ? "text-right" : "text-left"
                            }`}
                            style={
                              window.innerWidth < 441
                                ? {
                                    display: "flex",
                                    width: "100%",
                                    flexWrap: "wrap",
                                  }
                                : {
                                    display: "flex",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                  }
                            }
                          >
                            <p className="logo-design xs:basis-[100%] sm:basis-1/4">
                              {lang === "ar" ? "تصميم الشعار" : "Logo design"}
                            </p>
                            <p className="mr-3">
                              <label className="cursor-pointer flex items-center leading-none mb-0">
                                <input
                                  type="radio"
                                  name="language"
                                  value="English"
                                  className={`${
                                    lang === "ar" ? "ml-2" : "mr-2"
                                  }`}
                                  checked={selectedLanguage === "English"}
                                  onChange={handleRadioChange}
                                />
                                {lang === "ar" ? "انجليزي" : "English"}
                              </label>
                            </p>

                            <p className="mr-3">
                              <label className="cursor-pointer flex items-center leading-none mb-0">
                                <input
                                  type="radio"
                                  name="language"
                                  value="Arabic"
                                  className={`${
                                    lang === "ar" ? "ml-2" : "mr-2"
                                  }`}
                                  checked={selectedLanguage === "Arabic"}
                                  onChange={handleRadioChange}
                                />
                                {lang === "ar" ? "عربي" : "Arabic"}
                              </label>
                            </p>

                            <p
                              className={`${
                                lang === "ar" ? "mr-3" : "mr-[-0.6rem]"
                              }`}
                            >
                              <label className="cursor-pointer flex items-center leading-none mb-0">
                                <input
                                  type="radio"
                                  name="language"
                                  value="Both"
                                  className={`${
                                    lang === "ar" ? "ml-2" : "mr-2"
                                  }`}
                                  checked={selectedLanguage === "Both"}
                                  onChange={handleRadioChange}
                                />
                                {lang === "ar"
                                  ? `كلاهما (+٢٠٠٠  ريال)`
                                  : `Both (+${amountDecimal(2000)} SAR)`}
                              </label>
                            </p>
                          </div>
                        ) : (
                          bundle.design_list.map((design, idx) => {
                            const isSingleItem =
                              bundle.design_list.length === 1;
                            const isLastIndex =
                              idx === bundle.design_list.length - 1;
                            const sectionClassName =
                              !isSingleItem && !isLastIndex
                                ? "commerce-sections"
                                : "commerce-sections1";
                            return (
                              <div
                                key={idx}
                                className={`flex flex-wrap justify-between pt-[2%] sm:pt-[2%] xs:pt-[5%] ${sectionClassName} w-[100%]`}
                              >
                                <p
                                  className={`sm:basis-[33%] basis-[33%] xs:basis-[66%] ${
                                    lang === "ar" ? "text-right" : "text-left"
                                  }`}
                                >
                                  {lang === "ar"
                                    ? processArabicText(design.name_arabic)
                                    : design.name_english}
                                </p>
                                {minError.includes(design.name_english) &&
                                  isMobile == false && (
                                    <div
                                      style={{ color: textColor }}
                                      className={`w-[47%] ${
                                        lang === "ar"
                                          ? "text-right"
                                          : "text-left"
                                      } text-[16px]`}
                                    >
                                      {lang === "ar"
                                        ? "لا يمكن تخفيض الحد الأدنى للكمية"
                                        : "Minimum quantity cannot be decreased"}
                                    </div>
                                  )}
                                <p
                                  className={` md:basis-auto basis-auto xs:basis-[10%] flex ${
                                    lang === "ar"
                                      ? "flex-row-reverse"
                                      : "flex-row"
                                  } items-center text-[#000000] h-[34px] border !border-[#000000]`}
                                >
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        design.name_english,
                                        -1
                                      )
                                    }
                                    className={`${
                                      lang === "ar" ? "border-r" : "border-r"
                                    } !border-[#000000] px-1 flex h-[100%] items-center`}
                                  >
                                    <RemoveIcon />
                                  </button>
                                  <span
                                    className={`${
                                      lang === "ar" ? "border-r" : "border-r"
                                    } !text-[20px] font-normal px-2 !border-[#000000]`}
                                  >
                                    {" "}
                                    {parseInt(design.quantity) +
                                      (extraQty[design.name_english] || 0)}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        design.name_english,
                                        1
                                      )
                                    }
                                    className="flex items-center px-1 "
                                  >
                                    <AddIcon />
                                  </button>
                                </p>
                                {minError.includes(design.name_english) &&
                                  isMobile && (
                                    <div
                                      style={{ color: textColor }}
                                      className={`w-[100%] ${
                                        lang === "ar"
                                          ? "text-right"
                                          : "text-left"
                                      } text-[16px]`}
                                    >
                                      {lang === "ar"
                                        ? "لا يمكن تخفيض الحد الأدنى للكمية"
                                        : "Minimum quantity cannot be decreased"}
                                    </div>
                                  )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    );
                  })}
                </div>
                <Accordian
                  textColor={textColor}
                  extraQty={extraQty}
                  accordianTitle={
                    lang === "ar"
                      ? "مشروعك يحتاج إضافات؟"
                      : "Something feels missing ?"
                  }
                  addOnPayload={setAddonPayLoads}
                  handleAddOnChange={handleAddOnChange}
                  bundlePackageId={routeId[packageID]}
                  isLang={lang}
                  isSameBundl={isSameBundl}
                  addOnLang={addOnLang}
                  handleQuantityChange={handleQuantityChange}
                />
              </div>
              {/* // border-black */}
              <div
                // className="
                //   bundl-summary
                //   sticky top-0 self-start

                //   border-l border-black border-r border-r-[rgba(0,0,0,0.1)]

                //   mb-[10%]
                //   transition-all duration-500 ease-in-out
                //   max-h-[80%] w-full
                //   xs:overflow-y-auto lg:overflow-visible md:overflow-visible
                // "

                style={{
                  // maxHeight: showDetails ? "80%" : "200px",
                  ...(isMobile ? { border: "1px solid" } : {}),
                  transition: "all 0.5s ease-in-out",
                }}
                className={`
                   
                ${!isMobile ? "sticky top-0 self-start" : null}
              

                  border-r border-r-[rgba(0,0,0,0.1)]
                 ${!isMobile ? "mb-[10%]" : null}
                  transition-all duration-500 ease-in-out
                bundl-summary  max-h-[80%] w-full
                  xs:overflow-y-auto lg:overflow-visible md:overflow-visible
                `}
              >
                {/* <div style={{borderRight: "1px solid #000000"}}></div> */}
                <div className="bundl-name ">
                  <p
                    className={`sm:text-[24px] xs:mb-0 xs:justify-between sm:block font-[700] px-0 !mb-2 display: flex
 ${lang === "ar" ? "text-right" : "text-left"}`}
                  >
                    <span className="font-normal">
                      {lang === "ar" ? "ملخص الطلب​" : "Summary"}
                    </span>
                    {isMobile && (
                      <button
                        onClick={() => setDetails(!showDetails)}
                        style={{ color: `${textColor}` }}
                        className="text-[14px] font-normal underline uppercase"
                      >
                        {lang === "ar"
                          ? showDetails
                            ? "إخفاء التفاصيل"
                            : "عرض التفاصيل"
                          : showDetails
                          ? "Hide Details"
                          : "Show Details"}
                      </button>
                    )}
                  </p>
                </div>
                {!isMobile || (isMobile && showDetails) ? (
                  <>
                    <div
                      style={{ display: "flex", padding: "1% 2%" }}
                      className="border-y-[1px] border-black"
                    >
                      <p
                        className={`sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[60%] mb-0 pt-0 ${
                          lang === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {lang === "ar"
                          ? packageDetail?.package?.name_arabic
                          : `${
                              packageDetail?.package?.name_english || ""
                            } Bundl`}
                      </p>
                      <p
                        className={`sm:text-[20px] text-[20px] ${
                          lang === "ar" ? "text-left" : "text-right"
                        } xs:text-[16px] font-[700] w-[38%] mb-0 pt-0`}
                      >
                        {amountDecimal(
                          Math.round(packageDetail?.package?.price)
                        )}{" "}
                        {lang === "ar" ? "ريال" : "SAR"}
                      </p>
                    </div>

                    {bundlAddons?.bundle_details?.map((bundleItem) => (
                      <div
                        key={bundleItem?.id}
                        className="border-b-[1px] border-black"
                      >
                        <p
                          className={`text-black sm:text-[20px] text-[20px] xs:text-[16px] font-[700] !mb-1 w-full px-[2%] mt-[3%] ${
                            lang === "ar" ? "text-right" : "text-left"
                          }`}
                        >
                          {lang === "ar"
                            ? bundleItem?.name_english === "Brand Identity"
                              ? "تصميم الهوية"
                              : bundleItem?.name_arabic
                            : bundleItem?.name_english}
                        </p>
                        {bundleItem?.design_list?.map((item, idx) => {
                          return (
                            <div
                              key={idx}
                              className={`one-brand-identity ${
                                idx !== bundleItem?.design_list?.length - 1 &&
                                "h-[25px]"
                              } xs:flex sm:block block flex-wrap justify-around`}
                            >
                              <div className="flex xs:w-[100%]  w-full">
                                <p
                                  className={`text-black sm:text-[18px] text-[18px] xs:text-[16px] font-[400] !mb-1 xs:w-[75%] lg:w-full md:w-full sm:w-full mt-[3px] ${
                                    lang === "ar" ? "text-right" : "text-left"
                                  }`}
                                >
                                  {item.quantity}{" "}
                                  {lang === "ar"
                                    ? item.name_arabic
                                    : item.name_english}{" "}
                                  <span className="sm:text-[16px] text-[16px] xs:text-[14px]">
                                    {item.id == "76" &&
                                      (selectedLanguage == "Both"
                                        ? "(English & Arabic)"
                                        : `(${selectedLanguage})`)}{" "}
                                  </span>
                                </p>
                                {item.id == "76" &&
                                selectedLanguage == "Both" ? (
                                  <p
                                    className={`sm:text-[18px] text-[18px] xs:text-[16px] font-[400] w-[50%] ${
                                      lang === "ar" ? "text-left" : "text-right"
                                    }`}
                                    style={{ color: textColor }}
                                  >
                                    +{" "}
                                    {item.quantity == 1
                                      ? amountDecimal(
                                          parseFloat(item.price) + 2000
                                        )
                                      : amountDecimal(
                                          parseFloat(item.price) +
                                            (parseFloat(item.price) / 100) *
                                              item.price_increment *
                                              (item.quantity - 1) +
                                            2000
                                        )}{" "}
                                    {lang === "ar" ? "ريال" : "SAR"}
                                  </p>
                                ) : (
                                  <p
                                    className={`sm:text-[18px] text-[18px] xs:text-[16px] font-[400] lg:w-[40%] md:w-[50%] xs:w-[27%]  ${
                                      lang === "ar" ? "text-left" : "text-right"
                                    }`}
                                    style={{ color: textColor }}
                                  >
                                    +{" "}
                                    {item.quantity == 1
                                      ? amountDecimal(parseFloat(item.price))
                                      : amountDecimal(
                                          parseFloat(item.price) +
                                            (parseFloat(item.price) / 100) *
                                              item.price_increment *
                                              (item.quantity - 1)
                                        )}{" "}
                                    {lang === "ar" ? "ريال" : "SAR"}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}

                    <div>
                      {addonPayLoads?.item_list?.length > 0 && (
                        <p
                          className={`lg:text-[20px] md:text-[20px] xs:text-[16px] mb-0 font-[700]  border-b-[1px] border-black px-[2%] py-[1%] ${
                            lang === "ar" ? "text-right" : "text-left"
                          }`}
                        >
                          {lang === "ar" ? "إضافات" : "Add ons"}
                        </p>
                      )}
                    </div>

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
                          {addons.map((addon, idx) => {
                            return (
                              <div
                                key={idx}
                                // className={`sm:block block flex-wrap justify-around ${
                                //   idx !== addons.length - 1
                                //     ? "h-[25px]"
                                //     : "border-b-[1px] border-black"
                                // } ${
                                //   addon.category === "Branding" &&
                                //   addon.addon_name === "Logo & Identity"
                                //     ? "mb-8" // or use inline style for spacing
                                //     : ""
                                // }
                                // ${
                                //   addon.category === "Branding" &&
                                //   addon.addon_name === "Logo Translation"
                                //     ? "mt-8" // or use inline style for spacing
                                //     : ""
                                // }

                                // `}

                                className={`sm:block block flex-wrap justify-around ${
                                  idx !== addons.length - 1
                                    ? "h-[25px]"
                                    : "border-b-[1px] border-black"
                                } ${
                                  addon.category === "Branding" &&
                                  addon.addon_name === "Logo & Identity" &&
                                  (addOnLang.find((ele) => ele.isChecked)
                                    ?.language === "both" ||
                                    addOnLang.find((ele) => ele.isChecked)
                                      ?.language === "English") &&
                                  window.innerWidth >= 475
                                    ? ""
                                    : ""
                                } ${
                                  addon.category === "Branding" &&
                                  addon.addon_name === "Logo Translation" &&
                                  window.innerWidth >= 475
                                    ? "mt-8"
                                    : ""
                                }`}
                              >
                                <div
                                  style={
                                    isMobileView
                                      ? {
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                        }
                                      : {}
                                  }
                                >
                                  <div
                                    className={`flex xs:w-[100%] w-full mx-4 ${
                                      addon.category === "Branding" &&
                                      addon.addon_name === "Logo & Identity"
                                        ? ""
                                        : ""
                                    }`}
                                    style={
                                      isMobileView
                                        ? {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                          }
                                        : {}
                                    }
                                  >
                                    <p
                                      className={`text-black sm:text-[18px] text-[18px] 
                                      xs:text-[16px] font-[400] !mb-1 ${
                                        window.innerWidth <= 475
                                          ? "lg:w-[50%]"
                                          : "lg:w-[50%]"
                                      } md:w-[50%] sm:w-full ${
                                        lang === "ar"
                                          ? "text-right"
                                          : "text-left"
                                      }`}
                                      style={
                                        isMobileView
                                          ? { marginBottom: "0px" }
                                          : {}
                                      }
                                    >
                                      {addon.qty}{" "}
                                      {/* {lang === "ar" ? (
                                        addon.addon_arabic
                                      ) : addon.addon_name ===
                                        "Logo & Identity" ? (
                                        <span>
                                          {addon.addon_name}(
                                          {addOnLang.find(
                                            (ele) => ele.isChecked
                                          )?.language === "both"
                                            ? "English & Arabic"
                                            : addOnLang.find(
                                                (ele) => ele.isChecked
                                              )?.language}
                                          )
                                        </span>
                                      ) : (
                                        addon.addon_name
                                      )} */}
                                      <span>
                                        {lang === "ar"
                                          ? addon.addon_arabic
                                          : addon.addon_name}
                                      </span>
                                    </p>
                                    <p
                                      className={`sm:text-[18px] text-[18px] xs:text-[16px] font-[400] lg:w-[40%] md:w-[50%]  md:pr-[44px] xs:w-[25%] ${
                                        lang === "ar"
                                          ? "text-left"
                                          : "text-right"
                                      }`}
                                      style={{
                                        ...(isMobile
                                          ? { marginBottom: "0px" }
                                          : {}),
                                        color: textColor,
                                      }}
                                    >
                                      +{" "}
                                      {addOnLang.find((ele) => ele.isChecked)
                                        ?.language === "both"
                                        ? calculateAmount(
                                            addon.qty,
                                            addon.unit_price,
                                            ""
                                          )
                                        : amountDecimal(addon.total_price)}{" "}
                                      {lang === "ar" ? "ريال" : "SAR"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                  </>
                ) : (
                  ""
                )}

                <div className="bundl-checkout sm:mt-3">
                  <div
                    className="total !font-[700]"
                    style={{ display: "flex" }}
                  >
                    <p
                      className="sm:mb-3 xs:mb-0 flex items-center !xs:text-[16px] !sm:text-[20px]"
                      style={{ width: "60%" }}
                    >
                      <img
                        src={BlackDollor}
                        alt="Total Price"
                        className="inline-block !font-[700] sm:ml-1 xs:ml-2"
                      />
                      <span
                        className={`${
                          lang === "ar" ? "mr-3" : "sm:ml-3 xs:ml-5"
                        } !font-[700]`}
                      >
                        {lang === "ar" ? "السعر الإجمالي :" : "Total Price :"}
                      </span>
                    </p>
                    <p
                      className={`!font-[700] ${
                        lang === "ar" ? "text-start" : "text-end"
                      } !xs:text-[16px] !sm:text-[20px] sm:mb-3 xs:mb-0`}
                      style={{ width: "40%" }}
                    >
                      {/* {amountDecimal(
                        parseFloat(
                          Number(packageDetail?.package?.price) +
                            Number(addonPayLoads?.total_price) + isSelectedLanguage && 2000
                        )
                      ) } */}
                      {amountDecimal(
                        Number(packageDetail?.package?.price) +
                          Number(addonPayLoads?.total_price) +
                          isSelectedLanguage
                      ) || 0}
                      {/* // (selectedLanguage === "Both"
                        //   ? amountDecimal(2000)
                        //   : "")} */}
                      {/* {lang === "ar" ? "ريال" : "SAR"} */}
                      {lang === "ar"
                        ? "\u00A0\u00A0\u00A0ريال"
                        : "\u00A0\u00A0\u00A0SAR"}
                    </p>
                  </div>
                  <div className="total" style={{ display: "flex" }}>
                    <p
                      className="!xs:text-[16px] flex items-center !sm:text-[20px]"
                      style={{ width: "60%" }}
                    >
                      <img
                        src={BlackTime}
                        alt="Total Duration"
                        className={`inline-block ${
                          lang === "ar" ? "mr-[-5px]" : ""
                        }`}
                      />
                      <span
                        className={`${
                          lang === "ar"
                            ? "mr-2 xs:mr-3.5"
                            : "xs:ml-4 sm:ml-1 ml-1"
                        }`}
                      >
                        {lang === "ar"
                          ? "المدة الإجمالية :"
                          : "Total Duration :"}
                      </span>
                    </p>
                    <p
                      className={`!xs:text-[16px] ${
                        lang === "ar" ? "text-start" : "text-end"
                      } !sm:text-[20px]`}
                      style={{ width: "40%" }}
                    >
                      {packageDetail?.package?.time + addonPayLoads.total_time}
                      {/* {lang === "ar" ? "يوما" : "Days"} */}
                      {lang === "ar"
                        ? "\u00A0\u00A0\u00A0\u00A0يوم"
                        : "\u00A0\u00A0Days"}
                    </p>
                  </div>

                  <div className="flex justify-center items-center">
                    {parseFloat(packageDetail?.package?.price) +
                      addonPayLoads.total_price >
                    700 ? (
                      <div className="flex flex-col gap-[2%]">
                        <button
                          style={{ backgroundColor: textColor }}
                          className={`proceed uppercase !bg-[${textColor}] mt-[3%]`}
                          onClick={createPayload}
                        >
                          {lang === "ar"
                            ? "المتابعة إلى السلة​"
                            : "Proceed to Cart"}
                        </button>

                        <button
                          style={{ backgroundColor: textColor }}
                          className={`proceed uppercase !bg-[${textColor}] mt-[3%]`}
                          onClick={() => {
                            window.location.reload();
                          }}
                        >
                          {lang === "ar" ? "إفراغ السلة" : "Empty Cart"}
                        </button>
                      </div>
                    ) : (
                      <button
                        style={{ backgroundColor: textColor }}
                        className={`proceed uppercase !bg-[${textColor}]`}
                        disabled
                      >
                        {lang === "ar" ? "المتابعة إلى السلة​" : "Proceed cart"}
                      </button>
                    )}
                  </div>
                  {/* {(firstOrder && packageID == 'newbie') && <p className='proceed-text'>{lang === 'ar' ? 'يجب أن يكون الحد الأدنى للمجموع أكثر من 700 ريال سعودي' : 'Your minimum total should be above 4880 SAR'}</p>} */}
                </div>
              </div>
            </div>
          </div>
          {window?.innerWidth >= 500 && <Footer isLang={lang} />}
        </div>
      )}
      {openPopup && (
        <Popup
          openpopup={openPopup}
          setPopup={setOpenPopup}
          title={""}
          subTitle={
            lang === "ar"
              ? "لديك عناصر في سلة التسوق. هل ترغب في"
              : "You already have items in your cart. Would you like to."
          }
          onClick={emptyCart}
          save={lang === "ar" ? "الاستمرار" : "Continue"}
          cancel={lang === "ar" ? "الإلغاء" : "Cancel"}
          cancelClick={setIsFromLogin}
          isLang={lang}
        />
      )}
    </>
  );
};
