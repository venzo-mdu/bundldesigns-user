import React, { useState, useEffect } from "react";
import axios from "axios";
import { ConfigToken } from "../Auth/ConfigToken";
import { base_url } from "../Auth/BackendAPIUrl";
import { Footer } from "../Common/Footer/Footer";
import { Navbar } from "../Common/Navbar/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dollorIcon from "../../Images/green staked coin.svg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import uploadIcon from "../../Images/uploadIcon.svg";
import BlackDollor from "../../Images/BundlDetail/blackdollor.svg";
import BlackTime from "../../Images/BundlDetail/blacktime.svg";
import downArrow from "../../Images/down-arrow.svg";
import upArrow from "../../Images/up-arrow.svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "../../Images/editIcon.svg";
import { Popup } from "../Common/Popup/Popup";
import DeleteIcon from "../../Images/BundlDetail/deleteicon.svg";
import PhoneNumberInput from "./PhoneNumberInput";
import CloseIcon from "@mui/icons-material/Close";
// import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { amountDecimal } from "../Utils/amountDecimal";
import toast, { Toaster } from "react-hot-toast";
import useToastMessage from "./Toaster/Toaster";
import { processArabicText } from "../Utils/arabicFontParenthesisChecker";
import backIcon from "../../Images/backIcon.svg";
import Typography from "@mui/material/Typography";
import useDynamicMargin from "./customCom";

