import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Purchase/MyCart.css";
import { Navbar } from "../Common/Navbar/Navbar";
import { Footer } from "../Common/Footer/Footer";
import { Popup } from "../Common/Popup/Popup";
// import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "../../Images/BundlDetail/deleteicon.svg";
import BlackDollor from "../../Images/BundlDetail/blackdollor.svg";
import BlackTime from "../../Images/BundlDetail/blacktime.svg";
import { base_url } from "../Auth/BackendAPIUrl";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfigToken } from "../Auth/ConfigToken";
import PhoneNumberInput from "../Pages/PhoneNumberInput";
import backIcon from "../../Images/backIcon.svg";
import { useSearchParams } from "react-router-dom";
import { Bgloader } from "../Common/Background/Bgloader";
import ClipLoader from "react-spinners/ClipLoader";
import Riyal from "../../Images/BundlDetail/riyalnew.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { amountDecimal } from "../Utils/amountDecimal";
import toast, { Toaster } from "react-hot-toast";
import { processArabicText } from "../Utils/arabicFontParenthesisChecker";
import useToastMessage from "../Pages/Toaster/Toaster";

let toastId = null;
export const MyCart = ({ lang, setLang }) => {
  const { showToast, showErrorToast, showSuccessToast } = useToastMessage();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isDirect = searchParams.get("direct") === "true";
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [removedItems, setRemovedItems] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 440);
  const [phoneError, setPhoneError] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [profile, setProfile] = useState({});
  const [tax, setTax] = useState(false);
  const [isBack, setIsBack] = useState(false);

  const [popupMessage, setPopupMessage] = useState(
  lang === "ar"
    ? "هل أنت متأكد من إفراغ السلة؟"
    : "Are you sure you want to empty the cart?"
);

  const [routeNames, setRouteNames] = useState({
    4: "foodie",
    12: "newbie",
    13: "boutiquer",
    22: "socialite",
  });
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    promoCode: "",
    vat_registered: "",
    trn: "",
    language: localStorage.getItem("lang") === "ar" ? "arabic" : "english",
  });

  const [error, setError] = useState({});
  const [errors, setErrors] = useState({});

  const colors = {
    12: "#f175ad",
    4: "#1BA56F",
    22: "#00A8C8",
    13: "#f175ad",
  };

  const [themeColor, setThemeColor] = useState("#000");

  useEffect(() => {
    setThemeColor(colors[cartDetails.bundle_id]);
  }, [cartDetails]);

  // const toastMessage = () => {
  //   const message = "Cart updated successfully";

  //   if (toastId) {
  //     toast.dismiss(toastId);
  //   }

  //   toastId = toast(message, {
  //     duration: 3000,
  //     style: {
  //       color: themeColor,
  //       border: `1px solid ${themeColor}`,
  //       fontWeight: "700",
  //       background: "#fff",
  //       boxShadow: "none",
  //       borderRadius: "0px",
  //     },
  //   });
  // };

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0 });
    getCartData();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 440);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCartData = async () => {
    try {
      
      setLoading(true);
      // const response = await axios.get(`${base_url}/api/order/${location.state.orderData.id}/`);
      getProfile();

      const response = await axios.get(
        `${base_url}/api/order/cart/`,
        ConfigToken()
      );
      if (response.data) {
        setTotalAmount(response.data.total_amount);
        setCartDetails({
          ...response.data,
          actual_total_amount: response.data.total_amount,
        });
      }
      if (
        response.status === 206 ||
        (response?.data?.item_details?.bundle_items?.length === 0 &&
          response?.data?.item_details?.addon_items.length === 0)
      ) {
        setOpenPopup(true);
         setPopupMessage(lang === "ar" ? "سلة التسوق فارغة, الاستمرار لوحة التحكم" : "Your cart is empty, keep continuing to the dashboard");
      }
      if (response.status === 206) {
        setPopupMessage(lang === "ar" ? "سلة التسوق فارغة, الاستمرار لوحة التحكم" : "Your cart is empty, keep continuing to the dashboard");
      }
    } catch (e) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId, itemType) => {
    const existLocalData = JSON.parse(localStorage.getItem("payloads")) || {};
    if (itemType == "bundle") {
      toast.error(
        lang === "ar"
          ? "لا يمكن إزالة عنصر الباقة"
          : `Package Item Cannot removed`,
        {
          position: toast?.POSITION?.TOP_RIGHT,
          toastId: "required-value-toast",
          icon: false,
          style: {
            color: "#D83D99",
            fontWeight: "700",
          },
        }
      );
      return;
    }
    let cartDetailsTemp = cartDetails;
    const updatedItemDetails = { ...cartDetailsTemp.item_details };
    let updatedTotalAmount = cartDetailsTemp.actual_total_amount;
    console.log(updatedTotalAmount);
    let updatedTotalTime = cartDetailsTemp.total_time;
    setRemovedItems(itemId);
    // Handle removal based on item type
    const removedItem = updatedItemDetails.addon_items.find(
      (item) => item.id === itemId
    );
    updatedTotalAmount -= removedItem?.subtotal_price;

    const sorted = [...updatedItemDetails.addon_items].sort(
      (a, b) => b.unit_time - a.unit_time
    );
    if (sorted.length && sorted[0].id == itemId) {
      updatedTotalTime -= removedItem?.unit_time;
      if (sorted.length > 1) {
        updatedTotalTime += sorted[1].unit_time;
      }
    }
    updatedItemDetails.addon_items = updatedItemDetails.addon_items.filter(
      (item) => item.id !== itemId
    );

    // Recalculate the totals
    let updatedTax = 0; // Default value, assuming no tax
    let afterDiscount = updatedTotalAmount;
    if (coupon) {
      afterDiscount = afterDiscount - (afterDiscount / 100) * coupon.discount;
    }

    if (billingInfo.country.trim().toLowerCase() === "saudi arabia") {
      updatedTax = afterDiscount * 0.15; // Assuming VAT is 15%
    } else {
      updatedTax = 0; // No tax for countries other than Saudi Arabia
    }
    const updatedGrandTotal = afterDiscount + updatedTax;

    const response = await axios.patch(
      `${base_url}/api/order/cart/`,
      {
        item_to_delete: itemId,
        total_amount: updatedTotalAmount,
        tax: updatedTax,
        grand_total: updatedGrandTotal,
      },
      ConfigToken()
    );

    setCartDetails((prevCartDetails) => {
      if (existLocalData) {
        const addonsData = {
          order_name: "Addons",
          item_list: updatedItemDetails.addon_items.map((item) => ({
            design_id: item.item__id,
            addon_name: item.item_name,
            addon_arabic: item.item__name_arabic,
            category: item?.category,
            total_price: parseFloat(item.subtotal_price),
            item_type: item.item_type,
            unit_price: item.unit_price.toFixed(2),
            unit_time: item.unit_time.toFixed(2),
            qty: item.qty.toString(),
          })),
        };
        const updatedPayloads = {
          ...existLocalData,
          addons: addonsData,
        };
        localStorage.setItem("payloads", JSON.stringify(updatedPayloads));
      }

      return {
        ...prevCartDetails,
        item_details: updatedItemDetails,
        total_amount: afterDiscount,
        actual_total_amount: updatedTotalAmount,
        total_time: updatedTotalTime,
        tax: updatedTax,
        grand_total: updatedGrandTotal,
      };
    });
  };

  const getTotal = (countryValue, discount = null) => {
    let cartDetailsTemp = cartDetails;
    const updatedItemDetails = { ...cartDetailsTemp.item_details };
    let updatedTotalAmount = cartDetailsTemp.actual_total_amount;
    if (discount || coupon) {
      updatedTotalAmount =
        updatedTotalAmount -
        (updatedTotalAmount / 100) * (discount ? discount : coupon.discount);
    }
    let updatedTotalTime = cartDetailsTemp.total_time;
    // Handle removal based on item type
    // Recalculate the totals
    let updatedTax = 0; // Default value, assuming no tax
    let updatedTaxTreatment = 0;
    if (countryValue.toLowerCase() === "saudi arabia") {
      updatedTax = updatedTotalAmount * 0.15; // Assuming VAT is 15%
      updatedTaxTreatment = 15;
    }

    const updatedGrandTotal = parseFloat(updatedTotalAmount) + updatedTax;

    setCartDetails((prevCartDetails) => ({
      ...prevCartDetails,
      item_details: updatedItemDetails,
      total_amount: updatedTotalAmount,
      actual_total_amount: cartDetailsTemp.actual_total_amount,
      total_time: updatedTotalTime,
      tax: updatedTax,
      tax_treatment: updatedTaxTreatment,
      grand_total: updatedGrandTotal,
    }));
  };

  const validateFields = () => {
    let newErrors = {};

    if (!billingInfo.firstName.trim()) {
      setError({
        firstName:
          lang === "ar"
            ? "حقل الاسم الأول فارغ"
            : "Your first name field is empty.",
      });
      return false;
    } else if (/\d/.test(billingInfo.firstName)) {
      setError({ firstName: "First Name should not contain numbers." });
      return false;
    }
    if (!billingInfo.lastName.trim()) {
      setError({
        lastName:
          lang === "ar"
            ? "حقل اسم العائلة فارغ"
            : "Your last name field is empty.",
      });
      return false;
    } else if (/\d/.test(billingInfo.lastName)) {
      setError({ lastName: "Last Name should not contain numbers." });
      return false;
    }

    if (!billingInfo.email.trim()) {
      setError({
        email:
          lang === "ar"
            ? "حقل البريد الإلكتروني فارغ"
            : "Your email field is empty",
      });
      return false;
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(billingInfo.email)) {
      setError({ email: "Invalid email format" });
      return false;
    }
    if (!billingInfo.phone.trim()) {
      setError({
        phone:
          lang === "ar"
            ? "حقل رقم الهاتف فارغ"
            : "Your phone number field is empty.",
      });
      return false;
    }

    if (!billingInfo.country.trim()) {
      setError({
        country:
          lang === "ar" ? "حقل الدولة فارغ" : "Your country field is empty.",
      });
      return false;
    }
    if (!billingInfo.city.trim()) {
      setError({
        city: lang === "ar" ? "حقل المدينة فارغ" : "Your city field is empty.",
      });
      return false;
    }
    if (
      !billingInfo.vat_registered.trim() &&
      billingInfo?.country === "Saudi Arabia"
    ) {
      setError({
        vat_registered:
          lang === "ar"
            ? "حقل التسجيل الضريبي فارغ"
            : "Your tax treatment field is empty.",
      });
      return false;
    }
    if (!billingInfo.trn.trim() && billingInfo?.vat_registered === "vat") {
      setError({
        trn_number:
          lang === "ar"
            ? "حقل الرقم الضريبي فارغ"
            : "Your TRN Number field is empty.",
      });

      return false;
    }
    if (!billingInfo.postalCode.trim()) {
      setError({
        postalCode:
          lang === "ar"
            ? "حقل الرمز البريدي فارغ"
            : "Your postal code field is empty.",
      });
      return false;
    } else if (!/^[0-9]{2,5}$/.test(billingInfo.postalCode)) {
      setError({
        postalCode:
          lang === "ar"
            ? "خمسة أرقام يجب أن يكون الرمز البريدي من رقمين إلى "
            : "Your postal code must be 2 or 5 digits.",
      });
      return false;
    }

    setError(newErrors);

    return true;
  };
  const getProfile = async () => {
    const response = await axios.get(`${base_url}/api/profile/`, ConfigToken());
    if (response.data) {
      setProfile(response.data);
      setBillingInfo((prevState) => ({
        ...prevState,
        email: response.data.email,
      }));
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setPaymentLoading(true);
    if (validateFields()) {
      if (
        (cartDetails.total_amount >= 4800 &&
          cartDetails.bundl_english === "The Newbie") ||
        (cartDetails.total_amount >= 800 && cartDetails.bundl_english === "")
      ) {
        if (phoneError == false) {
          try {
            const formData = {
              ...billingInfo,
              user_name: billingInfo.firstName + " " + billingInfo.lastName,
              phone: billingInfo.phone,
              promo_code: billingInfo.promoCode,
              total_amount: cartDetails.total_amount,
              total_time: cartDetails.total_time,
              grand_total: cartDetails.grand_total,
              tax_treatment: cartDetails.tax_treatment,
              tax: cartDetails.tax,
              items_to_delete: removedItems,
              vat_registered:
                billingInfo?.vat_registered === "vat" ? true : false,
              trn:
                billingInfo?.vat_registered === "non_vat"
                  ? null
                  : billingInfo?.trn,
            };
            const response = await axios.put(
              `${base_url}/api/order/cart/?initiate=True`,
              formData,
              ConfigToken()
            );
            if (response.data) {
              window.location.href = response.data.data.redirect_url;
            }
            // navigate('/dashboard', { state: { reDirect: true} });
            console.log("Payment successful:", response.data);
          } catch (error) {
            console.error("Payment error:", error);
          } finally {
            setPaymentLoading(false);
          }
        }
      } else {
        // toast.error(
        //   lang === "ar"
        //     ? "لا يمكن إزالة عنصر الباقة"
        //     : `Package Item Cannot removed`,
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
        showErrorToast(
          lang === "ar"
            ? "الأدنى للطلب يجب أن يكون 4,880"
            : `Minimum order amount should be ${
                cartDetails.bundl_english === "The Newbie" ? 4880 : 800
              }`,
          cartDetails.bundl_english === "The Newbie" ? "#D83D99" : "#1BA56F"
        );
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setPaymentLoading(false);
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setPaymentLoading(false);
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    if (name === "vat_registered") {
      if (value === "vat") {
        setTax(true);
      } else {
        setTax(false);
      }
    }
    if (name == "country") {
      getTotal(value.trim());
    }
    if (["firstName", "lastName", "city"].includes(name)) {
      const regex = /^[a-zA-Z\s]*$/;
      if (regex.test(value) || value === "") {
        setBillingInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else if (name == "postalCode") {
      const regex = /^[0-9]*$/;
      if (regex.test(value) || value === "") {
        setBillingInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setBillingInfo({ ...billingInfo, [name]: value });
      delete errors[name];
      setErrors(errors);
    }
  };
  const handlePromoChange = async (e) => {
    const { name, value } = e.target;
    setCoupon(null);
    setBillingInfo({ ...billingInfo, [name]: value });
    const response = await axios.get(
      `${base_url}/api/promocode?promoCode=${value}`,
      ConfigToken()
    );
    if (response.status == 206) {
      setError({ ...errors, promoCode: response.data.data });
      getTotal(billingInfo.country.trim(), 0);
    } else if (response.status == 200) {
      setCoupon(response.data);
      getTotal(billingInfo.country.trim(), response.data.discount);
      delete errors["promoCode"];
      setError(errors);
    }
  };

  // const handleQuantityChange = async (addonId, change) => {
  //     console.log(addonId,change)
  //     const existLocalData = JSON.parse(localStorage.getItem('payloads')) || {};
  //     try {
  //         let newQty;
  //         let updatedDetails;

  //         setCartDetails((prevCartDetails) => {
  //             updatedDetails = { ...prevCartDetails };
  //             console.log('addons')
  //             updatedDetails.item_details.addon_items = updatedDetails.item_details.addon_items.map((addon) => {
  //                 if (addon.id === addonId) {
  //                     newQty = (addon.qty) + (change);

  //                     if (newQty < 0) {
  //                         newQty = addon.qty;
  //                         return addon;
  //                     }

  //                     return {
  //                         ...addon,
  //                         qty: newQty,

  //                     };
  //                 }
  //                 return addon;
  //             });
  //             console.log(updatedDetails,"add ons ")
  //             return updatedDetails;
  //         });

  //         if (newQty === 0) {
  //             removeItem(addonId, "addon");
  //             return;
  //         }

  //         setLoading(true)
  //         const qtyData = { qty: newQty } ;
  //         console.log(qtyData,"")
  //         const response = await axios.put(`${base_url}/api/order-item/${addonId}/`,qtyData, ConfigToken());

  //         const responseData = response.data;

  //         setCartDetails((prevCartDetails) => {
  //             const updatedDetails = { ...prevCartDetails };

  //             updatedDetails.item_details.addon_items = updatedDetails.item_details.addon_items.map((addon) => {
  //                 if (addon.id === responseData.data.id) {
  //                     if (existLocalData) {
  //                         const addonsData = {
  //                             order_name: "Addons",
  //                             item_list: updatedDetails?.item_details?.addon_items?.map(item =>({
  //                                 design_id: item.item__id,
  //                                 addon_name: item.item_name,
  //                                 addon_arabic: item.item__name_arabic,
  //                                   category:item?.category, // placeholder, update if dynamic
  //                                 total_price:parseFloat(responseData.data.subtotal_price),
  //                                 item_type: item.item_type,
  //                                 unit_price: item.unit_price.toFixed(2),
  //                                 unit_time: item.unit_time.toFixed(2),
  //                                 qty: item.qty.toString(),
  //                             }))
  //                         };

  //                         const updatedPayloads = {
  //                             ...existLocalData,
  //                             addons: addonsData
  //                         };
  //                         localStorage?.setItem('payloads', JSON.stringify(updatedPayloads))

  //                     }
  //                     return {
  //                         ...addon,
  //                         qty: responseData.data.qty,
  //                         status: responseData.data.status,
  //                         subtotal_price: parseFloat(responseData.data.subtotal_price),
  //                     };

  //                 }
  //                 return addon;
  //             });

  //             updatedDetails.grand_total = responseData.grand_total;
  //             updatedDetails.total_amount = responseData.total_amount;
  //             updatedDetails.total_time = responseData.total_time;

  //             return updatedDetails;
  //         });

  //         toast.success("Cart updated successfully", {
  //             position: toast?.POSITION?.TOP_RIGHT,
  //             toastId: "required-toast-qty",
  //             autoClose: 3000,
  //             style: {
  //                 color: "#1BA56F",
  //                 fontWeight: "700",
  //             },
  //         });
  //     } catch (error) {
  //         console.error("Error updating addon:", error);
  //     } finally {
  //         setLoading(false)
  //     }
  // };

  const handleQuantityChange = async (addonId, change) => {
    const existLocalData = JSON.parse(localStorage.getItem("payloads")) || {};

    const currentAddon = cartDetails?.item_details?.addon_items?.find(
      (addon) => addon.id === addonId
    );
    if (!currentAddon) return;

    let newQty = currentAddon.qty + change;

    if (newQty < 0) {
      newQty = currentAddon.qty;
    }

    if (newQty === 0) {
      removeItem(addonId, "addon");
      return;
    }

    try {
      setLoading(true);

      setCartDetails((prevCartDetails) => {
        const updatedDetails = { ...prevCartDetails };
        updatedDetails.item_details.addon_items =
          updatedDetails.item_details.addon_items.map((addon) => {
            if (addon.id === addonId) {
              return {
                ...addon,
                qty: newQty,
              };
            }
            return addon;
          });
        return updatedDetails;
      });

      const qtyData = { qty: newQty };
      const response = await axios.put(
        `${base_url}/api/order-item/${addonId}/`,
        qtyData,
        ConfigToken()
      );
      const responseData = response.data;

      setCartDetails((prevCartDetails) => {
        const updatedDetails = { ...prevCartDetails };
        updatedDetails.item_details.addon_items =
          updatedDetails.item_details.addon_items.map((addon) => {
            if (addon.id === responseData.data.id) {
              if (existLocalData) {
                const addonsData = {
                  order_name: "Addons",
                  item_list: updatedDetails.item_details.addon_items.map(
                    (item) => ({
                      design_id: item.item__id,
                      addon_name: item.item_name,
                      addon_arabic: item.item__name_arabic,
                      category: item?.category,
                      total_price: parseFloat(responseData.data.subtotal_price),
                      item_type: item.item_type,
                      unit_price: item.unit_price.toFixed(2),
                      unit_time: item.unit_time.toFixed(2),
                      qty: item.qty.toString(),
                    })
                  ),
                };
                const updatedPayloads = {
                  ...existLocalData,
                  addons: addonsData,
                };
                localStorage.setItem(
                  "payloads",
                  JSON.stringify(updatedPayloads)
                );
              }

              return {
                ...addon,
                qty: responseData.data.qty,
                status: responseData.data.status,
                subtotal_price: parseFloat(responseData.data.subtotal_price),
              };
            }
            return addon;
          });

        updatedDetails.grand_total = responseData.grand_total;
        updatedDetails.total_amount = responseData.total_amount;
        updatedDetails.actual_total_amount = responseData.total_amount;
        updatedDetails.total_time = responseData.total_time;

        return updatedDetails;
      });

      // toast.success("Cart updated successfully", {
      //   position: toast?.POSITION?.TOP_RIGHT,
      //   toastId: "required-toast-qty",
      //   autoClose: 3000,
      //   style: {
      //     color: "#1BA56F",
      //     fontWeight: "700",
      //     borderRadius:"0px"
      //   },
      // });
      // toastMessage();
      showSuccessToast(
  lang === "ar" ? "تم تحديث السلة بنجاح." : "Cart updated successfully",
  "#D83D99"
);
    } catch (error) {
      console.error("Error updating addon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    setShowModal(true);
  };

  const confirmNavigation = () => {
    setShowModal(false);
    localStorage?.removeItem("payloads");
    navigateToDetailHistory();
  };

  const navigateToDetailHistory = () => {
    if (cartDetails.bundle_id) {
      navigate(`/bundldetail/${routeNames[cartDetails.bundle_id]}`, {
        state: { project_name: cartDetails.project_name },
      });
    } else {
      navigate(`/custombundl`, {
        state: { project_name: cartDetails.project_name, isBackToCustom: true },
      });
    }
  };

  const cancelNavigation = () => {
    setShowModal(false);
  };


  return (
    <>
      {loading ? (
        <Bgloader />
      ) : (
        <div>
          {/* <ToastContainer /> */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                color: "#1BA56F",
                fontWeight: "700",
              },
            }}
          />
          <Navbar isLang={lang} setIsLang={setLang} />
          {showModal && (
            <div className="fixed inset-0 z-50  bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-none shadow-lg p-6 max-w-sm border-black border-[1px]">
                <p className="text-lg font-[400] text-gray-900 text-center">
                  Your Add-ons will be emptied.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={() => confirmNavigation()}
                    className="px-4 py-2 bg-[#0BA6C4] text-white rounded-none uppercase"
                  >
                    {lang === "ar" ? "نعم" : "Yes"}
                  </button>
                  <button
                    onClick={cancelNavigation}
                    className="px-4 py-2 text-black border-[1px] border-black rounded-none uppercase"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="mycart" style={{ position: "relative" }}>
            <div className="cart !xs:border-none  sm:!pb-[170px] !pb-[170px] xs:!pb-[20px]">
              <p className="flex font-[500]  !text-[18px] items-center text-black mt-[2%]">
                {" "}
                <img
                  src={backIcon}
                  className={`${
                    lang === "ar" ? "ml-2 scale-x-[-1]" : "mr-2"
                  } w-[30px] cursor-pointer`}
                  onClick={() => handleBackClick()}
                ></img>
                <span
                  className="cursor-pointer"
                  onClick={() => handleBackClick()}
                >
                  {lang === "ar" ? "العودة إلى الباقة" : " Back to Bundl"}
                </span>{" "}
              </p>
              {/* {isDirect == false && <p onClick={()=>handleBackClick()} className='flex font-[500] cursor-pointer !text-[18px] items-center text-black mt-[2%]'> <img src={backIcon} className='mr-2 w-[30px]' onClick={()=>handleBackClick()}></img> Back to Bundl </p>}           */}
              <p className="!xs:text-[16px] font-[700] !sm:text-[20px]">
                {lang === "ar" ? "عربة التسوق الخاصة بك" : "Your Cart"}
              </p>
              {isMobile ? (
                <>
                  {cartDetails?.item_details?.bundle_items?.length > 0 && (
                    <div className="flex justify-between border-b pb-2 !border-black">
                      <div>
                        <div className="font-[700] text-[20px]">
                          {lang === "ar"
                            ? processArabicText(cartDetails?.bundl_arabic)
                            : cartDetails?.bundl_english}
                        </div>
                        {/* <div className='font-[500] ml-8'> {Math.round(cartDetails.total_amount)} SAR</div> */}
                      </div>
                      {/* <p className='flex items-center !mb-0 justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(cartDetails.id, 'bundle')}/></p> */}
                    </div>
                  )}

                  {/* {cartDetails?.item_details?.bundle_items?.map((row,index) => (
                            <div className='flex justify-between border-b pb-2 !border-black'> 
                            <div>
                            <div className='font-[700] text-[20px]'>{row.item_name}</div>
                            <div className='font-[500] ml-8'> {row.unit_price} SAR</div>
                            </div>
                            <p className='flex items-center !mb-0 justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'bundle')}/></p>
                             </div>
                        ))} */}
                  <div className="mt-3">
                    {cartDetails?.item_details?.bundle_items?.map(
                      (row, index) => (
                        <div
                          className={`flex ${
                            index ===
                              cartDetails?.item_details?.bundle_items?.length -
                                1 && "border-b border-black"
                          } w-full`}
                        >
                          <div className="font-[700] "> {row.qty} </div>
                          {/* <div className="font-[700] text-[20px] ml-2">
                            {lang === "ar"
                              ? processArabicText(row.item__name_arabic)
                              : row.item_name}
                              
                          </div> */}
                          <div className="font-[700] text-[20px] ml-2">
                            {lang === "ar"
                              ? processArabicText(row.item__name_arabic)
                              : row.item_name}

                            {row?.item_name === "Logo & Identity" && (
                              <>
                                {" "}
                                {location?.state?.selectedLanguage === "Both"
                                  ? "(English & Arabic)"
                                  : location?.state?.selectedLanguage ===
                                    "English"
                                  ? "(English)"
                                  : location?.state?.selectedLanguage === "Arabic"
                                  ? "(Arabic)"
                                  : ""}
                              </>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  {cartDetails?.item_details?.addon_items?.length > 0 && (
                    <div
                      className={`font-[700] text-[20px] mt-2 ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {lang === "ar" ? "إضافات" : "Add ons"}
                    </div>
                  )}
                  {cartDetails?.item_details?.addon_items?.map((row, index) => (
                    <div
                      className={`flex ${
                        index ===
                          cartDetails?.item_details?.addon_items?.length - 1 &&
                        "border-b border-black"
                      } w-full mt-2`}
                    >
                      <div className="w-[70%]">
                        <div className="font-[700] text-[20px] ">
                          {lang === "ar"
                            ? processArabicText(row.item__name_arabic)
                            : row.item_name}
                        </div>
                        {/* <div className='font-[500] '> {row.subtotal_price} SAR</div> */}
                      </div>
                      <p
                        className={`xs:order-2 sm:order-3 sm:w-[29%] w-[29%] xs:w-[29%] max-h-[36px] !mb-2 flex justify-end`}
                      >
                        <button
                          style={{
                            borderColor: "black",
                            borderStyle: "solid",
                            borderWidth: "1px",
                          }}
                          onClick={() => handleQuantityChange(row?.id, -1)}
                          className={` ${
                            lang === "ar" ? " !border-l-0" : "!border-r-0"
                          } !py-[17px]  px-1  flex  items-center`}
                        >
                          <RemoveIcon />
                        </button>
                        <span
                          style={{
                            borderColor: "black",
                            borderStyle: "solid",
                            borderWidth: "1px",
                          }}
                          className={`${
                            lang === "ar" ? " !border-l-0" : "!border-r-0"
                          } px-2 !text-[20px]`}
                        >
                          {" "}
                          {row?.qty || 0}
                        </span>
                        <button
                          style={{
                            borderColor: "black",
                            borderStyle: "solid",
                            borderWidth: "1px",
                          }}
                          onClick={() => handleQuantityChange(row?.id, 1)}
                          className={`flex  items-center px-1  !py-[5px] `}
                        >
                          <AddIcon />
                        </button>
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <table className="w-full border-none" aria-label="simple table">
                  <thead>
                    <tr
                      className={`${
                        lang === "ar" ? "!text-right" : "!text-left"
                      } text-[20px]`}
                    >
                      <td
                        className={`${
                          lang === "ar" ? "text-right" : "text-left"
                        } w-[20%] text-[#00000080] pb-3`}
                      >
                        {lang === "ar" ? "الباقة" : "Item"}
                      </td>
                      {/* <td className='text-[#00000080] w-[30%] pb-3'  align="center">Quantity</td> */}
                      <td
                        className="text-[#00000080] w-[30%]    pb-3"
                        align="center"
                      >
                        {lang === "ar" ? "السعر​" : "Price"}
                      </td>
                      <td
                        className="text-[#00000080] w-[20%]    pb-3"
                        align="center"
                      >
                        {lang === "ar" ? "الإجراء" : "Action"}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <p className='text-[#000] font-[700] text-[20px]'>{cartDetails?.bundl_english}</p> */}
                    <>
                      {cartDetails?.item_details?.bundle_items?.length > 0 && (
                        <tr
                          className={`text-[#000] font-[700] text-[20px] border-b border-black mb-2 `}
                        >
                          <td
                            className={`${
                              lang === "ar" ? "text-right" : "textleft"
                            } !py-2`}
                            scope="row"
                          >
                            {lang === "ar"
                              ? processArabicText(cartDetails?.bundl_arabic)
                              : cartDetails?.bundl_english}
                          </td>
                          {/* <td className=' !py-2' align="center">{row.qty}</td> */}
                          <td className=" !py-2" align="center">
                            {" "}
                            {amountDecimal(
                              Math.round(
                                cartDetails?.bundle_price +
                                  (location?.state?.selectedLanguage ===
                                    "Both" && 2000)
                              )
                            )}
                          </td>
                          {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                          <td className=" !py-2" align="center">
                            {/* <p className='flex items-center !mb-0 justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(cartDetails.id, 'bundle')}/></p> */}
                          </td>
                        </tr>
                      )}
                    </>

                    {cartDetails?.item_details?.bundle_items?.map(
                      (row, index) => (
                        <tr
                          className={` ${
                            index ===
                              cartDetails?.item_details?.bundle_items?.length -
                                1 && "border-b border-black"
                          } w-full`}
                        >
                          <td className="text-[#000] font-[700] !text-[18px] !px-[2%] !py-1">
                            {row.qty}{" "}
                            {lang === "ar"
                              ? processArabicText(row.item__name_arabic)
                              : row?.item_name === "Logo & Identity"
                              ? `${row?.item_name} ${
                                  location?.state?.selectedLanguage === "Both"
                                    ? "(English & Arabic)"
                                    : location?.state?.selectedLanguage ===
                                      "English"
                                    ? "(English)"
                                    : location?.state?.selectedLanguage ===
                                      "Arabic"
                                    ? "(Arabic)"
                                    : ""
                                }`
                              : row?.item_name}
                          </td>
                        </tr>
                      )
                    )}

                    <tr
                      className={`text-[#000] font-[700] text-[20px] mb-2 mt-4`}
                    >
                      <td
                        className={`${
                          lang === "ar" ? "text-right" : "text-left"
                        } !py-2`}
                        scope="row"
                      >
                        {cartDetails?.item_details?.addon_items?.length > 0 &&
                          (lang === "ar" ? "إضافات" : "Add ons")}
                      </td>
                    </tr>
                    {cartDetails?.item_details?.addon_items?.map(
                      (row, index) => (
                        <tr
                          key={
                            lang === "ar"
                              ? processArabicText(row.item__name_arabic)
                              : row.item_name
                          }
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className={`text-[#000] font-[700] text-[18px] h-inherit ${
                            index ==
                            cartDetails?.item_details?.addon_items.length - 1
                              ? ""
                              : "border-b border-black"
                          } `}
                        >
                          <td className=" !py-2 w-[35%] !px-[2%]" scope="row">
                            {lang === "ar"
                              ? processArabicText(row.item__name_arabic)
                              : row.item_name}
                          </td>
                          {/* <td className=' !py-2' align="center">{row.qty}</td> */}
                          <td className=" !py-2 " align="center">
                            {amountDecimal(row.subtotal_price)}
                          </td>
                          {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                          <td align="center">
                            {/* <img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'addon')}/> */}
                            {/* <p className='flex items-center !mb-0 justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'addon')}/></p> */}
                            <p
                              className={`xs:order-2 sm:order-3 sm:w-[29%] w-[29%] xs:w-[29%] max-h-[36px] !mb-2 flex ${
                                lang === "ar"
                                  ? "flex-row-reverse"
                                  : "flex-row justify-end"
                              }   mt-2`}
                            >
                              <button
                                style={{
                                  borderColor: "black",
                                  borderStyle: "solid",
                                  borderWidth: "1px",
                                }}
                                onClick={() =>
                                  handleQuantityChange(row?.id, -1)
                                }
                                className={` ${
                                  lang === "ar" ? " !border-r-0" : "!border-r-0"
                                } !py-[17px]  px-1  flex  items-center`}
                              >
                                <RemoveIcon />
                              </button>
                              <span
                                style={{
                                  borderColor: "black",
                                  borderStyle: "solid",
                                  borderWidth: "1px",
                                }}
                                className={`${
                                  lang === "ar" ? " !border-r-0" : "!border-r-0"
                                } px-2 !text-[20px]`}
                              >
                                {" "}
                                {row?.qty || 0}
                              </span>
                              <button
                                style={{
                                  borderColor: "black",
                                  borderStyle: "solid",
                                  borderWidth: "1px",
                                }}
                                onClick={() => handleQuantityChange(row?.id, 1)}
                                className={`flex  items-center px-1  !py-[5px] `}
                              >
                                <AddIcon />
                              </button>
                            </p>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </div>

            <div className="billing sticky top-0 self-start">
              <p>{lang === "ar" ? "عنوان الفواتير" : "Billing Address"}</p>
              <form onSubmit={handlePayment} noValidate>
                <div className="user-name mb-[15px]">
                  <div className={`${lang === "ar" ? "ml-[4%]" : "mr-[4%]"}`}>
                    <label
                      className={`${
                        "firstName" in error ? "text-[#D83D99]" : "opacity-50"
                      }`}
                    >
                      {lang === "ar" ? "الاسم الأول" : "First Name"}{" "}
                      <span className="text-[#D83D99]">*</span>
                    </label>
                    <input
                      name="firstName"
                      value={billingInfo.firstName}
                      onChange={handleBillingChange}
                      className={`rounded-none ${
                        "firstName" in error ? "!border-[#D83D99]" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`${lang === "ar" ? "mr-[4%]" : "ml-[4%]"}`}
                    style={
                      lang === "ar"
                        ? { margin: "0% 2% 0 0%" }
                        : { margin: "0% 0 0 2%" }
                    }
                  >
                    <label
                      className={`${
                        "lastName" in error ? "text-[#D83D99]" : "opacity-50"
                      }`}
                    >
                      {lang === "ar" ? "اسم العائلة" : "Last Name"}{" "}
                      <span className="text-[#D83D99]">*</span>
                    </label>
                    <input
                      name="lastName"
                      value={billingInfo.lastName}
                      onChange={handleBillingChange}
                      className={`rounded-none ${
                        "lastName" in error ? "!border-[#D83D99]" : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="email mb-[15px]">
                  <label
                    className={`${
                      "email" in error ? "text-[#D83D99]" : "opacity-50"
                    }`}
                  >
                    {lang === "ar" ? "البريد الإلكتروني" : "Email"}{" "}
                    <span className="text-[#D83D99]">*</span>
                  </label>
                  <input
                    name="email"
                    value={billingInfo.email}
                    onChange={handleBillingChange}
                    className={`rounded-none ${
                      "email" in error ? "!border-[#D83D99]" : ""
                    }`}
                  />
                </div>
                <div className="phonenumber mb-[15px]">
                  <label
                    className={`${
                      "phone" in error ? "text-[#D83D99]" : "opacity-50"
                    }`}
                  >
                    {lang === "ar" ? "رقم الهاتف" : "Phone Number"}{" "}
                    <span className="text-[#D83D99]">*</span>
                  </label>
                  <PhoneNumberInput
                    name="phone"
                    placeholder={
                      lang === "ar" ? "رقم الهاتف" : "Enter Phone Number"
                    }
                    value={billingInfo.phone}
                    status={setBillingInfo}
                    extraInputClass={`${
                      "phone" in error
                        ? "!border-[#D83D99]"
                        : "!border-[#000000]"
                    } text-[18px]`}
                    setPhoneError={setPhoneError}
                    setErrors={setError}
                    formErrors={error}
                    idName={"vacancySelect"}
                    className="w-full  text-[18px]  rounded-none"
                  />
                </div>
                <div className="country mb-[15px]">
                  <div className={`${lang === "ar" ? "ml-[4%]" : "mr-[4%]"}`}>
                    <label
                      className={`${
                        "country" in error ? "text-[#D83D99]" : "opacity-50"
                      }`}
                    >
                      {lang === "ar" ? "بلد" : "Country"}{" "}
                      <span className="text-[#D83D99]">*</span>
                    </label>
                    <select
                      name="country"
                      // id='vacancySelect'
                      value={billingInfo.country || null}
                      onChange={handleBillingChange}
                      className={`!rounded-none ${
                        "country" in error ? "!border-[#D83D99]" : ""
                      } border !border-black px-2 py-[5px] w-full`}
                    >
                      <option value={null} disabled selected>
                        {" "}
                      </option>
                      {countries.map((country) => (
                        <option>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div
                    className={`${lang === "ar" ? "ml-[4%]" : "mr-[4%]"}`}
                    style={
                      lang === "ar"
                        ? { margin: "0% 2% 0 0%" }
                        : { margin: "0% 0 0 2%" }
                    }
                  >
                    <label
                      className={`${
                        "city" in error ? "text-[#D83D99]" : "opacity-50"
                      }`}
                    >
                      {lang === "ar" ? "مدينة" : "City"}
                      <span className="text-[#D83D99]">*</span>
                    </label>
                    <input
                      name="city"
                      value={billingInfo.city}
                      onChange={handleBillingChange}
                      className={`rounded-none ${
                        "city" in error ? "!border-[#D83D99]" : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="postal-code mb-[15px]">
                  <label
                    className={`${
                      "postalCode" in error ? "text-[#D83D99]" : "opacity-50"
                    }`}
                  >
                    {lang === "ar" ? "الرمز البريدي" : "Postal Code"}
                    <span className="text-[#D83D99]">*</span>
                  </label>
                  <input
                    name="postalCode"
                    value={billingInfo.postalCode}
                    onChange={handleBillingChange}
                    className={`rounded-none ${
                      "postalCode" in error ? "!border-[#D83D99]" : ""
                    }`}
                  />
                </div>
                {billingInfo?.country === "Saudi Arabia" && (
                  <div className="trn-code mb-[15px]">
                    <label
                      className={`${
                        "vat_registered" in error
                          ? "text-[#D83D99]"
                          : "opacity-50"
                      }`}
                    >
                      {lang === "ar" ? "التسجیل الضریبي" : "Tax Treatment"}
                      <span className="text-[#D83D99]">*</span>
                    </label>
                    <select
                      className={`w-[100%] py-[5px] px-2 !rounded-none border-[1px] outline-none  ${
                        "vat_registered" in error
                          ? "!border-[#D83D99]"
                          : "border-black border-solid"
                      } `}
                      name="vat_registered"
                      onChange={handleBillingChange}
                    >
                      <option value={null} disabled selected></option>
                      <option value={"vat"}>
                        {lang === "ar"
                          ? "مسجل بقیمة الضریبة المضافة"
                          : "VAT Registered"}
                      </option>
                      <option value={"non_vat"}>
                        {lang === "ar"
                          ? "غیر مسجل بقیمة الضریبة المضافة"
                          : "Non-VAT Registered"}
                      </option>
                    </select>
                  </div>
                )}

                {tax && (
                  <div className="trn-code mb-[15px]">
                    <label
                      className={`${
                        "trn" in error ? "text-[#D83D99]" : "opacity-50"
                      }`}
                    >
                      {lang === "ar" ? "الرقم الضریبي" : "TRN Number"}
                      <span className="text-[#D83D99]">*</span>
                    </label>
                    <input
                      name="trn"
                      value={billingInfo.trn}
                      onChange={handleBillingChange}
                      className={`rounded-none w-[100%] ${
                        "trn" in error ? "!border-[#D83D99]" : ""
                      }`}
                    />
                  </div>
                )}
                <div className="promo-code mb-[15px]">
                  <label
                    className={`${
                      "promoCode" in error ? "text-[#D83D99]" : "opacity-50"
                    }`}
                  >
                    {lang === "ar" ? "الرمز الترويجي" : "Promo Code"}
                  </label>
                  <input
                    name="promoCode"
                    value={billingInfo.promoCode}
                    onChange={handlePromoChange}
                    className={`rounded-none ${
                      "promoCode" in error ? "!border-[#D83D99]" : ""
                    }`}
                  />
                </div>

                <div className="cart-total-container border-[1px] border-black p-[2%_0_0_0]">
                  <div
                    className="total justify-between sm:pl-[3%] xs:pl-[3%] mr-4"
                    style={{ display: "flex" }}
                  >
                    <p
                      className="!text-[20px] xs:mb-0 sm:mb-auto !font-[400]"
                      // style={{ width: "50%" }}
                    >
                      {lang === "ar" ? "السعر :" : "Price:"}
                    </p>
                    <p
                      className="!text-[20px] xs:mb-0 sm:mb-auto text-right !font-[400]"
                      // style={{ width: "50%" }}
                    >
                      {amountDecimal(Math.round(cartDetails.total_amount))}
                      {/* {lang === "ar" ? "ريال" : "SAR"} */}
                      {lang === "ar" ? "\u00A0\u00A0ريال" : "\u00A0\u00A0SAR"}
                    </p>
                  </div>
                  <div
                    className="total justify-between sm:pl-[3%] xs:pl-[3%] mr-4"
                    style={{ display: "flex" }}
                  >
                    <p
                      className="!text-[20px] !font-[400]"
                      // style={{ width: "53%" }}
                    >
                      {lang === "ar" ? "ضريبه القيمه المضافه :" : "TAX:"}
                    </p>
                    <p
                      className="!text-[20px] text-right !font-[400]"
                      // style={{ width: "40%" }}
                    >
                      {amountDecimal(Math.round(cartDetails.tax))}
                      {/* {lang === "ar" ? "ريال" : "SAR"} */}
                      {lang === "ar" ? "\u00A0\u00A0ريال" : "\u00A0\u00A0SAR"}
                    </p>
                  </div>
                  <div className="border-t-[1px] border-black p-[2%_0_0_2%]">
                    <div
                      className="justify-between font-[700] mr-4"
                      style={{ display: "flex" }}
                    >
                      <p
                        className="!text-[20px] xs:mb-0 sm:mb-auto ml-[6px]"
                        // style={{ width: "50%" }}
                      >
                        <img
                          src={BlackDollor}
                          className={`inline-block  ${
                            lang === "ar" ? "ml-[18px]" : "mr-[18px]"
                          }`}
                        ></img>
                        {lang === "ar" ? "السعر الإجمالي :" : "Total Price :"}
                      </p>
                      <p
                        className="!text-[20px] xs:mb-0 sm:mb-auto text-right"
                        // style={{ width: "40%" }}
                      >
                        {cartDetails.grand_total
                          ? amountDecimal(Math.round(cartDetails.grand_total))
                          : 0}
                        {/* {lang === "ar" ? "ريال" : `${"  "}SAR`}{" "} */}
                        {lang === "ar" ? "\u00A0\u00A0ريال" : "\u00A0\u00A0SAR"}
                      </p>
                    </div>
                    <div
                      className="justify-between  font-[700] mr-4"
                      style={{ display: "flex" }}
                    >
                      <p className="!text-[20px] mb-0">
                        <img
                          src={BlackTime}
                          className={`inline-block ${
                            lang === "ar" ? "ml-3 mr-[-5px]" : "mr-3"
                          }`}
                        ></img>
                        {lang === "ar"
                          ? "المدة الإجمالية :"
                          : "Total Duration :"}
                      </p>
                      <p
                        className="!text-[20px]  text-right "
                        // style={{ width: "43%" }}
                      >
                        {isNaN(Math.round(cartDetails.total_time))
                          ? 0
                          : Math.round(cartDetails.total_time)}
                        {lang === "ar" ? "\u00A0\u00A0\u00A0يوم" : "\u00A0Days"}
                      </p>
                    </div>
                  </div>
                </div>

                <button className="payment uppercase">
                  {paymentLoading ? (
                    <ClipLoader
                      color={"#FFFFFF"}
                      loading={paymentLoading}
                      size={25}
                    />
                  ) : lang === "ar" ? (
                    "المتابعة إلى الدفع​"
                  ) : (
                    "Proceed to payment​"
                  )}
                </button>

                <button
                  className="mt-[5%] h-[40px] w-[100%] bg-[#ffffff] border-black border-[1px] text-black hover:text-white hover:bg-black uppercase"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  {lang === "ar" ? "تعديل الطلب" : "Edit order"}
                </button>

                <p className="text-[#D83D99] !text-[18px] !font-[400] !mt-2">
                  {Object.values(error).map((item) => {
                    return item;
                  })}
                </p>
              </form>
            </div>
          </div>
          <Footer isLang={lang} />
          {openPopup && (
            <Popup
              openpopup={openPopup}
              isCancel={true}
              setPopup={setOpenPopup}
              title={popupMessage}
              // subTitle={'Are you sure, you want to empty the cart.'}
              onClick={() => navigate("/")}
              save={"Continue to Homepage"}
              // cancel={'Cancel'}
              isLang={lang}
            />
          )}
        </div>
      )}
    </>
  );
};