let newToastId = null;
export default function Adjustments({ user, lang, setLang }) {
  const dynamicMargin = useDynamicMargin();
  const { showToast, showErrorToast } = useToastMessage();
  const { state } = useLocation();
  const { orderId, orderItemId } = state;
  const [page, setPage] = useState("adjustment");
  const navigate = useNavigate();
  const [itemId, setItemId] = useState();
  // const [adjustmentForm, setAdjustmentForm] = useState({ content: '', file_name: '' })
  const [adjustmentForm, setAdjustmentForm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [order, setOrder] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [adjustments, setAdjustments] = useState([]);
  const [adjustmenTab, setAdjustmentTab] = useState(0);
  const [expantedTabs, setExpantedTabs] = useState([]);
  const [designListTab, setDesignListTab] = useState("Branding");
  const [bundlAddons, setBundlAddons] = useState([]);
  const [itemsList, setItemList] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [tax, setTax] = useState(0);
  const [adjustmentData, setAdjustmentsData] = useState({});
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: user?.email,
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    promoCode: "",
    vat_registered: "",
    trn: "",
  });
  const [error, setError] = useState({});
  const [errors, setErrors] = useState({});
  const [phoneError, setPhoneError] = useState(false);
  const [showDetails, setDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 475);
  const [showModal, setShowModal] = useState(false);
  const [istax, setIsTax] = useState(false);
  const stylesBtn = [
    "50%",
    "50%",
    "50%",
    "50%",
    "100%",
    "50%",
    "50%",
    "100%",
    "100%",
  ];

  const [adjustmentError, setAdjustmentError] = useState(false);

  const stylesBtnAccordian = ["40%", "60%", "60%", "40%", "45%", "55%", "100%"];

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

  const [addOnLang, setAddOnLang] = useState([
    { id: 1, language: "English", label: "English", isChecked: true },
    { id: 2, language: "Arabic", label: "Arabic", isChecked: false },
    { id: 3, language: "both", label: "Both (+2,000 SAR)", isChecked: false },
  ]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // or "smooth" if you want animation
    });
  }, []);

  useEffect(() => {
    getOrderDetails();
    getBundlData();
  }, []);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    if (name === "vat_registered") {
      if (value === "vat") {
        setIsTax(true);
      } else {
        setIsTax(false);
      }
    }
    if (name === "country") {
      let temptax = totalPrice * (value === "Saudi Arabia" ? 0.15 : 0);
      console.log(temptax);
      setTax(temptax);
    }
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  console.log(billingInfo, istax);
  // const toggleDescription = (id) => {
  //     setExpantedTabs((prevState) => ({
  //         ...prevState,
  //         [id]: !prevState[id] // Toggle the state for the clicked vacancy
  //     }));
  // };
  const toggleDescription = (id) => {
    setExpantedTabs((prevState) => ({
      [id]: !prevState[id] ? true : false, // Toggle only if not already true
    }));
  };
  console.log(expantedTabs);

  const getOrderDetails = async () => {
    const response = await axios.get(
      `${base_url}/api/order/${orderId}/`,
      ConfigToken()
    );
    if (response.data) {
      setOrder(response.data.data);
      if (orderItemId) {
        getAdjustments(orderItemId);
        setItemId(orderItemId);
      } else {
        setItemId(response.data.data.brand_identity.id);
        getAdjustments(response.data.data.brand_identity.id);
      }
    }
  };
  const getAdjustments = async (designId) => {
    const response = await axios.get(
      `${base_url}/api/adjustments/${designId}/`,
      ConfigToken()
    );
    if (response.data) {
      setAdjustments(response.data.data);
      response.data.data.length &&
        setAdjustmentTab(
          lang === "ar"
            ? response.data.data[0].arabic_adjustment_name
            : response.data.data[0].english_adjustment_name
        );
    }
  };

  const getBundlData = async () => {
    const response = await axios.get(`${base_url}/api/package/`, ConfigToken());
    setBundlAddons(response.data.designs_details);
    setDesignListTab(Object.keys(response.data.designs_details)[0]);
  };

  const adjustmentForEachItem = (item, id) => {
    if (item?.qty === 1) {
      item[id].total_price = parseFloat(
        (item[id].total_price - item[id].price).toFixed(2)
      );
    } else {
      const priceDecrementValue =
        (Number(item[id].price) * Number(item[id]?.price_increment)) / 100;

      item[id].total_price = parseFloat(
        (item[id].total_price - priceDecrementValue).toFixed(2)
      );
    }
  };

  const calculateAmount = (id, amount) => {
    if (id === "1") {
      return amountDecimal(Number(amount) + 2000);
    } else {
      const totalQty = Number(id) - 1;
      const cal = totalQty * ((Number(amount) + 2000) / 2); // 2000 / 2 = 1000
      return amountDecimal(cal + Number(amount) + 2000);
    }
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getDynamicMargin = () => {
    if (width <= 1280 && width <= 1330) return "ml-[15%]";
    else if (width <= 1280) return "ml-[17%]";
    else return "";
  };

  const toastErrorMessage = (msg, color, fontWeight) => {
    const message = msg;

    if (newToastId) {
      toast.dismiss(newToastId);
    }

    newToastId = toast(message, {
      duration: 3000,
      style: {
        color: color,
        border: `1px solid ${color}`,
        fontWeight: fontWeight,
        background: "#fff",
        boxShadow: "none",
        borderRadius: "0px",
      },
    });
  };

  const addData = (id, index) => {
    const elementValue = document.getElementById(`${id}_content`).value;
    if (!elementValue) {
      setAdjustmentError(true);
      return;
    }
    setAdjustmentsData((prev) => {
      const updatedData = {
        ...prev,
        [id]: {
          ...adjustments[index], // always copy all properties from the adjustment
          ...prev[id], // keep any previous user data (like attachments)
          content: elementValue, // update content
        },
      };
      updateTotals(itemsList, updatedData);
      return updatedData;
    });
    setErrorMsg(null);
    showToast("Updated Successfully", "#1BA56F");
  };

  const overAllAmount = (items = {}, adjustments = {}) => {
    const selectedLanguage = addOnLang.find((ele) => ele.isChecked)?.language;
    let total = 0;
    for (const key in items) {
      const item = items[key];
      const quantity = item.qty || 0;
      const basePrice = parseFloat(item.price || 0);
      const increment = item.price_increment || 0;

      let currentTotal = 0;

      if (
        item.name_english === "Logo & Identity" &&
        selectedLanguage === "both"
      ) {
        if (quantity === 1) {
          currentTotal = basePrice + 2000;
        } else if (quantity > 1) {
          const additionalUnits = quantity - 1;
          const incrementedPricePerUnit =
            (((basePrice + 2000) * increment) / 100) * additionalUnits;
          currentTotal = basePrice + 2000 + incrementedPricePerUnit;
        }
      } else {
        currentTotal =
          quantity === 1
            ? basePrice
            : basePrice + ((basePrice * increment) / 100) * (quantity - 1);
      }

      total += currentTotal;
    }
    // Add adjustment prices (submitted edits)
    for (const key in adjustments) {
      const adj = adjustments[key];
      total += parseFloat(adj.price || 0);
    }
    return total;
  };

  const calculateTotals = (
    items = {},
    adjustments = {},
    selectedItem = null
  ) => {
    const totalPrice = overAllAmount(items, adjustments);

    const maxItemTime = Object.values(items || {}).reduce(
      (max, item) => Math.max(max, item.time || 0),
      0
    );
    const maxAdjustmentTime = Object.values(adjustments || {}).reduce(
      (max, adj) => Math.max(max, adj.time_limit || 0),
      0
    );

    const totalTime = Math.max(maxItemTime, maxAdjustmentTime);

    return {
      price: totalPrice,
      time: totalTime,
    };
  };

  const remove_item = (id) => {
    if (itemsList[id]) {
      adjustmentForEachItem(itemsList, id);
      itemsList[id].qty -= 1;

      if (itemsList[id].qty <= 0) {
        delete itemsList[id]; // Remove item completely if quantity is zero
      }
      const { price: total_price, time: total_time } = calculateTotals(
        itemsList,
        adjustmentData
      );
      showErrorToast(
        lang === "ar" ? "تم تحديث السلة بنجاح." : "Cart updated successfully",
        "#1BA56F"
      );
      setTotalPrice(total_price);
      setTotalTime(total_time);
    }
  };

  const updateTotals = (items, adjustments) => {
    const { price, time } = calculateTotals(items, adjustments);
    let temptax = price * (billingInfo.country === "Saudi Arabia" ? 0.15 : 0);
    setTax(temptax);
    setTotalPrice(price);
    setTotalTime(time);
  };

  const addItem = (index, key, id) => {
    showErrorToast(
      lang === "ar" ? "تم تحديث السلة بنجاح." : "Cart updated successfully",
      "#1BA56F"
    );
    setItemList((prev) => {
      const current = prev[id] ? prev[id] : bundlAddons[key].design_list[index];
      const currentTotal =
        "qty" in current == false
          ? parseFloat(current.price || 0)
          : parseFloat(current.price || 0) +
            (parseFloat(current.price || 0) / 100) *
              (current.price_increment || 0) *
              current.qty;
      const updatedList = {
        ...prev,
        [id]: prev[id]
          ? { ...prev[id], qty: prev[id].qty + 1, total_price: currentTotal }
          : {
              ...bundlAddons[key].design_list[index],
              qty: 1,
              total_price: currentTotal,
            },
      };
      updateTotals(updatedList, adjustmentData);
      return updatedList;
    });
    setErrorMsg(null);
  };

  const CheckCart = async (id) => {
    if (state.purchaseAddOns && Object.keys(itemsList).length === 0) {
      setErrorMsg(
        lang === "ar"
          ? "لا يمكن أن يكون التعديل فارغًا"
          : "Adjustment cannot be empty"
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (
      !state.purchaseAddOns &&
      adjustmentData &&
      Object.values(adjustmentData).length === 0
    ) {
      setErrorMsg(
        lang === "ar"
          ? "لا يمكن أن يكون التعديل فارغًا"
          : "Adjustment cannot be empty"
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (
      Object.values(adjustmentData).length ||
      (state.purchaseAddOns && Object.keys(itemsList).length)
    ) {
      setPage("cart");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setErrorMsg(null);
    } else {
      setErrorMsg(
        lang === "ar"
          ? "يرجى تعبئة تفاصيل التعديل لإتمام الشراء"
          : "Please fill Adjustment details to checkout"
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const removeItem = (id, type) => {
    console.log(id, type);
    if (type == "adjustment") {
      delete adjustmentData[id];
      setAdjustmentsData(adjustmentData);
    } else {
      delete itemsList[id];
      console.log(itemsList);
      setItemList(itemsList);
    }
    console.log(itemsList, adjustmentData);
    updateTotals(itemsList, adjustmentData);
    if (
      page != "adjustment" &&
      Object.keys(itemsList).length === 0 &&
      Object.keys(adjustmentData).length === 0
    ) {
      setPage("adjustment"); // Redirect to the home page
    }
  };
  const uploadFile = async (e, id, index) => {
    if (e.target.files.length) {
      const formData = new FormData();
      setAdjustmentForm((prev) => ({
        ...prev,
        file_name: e.target.files[0]?.name,
      }));
      formData.append("file", e.target.files[0]);
      formData.append("file_name", e.target.files[0]?.name);
      const response = await axios.post(
        `${base_url}/api/upload_file/`,
        formData,
        ConfigToken()
      );
      setAdjustmentsData((prev) => {
        const updatedData = {
          ...prev,
          [id]: {
            ...prev[id],
            attachments: [
              response.data.file_url,
              ...(prev[id]?.attachments || []),
            ],
            file_name: [
              e.target.files[0]?.name || "",
              ...(prev[id]?.file_name || []),
            ],
            ...(prev[id] ? {} : adjustments[index]), // Add adjustments[index] only if prev[id] does not exist
          },
        };
        updateTotals(itemsList, updatedData); // Update totals with the latest data
        return updatedData; // Return the updated data to update the state
      });
    }
  };
  const validateFields = () => {
    let newErrors = {};

    if (
      !state.purchaseAddOns &&
      adjustmentData &&
      Object.values(adjustmentData).length === 0
    ) {
      // toast.error(
      //   lang === "ar"
      //     ? "لا يمكن أن يكون التعديل فارغًا"
      //     : "Adjustment cannot be empty",
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
      if (newToastId) {
        toast.dismiss(newToastId);
      }

      newToastId = toast(
        lang === "ar"
          ? "لا يمكن أن يكون التعديل فارغًا"
          : "Adjustment cannot be empty",
        {
          duration: 3000,
          style: {
            color: "#1BA56F",
            border: `1px solid #1BA56F`,
            fontWeight: 700,
            background: "#fff",
            boxShadow: "none",
            borderRadius: "0px",
          },
        }
      );
    }

    if (!billingInfo.firstName.trim()) {
      setError({
        firstName:
          lang === "ar"
            ? "حقل الاسم الأول فارغ"
            : "Your first name field is empty.",
      });
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
      setError({
        email:
          lang === "ar"
            ? "تنسيق البريد الإلكتروني غير صالح"
            : "Invalid email format",
      });
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
        trn:
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

    // if (!billingInfo.promoCode.trim()) newErrors.promoCode = 'Promo code is required';
    setError(newErrors);
    // Return true if there are no errors
    return true;
  };

  const confirmNavigation = () => {
    setShowModal(false);
    // navigateToDetailHistory()
  };
  const cancelNavigation = () => {
    setShowModal(false);
  };

  const createAdjustmentOrder = async () => {
    setLoading(true);
    const billingData = {
      ...billingInfo,
      user_name: billingInfo.firstName + " " + billingInfo.lastName,
      phone: billingInfo.phone,
      promo_code: billingInfo.promoCode,
      total_amount: totalPrice,
      total_time: totalTime,
      grand_total: totalPrice + tax,
      vat_registered: billingInfo?.vat_registered === "vat" ? true : false,
      trn: billingInfo?.vat_registered === "non_vat" ? null : billingInfo?.trn,
    };
    console.log(billingData);
    const formData = {
      item_list: itemsList,
      adjustmentList: adjustmentData,
      billingInfo: billingData,
      total_price: totalPrice + tax,
      total_time: totalTime,
    };
    if (validateFields()) {
      try {
        console.log(itemId, "itemId");

        const res = await axios.post(
          `${base_url}/api/adjustment_create/?orderId=${
            state.purchaseAddOns === "adj" ? itemId : orderId
          }&type=${state.purchaseAddOns ? "addon" : "adj"}`,
          formData,
          ConfigToken()
        );
        if (res.data) {
          window.location.href = res.data.data.payment_response.redirect_url;
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
    }
  };

  const removeFile = (id, fileNameToRemove) => {
    setAdjustmentsData((prev) => {
      // Destructure the existing data for the given ID
      const { attachments = [], file_name = [], ...rest } = prev[id] || {};

      // Filter out the file to remove
      const updatedAttachments = attachments.filter(
        (url, index) => file_name[index] !== fileNameToRemove
      );
      const updatedFileNames = file_name.filter(
        (name) => name !== fileNameToRemove
      );

      // If no files remain, remove the ID from adjustments
      if (updatedAttachments.length === 0) {
        const { [id]: _, ...updatedData } = prev; // Remove the key from the object
        updateTotals(itemsList, updatedData); // Update totals with the latest data
        return updatedData;
      }

      // Otherwise, update the specific ID
      const updatedData = {
        ...prev,
        [id]: {
          ...rest,
          attachments: updatedAttachments,
          file_name: updatedFileNames,
        },
      };

      updateTotals(itemsList, updatedData); // Update totals with the latest data
      return updatedData; // Return the updated data to update the state
    });
  };

  const handleAddOnChange = (id, language) => {
    setAddOnLang((prev) =>
      prev.map((ele) =>
        ele.id === id && ele.language === language
          ? { ...ele, isChecked: true }
          : { ...ele, isChecked: false }
      )
    );
    // calculateTotals(itemsList)

    const { price: total_price, time: total_time } = calculateTotals(
      itemsList,
      adjustmentData
    );
    showErrorToast(
      lang === "ar" ? "تم تحديث السلة بنجاح." : "Cart updated successfully",
      "#1BA56F"
    );
    setTotalPrice(total_price);
    setTotalTime(total_time);
  };

  useEffect(() => {
    // Recalculate totals when language or items change
    updateTotals(itemsList, adjustmentData);
    // eslint-disable-next-line
  }, [addOnLang, itemsList, adjustmentData]);

  const path = window?.location?.href?.split("/")[3];

  return (
    <>
      {/* <ToastContainer /> */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            // color: "#1BA56F",
            fontWeight: "700",
            borderRadius: "0px !important",
            border: `1px solid #1BA56F`,
          },
        }}
      />
      <Navbar isLang={lang} setIsLang={setLang} />

      {window.innerWidth <= 475 ? (
        page === "adjustment" ? (
          <>
            {openPopup && (
              <Popup
                openpopup={openPopup}
                isCancel={false}
                setPopup={setOpenPopup}
                title={lang === "ar" ? "إفراغ السلة" : "Empty your Cart"}
                // subTitle={'Are you sure, you want to empty the cart.'}
                onClick={() => createAdjustmentOrder()}
                save={lang === "ar" ? "نعم" : "Yes"}
                cancel={lang === "ar" ? "الإلغاء" : "Cancel"}
                isLang={lang}
              />
            )}

            <div className="px-[5%] py-4">
              <p
                className="flex text-[18px] items-center ml-[-5px] mr-[-5px] pb-2 text-black cursor-pointer "
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
              >
                {" "}
                <img
                  src={backIcon}
                  className={`${lang === "ar" ? "ml-2 scale-x-[-1]" : "mr-2"} `}
                ></img>{" "}
                {lang === "ar"
                  ? "العودة إلى لوحة القيادة"
                  : "Back to dashboard"}{" "}
              </p>
              <div className="">
                <h1 className="lg:text-[38px] text-[#000] md:text-[30px]">
                  {" "}
                  {lang === "ar" ? "التعديلات" : "Adjustments"}{" "}
                </h1>
                <p className="lg:text-[18px] mb-2 md:text-[14px] text-[#00000080]">
                  {" "}
                  {lang === "ar"
                    ? "هنا يمكنك تعديل هويتك البصرية وإضافة عناصر إلى الباقة الخاصة بك !"
                    : "Here you can edit your brand and add items to your bundl! "}{" "}
                </p>
                <p className="font-[700] text-[20px] font-Helvetica">
                  {" "}
                  {lang === "ar"
                    ? "ما الذي تريد تعديله؟"
                    : "What would you like to edit ?"}
                </p>
                <div className="">
                  <div className=" flex flex-wrap overflow-auto w-full">
                    {adjustments.map((adjustment, index) => {
                      return (
                        <>
                          <button
                            className={`uppercase text-[14px] font-[500] px-[5%] py-[2%] w-[${
                              stylesBtn[index]
                            }] ${
                              adjustmenTab ==
                              (lang === "ar"
                                ? adjustment.arabic_adjustment_name
                                : adjustment.english_adjustment_name)
                                ? "text-white bg-[#1BA56F] "
                                : "text-[#1BA56F] bg-white "
                            }  border-[1px]
                                     !border-[#1BA56F]`}
                            onClick={() => {
                              setAdjustmentTab(
                                lang === "ar"
                                  ? adjustment.arabic_adjustment_name
                                  : adjustment.english_adjustment_name
                              );
                              // setAdjustmentForm({ content: null, file_name: null })
                            }}
                          >
                            {lang === "ar"
                              ? adjustment.arabic_adjustment_name
                              : adjustment.english_adjustment_name}
                          </button>
                        </>
                      );
                    })}
                  </div>

                  {adjustments.map((adjustment, index) => {
                    if (
                      (lang === "ar"
                        ? adjustment.arabic_adjustment_name
                        : adjustment.english_adjustment_name) == adjustmenTab
                    ) {
                      return (
                        <div className="mt-[10%]">
                          <div className="flex justify-between my-[5%]">
                            <span className="font-bold">
                              {lang === "ar"
                                ? adjustment.arabic_adjustment_name
                                : adjustment.english_adjustment_name}
                            </span>
                            <p className="flex items-center text-[#1BA56F] !mb-2">
                              <p className="flex items-center mb-1 sm:min-w-[120px] min-w-[120px] xs:min-w-[100px] font-[500]">
                                <img
                                  src={dollorIcon}
                                  alt="Price icon"
                                  className={`inline-block ${
                                    lang === "ar" ? "ml-2" : "mr-2"
                                  }`}
                                />
                                {amountDecimal(Math.round(adjustment.price))}{" "}
                                {lang === "ar" ? "ريال" : "SAR"}
                              </p>
                              <p className="flex items-center mb-1 font-[500]">
                                <AccessTimeIcon
                                  className={`${
                                    lang === "ar" ? "ml-2" : "mr-2"
                                  }`}
                                />
                                {Math.round(adjustment.time_limit)}{" "}
                                {lang === "ar" ? "يوم" : "Days"}
                              </p>
                            </p>
                          </div>
                          <p className="font-[700] text-[22px] font-Helvetica">
                            {lang === "ar"
                              ? "ما الذي تريد تغييره؟"
                              : "What would you like to change?"}
                          </p>
                          <p>
                            <input
                              id={`${adjustment.id}_content`}
                              onInput={(e) => {
                                setAdjustmentForm((prev) => ({
                                  ...prev,
                                  [adjustment.id]: {
                                    ...prev[adjustment.id], // Preserve existing properties
                                    content: e.target.value, // Update content
                                  },
                                }));
                              }}
                              placeholder={
                                lang === "ar"
                                  ? "شاركنا رأيك "
                                  : "Tell us your thoughts..."
                              }
                              value={
                                adjustmentForm?.[adjustment?.id]?.content
                                  ? adjustmentForm?.[adjustment?.id]?.content
                                  : ""
                              }
                              className="border px-2 py-1 border-[#000000A0]  md:w-[80%] w-[80%] xs:w-[70%] rounded-none"
                            ></input>

                            <button
                              onClick={() => addData(adjustment.id, index)}
                              className="md:w-[15%] lg:w-[15%] xs:w-[30%] py-1 bg-[#1BA56F] text-white "
                            >
                              {lang === "ar" ? "ارسال" : "Submit Edit"}
                            </button>
                            {adjustmentError && (
                              <p style={{ color: "#D83D99" }}>
                                {lang === "ar"
                                  ? "يرجى إدخال تعليقاتك"
                                  : "Please enter your comments"}
                              </p>
                            )}
                          </p>

                          <p className="font-medium text-[18px]">
                            {lang === "ar"
                              ? "عندك شي تشاركنا إياه؟"
                              : "Have something to show us?"}
                          </p>
                          <p
                            className="border-b-2 w-fit !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer"
                            onClick={() =>
                              document
                                .getElementById(`file-${adjustment.id}`)
                                .click()
                            } // Trigger click on hidden input
                          >
                            <input
                              className="rounded-none"
                              type="file"
                              hidden
                              name="file"
                              id={`file-${adjustment.id}`} // Use a unique ID for each input
                              onChange={(e) =>
                                uploadFile(e, adjustment.id, index)
                              }
                            />
                            <img src={uploadIcon} alt="Upload Icon" />
                            <span className="font-[700] uppercase">
                              {" "}
                              {lang === "ar"
                                ? "إضافة المحتوى"
                                : "Upload Content"}
                            </span>
                          </p>
                          <p>
                            {adjustmentData[adjustment.id]
                              ? adjustmentData[adjustment.id].file_name?.map(
                                  (name) => {
                                    return (
                                      <span className="bg-black text-white py-1 px-2 mr-2">
                                        {name}{" "}
                                        <CloseIcon
                                          onClick={() => {
                                            removeFile(adjustment.id, name);
                                          }}
                                          className="ml-2 cursor-pointer"
                                        />
                                      </span>
                                    );
                                  }
                                )
                              : ""}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="lg:mt-16 md:mt-16 xs:mt-8 xs:mb-[75%] lg:mb-0 md:mb-0">
                  <h2 className="text-[22px] font-[700] font-Helvetica">
                    {lang === "ar"
                      ? "مشروعك يحتاج إضافات؟"
                      : "Something feels missing ?"}
                  </h2>
                  <p className="text-[16px] text-[#00000080] w-[75%]">
                    {lang === "ar"
                      ? "اطلب أي عناصر تحتاجها "
                      : "Add anything you want to your bundle to fit your brand!"}
                  </p>
                  <div className="flex flex-wrap w-[100%] cursor-pointer">
                    {" "}
                    {Object.keys(bundlAddons).map((category, index) => {
                      return (
                        <a
                          onClick={() => {
                            toggleDescription(category);
                            setDesignListTab(category);
                            setTimeout(() => {
                              const element = document.getElementById(
                                `${index}_list`
                              );
                              if (element) {
                                element.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }
                            }, 200);
                          }}
                          className={`uppercase cursor-pointer text-[14px] py-[2%] px-[5%] w-[${
                            stylesBtnAccordian[index]
                          }] !font[500] text-center font-[500] ${
                            designListTab == category
                              ? "text-white bg-[#1BA56F] "
                              : "text-[#1BA56F] bg-white "
                          } border-[1px]
                                              !border-[#1BA56F]`}
                        >
                          {lang === "ar"
                            ? bundlAddons[category]?.name_arabic
                            : category}
                        </a>
                      );
                    })}
                  </div>

                  <div className="mt-10">
                    {Object.keys(bundlAddons).map((category, index) => {
                      return (
                        <div id={`${index}_list`}>
                          <p
                            className={`flex cursor-pointer justify-between font-semibold text-[24px] pb-2  ${
                              expantedTabs[category] ||
                              category === "Social Media"
                                ? ""
                                : "border-b"
                            } border-[#00000080]`}
                          >
                            {" "}
                            {lang === "ar"
                              ? bundlAddons[category]?.name_arabic
                              : category}{" "}
                            <button
                              onClick={() => {
                                toggleDescription(category);
                                setTimeout(() => {
                                  const element = document.getElementById(
                                    `${index}_list`
                                  );
                                  if (element) {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    });
                                  }
                                }, 500);
                              }}
                              className="text-blue-500 cursor-pointer"
                            >
                              <img
                                className="w-6"
                                src={
                                  expantedTabs[category] ? upArrow : downArrow
                                }
                              ></img>
                            </button>
                          </p>
                          {expantedTabs[category] && (
                            <div className="mt-3 mb-8">
                              {category in bundlAddons &&
                                bundlAddons[category].design_list.map(
                                  (item, index) => {
                                    return (
                                      <div className="border-b !border-[#1BA56F]">
                                        <div className="flex justify-between my-[3%]">
                                          <span className="font-[500] text-[16px] text-[#1BA56F] w-[45%]">
                                            {lang === "ar"
                                              ? item.name_arabic
                                              : item.name_english}
                                          </span>
                                          <p className="flex items-center !mb-2 w-[55%] ">
                                            <p className="flex items-center mb-1 sm:min-w-[120px] min-w-[120px] xs:min-w-[100px] font-[500]">
                                              <img
                                                src={BlackDollor}
                                                alt="Price icon"
                                                className={`inline-block ${
                                                  lang === "ar"
                                                    ? "ml-2"
                                                    : "mr-2"
                                                }`}
                                              />
                                              {amountDecimal(
                                                Math.round(item.price)
                                              )}{" "}
                                              {lang === "ar" ? "ريال" : "SAR"}
                                            </p>
                                            <p className="flex items-center mb-1 font-[500] text-right">
                                              <AccessTimeIcon
                                                className={`${
                                                  lang === "ar"
                                                    ? "ml-2"
                                                    : "mr-2"
                                                }`}
                                              />
                                              {Math.round(item.time)}{" "}
                                              {lang === "ar" ? "يوم" : "Days"}
                                            </p>
                                          </p>
                                        </div>
                                        <p
                                          className={`mb-3 mt-[-3%] h-[30px] flex ${
                                            lang === "ar"
                                              ? "flex-row-reverse"
                                              : "flex-row"
                                          } items-center text-[#1BA56F] border !border-[#1BA56F] w-[100%]`}
                                        >
                                          <button
                                            onClick={() => remove_item(item.id)}
                                            className={`${
                                              lang === "ar"
                                                ? "border-l"
                                                : "border-r"
                                            } !border-[#1BA56F] h-full flex justify-center w-[10%] py-1`}
                                          >
                                            <RemoveIcon />
                                          </button>
                                          <span className="px-2 !border-[#1BA56F] w-[80%] flex items-center justify-center">
                                            {" "}
                                            {item.id in itemsList
                                              ? itemsList[item.id]["qty"]
                                              : 0}
                                          </span>
                                          <button
                                            // onClick={() =>
                                            //   addItem(index, category, item.id)
                                            // }
                                            onClick={() => {
                                              const isLogoAndIdentity =
                                                item.name_english ===
                                                "Logo & Identity";
                                              const isAdjustmentPath =
                                                path === "adjustment";
                                              const currentQty =
                                                itemsList?.[item.id]?.["qty"];

                                              const shouldPreventAdd =
                                                isAdjustmentPath &&
                                                isLogoAndIdentity &&
                                                (currentQty === undefined ||
                                                  currentQty < 1);
                                              if (
                                                isLogoAndIdentity &&
                                                isAdjustmentPath
                                              ) {
                                                if (shouldPreventAdd) {
                                                  addItem(
                                                    index,
                                                    category,
                                                    item.id
                                                  );
                                                }
                                              } else {
                                                addItem(
                                                  index,
                                                  category,
                                                  item.id
                                                );
                                              }
                                            }}
                                            className={`flex justify-center py-1 ${
                                              lang === "ar"
                                                ? "border-r"
                                                : "border-l"
                                            } !border-[#1BA56F] w-[10%] h-full`}
                                          >
                                            <AddIcon />
                                          </button>
                                        </p>

                                        <div className="w-full flex justify-center items-center">
                                          {item.name_english ===
                                            "Logo & Identity" && (
                                            <div className="flex   items-center mb-4 justify-center">
                                              <Typography>
                                                <div className="flex gap-2">
                                                  {addOnLang?.map((ele) => {
                                                    return (
                                                      <div
                                                        className={`flex gap-1 ${
                                                          window.innerWidth >
                                                          379
                                                            ? "text-[16px]"
                                                            : "text-[15px]"
                                                        }   items-center cursor-pointer`}
                                                        key={`${ele.id}-${ele.language}`}
                                                      >
                                                        <input
                                                          type="radio"
                                                          checked={
                                                            ele.isChecked
                                                          }
                                                          onChange={() =>
                                                            handleAddOnChange(
                                                              ele.id,
                                                              ele.language
                                                            )
                                                          }
                                                          name="languageOption"
                                                          value={ele.language}
                                                          id={`lang_${ele.id}_${ele.language}`}
                                                        />
                                                        <label
                                                          htmlFor={`lang_${ele.id}_${ele.language} `}
                                                          className={`mb-0 ${
                                                            window.innerWidth <
                                                            346
                                                              ? "text-[12px]"
                                                              : window.innerWidth <
                                                                362
                                                              ? "text-[14px]"
                                                              : window.innerWidth <
                                                                379
                                                              ? "text-[15px]"
                                                              : window.innerWidth <=
                                                                475
                                                              ? "text-[16px]"
                                                              : "text-[18px]"
                                                          } cursor-pointer`}
                                                        >
                                                          {ele.label}
                                                        </label>
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              </Typography>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={`fixed bg-white bottom-0 xs:p-[5%_0%_12%_0%] transition-all delay-100 duration-300 ease-in-out overflow-y-scroll  border ${
                      showDetails ? "h-[500px]" : "h-[250px]"
                    } w-full left-0 z-[1]`}
                  >
                    <div className="bundl-name ">
                      <p className="sm:text-[24px] xs:mb-0 xs:flex xs:justify-between sm:block font-[700] px-0 pt-[5%] !mb-2 display:flex">
                        <span className="font-[400] text-[16px] font-Helvetica">
                          {" "}
                          {lang === "ar"
                            ? "ملخص التعديلات"
                            : "Summary of Edits"}
                        </span>
                        {isMobile && (
                          <button
                            onClick={() => setDetails(!showDetails)}
                            className="text-[14px] font-[500] underline text-[#1BA56F]"
                          >
                            {!showDetails
                              ? lang === "ar"
                                ? "عرض التفاصيل"
                                : "Show Details"
                              : lang === "ar"
                              ? "إخفاء التفاصيل"
                              : "Hide Details"}
                          </button>
                        )}
                      </p>
                    </div>
                    {!isMobile || (isMobile && showDetails) ? (
                      <>
                        <div className="px-[0] py-2">
                          <div className="my-2">
                            {Object.values(adjustmentData).map((item) => {
                              return (
                                <div className="flex items-start border-b-[1px] border-black mt-2">
                                  <p className="mb-0 ml-4 mt-[4px] mr-2 flex items-center">
                                    <img
                                      onClick={() => {
                                        setAdjustmentTab(
                                          lang === "ar"
                                            ? item.arabic_adjustment_name
                                            : item.english_adjustment_name
                                        );
                                        // setAdjustmentForm({
                                        //     content: item.content ? item.content : null,
                                        //     file_name: item.file_name ? item.file_name : null
                                        // })
                                      }}
                                      className={`${
                                        lang === "ar" ? "ml-2" : "mr-2"
                                      } w-[18px] cursor-pointer`}
                                      src={EditIcon}
                                    ></img>
                                    <ClearIcon
                                      onClick={() =>
                                        removeItem(item.id, "adjustment")
                                      }
                                      style={
                                        lang === "ar"
                                          ? {
                                              marginLeft: "5px",
                                              width: "18px",
                                              cursor: "pointer",
                                            }
                                          : {
                                              marginRight: "5px",
                                              width: "18px",
                                              cursor: "pointer",
                                            }
                                      }
                                    />
                                  </p>
                                  <div className="">
                                    <p className="font-bold text-[18px]">
                                      {" "}
                                      {lang === "ar"
                                        ? item?.arabic_adjustment_name
                                        : item.english_adjustment_name}
                                    </p>
                                    <div className="flex font-[500] text-[#1BA56F]">
                                      <p
                                        className={`flex ${
                                          lang === "ar" ? "ml-3" : "mr-3"
                                        }`}
                                      >
                                        <AccessTimeIcon
                                          style={
                                            lang === "ar"
                                              ? {
                                                  marginLeft: "5px",
                                                  width: "18px",
                                                }
                                              : {
                                                  marginRight: "5px",
                                                  width: "18px",
                                                }
                                          }
                                        />
                                        <span>
                                          {parseInt(item.time_limit)}{" "}
                                          {lang === "ar" ? "يوم" : "Days"}
                                        </span>
                                      </p>
                                      <p className="flex items-center">
                                        <img
                                          width={"18px"}
                                          className="mr-[5px] h-[18px]"
                                          src={dollorIcon}
                                        ></img>
                                        <span>
                                          {amountDecimal(
                                            Math.round(item.price)
                                          )}{" "}
                                          {lang === "ar" ? "ريال" : "SAR"}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            {Object.values(itemsList).map((item) => {
                              return (
                                <div className="flex items-start border-b-[1px] border-black mt-2">
                                  <p className="mb-0 ml-4 mt-[4px] mr-2 flex items-center">
                                    <a
                                      onClick={() => {
                                        toggleDescription(item.category);
                                      }}
                                      href={`#${item.id}_design_list`}
                                    >
                                      <img
                                        className={`${
                                          lang === "ar" ? "ml-2" : "mr-2"
                                        } w-[18px] cursor-pointer`}
                                        src={EditIcon}
                                      ></img>
                                    </a>
                                    <ClearIcon
                                      onClick={() =>
                                        removeItem(item.id, "items")
                                      }
                                      style={
                                        lang === "ar"
                                          ? {
                                              marginLeft: "5px",
                                              width: "18px",
                                              cursor: "pointer",
                                            }
                                          : {
                                              marginRight: "5px",
                                              width: "18px",
                                              cursor: "pointer",
                                            }
                                      }
                                    />
                                  </p>
                                  <div className="">
                                    <p className="font-bold">
                                      {" "}
                                      {lang === "ar"
                                        ? item.name_arabic
                                        : item.name_english}{" "}
                                      {addOnLang.find((ele) => ele.isChecked)
                                        ?.language === "both" &&
                                      item.name_english === "Logo & Identity"
                                        ? "(English & Arabic)"
                                        : addOnLang.find((ele) => ele.isChecked)
                                            ?.language === "English"
                                        ? "(English)"
                                        : "(Arabic)"}
                                    </p>
                                    <div className="flex font-[500] text-[#1BA56F]">
                                      <p
                                        className={`flex ${
                                          lang === "ar" ? "ml-3" : "mr-3"
                                        }`}
                                      >
                                        <AccessTimeIcon
                                          style={
                                            lang === "ar"
                                              ? {
                                                  marginLeft: "5px",
                                                  width: "18px",
                                                }
                                              : {
                                                  marginRight: "5px",
                                                  width: "18px",
                                                }
                                          }
                                        />
                                        <span>
                                          {Math.round(item.time * item.qty)}{" "}
                                          {lang === "ar" ? "يوم" : "Days"}
                                        </span>
                                      </p>
                                      <p className="flex items-center">
                                        <img
                                          width={"18px"}
                                          className="mr-[5px] h-[18px]"
                                          src={dollorIcon}
                                        ></img>
                                        <span>
                                          {/* {amountDecimal(item.total_price)}{" "} */}
                                          {addOnLang.find(
                                            (ele) => ele.isChecked
                                          )?.language === "both"
                                            ? calculateAmount(
                                                item.qty,
                                                item.price
                                              )
                                            : amountDecimal(
                                                item.total_price
                                              )}{" "}
                                          {lang === "ar" ? "ريال" : "SAR"}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    <div className="bundl-checkout !mt-[0%]">
                      <div className=" flex items-center mb-1">
                        <img
                          src={BlackDollor}
                          className="ml-[6px] mr-4"
                          alt="Total Price"
                        />
                        <p className="basis-3/5 font-bold text-[18px] mb-0">
                          {lang === "ar" ? "السعر الإجمالي :" : "Total Price :"}
                        </p>
                        <p className="basis-2/5 font-bold text-[18px] mb-0 text-end">
                          {amountDecimal(totalPrice)}{" "}
                          {lang === "ar" ? "ريال" : "SAR"}
                        </p>
                      </div>
                      <div className=" flex justify-center">
                        <img
                          className={`${lang === "ar" ? "ml-2" : "mr-2"}`}
                          src={BlackTime}
                          alt="Total Duration"
                        />
                        <p className="basis-3/5 text-[18px] mb-0">
                          {lang === "ar"
                            ? "المدة الإجمالية :"
                            : "Total Duration :"}
                        </p>
                        <p className="basis-2/5 text-[18px] mb-0 text-end">
                          {totalTime} {lang === "ar" ? "يوم" : "Days"}
                        </p>
                      </div>

                      <div>
                        <button
                          onClick={() => CheckCart()}
                          className=" w-[100%] m-auto py-1 mt-2 text-[18px] text-white bg-[#1BA56F] uppercase"
                        >
                          {" "}
                          {lang === "ar"
                            ? "المتابعة إلى السلة​"
                            : "Proceed to Cart"}
                        </button>
                        {errorMsg && (
                          <p className="pb-0 text-[16px] text-[#D83D99]">
                            {errorMsg}*
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {showModal && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
                  <p className="text-lg font-medium text-gray-900">
                    Your customized package will be reset. Are you sure you want
                    to go back?
                  </p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <button
                      onClick={() => confirmNavigation()}
                      className="px-4 py-2 bg-[#0BA6C4] text-white rounded uppercase"
                    >
                      {lang === "ar" ? "نعم" : "Yes"}
                    </button>
                    <button
                      onClick={cancelNavigation}
                      className="px-4 py-2 bg-grey  text-white rounded hover:bg-grey uppercase"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="mycart ">
              <div className="cart mt-[5%]">
                <p
                  className="flex !text-[18px] !font-normal items-center pb-2 cursor-pointer text-black"
                  onClick={() => {
                    setPage("adjustment");
                  }}
                >
                  {" "}
                  <ArrowBackIcon
                    style={
                      lang === "ar"
                        ? {
                            width: "25px",
                            marginLeft: "10px",
                            transform: "scaleX(-1)",
                          }
                        : { width: "25px", marginRight: "10px" }
                    }
                  />{" "}
                  Back To Adjustments{" "}
                </p>
                <p>{lang === "ar" ? "سلة التسوق الخاصة بك" : "Your Cart"}</p>
                {isMobile ? (
                  <>
                    {Object.values(adjustmentData)?.map(
                      (row, index) => (
                        console.log(row),
                        (
                          <div className="flex justify-between border-b pb-2 !border-black">
                            <div>
                              <div className="font-[700] text-[20px]">
                                {"1"} x{" "}
                                {lang === "ar"
                                  ? row?.arabic_adjustment_name
                                  : row.english_adjustment_name}
                              </div>
                              <div className="font-[500] ml-8">
                                {" "}
                                {amountDecimal(Math.round(row.price))}{" "}
                                {lang === "ar" ? "ريال" : "SAR"}
                              </div>
                            </div>
                            <p className="flex items-center !mb-0 justify-center">
                              <img
                                style={{ cursor: "pointer" }}
                                src={DeleteIcon}
                                alt="Delete Icon"
                                onClick={() => removeItem(row.id, "adjustment")}
                              />
                            </p>
                          </div>
                        )
                      )
                    )}
                    {Object.values(itemsList)?.map((row, index) => (
                      <div className="flex justify-between border-b pb-2 !border-black">
                        <div>
                          <div className="font-[700] text-[20px]">
                            {row.qty} x{" "}
                            {lang === "ar"
                              ? row?.name_arabic
                              : row.name_english}
                          </div>
                          <div className="font-[500] ml-8">
                            {" "}
                            {amountDecimal(Math.round(row.price))}{" "}
                            {lang === "ar" ? "ريال" : "SAR"}
                          </div>
                        </div>
                        <p className="flex items-center !mb-0 justify-center">
                          <img
                            style={{ cursor: "pointer" }}
                            src={DeleteIcon}
                            alt="Delete Icon"
                            onClick={() => removeItem(row.id, "items")}
                          />
                        </p>
                      </div>
                    ))}
                  </>
                ) : (
                  <table
                    className="w-full border-none"
                    aria-label="simple table"
                  >
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
                          {lang === "ar" ? "بند" : "Item"}
                        </td>
                        <td
                          className="text-[#00000080] w-[30%] pb-3"
                          align="center"
                        >
                          {lang === "ar" ? "العدد" : "Quantity"}
                        </td>
                        <td
                          className="text-[#00000080] w-[30%]    pb-3"
                          align="center"
                        >
                          {lang === "ar" ? "السعر" : "Price"}
                        </td>
                        <td
                          className="text-[#00000080] w-[20%]    pb-3"
                          align="center"
                        >
                          {lang === "ar" ? "فعل" : "Action"}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(adjustmentData)?.map((row, index) => (
                        <tr
                          key={row.item_name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className={`text-[#000] font-[700] text-[20px] ${
                            index == Object.values(adjustmentData).length - 1 &&
                            Object.values(itemsList).length == 0
                              ? ""
                              : "border-b border-black"
                          } `}
                        >
                          <td className=" !py-2" scope="row">
                            {lang === "ar"
                              ? row?.arabic_adjustment_name
                              : row.english_adjustment_name}
                          </td>
                          <td className=" !py-2" align="center">
                            1
                          </td>
                          <td className=" !py-2" align="center">
                            {amountDecimal(Math.round(row.price))}
                          </td>
                          <td align="center">
                            <p className="flex items-center !mb-0 justify-center">
                              <img
                                style={{ cursor: "pointer" }}
                                src={DeleteIcon}
                                alt="Delete Icon"
                                onClick={() => removeItem(row.id, "adjustment")}
                              />
                            </p>
                          </td>
                        </tr>
                      ))}

                      {Object.values(itemsList)?.map((row, index) => (
                        <tr
                          key={row.item_name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className={`text-[#000] font-[700] text-[20px] ${
                            index == Object.values(itemsList).length - 1
                              ? ""
                              : "border-b border-black"
                          } `}
                        >
                          <td className=" !py-2" scope="row">
                            {lang === "ar"
                              ? row?.name_arabic
                              : row.name_english}
                          </td>
                          <td className=" !py-2" align="center">
                            {row.qty}
                          </td>
                          <td className=" !py-2" align="center" scope="row">
                            {amountDecimal(Math.round(row.price))}
                          </td>
                          {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                          <td className=" !py-2" align="center" scope="row">
                            <p className="flex items-center !mb-0 justify-center">
                              {" "}
                              <img
                                style={{ cursor: "pointer" }}
                                src={DeleteIcon}
                                alt="Delete Icon"
                                onClick={() => removeItem(row.id, "items")}
                              />
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="billing !px-[2%]">
                <p>{lang === "ar" ? "عنوان الفواتير" : "Billing Address"}</p>
                <div className="user-name mb-[15px]">
                  <div className={`${lang === "ar" ? "ml-[4%]" : "mr-[4%]"}`}>
                    <label
                      className={`${"firstName" in error && "text-[#D83D99]"}`}
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
                    <p className="text-[#D83D99] !text-[20px] !font-[400] !mt-2">
                      {Object.values(error).map((item) => {
                        return item;
                      })}
                    </p>
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
                      className={`${"lastName" in error && "text-[#D83D99]"}`}
                    >
                      {lang === "ar" ? "اسم العائلة" : "Last Name"}
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
                  <label className={`${"email" in error && "text-[#D83D99]"}`}>
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
                <div className="phone mb-[15px]">
                  <label className={`${"phone" in error && "text-[#D83D99]"}`}>
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
                      className={`${"country" in error && "text-[#D83D99]"}`}
                    >
                      {lang === "ar" ? "الدولة" : "Country"}{" "}
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
                    style={{ margin: "0% 0 0 2%" }}
                  >
                    <label className={`${"city" in error && "text-[#D83D99]"}`}>
                      {lang === "ar" ? "المدينة" : "City"}
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
                    className={`${"postalCode" in error && "text-[#D83D99]"}`}
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
                          : "opacity-100"
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

                {istax && (
                  <div className="trn-code mb-[15px]">
                    <label
                      className={`${
                        "trn" in error ? "text-[#D83D99]" : "opacity-100"
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
                        "trnNumber" in error ? "!border-[#D83D99]" : ""
                      }`}
                    />
                  </div>
                )}
                <div className="promo-code mb-[15px]">
                  <label
                    className={`${"promoCode" in error && "text-[#D83D99]"}`}
                  >
                    {lang === "ar" ? "كود الخصم" : "Promo Code"}
                  </label>
                  <input
                    name="promoCode"
                    value={billingInfo.promoCode}
                    onChange={handleBillingChange}
                    className={`rounded-none ${
                      "promoCode" in error ? "!border-[#D83D99]" : ""
                    }`}
                  />
                </div>
                <div className="cart-total-container border-[1px] border-black p-[2%_0_0_0]">
                  <div
                    className="total justify-between sm:pl-[3%] xs:pl-[3%]  mr-4"
                    style={{ display: "flex" }}
                  >
                    <p
                      className="!text-[20px] !font-[400]"
                      style={{ width: "50%" }}
                    >
                      {lang === "ar" ? "السعر :" : "Price:"}
                    </p>
                    <p
                      className="!text-[20px] !font-[400] text-right"
                      style={{ width: "50%" }}
                    >
                      {amountDecimal(totalPrice)}{" "}
                      {lang === "ar" ? "ريال" : "SAR"}
                    </p>
                  </div>
                  <div
                    className="total justify-between sm:pl-[3%] xs:pl-[3%] mr-4"
                    style={{ display: "flex" }}
                  >
                    <p
                      className="!text-[20px] !font-[400]"
                      style={{ width: "53%" }}
                    >
                      {lang === "ar" ? "ضريبه القيمه المضافه:" : "VAT:"}
                    </p>
                    <p
                      className="!text-[20px] !font-[400] text-right"
                      style={{ width: "40%" }}
                    >
                      {amountDecimal(tax)} {lang === "ar" ? "ريال" : "SAR"}
                    </p>
                  </div>
                  <div className="border-t-[1px] border-black p-[2%_0_0_2%]">
                    <div
                      className="justify-between mr-4"
                      style={{ display: "flex" }}
                    >
                      <p
                        className="!text-[20px] ml-[6px]"
                        style={{ width: "50%" }}
                      >
                        <img
                          src={BlackDollor}
                          className={`inline-block mr-[18px] ${
                            lang === "ar" ? "mr-[0px] " : "ml-[0px]"
                          }`}
                        ></img>
                        {lang === "ar" ? "السعر الإجمالي :" : "Total Price :"}
                      </p>
                      <p
                        className="!text-[20px] text-right"
                        style={{ width: "40%" }}
                      >
                        {amountDecimal(totalPrice + tax)}{" "}
                        {lang === "ar" ? "ريال" : "SAR"}
                      </p>
                    </div>
                    <div
                      className="justify-between mr-4"
                      style={{ display: "flex" }}
                    >
                      <p className="!text-[20px]" style={{ width: "66%" }}>
                        <AccessTimeIcon
                          style={
                            lang === "ar"
                              ? { marginLeft: "4px" }
                              : { marginRight: "4px" }
                          }
                        />{" "}
                        {lang === "ar"
                          ? "المدة الإجمالية :"
                          : "Total Duration :"}
                      </p>
                      <p
                        className="!text-[20px]  text-right"
                        style={{ width: "45%" }}
                      >
                        {totalTime} {lang === "ar" ? "يوم" : "Days"}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => createAdjustmentOrder()}
                  className="payment uppercase"
                >
                  {loading ? (
                    <ClipLoader size={25} color={"#FFFFFF"} />
                  ) : lang === "ar" ? (
                    "المتابعة إلى الدفع​"
                  ) : (
                    "Proceed to payment​"
                  )}
                </button>
                <p className="text-[#D83D99] !text-[20px] !font-[400] !mt-2">
                  {Object.values(error).map((item) => {
                    return item;
                  })}
                </p>
              </div>
            </div>
          </>
        )
      ) : page == "adjustment" ? (
        <>
          {openPopup && (
            <Popup
              openpopup={openPopup}
              isCancel={false}
              setPopup={setOpenPopup}
              title={lang === "ar" ? "إفراغ السلة" : "Empty your Cart"}
              // subTitle={'Are you sure, you want to empty the cart.'}
              onClick={() => createAdjustmentOrder()}
              save={lang === "ar" ? "نعم" : "Yes"}
              cancel={lang === "ar" ? "الإلغاء" : "Cancel"}
              isLang={lang}
            />
          )}
          <div
            className="font-Helvetica md:flex xs:block"
            style={{ position: "relative" }}
          >
            <div
              className={`basis-[72%] md:px-8 px-8 xs:px-2  py-4 ${
                lang === "ar" ? "border-l-[1px]" : "border-r-[1px]"
              } border-black`}
            >
              <p
                className={`flex text-[18px] items-center pb-2 text-black cursor-pointer px-[20px]"${
                  lang === "ar"
                    ? "xs:mr-[-4px] sm:mr-[-8px]  lg:mr-[22px] xl:mr-[23px]"
                    : "xs:ml-[-4px] sm:ml-[-8px]  lg:ml-[20px] xl:ml-[20px]"
                }`}
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
              >
                {" "}
                <ArrowBackIcon
                  style={
                    lang === "ar"
                      ? {
                          width: "25px",
                          marginLeft: "10px",
                          transform: "scaleX(-1)",
                        }
                      : { width: "25px", marginRight: "10px" }
                  }
                />{" "}
                {lang === "ar"
                  ? "العودة إلى لوحة التحكم"
                  : "Back to dashboard "}{" "}
              </p>
              <div className="lg:px-14 md:px-14 xs:px-2">
                {!state?.purchaseAddOns && (
                  <>
                    <h1 className="lg:text-[38px] text-[#000] md:text-[30px]">
                      {lang === "ar" ? "التعديلات" : "Adjustments"}{" "}
                    </h1>
                    <p className="lg:text-[18px] mb-2 md:text-[16px] text-[#00000080]">
                      {" "}
                      {lang === "ar"
                        ? "هنا يمكنك تعديل هويتك البصرية وإضافة عناصر إلى الباقة الخاصة بك !"
                        : "Here you can edit your brand and add items to your bundl! "}{" "}
                    </p>
                    <p className="lg:text-[30px] font-bold md:text-[22px] mt-[2%]">
                      {" "}
                      {lang === "ar"
                        ? "ما الذي تريد تعديله؟"
                        : "What would you like to edit ?"}
                    </p>
                    <div className="">
                      <div className=" flex overflow-auto md:max-w-[62vw] max-w-[62vw] xs:max-w-[100%]">
                        {adjustments.map((adjustment, index) => {
                          return (
                            <button
                              className={`uppercase font-[500] h-[40px] lg:px-[20px] md:px-[10px] basis-[20%] min-w-[100px] md:py-[3px] md:text-[14px] lg:py-[5px]  ${
                                adjustmenTab ==
                                (lang === "ar"
                                  ? adjustment.arabic_adjustment_name
                                  : adjustment.english_adjustment_name)
                                  ? "text-white bg-[#1BA56F] "
                                  : "text-[#1BA56F] bg-white "
                              } ${
                                lang === "ar"
                                  ? "border-l border-t border-b"
                                  : "border-r border-t border-b"
                              }  
                                    ${
                                      index == 0 &&
                                      (lang === "ar" ? "border-r" : "border-l")
                                    } ${
                                index == adjustments.length &&
                                (lang === "ar"
                                  ? "border-r-0 border-l"
                                  : "border-l-0 border-r")
                              } !border-[#1BA56F]`}
                              onClick={() => {
                                setAdjustmentTab(
                                  lang === "ar"
                                    ? adjustment.arabic_adjustment_name
                                    : adjustment.english_adjustment_name
                                );
                                // setAdjustmentForm({ content: null, file_name: null })
                              }}
                            >
                              {lang === "ar"
                                ? adjustment.arabic_adjustment_name
                                : adjustment.english_adjustment_name}
                            </button>
                          );
                        })}
                      </div>

                      {adjustments.map((adjustment, index) => {
                        if (
                          (lang === "ar"
                            ? adjustment.arabic_adjustment_name
                            : adjustment.english_adjustment_name) ==
                          adjustmenTab
                        ) {
                          return (
                            <div className="my-[5%]">
                              <div className="flex justify-between my-1">
                                <span className="font-bold">
                                  {lang === "ar"
                                    ? adjustment.arabic_adjustment_name
                                    : adjustment.english_adjustment_name}
                                </span>
                                <p className="flex items-center text-[#1BA56F] !mb-2">
                                  <p className="flex items-center mb-1 sm:min-w-[120px] min-w-[120px] xs:min-w-[100px] font-[500]">
                                    <img
                                      src={dollorIcon}
                                      alt="Price icon"
                                      className={`inline-block ${
                                        lang === "ar" ? "ml-2" : "mr-2"
                                      }`}
                                    />
                                    {amountDecimal(
                                      Math.round(adjustment.price)
                                    )}{" "}
                                    {lang === "ar" ? "ريال" : "SAR"}
                                  </p>
                                  <p className="flex items-center mb-1 font-[500]">
                                    <AccessTimeIcon
                                      className={`${
                                        lang === "ar" ? "ml-2" : "mr-2"
                                      }`}
                                    />
                                    {amountDecimal(
                                      Math.round(adjustment.time_limit)
                                    )}{" "}
                                    {lang === "ar" ? "يوم" : "Days"}
                                  </p>
                                </p>
                              </div>
                              <p className="font-medium text-[18px]">
                                {lang === "ar"
                                  ? "ما الذي تريد تغييره؟"
                                  : "What would you like to change?"}
                              </p>
                              <p>
                                <input
                                  id={`${adjustment.id}_content`}
                                  onInput={(e) => {
                                    if (e.target.value) {
                                      setAdjustmentError(false);
                                    } else {
                                      setAdjustmentError(true);
                                    }
                                    setAdjustmentForm((prev) => ({
                                      ...prev,
                                      [adjustment.id]: {
                                        ...prev[adjustment.id], // Preserve existing properties
                                        content: e.target.value, // Update content
                                      },
                                    }));
                                  }}
                                  placeholder={
                                    lang === "ar"
                                      ? "شاركنا رأيك "
                                      : "Tell us your thoughts..."
                                  }
                                  value={
                                    adjustmentForm?.[adjustment?.id]?.content
                                      ? adjustmentForm?.[adjustment?.id]
                                          ?.content
                                      : ""
                                  }
                                  className="border px-2 py-1 border-[#000000A0]  md:w-[80%] w-[80%] xs:w-[70%] rounded-none"
                                ></input>
                                <button
                                  onClick={() => addData(adjustment.id, index)}
                                  className="md:w-[20%] w-[20%] xs:w-[30%] py-1 px-2 bg-[#1BA56F] text-white text-[17.2px] font-[500] uppercase"
                                >
                                  {lang === "ar" ? "ارسال" : "Submit Edit"}
                                </button>
                              </p>
                              {adjustmentError && (
                                <p
                                  style={{
                                    color: "#D83D99",
                                    marginTop: "-12px",
                                  }}
                                >
                                  {lang === "ar"
                                    ? "يرجى إدخال تعليقاتك"
                                    : "Please enter your comments"}
                                </p>
                              )}
                              <p className="font-medium text-[18px]">
                                {" "}
                                {lang === "ar"
                                  ? "عندك شي تشاركنا إياه؟"
                                  : "Have something to show us?"}
                              </p>
                              <p
                                className="border-b-2 w-fit !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer"
                                onClick={() =>
                                  document
                                    .getElementById(`file-${adjustment.id}`)
                                    .click()
                                } // Trigger click on hidden input
                              >
                                <input
                                  type="file"
                                  className="rounded-none"
                                  hidden
                                  name="file"
                                  id={`file-${adjustment.id}`} // Use a unique ID for each input
                                  onChange={(e) =>
                                    uploadFile(e, adjustment.id, index)
                                  }
                                />
                                <img src={uploadIcon} alt="Upload Icon" />
                                <span className="font-[700] uppercase">
                                  {lang === "ar"
                                    ? "إضافة المحتوى"
                                    : "Upload Content"}
                                </span>
                              </p>
                              <p>
                                {adjustmentData[adjustment.id]
                                  ? adjustmentData[
                                      adjustment.id
                                    ].file_name?.map((name) => {
                                      return (
                                        <span className="bg-black text-white py-1 px-2 mr-2">
                                          {name}{" "}
                                          <CloseIcon
                                            onClick={() => {
                                              removeFile(adjustment.id, name);
                                            }}
                                            className="ml-2 cursor-pointer"
                                          />
                                        </span>
                                      );
                                    })
                                  : ""}
                              </p>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </>
                )}

                <div className="lg:mt-4 md:mt-16 xs:mt-8">
                  <h2 className="text-[38px]">
                    {lang === "ar"
                      ? "مشروعك يحتاج إضافات"
                      : "Add-ons to Bundl"}
                  </h2>
                  <p className="text-[18px] text-[#00000080]">
                    {lang === "ar"
                      ? "اطلب أي عناصر تحتاجها "
                      : "Add anything you want to your bundle to fit your brand!"}
                  </p>
                  <div className="flex w-[100%]">
                    {" "}
                    {Object.keys(bundlAddons).map((category, index) => {
                      console.log(category);
                      return (
                        <button
                          onClick={() => {
                            toggleDescription(category);
                            setDesignListTab(category);
                            // const element = document.getElementById(`${index}_list`);
                            // element.scrollIntoView({ behavior: 'smooth' })
                            setTimeout(() => {
                              const element = document.getElementById(
                                `${index}_list`
                              );
                              if (element) {
                                element.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }
                            }, 200);
                          }}
                          className={`uppercase h-[40px] cursor-pointer lg:px-[2px] min-w-[14%] md:px-[2px] md:py-[5px] 
                                               lg:text-[18px] md:text-[14px] lg:py-[5px] !font[500] text-center font-[500] ${
                                                 designListTab == category
                                                   ? "text-white bg-[#1BA56F] "
                                                   : "text-[#1BA56F] bg-white "
                                               } ${
                            lang === "ar"
                              ? "border-l border-t border-b"
                              : "border-r border-t border-b"
                          }
                                            ${
                                              index == 0 &&
                                              (lang === "ar"
                                                ? "border-r"
                                                : "border-l")
                                            } ${
                            index == Object.keys(bundlAddons).length &&
                            (lang === "ar"
                              ? "border-r-0 border-l"
                              : "border-l-0 border-r")
                          } !border-[#1BA56F]`}
                        >
                          {lang === "ar"
                            ? bundlAddons[category]?.name_arabic
                            : category}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-10 cursor-pointer">
                    {Object.keys(bundlAddons).map((category, index) => {
                      return (
                        <div id={`${index}_list`}>
                          <p
                            className={`flex justify-between font-semibold text-[24px] pb-2   ${
                              expantedTabs[category] ||
                              category === "Social Media"
                                ? ""
                                : "border-b"
                            } border-[#00000080]`}
                            onClick={() => {
                              toggleDescription(category);
                              setTimeout(() => {
                                const element = document.getElementById(
                                  `${index}_list`
                                );
                                if (element) {
                                  element.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                  });
                                }
                              }, 200);
                            }}
                          >
                            {" "}
                            {lang === "ar"
                              ? bundlAddons[category]?.name_arabic
                              : category}{" "}
                            <button
                              onClick={() => {
                                toggleDescription(category);
                                setTimeout(() => {
                                  const element = document.getElementById(
                                    `${index}_list`
                                  );
                                  if (element) {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    });
                                  }
                                }, 200);
                              }}
                              className="text-blue-500 cursor-pointer"
                            >
                              <img
                                className="w-6"
                                src={
                                  expantedTabs[category] ? upArrow : downArrow
                                }
                                onClick={() => {
                                  toggleDescription(category);
                                  setTimeout(() => {
                                    const element = document.getElementById(
                                      `${index}_list`
                                    );
                                    if (element) {
                                      element.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                      });
                                    }
                                  }, 200);
                                }}
                              ></img>
                            </button>
                          </p>
                          {expantedTabs[category] && (
                            <div className="mt-3 mb-8">
                              {category in bundlAddons &&
                                bundlAddons[category].design_list.map(
                                  (item, index) => {
                                    return (
                                      <>
                                        <div
                                          id={`${item.id}_design_list`}
                                          className={`flex flex-wrap justify-between font-semibold text-[18px] ${
                                            item.name_english ===
                                            "Logo & Identity"
                                              ? null
                                              : "py-[1.5%]"
                                          }   border-b !border-[#1BA56F]`}
                                        >
                                          <span className="md:basis-[25%] basis-[25%] xs:basis-[100%] text-[16px] md:text-[18px] xs:text-[16px] text-[#000] font-[500]">
                                            {lang === "ar"
                                              ? processArabicText(
                                                  item.name_arabic
                                                )
                                              : item.name_english}
                                          </span>
                                          <p className="flex mb-0 text-[18px] md:text-[18px] xs:text-[16px] basis-[40%] font-normal">
                                            <span className="flex items-center w-[150px]">
                                              <img
                                                src={BlackDollor}
                                                className={`${
                                                  lang === "ar"
                                                    ? "ml-2"
                                                    : "mr-2"
                                                }`}
                                              ></img>{" "}
                                              {amountDecimal(
                                                Math.round(item.price)
                                              )}{" "}
                                              {lang === "ar" ? "ريال" : "SAR"}{" "}
                                            </span>
                                            <span className="flex items-center w-[120px]">
                                              <AccessTimeIcon
                                                style={
                                                  lang === "ar"
                                                    ? { marginLeft: "5px" }
                                                    : { marginRight: "5px" }
                                                }
                                              />{" "}
                                              {Math.round(item.time)}{" "}
                                              {lang === "ar" ? "يوم" : "Days"}
                                            </span>
                                          </p>
                                          <p
                                            className={`mb-0 lg:basis-[5%] md:basis-[5%] xs:basis-[10%] h-[30px] text-[20px] md:text-[20px] xs:text-[16px] flex ${
                                              lang === "ar"
                                                ? "flex-row-reverse"
                                                : "flex-row"
                                            } items-center text-[#000] border !border-[#000]`}
                                          >
                                            <button
                                              onClick={() =>
                                                remove_item(item.id)
                                              }
                                              className={`${
                                                lang === "ar"
                                                  ? "border-r"
                                                  : "border-r"
                                              } !border-[#1BA56F] h-full flex items-center md:w-[35px] md:pt-[1%] md:px-[5%]`}
                                            >
                                              <RemoveIcon />
                                            </button>
                                            <span className="px-2 flex justify-center !border-[#1BA56F] md:w-[35px] md:pt-[1%] md:px-[5%]">
                                              {" "}
                                              {item.id in itemsList
                                                ? itemsList[item.id]["qty"]
                                                : 0}
                                            </span>
                                            <button
                                              // onClick={() => {
                                              //   console.log(path);
                                              //   ;
                                              //   if (
                                              //     (path === "adjustment" &&
                                              //       item.name_english ===
                                              //         "Logo & Identity" &&
                                              //       itemsList[item.id][
                                              //         "qty"
                                              //       ] === undefined) ||
                                              //     itemsList?.[item.id]?.[
                                              //       "qty"
                                              //     ] <= 1
                                              //   ) {
                                              //   }
                                              //   addItem(
                                              //     index,
                                              //     category,
                                              //     item.id
                                              //   );
                                              // }}

                                              onClick={() => {
                                                const isLogoAndIdentity =
                                                  item.name_english ===
                                                  "Logo & Identity";
                                                const isAdjustmentPath =
                                                  path === "adjustment";
                                                const currentQty =
                                                  itemsList?.[item.id]?.["qty"];

                                                const shouldPreventAdd =
                                                  isAdjustmentPath &&
                                                  isLogoAndIdentity &&
                                                  (currentQty === undefined ||
                                                    currentQty < 1);
                                                if (
                                                  isLogoAndIdentity &&
                                                  isAdjustmentPath
                                                ) {
                                                  if (shouldPreventAdd) {
                                                    addItem(
                                                      index,
                                                      category,
                                                      item.id
                                                    );
                                                  }
                                                } else {
                                                  addItem(
                                                    index,
                                                    category,
                                                    item.id
                                                  );
                                                }
                                              }}
                                              className={`flex items-center ${
                                                lang === "ar"
                                                  ? "border-l"
                                                  : "border-l"
                                              } !border-[#1BA56F] h-full md:w-[35px] md:pt-[1%] md:px-[5%]`}
                                            >
                                              <AddIcon />
                                            </button>
                                          </p>

                                          <div className="w-full justify-evenly">
                                            <div className=""></div>
                                            {item.name_english ===
                                              "Logo & Identity" && (
                                              <div
                                                className={`flex md:ml-[14%]  
                                                  lg:ml-[11%] macm2:ml-[9%] macm3:ml-[4%] macm1:ml-[11%]
                                                  lmd2:ml-[15%]   ${
                                                    window.innerWidth > 1440 &&
                                                    "ml-[1%]"
                                                  }
                                                  ${
                                                    window.innerWidth > 1440 &&
                                                    "ml-[10%]"
                                                  }
                                                  py-[1.5%] items-center mb-4 justify-center`}
                                              >
                                                <Typography>
                                                  <div className="flex gap-2">
                                                    {addOnLang?.map((ele) => {
                                                      return (
                                                        <div
                                                          className={`flex gap-1 ${
                                                            window.innerWidth >
                                                            379
                                                              ? "text-[16px]"
                                                              : "text-[15px]"
                                                          }   items-center cursor-pointer`}
                                                          key={`${ele.id}-${ele.language}`}
                                                        >
                                                          <input
                                                            type="radio"
                                                            checked={
                                                              ele.isChecked
                                                            }
                                                            onChange={() =>
                                                              handleAddOnChange(
                                                                ele.id,
                                                                ele.language
                                                              )
                                                            }
                                                            name="languageOption"
                                                            value={ele.language}
                                                            id={`lang_${ele.id}_${ele.language}`}
                                                          />
                                                          <label
                                                            htmlFor={`lang_${ele.id}_${ele.language}`}
                                                            className={`mb-0 ${
                                                              window.innerWidth <
                                                              346
                                                                ? "text-[12px]"
                                                                : window.innerWidth <
                                                                  362
                                                                ? "text-[14px]"
                                                                : window.innerWidth <
                                                                  379
                                                                ? "text-[15px]"
                                                                : window.innerWidth <=
                                                                  475
                                                                ? "text-[16px]"
                                                                : "text-[18px]"
                                                            } cursor-pointer`}
                                                          >
                                                            {ele.label}
                                                          </label>
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                </Typography>
                                              </div>
                                            )}
                                          </div>
                                          <div className=""></div>
                                        </div>
                                      </>
                                    );
                                  }
                                )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-[28%]  mt-4 py-2 sticky top-0 self-start">
              <p className="text-[18px] font-semibold px-3">
                {" "}
                {lang === "ar" ? "ملخص التعديلات" : "Summary of Edits"}
              </p>

              <div className="my-2">
                {Object.values(itemsList).map((item) => {
                  return (
                    <div className="flex items-start border-b-[1px] border-black mt-2">
                      <p className="mb-0 ml-4 mt-[4px] mr-2 flex items-center">
                        <a
                          onClick={() => {
                            toggleDescription(item.category);
                          }}
                          href={`#${item.id}_design_list`}
                        >
                          <img
                            className="mr-2 w-[18px] cursor-pointer"
                            src={EditIcon}
                          ></img>
                        </a>
                        <ClearIcon
                          onClick={() => removeItem(item.id, "items")}
                          style={
                            lang === "ar"
                              ? {
                                  marginLeft: "5px",
                                  width: "18px",
                                  cursor: "pointer",
                                }
                              : {
                                  marginRight: "5px",
                                  width: "18px",
                                  cursor: "pointer",
                                }
                          }
                        />
                      </p>
                      <div className="">
                        <p className="font-bold">
                          {" "}
                          {lang === "ar" ? item.name_arabic : item.name_english}
                          {/* {item.name_english === "Logo & Identity" &&
                          addOnLang.find((ele) => ele.isChecked)?.language ===
                            "both"
                            ? "(English & Arabic)"
                            : item.name_english === "Logo & Identity" && addOnLang.find((ele) => ele.isChecked)
                                ?.language === "English"
                            ? "(English)"
                            : item.name_english === "Logo & Identity" && "(Arabic)"} */}
                          {item.name_english === "Logo & Identity" &&
                          addOnLang.find((ele) => ele.isChecked)?.language ===
                            "both"
                            ? "(English & Arabic)"
                            : item.name_english === "Logo & Identity" &&
                              addOnLang.find((ele) => ele.isChecked)
                                ?.language === "English"
                            ? "(English)"
                            : item.name_english === "Logo & Identity" &&
                              "(Arabic)"}
                        </p>
                        <div className="flex font-[500] text-[#1BA56F]">
                          <p className="flex items-center">
                            <img
                              width={"18px"}
                              className="mr-[5px] h-[18px]"
                              src={dollorIcon}
                            ></img>
                            <span>
                              {addOnLang.find((ele) => ele.isChecked)
                                ?.language === "both" &&
                              item.name_english === "Logo & Identity"
                                ? calculateAmount(item.qty, item.price)
                                : amountDecimal(item.total_price)}{" "}
                              {lang === "ar" ? "ريال" : "SAR"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {Object.values(adjustmentData).map((item) => {
                  return (
                    <div className="flex items-start border-b-[1px] border-black mt-2">
                      <p className="mb-0 ml-4 mt-[4px] mr-2 flex items-center">
                        <img
                          onClick={() => {
                            setAdjustmentTab(
                              lang === "ar"
                                ? item.arabic_adjustment_name
                                : item.english_adjustment_name
                            );
                          }}
                          className="mr-2 w-[18px] cursor-pointer"
                          src={EditIcon}
                        ></img>
                        <ClearIcon
                          onClick={() => removeItem(item.id, "adjustment")}
                          style={
                            lang === "ar"
                              ? {
                                  marginLeft: "5px",
                                  width: "18px",
                                  cursor: "pointer",
                                }
                              : {
                                  marginRight: "5px",
                                  width: "18px",
                                  cursor: "pointer",
                                }
                          }
                        />
                      </p>
                      <div className="">
                        <p className="font-bold text-[18px]">
                          {" "}
                          {lang === "ar"
                            ? item?.arabic_adjustment_name
                            : item.english_adjustment_name}
                        </p>
                        <div className="flex font-[500] text-[#1BA56F]">
                          <p className="flex items-center">
                            <img
                              width={"18px"}
                              className="mr-[5px] h-[18px]"
                              src={dollorIcon}
                            ></img>
                            <span>
                              {amountDecimal(Math.round(item.price))}{" "}
                              {lang === "ar" ? "ريال" : "SAR"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bundl-checkout">
                <div className=" flex items-center mb-1">
                  <img
                    src={BlackDollor}
                    className={`${
                      lang === "ar" ? "ml-2 mr-2" : "ml-[6px] mr-4"
                    }`}
                    alt="Total Price"
                  />
                  <p className="basis-3/5 font-bold text-[18px] mb-0">
                    {lang === "ar" ? "\u00A0السعر الإجمالي :" : "Total Price :"}
                  </p>
                  <p
                    className={`text-[18px] !mb-0 font-bold ${
                      lang === "ar" ? "text-start" : "text-end"
                    }`}
                    style={{ width: "40%" }}
                  >
                    {amountDecimal(totalPrice)}{" "}
                    {lang === "ar" ? "\u00A0ريال" : "\u00A0\u00A0\u00A0SAR"}
                  </p>
                </div>
                <div className=" flex">
                  <img
                    className={`${lang === "ar" ? "ml-2" : "mr-2"}`}
                    src={BlackTime}
                    alt="Total Duration"
                  />
                  <p
                    className={`basis-3/5 text-[18px] mb-0 ${
                      lang === "ar" ? "mr-[6px]" : ""
                    }`}
                  >
                    {lang === "ar" ? "المدة الإجمالية :" : "Total Duration :"}
                  </p>
                  <p
                    className={`text-[18px] !mb-0 ${
                      lang === "ar" ? "text-start" : "text-end"
                    }`}
                    style={{ width: "40%" }}
                  >
                    {totalTime}{" "}
                    {lang === "ar" ? "\u00A0\u00A0يوم" : "\u00A0\u00A0Days"}
                  </p>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <button
                    onClick={() => CheckCart()}
                    className=" w-[90%]  py-1 lg:mt-[8%] md:mt-[12%] text-[18px] text-white bg-[#1BA56F] uppercase"
                  >
                    {lang === "ar" ? "المتابعة إلى السلة​" : "Proceed to Cart"}
                  </button>
                  {errorMsg && (
                    <p className="pb-0 text-[16px] text-[#D83D99] text-left mt-2">
                      {errorMsg}*
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mycart " style={{ position: "relative" }}>
            <div className="cart sm:!pb-[170px] !pb-[170px] xs:!pb-[20px]">
              <p
                className="flex !text-[18px] !font-normal items-center pb-2 cursor-pointer text-black"
                onClick={() => {
                  setPage("adjustment");
                }}
              >
                {" "}
                <ArrowBackIcon
                  style={
                    lang === "ar"
                      ? {
                          width: "25px",
                          marginLeft: "10px",
                          transform: "scaleX(-1)",
                        }
                      : { width: "25px", marginRight: "10px" }
                  }
                />{" "}
                Back To Adjustments{" "}
              </p>
              <p>{lang === "ar" ? "سلة التسوق الخاصة بك" : "Your Cart"}</p>
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
                      {lang === "ar" ? "بند" : "Item"}
                    </td>
                    <td
                      className="text-[#00000080] w-[30%] pb-3"
                      align="center"
                    >
                      {lang === "ar" ? "العدد" : "Quantity"}
                    </td>
                    <td
                      className="text-[#00000080] w-[30%]    pb-3"
                      align="center"
                    >
                      {lang === "ar" ? "السعر" : "Price"}
                    </td>
                    <td
                      className="text-[#00000080] w-[20%]    pb-3"
                      align="center"
                    >
                      {lang === "ar" ? "فعل" : "Action"}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(adjustmentData)?.map((row, index) => (
                    <tr
                      key={row.item_name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className={`text-[#000] font-[700] text-[20px] ${
                        index == Object.values(adjustmentData).length - 1 &&
                        Object.values(itemsList).length == 0
                          ? ""
                          : "border-b border-black"
                      } `}
                    >
                      <td className=" !py-2" scope="row">
                        {lang === "ar"
                          ? row.arabic_adjustment_name
                          : row.english_adjustment_name}
                      </td>

                      <td className=" !py-2" align="center">
                        1
                      </td>
                      <td className=" !py-2" align="center">
                        {amountDecimal(Math.round(row.price))}{" "}
                        {lang === "ar" ? "ريال" : "SAR"}{" "}
                      </td>
                      {/* <td className=" !py-2" scope="row">
                        {lang === "ar" ? row?.name_arabic : 
                        row.name_english === 'Logo & Identity'?`${row.name_english} 
                        (${addOnLang.find((ele)=>ele.isChecked)?.language})`:row.name_english}
                      </td> */}
                      <td align="center">
                        <p className="flex items-center !mb-0 justify-center">
                          <img
                            style={{ cursor: "pointer" }}
                            src={DeleteIcon}
                            alt="Delete Icon"
                            onClick={() => removeItem(row.id, "adjustment")}
                          />
                        </p>
                      </td>
                    </tr>
                  ))}

                  {Object.values(itemsList)?.map((row, index) => (
                    <tr
                      key={row.item_name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className={`text-[#000] font-[700] text-[20px] ${
                        index == Object.values(itemsList).length - 1
                          ? ""
                          : "border-b border-black"
                      } `}
                    >
                      <td className=" !py-2" scope="row">
                        {lang === "ar"
                          ? row?.name_arabic
                          : row.name_english === "Logo & Identity"
                          ? `${row.name_english} 
                        (${
                          addOnLang.find((ele) => ele.isChecked)?.language ===
                          "both"
                            ? "English & Arabic"
                            : addOnLang.find((ele) => ele.isChecked)
                                ?.language === "English"
                            ? "English"
                            : "Arabic"
                        })`
                          : row.name_english}
                      </td>
                      <td className=" !py-2" align="center">
                        {row.qty}
                      </td>
                      <td className=" !py-2" align="center" scope="row">
                        {addOnLang.find((ele) => ele.isChecked)?.language ===
                        "both"
                          ? amountDecimal(Math.round(row.price) + 2000)
                          : amountDecimal(Math.round(row.price))}
                      </td>
                      {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                      <td className=" !py-2" align="center" scope="row">
                        <p className="flex items-center !mb-0 justify-center">
                          {" "}
                          <img
                            style={{ cursor: "pointer" }}
                            src={DeleteIcon}
                            alt="Delete Icon"
                            onClick={() => removeItem(row.id, "items")}
                          />
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="billing !px-[2%] sticky top-0 self-start">
              <p>{lang === "ar" ? "عنوان الفواتير" : "Billing Address"}</p>
              <div className="user-name mb-[15px]">
                <div className={`${lang === "ar" ? "ml-[4%]" : "mr-[4%]"}`}>
                  <label
                    className={`${"firstName" in error && "text-[#D83D99]"}`}
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
                  className={`${lang === "ar" ? "ml-[4%]" : "mr-[4%]"}`}
                  style={
                    lang === "ar"
                      ? { margin: "0% 2% 0 0%" }
                      : { margin: "0% 0 0 2%" }
                  }
                >
                  <label
                    className={`${"lastName" in error && "text-[#D83D99]"}`}
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
                <label className={`${"email" in error && "text-[#D83D99]"}`}>
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
              <div className="phone mb-[15px]">
                <label className={`${"phone" in error && "text-[#D83D99]"}`}>
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
                    "phone" in error ? "!border-[#D83D99]" : "!border-[#000000]"
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
                    className={`${"country" in error && "text-[#D83D99]"}`}
                  >
                    {lang === "ar" ? "الدولة" : "Country"}{" "}
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
                  <label className={`${"city" in error && "text-[#D83D99]"}`}>
                    {lang === "ar" ? "المدينة" : "City"}
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
                  className={`${"postalCode" in error && "text-[#D83D99]"}`}
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
                        : "opacity-100"
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
              {istax && (
                <div className="trn-code mb-[15px]">
                  <label
                    className={`${
                      "trn" in error ? "text-[#D83D99]" : "opacity-100"
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
                  className={`rounded-none ${
                    "promoCode" in error && "text-[#D83D99]"
                  }`}
                >
                  {lang === "ar" ? "كود الخصم" : "Promo Code"}
                </label>
                <input
                  name="promoCode"
                  value={billingInfo.promoCode}
                  onChange={handleBillingChange}
                  className={`rounded-none ${
                    "promoCode" in error ? "!border-[#D83D99]" : ""
                  }`}
                />
              </div>
              <div className="cart-total-container border-[1px] border-black p-[2%_0_0_0]">
                <div
                  className="total justify-between sm:pl-[3%] xs:pl-[3%]  mr-4"
                  style={{ display: "flex" }}
                >
                  <p
                    className="!text-[20px] !font-[400]"
                    style={{ width: "50%" }}
                  >
                    {lang === "ar" ? "السعر :" : "Price:"}
                  </p>
                  <p
                    className="!text-[20px]  text-right !font-[400]"
                    style={{ width: "50%" }}
                  >
                    {amountDecimal(totalPrice)} {lang === "ar" ? "ريال" : "SAR"}
                  </p>
                </div>
                <div
                  className="total justify-between sm:pl-[3%] xs:pl-[3%] mr-4"
                  style={{ display: "flex" }}
                >
                  <p
                    className="!text-[20px] !font-[400]"
                    style={{ width: "53%" }}
                  >
                    {lang === "ar" ? "ضريبه القيمه المضافه:" : "VAT:"}
                  </p>
                  <p
                    className="!text-[20px]  text-right !font-[400]"
                    style={{ width: "40%" }}
                  >
                    {amountDecimal(tax)} {lang === "ar" ? "ريال" : "SAR"}
                  </p>
                </div>
                <div className="border-t-[1px] border-black p-[2%_0_0_2%]">
                  <div
                    className="justify-between mr-4"
                    style={{ display: "flex" }}
                  >
                    <p
                      className="!text-[20px] ml-[6px]"
                      style={{ width: "50%" }}
                    >
                      <img
                        src={BlackDollor}
                        className={`inline-block mr-[18px] ${
                          lang === "ar" ? "mr-[0px] " : "ml-[0px]"
                        }`}
                      ></img>
                      {lang === "ar" ? "السعر الإجمالي :" : "Total Price :"}
                    </p>
                    <p
                      className="!text-[20px] text-right"
                      style={{ width: "40%" }}
                    >
                      {amountDecimal(totalPrice + tax)}{" "}
                      {lang === "ar" ? "ريال" : "SAR"}
                    </p>
                  </div>
                  <div
                    className="justify-between mr-4"
                    style={{ display: "flex" }}
                  >
                    <p className="!text-[20px]" style={{ width: "66%" }}>
                      <AccessTimeIcon
                        style={
                          lang === "ar"
                            ? { marginLeft: "4px" }
                            : { marginRight: "4px" }
                        }
                      />{" "}
                      {lang === "ar" ? "المدة الإجمالية :" : "Total Duration :"}
                    </p>
                    <p
                      className="!text-[20px]  text-right"
                      style={{ width: "45%" }}
                    >
                      {totalTime} {lang === "ar" ? "يوم" : "Days"}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => createAdjustmentOrder()}
                className="payment uppercase"
              >
                {" "}
                {loading ? (
                  <ClipLoader size={25} color={"#FFFFFF"} />
                ) : lang === "ar" ? (
                  "المتابعة إلى الدفع​"
                ) : (
                  "Proceed to payment"
                )}
              </button>
              <p className="text-[#D83D99] !text-[20px] !font-[400] !mt-2">
                {Object.values(error).map((item) => {
                  return item;
                })}
              </p>
            </div>
          </div>
        </>
      )}
      {/* <Footer isLang={lang}/> */}

      {window?.innerWidth >= 500 && <Footer isLang={lang} />}
    </>
  );
}
