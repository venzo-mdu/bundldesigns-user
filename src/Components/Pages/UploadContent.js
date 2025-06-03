import React, { useState, useEffect } from "react";
import axios from "axios";
import { ConfigToken } from "../Auth/ConfigToken";
import { base_url } from "../Auth/BackendAPIUrl";
import { Footer } from "../Common/Footer/Footer";
import { Navbar } from "../Common/Navbar/Navbar";
import { format } from "date-fns";
import tickCircleIcon from "../../Images/tickCircleIcon.svg";
import checkboxIcon from "../../Images/Checkboxicon.svg";
import starIcon from "../../Images/starIcon.svg";
import backIcon from "../../Images/backIcon.svg";
import uploadIcon from "../../Images/uploadIcon.svg";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Bgloader } from "../Common/Background/Bgloader";
// import { toast, ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import BundlOrder from "./Order/Bundl";
import Addons from "./Order/Addons";

let newToastId = null;
export default function UploadContent({ lang, setLang }) {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [uploadContent, setUploadContent] = useState({});
  const [designQuestions, setDesignQuestions] = useState([]);
  const [skipId, setSkipId] = useState([]);
  const [showDetails, setDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 475);

  const [order, setOrder] = useState(null);
  const getOrderDetails = async () => {
    const response = await axios.get(
      `${base_url}/api/order/${orderId}/`,
      ConfigToken()
    );
    if (response.data) {
      setOrder(response.data.data);
      setDesignQuestions(response.data.design_question);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  useEffect(() => {
    if (localStorage.getItem(orderId)) {
      const data = JSON.parse(localStorage.getItem(orderId));
      console.log(data);
      setUploadContent(data?.answers);
    } else {
      setUploadContent({});
    }
  }, [orderId]);

  const uploadFile = async (e, id, field, name, idx) => {
    if (e.target.files.length) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("file_name", e.target.files[0]?.name);
      const response = await axios.post(
        `${base_url}/api/upload_file/`,
        formData,
        ConfigToken()
      );
      console.log(response.data, "res");
      setUploadContent((prev) => ({
        ...prev,
        [id]: {
          ...prev[id], // Preserve other fields for this ID
          [idx]: {
            ...prev[id]?.[idx],
            [field]: field === "file" && response.data.file_url,
            ...(field === "file" && {
              filename: e.target.files[0]?.name || "",
            }),
            item_sub_name: name,
          },
        },
      }));
    }
  };

  // const saveContent = async (itemId) => {
  //     if(uploadContent?.[item?.id]?.content){

  //     }
  //     const formData = { answers: { [itemId]: uploadContent[itemId] }, orderId: order.id, status: 'save_later' }
  //     const response = await axios.post(`${base_url}/api/upload_content/`, formData, ConfigToken());
  //     getOrderDetails()
  // }

  const colors = {
    12: "#f175ad",
    4: "#1BA56F",
    22: "#00A8C8",
    13: "#f175ad",
  };

  const [themeColor, setThemeColor] = useState("#000");

  useEffect(() => {
    setThemeColor("#1BA56F");
  }, [order]);

  const toastMessage = () => {
    const message = "Content saved successfully!";

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

  const toastErrorMessage = (msg) => {
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

  const saveContent = async (itemId, idx, designId) => {
    console.log(designId);
    try {
      if (
        !uploadContent?.[itemId]?.[idx]?.language &&
        designQuestions[designId]?.language
      ) {
        // toast.error(
        //   lang === ""
        //     ? "يرجى اختيار اللغة قبل الحفظ"
        //     : "Please choose language before saving. 1111111111",
        //   {
        //     icon: false,
        //     toastId: "required-value-toast1",
        //     style: {
        //       color: "#D83D99",
        //       fontWeight: "700",
        //     },
        //   }
        // );
        // lang === ""
        //   ? "يرجى اختيار اللغة قبل الحفظ"
        //   : "Please choose language before saving.";
        // debugger;
        toastErrorMessage(
          lang === ""
            ? "يرجى اختيار اللغة قبل الحفظ"
            : "Please choose language before saving."
        );
        return;
      }
      if (
        !uploadContent?.[itemId]?.[idx]?.content &&
        designQuestions[designId]?.textbox
      ) {
        // toast.error(
        //   lang === "ar"
        //     ? "يرجى إضافة المحتوى قبل الحفظ"
        //     : "Please add content before saving.",
        //   {
        //     icon: false,
        //     toastId: "required-value-toast2",
        //     style: {
        //       color: "#D83D99",
        //       fontWeight: "700",
        //     },
        //   }
        // );
        toastErrorMessage(
          lang === ""
            ? "يرجى إضافة المحتوى قبل الحفظ"
            : "Please add content before saving."
        );
        return;
      }
      if (
        !uploadContent?.[itemId]?.[idx]?.measurements &&
        designQuestions[designId]?.measurement
      ) {
        toast.error(
          lang === "ar"
            ? "يرجى إضافة المقاسات قبل الحفظ"
            : "Please add measurements before saving.",
          {
            icon: false,
            toastId: "required-value-toast3",
            style: {
              color: "#D83D99",
              fontWeight: "700",
            },
          }
        );
        return;
      }
      if (
        !uploadContent?.[itemId]?.[idx]?.filename &&
        designQuestions[designId]?.attachemnt
      ) {
        toast.error(
          lang === "ar" ? "يرجى رفع المحتوى" : "Please upload the content.",
          {
            icon: false,
            toastId: "required-value-toast4",
            style: {
              color: "#D83D99",
              fontWeight: "700",
            },
          }
        );
        return;
      }

      const formData = {
        answers: {
          [itemId]: {
            [idx]: uploadContent?.[itemId]?.[idx] || {},
          },
        },
        orderId: order.id,
        status: "save_later",
      };

      const response = await axios.post(
        `${base_url}/api/upload_content/`,
        formData,
        ConfigToken()
      );

      if (response.status === 201) {
        console.log("Content saved successfully!");
        toastMessage();
        // toast.success("Content saved successfully!", {
        //   icon: false,
        //   toastId: "required-value-toast5",
        //   style: {
        //     color: "#1BA56F",
        //     fontWeight: "700",
        //   },
        // });
        getOrderDetails();
      } else {
        console.error("Unexpected response:", response);
        toast.error(
          lang === "ar"
            ? "مرة أخرى حدث خطأ ما! يرجى المحاولة "
            : "Something went wrong! Please try again.",
          {
            icon: false,
            toastId: "required-value-toast6",
            style: {
              color: "#D83D99",
              fontWeight: "700",
            },
          }
        );
      }
    } catch (error) {
      console.error("Save failed:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || lang === "ar"
          ? "المحاولة مرة أخرى يرجى فشل في حفظ المحتوى "
          : "Failed to save content. Please try again.",
        {
          icon: false,
          toastId: "required-value-toast7",
          style: {
            color: "#D83D99",
            fontWeight: "700",
          },
        }
      );
    }
  };
  const saveAllContent = async (status) => {
    const formData = {
      answers: uploadContent,
      orderId: order.id,
      status: status,
    };
    const response = await axios.post(
      `${base_url}/api/upload_content/`,
      formData,
      ConfigToken()
    );
    window.location.href = "/dashboard";
  };

  const saveForLater = () => {
    const formData = { answers: uploadContent, orderId: order.id };
    localStorage?.setItem(order.id, JSON.stringify(formData));
    window.location.href = "/dashboard";
  };

  const handleChange = (e, id, field, name, idx) => {
    let newValue = field === "file" ? e.target.files[0] : e.target.value;

    if (field === "height" || field === "length" || field === "width") {
      newValue = newValue.replace(/[^0-9]/g, ""); // Allow only digits
    }

    setUploadContent((prev) => ({
      ...prev,
      [id]: {
        ...prev[id], // Preserve other fields for this ID
        [idx]: {
          ...prev[id]?.[idx],
          [field]: newValue, // Update the file or other field
          ...(field === "file" && { filename: e.target.files[0]?.name || "" }),
          item_sub_name: name,
        },
      },
    }));
  };

  return loading ? (
    <Bgloader />
  ) : (
    <>
      {/* <ToastContainer /> */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            color: themeColor,
            fontWeight: "700",
            borderRadius: "0px !important",
            border: `1px solid ${themeColor}`,
          },
        }}
      />
      <Navbar isLang={lang} setIsLang={setLang} />
      {window.innerWidth <= 475 ? (
        <div className="px-[4%] py-4 font-Helvetica">
          <p
            onClick={() => (window.location.href = "/dashboard")}
            className="flex font-[500] !text-[20px] items-center text-black cursor-pointer"
          >
            {" "}
            <img
              src={backIcon}
              className={`${
                lang === "ar" ? "ml-2 scale-x-[-1]" : "mr-2"
              } w-[30px]`}
            ></img>
            {lang === "ar" ? "العودة إلى لوحة التحكم" : "Back to dashboard"}{" "}
          </p>
          <div className="px-2 lg:mb-0 md:mb-0 xs:mb-[55%]">
            <h3 className="my-4">
              {" "}
              {lang === "ar" ? "تحميل المحتوى" : "Upload Document"}{" "}
            </h3>

            {order && (
              <>
                {order.item_details.bundle_items
                  .filter(
                    (item) =>
                      item.item__id !== 76 &&
                      !skipId?.includes(item.id) &&
                      item.status == "questionnaire required"
                  )
                  .map((item, index, filterArr) =>
                    Array.from(
                      { length: item.qty },
                      (_, qtyIndex) => qtyIndex + 1
                    ) // Create an array [1, 2, ..., qty]
                      .filter((qty) => !item.uploaded_qty?.includes(qty)) // Exclude uploaded quantities
                      .map((filterIndex) => {
                        const hasMultipleQty = item.qty < 1;
                        return (
                          <div
                            className={`${
                              (filterArr.length === 1 ||
                                index === filterArr.length - 1 ||
                                order.item_details.bundle_items.length === 0) &&
                              hasMultipleQty
                                ? ""
                                : "border-b !border-black"
                            } mt-[2%]`}
                          >
                            <p className="mb-0 font-[700] text-[20px]">
                              {lang === "ar"
                                ? item?.item__name_arabic
                                : item.item_name}{" "}
                              {item?.qty > 1 && filterIndex}
                            </p>
                            {designQuestions[item.item__id]?.language && (
                              <p className="mt-2">
                                <label
                                  className={`${
                                    lang === "ar" ? "ml-6" : "mr-6"
                                  } font-[500]`}
                                >
                                  <input
                                    type="radio"
                                    value="English"
                                    checked={
                                      uploadContent[item.id]?.[filterIndex]
                                        ?.language === "English"
                                    }
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        item.id,
                                        "language",
                                        item.item_name + "-" + filterIndex,
                                        filterIndex
                                      )
                                    }
                                    className="form-radio accent-[#1BA56F] mr-2"
                                  />{" "}
                                  {lang === "ar" ? "انجليزي" : "English"}
                                </label>
                                <label className="font-[500]">
                                  <input
                                    type="radio"
                                    value="Arabic"
                                    checked={
                                      uploadContent[item.id]?.[filterIndex]
                                        ?.language === "Arabic"
                                    }
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        item.id,
                                        "language",
                                        item.item_name + "-" + filterIndex,
                                        filterIndex
                                      )
                                    }
                                    className="form-radio accent-[#1BA56F] mr-2"
                                  />{" "}
                                  {lang === "ar" ? "عربي" : "Arabic"}{" "}
                                </label>
                              </p>
                            )}

                            {designQuestions[item.item__id]?.content && (
                              <p className="w-[100%]">
                                <input
                                  placeholder={
                                    lang === "ar"
                                      ? "اضف المحتوى هنا...."
                                      : "Write content here​...."
                                  }
                                  value={
                                    uploadContent?.[item?.id]?.[filterIndex]
                                      ?.content || ""
                                  }
                                  onChange={(e) =>
                                    handleChange(
                                      e,
                                      item.id,
                                      "content",
                                      item.item_name + "-" + filterIndex,
                                      filterIndex
                                    )
                                  }
                                  className="border !border-black h-[55px] w-full py-2 px-2 rounded-none"
                                ></input>
                              </p>
                            )}
                            {designQuestions[item.item__id]?.measurement && (
                              <>
                                <p className="mb-2  text-[20px] font-bold">
                                  {lang === "ar" ? "القياسات" : "Measurements"}
                                </p>
                                <p>
                                  <label
                                    className={
                                      lang === "ar"
                                        ? "ml-6 font-[500]"
                                        : "mr-6 font-[500]"
                                    }
                                  >
                                    <input
                                      type="radio"
                                      value="Standard"
                                      checked={
                                        uploadContent[item.id]?.[filterIndex]
                                          ?.measurements === "Standard"
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          item.id,
                                          "measurements",
                                          item.item_name + "-" + filterIndex,
                                          filterIndex
                                        )
                                      }
                                      className="form-radio accent-[#1BA56F] mr-2"
                                    />{" "}
                                    {lang === "ar" ? "قياس عام " : "Standard"}{" "}
                                  </label>
                                  <label className="mr-2 font-[500]">
                                    <input
                                      type="radio"
                                      value="Customize"
                                      checked={
                                        uploadContent[item.id]?.[filterIndex]
                                          ?.measurements === "Customize"
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          item.id,
                                          "measurements",
                                          item.item_name + "-" + filterIndex,
                                          filterIndex
                                        )
                                      }
                                      className="form-radio accent-[#1BA56F] mr-2"
                                    />{" "}
                                    {lang === "ar" ? "قياس خاص " : "Customize"}{" "}
                                  </label>
                                  {uploadContent[item.id]?.[filterIndex]
                                    ?.measurements === "Customize" && (
                                    <>
                                      <span className="text-[#1BA56F] mr-2">
                                        {" "}
                                        CM{" "}
                                      </span>{" "}
                                    </>
                                  )}
                                  {uploadContent[item.id]?.[filterIndex]
                                    ?.measurements === "Customize" && (
                                    <div className="flex">
                                      <label className="text-[#1BA56F] mr-2">
                                        {" "}
                                        Width :{" "}
                                        <input
                                          type="text"
                                          min="0"
                                          onChange={(e) =>
                                            handleChange(
                                              e,
                                              item.id,
                                              "width",
                                              item.item_name +
                                                "-" +
                                                filterIndex,
                                              filterIndex
                                            )
                                          }
                                          value={
                                            uploadContent?.[item?.id]?.[
                                              filterIndex
                                            ]?.width || ""
                                          }
                                          className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                        ></input>
                                      </label>
                                      <label className="text-[#1BA56F] mr-2">
                                        {" "}
                                        Height :{" "}
                                        <input
                                          type="text"
                                          min="0"
                                          onChange={(e) =>
                                            handleChange(
                                              e,
                                              item.id,
                                              "height",
                                              item.item_name +
                                                "-" +
                                                filterIndex,
                                              filterIndex
                                            )
                                          }
                                          value={
                                            uploadContent?.[item?.id]?.[
                                              filterIndex
                                            ]?.height || ""
                                          }
                                          className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                        ></input>
                                      </label>
                                      <label className="text-[#1BA56F] mr-2">
                                        {" "}
                                        Length :{" "}
                                        <input
                                          type="text"
                                          min="0"
                                          onChange={(e) =>
                                            handleChange(
                                              e,
                                              item.id,
                                              "length",
                                              item.item_name +
                                                "-" +
                                                filterIndex,
                                              filterIndex
                                            )
                                          }
                                          value={
                                            uploadContent?.[item?.id]?.[
                                              filterIndex
                                            ]?.length || ""
                                          }
                                          className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                        ></input>
                                      </label>
                                    </div>
                                  )}
                                </p>
                              </>
                            )}

                            {designQuestions[item.item__id]?.attachment && (
                              <>
                                <p className="mb-2 font-[500] text-[20px]">
                                  {lang === "ar"
                                    ? "تحب ترسل ملفات اضافية؟"
                                    : "Have something to show us?"}
                                </p>
                                <p
                                  className={`border-b-2 ${
                                    uploadContent?.[item?.id]?.[filterIndex]
                                      ?.filename
                                      ? "w-fit"
                                      : "w-[150px]"
                                  } !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer`}
                                  onClick={() =>
                                    document
                                      .getElementById(
                                        `file-${item.id}_${filterIndex}`
                                      )
                                      .click()
                                  } // Trigger click on hidden input
                                >
                                  <input
                                    type="file"
                                    hidden
                                    name="file"
                                    id={`file-${item.id}_${filterIndex}`} // Use a unique ID for each input
                                    onChange={(e) =>
                                      uploadFile(
                                        e,
                                        item.id,
                                        "file",
                                        item.item_name + "-" + filterIndex,
                                        filterIndex
                                      )
                                    }
                                  />
                                  <img src={uploadIcon} alt="Upload Icon" />
                                  {uploadContent?.[item?.id]?.[filterIndex]
                                    ?.filename ||
                                    (lang === "ar"
                                      ? "إضافة المحتوى"
                                      : "Upload Content")}
                                </p>
                              </>
                            )}
                            <p className="my-6 flex justify-center">
                              {" "}
                              <button
                                onClick={() => {
                                  setSkipId([...skipId, item.id]);
                                }}
                                className={`text-[#1BA56F] py-1 px-2 border !border-[#1BA56F] ${
                                  lang === "ar" ? "ml-2" : "mr-2"
                                } uppercase`}
                              >
                                {lang === "ar"
                                  ? "اكمل في وقت لاحق"
                                  : "Skip For Now"}
                              </button>
                              <button
                                onClick={() =>
                                  saveContent(
                                    item.id,
                                    filterIndex,
                                    item.item__id
                                  )
                                }
                                className="text-white bg-[#1BA56F] py-1 px-2 uppercase"
                              >
                                {lang === "ar" ? "حفظ والتالي" : "Save & Next"}
                              </button>
                            </p>
                          </div>
                        );
                      })
                  )}
                {order.item_details.addon_items
                  .filter(
                    (item) =>
                      !skipId?.includes(item.id) &&
                      item.status == "questionnaire required"
                  )
                  .map((item, index, filterArr) =>
                    Array.from(
                      { length: item.qty },
                      (_, qtyIndex) => qtyIndex + 1
                    )
                      .filter((qty) => !item.uploaded_qty?.includes(qty))
                      .map((filterIndex) => {
                        const hasMultipleQty = item.qty < 1;
                        return (
                          <div
                            className={`${
                              (filterArr.length === 1 ||
                                index === filterArr.length - 1 ||
                                order.item_details.addon_items.length === 0) &&
                              !hasMultipleQty
                                ? ""
                                : "border-b !border-black"
                            } mt-[2%]`}
                          >
                            <p className="mb-0 font-[700] text-[20px]">
                              {" "}
                              Addons -{" "}
                              {lang === "ar"
                                ? item?.item__name_arabic
                                : item.item_name}{" "}
                              {item?.qty > 1 && filterIndex}{" "}
                            </p>
                            {designQuestions[item.item__id]?.language && (
                              <p className="mt-2 mb-0">
                                <label
                                  className={`${
                                    lang === "ar" ? "ml-6" : "mr-6"
                                  } font-[500]`}
                                >
                                  <input
                                    type="radio"
                                    value="English"
                                    checked={
                                      uploadContent[item.id]?.[filterIndex]
                                        ?.language === "English"
                                    }
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        item.id,
                                        "language",
                                        item.item_name + "-" + filterIndex,
                                        filterIndex
                                      )
                                    }
                                    className="form-radio accent-[#1BA56F] mr-2"
                                  />{" "}
                                  {lang === "ar" ? "انجليزي" : "English"}
                                </label>
                                <label className="font-[500]">
                                  <input
                                    type="radio"
                                    value="Arabic"
                                    checked={
                                      uploadContent[item.id]?.[filterIndex]
                                        ?.language === "Arabic"
                                    }
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        item.id,
                                        "language",
                                        item.item_name + "-" + filterIndex,
                                        filterIndex
                                      )
                                    }
                                    className="form-radio accent-[#1BA56F] mr-2"
                                  />{" "}
                                  {lang === "ar" ? "عربي" : "Arabic"}{" "}
                                </label>
                              </p>
                            )}

                            {designQuestions[item.item__id]?.content && (
                              <p className="w-[100%] mt-2">
                                <input
                                  placeholder={
                                    lang === "ar"
                                      ? "اضف المحتوى هنا...."
                                      : "Write content here​...."
                                  }
                                  value={
                                    uploadContent?.[item?.id]?.[filterIndex]
                                      ?.content || ""
                                  }
                                  onChange={(e) =>
                                    handleChange(
                                      e,
                                      item.id,
                                      "content",
                                      item.item_name + "-" + filterIndex,
                                      filterIndex
                                    )
                                  }
                                  className="border !border-black h-[55px] w-full py-2 px-2 rounded-none"
                                ></input>
                              </p>
                            )}
                            {designQuestions[item.item__id]?.measurement && (
                              <>
                                <p className="mb-2 text-[20px] font-bold">
                                  {lang === "ar" ? "القياسات" : "Measurements"}
                                </p>
                                <p className="ml-2">
                                  <label
                                    className={`${
                                      lang === "ar" ? "ml-6" : "mr-6"
                                    } font-[500]`}
                                  >
                                    <input
                                      type="radio"
                                      value="Standard"
                                      checked={
                                        uploadContent[item.id]?.[filterIndex]
                                          ?.measurements === "Standard"
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          item.id,
                                          "measurements",
                                          item.item_name + "-" + filterIndex,
                                          filterIndex
                                        )
                                      }
                                      className="form-radio accent-[#1BA56F] mr-2"
                                    />{" "}
                                    {lang === "ar" ? "قياس عام " : "Standard"}{" "}
                                  </label>
                                  <label className="mr-2 font-[500]">
                                    <input
                                      type="radio"
                                      value="Customize"
                                      checked={
                                        uploadContent[item.id]?.[filterIndex]
                                          ?.measurements === "Customize"
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          item.id,
                                          "measurements",
                                          item.item_name + "-" + filterIndex,
                                          filterIndex
                                        )
                                      }
                                      className="form-radio accent-[#1BA56F] mr-2"
                                    />{" "}
                                    {lang === "ar" ? "قياس خاص " : "Customize"}{" "}
                                  </label>

                                  {uploadContent[item.id]?.[filterIndex]
                                    ?.measurements === "Customize" && (
                                    <>
                                      <span className="text-[#1BA56F] mr-2">
                                        {" "}
                                        CM{" "}
                                      </span>{" "}
                                    </>
                                  )}
                                  {uploadContent[item.id]?.[filterIndex]
                                    ?.measurements === "Customize" && (
                                    <div className="flex">
                                      <label className="text-[#1BA56F] mr-2">
                                        {" "}
                                        Width :{" "}
                                        <input
                                          type="text"
                                          min="0"
                                          onChange={(e) =>
                                            handleChange(
                                              e,
                                              item.id,
                                              "width",
                                              item.item_name +
                                                "-" +
                                                filterIndex,
                                              filterIndex
                                            )
                                          }
                                          value={
                                            uploadContent?.[item?.id]?.[
                                              filterIndex
                                            ]?.width || ""
                                          }
                                          className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                        ></input>
                                      </label>
                                      <label className="text-[#1BA56F] mr-2">
                                        {" "}
                                        Height :{" "}
                                        <input
                                          type="text"
                                          min="0"
                                          onChange={(e) =>
                                            handleChange(
                                              e,
                                              item.id,
                                              "height",
                                              item.item_name +
                                                "-" +
                                                filterIndex,
                                              filterIndex
                                            )
                                          }
                                          value={
                                            uploadContent?.[item?.id]?.[
                                              filterIndex
                                            ]?.height || ""
                                          }
                                          className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                        ></input>
                                      </label>
                                      <label className="text-[#1BA56F] mr-2">
                                        {" "}
                                        Length :{" "}
                                        <input
                                          type="text"
                                          min="0"
                                          onChange={(e) =>
                                            handleChange(
                                              e,
                                              item.id,
                                              "length",
                                              item.item_name +
                                                "-" +
                                                filterIndex,
                                              filterIndex
                                            )
                                          }
                                          value={
                                            uploadContent?.[item?.id]?.[
                                              filterIndex
                                            ]?.length || ""
                                          }
                                          className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                        ></input>
                                      </label>
                                    </div>
                                  )}
                                </p>
                              </>
                            )}

                            {designQuestions[item.item__id]?.attachment && (
                              <>
                                <p className="mb-2 font-[500] text-[20px]">
                                  {lang === "ar"
                                    ? "تحب ترسل ملفات اضافية؟"
                                    : "Have something to show us?"}
                                </p>
                                <p
                                  className={`border-b-2 ${
                                    uploadContent?.[item?.id]?.[filterIndex]
                                      ?.filename
                                      ? "w-fit"
                                      : "w-[150px]"
                                  } !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer`}
                                  onClick={() =>
                                    document
                                      .getElementById(
                                        `file-${item.id}_${filterIndex}`
                                      )
                                      .click()
                                  } // Trigger click on hidden input
                                >
                                  <input
                                    type="file"
                                    hidden
                                    name="file"
                                    id={`file-${item.id}_${filterIndex}`} // Use a unique ID for each input
                                    onChange={(e) =>
                                      uploadFile(
                                        e,
                                        item.id,
                                        "file",
                                        item.item_name + "-" + filterIndex,
                                        filterIndex
                                      )
                                    }
                                  />
                                  <img src={uploadIcon} alt="Upload Icon" />
                                  {uploadContent?.[item?.id]?.[filterIndex]
                                    ?.filename ||
                                    (lang === "ar"
                                      ? "تحميل المحتوى"
                                      : "Upload Content")}
                                </p>
                              </>
                            )}

                            <p className="my-6 flex justify-center">
                              {" "}
                              <button
                                onClick={() => {
                                  setSkipId([...skipId, item.id]);
                                }}
                                className="text-[#1BA56F] py-1 px-2 border !border-[#1BA56F] mr-2 uppercase"
                              >
                                {lang === "ar"
                                  ? "أكمل في وقت لاحق"
                                  : "Skip For Now"}
                              </button>
                              <button
                                onClick={() =>
                                  saveContent(
                                    item.id,
                                    filterIndex,
                                    item.item__id
                                  )
                                }
                                className="text-white bg-[#1BA56F] py-1 px-2 uppercase"
                              >
                                {lang === "ar" ? "حفظ والتالي" : "Save & Next"}
                              </button>
                            </p>
                          </div>
                        );
                      })
                  )}
              </>
            )}
          </div>

          <div
            style={{
              maxHeight: showDetails ? "600px" : "200px",
              transition: "all 0.5s ease-in-out",
            }}
            className={`fixed bg-white bottom-0 overflow-y-scroll xs:p-[5%_5%_12%_5%] border ${
              showDetails ? "max-h-[80%]" : "h-[200px]"
            } w-full left-0 z-[1]`}
          >
            <div className="bundl-name ">
              <p className="sm:text-[24px] xs:mb-0 xs:flex xs:justify-between sm:block font-[700] px-0 !mb-2">
                <span className="font-[400] text-[16px] font-Helvetica">
                  {lang === "ar" ? "قائمه" : "Checklist"}
                </span>
                {isMobile && (
                  <button
                    onClick={() => setDetails(!showDetails)}
                    className="text-[14px] font-[500] underline text-[#1BA56F]"
                  >
                    {!showDetails ? "Show Details" : "Hide Details"}
                  </button>
                )}
              </p>
            </div>
            {isMobile ? (
              <>
                <div>
                  <div className="!mt-[15px] my-2 w-full">
                    {order && (
                      <div className="px-[5%]">
                        {order.item_details.bundle_items.map(
                          (item, itemIndex) => {
                            if (item.item__id !== 76) {
                              return (
                                <div key={itemIndex}>
                                  {Array.from(
                                    { length: Math.max(1, item.qty) },
                                    (_, qtyIndex) => {
                                      const isUploaded =
                                        !item.uploaded_qty?.includes(
                                          qtyIndex + 1
                                        );
                                      return (
                                        <div
                                          key={`${item.id}_${qtyIndex}`}
                                          className="flex items-center mb-1  text-[#1BA56F] w-[100%]"
                                        >
                                          <p className="mb-0 font-medium w-[95%]">
                                            {lang === "ar"
                                              ? item?.item__name_arabic
                                              : item.item_name}{" "}
                                            {item.qty > 1 && qtyIndex + 1}
                                          </p>

                                          {item.status ==
                                            "questionnaire required" &&
                                          isUploaded ? (
                                            // <div className="w-4 h-4 border-2 border-[#1BA56F] rounded-full"></div>
                                            <img
                                              src={checkboxIcon}
                                              width={"26px"}
                                            ></img>
                                          ) : (
                                            <img src={tickCircleIcon}></img>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              );
                            }
                            return null;
                          }
                        )}

                        {order.item_details.addon_items.map((item) =>
                          Array.from(
                            { length: Math.max(1, item.qty) },
                            (_, qtyIndex) => {
                              const isUploaded = !item.uploaded_qty?.includes(
                                qtyIndex + 1
                              );
                              return (
                                <div className="flex items-center mb-1 text-[#1BA56F]">
                                  <div className="flex  w-[100%]">
                                    <p className="mb-0 font-medium w-[95%]">
                                      {" "}
                                      Addons -{" "}
                                      {lang === "ar"
                                        ? item?.item__name_arabic
                                        : item.item_name}{" "}
                                      {item?.qty > 1 && qtyIndex + 1}
                                    </p>
                                    {item.status == "questionnaire required" &&
                                    isUploaded ? (
                                      // <div className="w-4 h-4 border-2 border-[#1BA56F] rounded-full"></div>
                                      <img
                                        src={checkboxIcon}
                                        width={"26px"}
                                      ></img>
                                    ) : (
                                      <img src={tickCircleIcon}></img>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          )
                        )}
                      </div>
                    )}
                    <div className="border-b-[1px] border-black mt-4"></div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="font-Helvetica flex" style={{ position: "relative" }}>
          <div
            className={`basis-3/4 ${
              lang === "ar" ? "border-l" : "border-r"
            } border-black py-4`}
          >
            <p
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              className="flex cursor-pointer text-[18px] items-center text-black px-4"
            >
              {" "}
              <img
                src={backIcon}
                className={`${lang === "ar" ? "ml-2 scale-x-[-1]" : "mr-2"} `}
              ></img>{" "}
              {lang === "ar" ? "العودة إلى لوحة القيادة" : "Back to dashboard"}{" "}
            </p>
            <div className="">
              <h3 className="my-4 px-[5%]">
                {" "}
                {lang === "ar" ? "تحميل المحتوى" : "Upload Document"}{" "}
              </h3>

              {order && (
                <>
                  {order.item_details.bundle_items
                    .filter(
                      (item) =>
                        item.item__id !== 76 &&
                        !skipId?.includes(item.id) &&
                        item.status == "questionnaire required"
                    )
                    .map((item, index, filterArr) =>
                      Array.from(
                        { length: item.qty },
                        (_, qtyIndex) => qtyIndex + 1
                      ) // Create an array [1, 2, ..., qty]
                        .filter((qty) => !item.uploaded_qty?.includes(qty)) // Exclude uploaded quantities
                        .map((filterIndex) => {
                          const hasMultipleQty = item.qty < 1;
                          return (
                            <div
                              className={`${
                                filterArr.length === 1 ||
                                ((index === filterArr.length - 1 ||
                                  order.item_details.bundle_items?.length ===
                                    0) &&
                                  hasMultipleQty)
                                  ? ""
                                  : ""
                              } pl-[5%] space-x-2 mt-[2%]`}
                            >
                              <div className="-ml-[5%] w-[calc(100%+5%)] border-y border-black py-2">
                                <div className="pl-[5%]">
                                  <p className="mb-0 font-semibold text-[22px]">
                                    {lang === "ar"
                                      ? item?.item__name_arabic
                                      : item.item_name}{" "}
                                    {item?.qty > 1 && filterIndex}
                                  </p>
                                </div>
                              </div>

                              {designQuestions[item.item__id]?.language && (
                                <p className="mt-2">
                                  <label
                                    className={`${
                                      lang === "ar" ? "ml-6" : "mr-6"
                                    } font-[500]`}
                                  >
                                    <input
                                      type="radio"
                                      value="English"
                                      checked={
                                        uploadContent[item.id]?.[filterIndex]
                                          ?.language === "English"
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          item.id,
                                          "language",
                                          item.item_name + "-" + filterIndex,
                                          filterIndex
                                        )
                                      }
                                      className="form-radio accent-[#1BA56F] mr-2"
                                    />{" "}
                                    {lang === "ar" ? "انجليزي" : "English"}
                                  </label>
                                  <label className="font-[500]">
                                    <input
                                      type="radio"
                                      value="Arabic"
                                      checked={
                                        uploadContent[item.id]?.[filterIndex]
                                          ?.language === "Arabic"
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          item.id,
                                          "language",
                                          item.item_name + "-" + filterIndex,
                                          filterIndex
                                        )
                                      }
                                      className="form-radio accent-[#1BA56F] mr-2"
                                    />{" "}
                                    {lang === "ar" ? "عربي" : "Arabic"}{" "}
                                  </label>
                                </p>
                              )}

                              {designQuestions[item.item__id]?.content && (
                                <p className="flex lg:w-[70%] md:w-[90%]">
                                  <input
                                    placeholder={
                                      lang === "ar"
                                        ? "اضف المحتوى هنا...."
                                        : "Write content here​...."
                                    }
                                    value={
                                      uploadContent?.[item?.id]?.[filterIndex]
                                        ?.content || ""
                                    }
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        item.id,
                                        "content",
                                        item.item_name + "-" + filterIndex,
                                        filterIndex
                                      )
                                    }
                                    className="border !border-black py-2 px-2 w-full rounded-none "
                                    required
                                  ></input>
                                </p>
                              )}
                              {designQuestions[item.item__id]?.measurement && (
                                <>
                                  <p className="font-bold">
                                    {lang === "ar"
                                      ? "القياسات"
                                      : "Measurements"}
                                  </p>
                                  <p className="mt-2">
                                    <label
                                      className={`${
                                        lang === "ar" ? "ml-6" : "mr-6"
                                      } font-[500]`}
                                    >
                                      <input
                                        type="radio"
                                        value="Standard"
                                        checked={
                                          uploadContent[item.id]?.[filterIndex]
                                            ?.measurements === "Standard"
                                        }
                                        onChange={(e) =>
                                          handleChange(
                                            e,
                                            item.id,
                                            "measurements",
                                            item.item_name + "-" + filterIndex,
                                            filterIndex
                                          )
                                        }
                                        className="form-radio accent-[#1BA56F] mr-2"
                                      />{" "}
                                      {lang === "ar" ? "قياس عام " : "Standard"}{" "}
                                    </label>
                                    <label className="mr-2 font-[500]">
                                      <input
                                        type="radio"
                                        value="Customize"
                                        checked={
                                          uploadContent[item.id]?.[filterIndex]
                                            ?.measurements === "Customize"
                                        }
                                        onChange={(e) =>
                                          handleChange(
                                            e,
                                            item.id,
                                            "measurements",
                                            item.item_name + "-" + filterIndex,
                                            filterIndex
                                          )
                                        }
                                        className="form-radio accent-[#1BA56F] mr-2"
                                      />{" "}
                                      {lang === "ar"
                                        ? "قياس خاص "
                                        : "Customize"}{" "}
                                    </label>

                                    {uploadContent[item.id]?.measurements ===
                                      "Customize" && (
                                      <>
                                        <label className="text-[#1BA56F] mr-2">
                                          {" "}
                                          Width :{" "}
                                          <input
                                            type="text"
                                            min="0"
                                            onChange={(e) =>
                                              handleChange(
                                                e,
                                                item.id,
                                                "width",
                                                item.item_name +
                                                  "-" +
                                                  filterIndex,
                                                filterIndex
                                              )
                                            }
                                            value={
                                              uploadContent?.[item?.id]?.[
                                                filterIndex
                                              ]?.width || ""
                                            }
                                            className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                          ></input>
                                        </label>
                                        <label className="text-[#1BA56F] mr-2">
                                          {" "}
                                          Height :{" "}
                                          <input
                                            type="text"
                                            min="0"
                                            onChange={(e) =>
                                              handleChange(
                                                e,
                                                item.id,
                                                "height",
                                                item.item_name +
                                                  "-" +
                                                  filterIndex,
                                                filterIndex
                                              )
                                            }
                                            value={
                                              uploadContent?.[item?.id]?.[
                                                filterIndex
                                              ]?.height || ""
                                            }
                                            className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                          ></input>
                                        </label>
                                        <label className="text-[#1BA56F] mr-2">
                                          {" "}
                                          Length :{" "}
                                          <input
                                            type="text"
                                            min="0"
                                            onChange={(e) =>
                                              handleChange(
                                                e,
                                                item.id,
                                                "length",
                                                item.item_name +
                                                  "-" +
                                                  filterIndex,
                                                filterIndex
                                              )
                                            }
                                            value={
                                              uploadContent?.[item?.id]?.[
                                                filterIndex
                                              ]?.length || ""
                                            }
                                            className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                          ></input>
                                        </label>
                                        <span className="text-[#1BA56F] mr-2">
                                          {" "}
                                          CM{" "}
                                        </span>{" "}
                                      </>
                                    )}
                                  </p>
                                </>
                              )}

                              {designQuestions[item.item__id]?.attachment && (
                                <>
                                  <p className="mb-2">
                                    {lang === "ar"
                                      ? "تحب ترسل ملفات اضافية؟"
                                      : "Have something to show us?"}
                                  </p>
                                  <p
                                    className={`border-b-2 ${
                                      uploadContent?.[item?.id]?.[filterIndex]
                                        ?.filename
                                        ? "w-fit"
                                        : "w-[150px]"
                                    } !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer`}
                                    onClick={() =>
                                      document
                                        .getElementById(
                                          `file-${item.id}_${filterIndex}`
                                        )
                                        .click()
                                    } // Trigger click on hidden input
                                  >
                                    <input
                                      type="file"
                                      hidden
                                      name="file"
                                      id={`file-${item.id}_${filterIndex}`} // Use a unique ID for each input
                                      onChange={(e) =>
                                        uploadFile(
                                          e,
                                          item.id,
                                          "file",
                                          item.item_name + "-" + filterIndex,
                                          filterIndex
                                        )
                                      }
                                    />
                                    <img src={uploadIcon} alt="Upload Icon" />
                                    {uploadContent?.[item?.id]?.[filterIndex]
                                      ?.filename ||
                                      (lang === "ar"
                                        ? "إضافة المحتوى"
                                        : "Upload Content")}
                                  </p>
                                </>
                              )}
                              <p className="my-6 flex justify-start">
                                {" "}
                                <button
                                  onClick={() => {
                                    setSkipId([...skipId, item.id]);
                                  }}
                                  className={`text-[#1BA56F] py-1 px-2 border !border-[#1BA56F] ${
                                    lang === "ar" ? "ml-2" : "mr-2"
                                  } text-[18px] font-[500] uppercase`}
                                >
                                  {lang === "ar"
                                    ? "اكمل في وقت لاحق"
                                    : "Skip For Now"}
                                </button>
                                <button
                                  onClick={() =>
                                    saveContent(
                                      item.id,
                                      filterIndex,
                                      item.item__id
                                    )
                                  }
                                  className="text-white bg-[#1BA56F] py-1 px-2 text-[19px] font-[500] uppercase"
                                >
                                  {lang === "ar"
                                    ? "حفظ والتالي"
                                    : "Save & Next"}
                                </button>
                              </p>
                            </div>
                          );
                        })
                    )}
                  {order.item_details.addon_items
                    .filter(
                      (item) =>
                        !skipId?.includes(item.id) &&
                        item.status === "questionnaire required"
                    )
                    .map((item, index, filteredArr) =>
                      Array.from(
                        { length: item.qty },
                        (_, qtyIndex) => qtyIndex + 1
                      )
                        .filter((qty) => !item.uploaded_qty?.includes(qty))
                        .map((filterIndex) => {
                          console.log(filterIndex, "after filter");
                          const hasMultipleQty = item.qty < 1;
                          return (
                            <div
                              className={`${
                                (filteredArr.length === 1 ||
                                  index === filteredArr.length - 1 ||
                                  order.item_details.addon_items?.length ===
                                    0) &&
                                !hasMultipleQty
                                  ? ""
                                  : ""
                              } pl-[5%] space-x-2 mt-[2%]`}
                              key={`${item.qty}_${index}`}
                            >
                              {/* <p className="mb-0 font-semibold text-[22px">
                                {" "}
                                Addons -{" "}
                                {lang === "ar"
                                  ? item?.item__name_arabic
                                  : item.item_name}{" "}
                                {item?.qty > 1 && filterIndex} 
                              </p> */}

                              <div className="-ml-[5%] w-[calc(100%+5%)] border-y border-black py-2">
                                <div className="pl-[5%]">
                                  <p className="mb-0 font-medium text-[22px]">
                                    Addons -{" "}
                                    {lang === "ar"
                                      ? item?.item__name_arabic
                                      : item.item_name}{" "}
                                    {item?.qty > 1 && filterIndex}
                                  </p>
                                </div>
                              </div>

                              {designQuestions[item.item__id]?.language && (
                                <p className="mt-2 mb-0">
                                  <label
                                    className={`${
                                      lang === "ar" ? "ml-6" : "mr-6"
                                    } font-[500]`}
                                  >
                                    <input
                                      type="radio"
                                      value="English"
                                      checked={
                                        uploadContent[item.id]?.[filterIndex]
                                          ?.language === "English"
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          item.id,
                                          "language",
                                          item.item_name + "-" + filterIndex,
                                          filterIndex
                                        )
                                      }
                                      className="form-radio accent-[#1BA56F] mr-2"
                                    />{" "}
                                    {lang === "ar" ? "انجليزي" : "English"}
                                  </label>
                                  <label className="font-[500]">
                                    <input
                                      type="radio"
                                      value="Arabic"
                                      checked={
                                        uploadContent[item.id]?.[filterIndex]
                                          ?.language === "Arabic"
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          item.id,
                                          "language",
                                          item.item_name + "-" + filterIndex,
                                          filterIndex
                                        )
                                      }
                                      className="form-radio accent-[#1BA56F] mr-2"
                                    />{" "}
                                    {lang === "ar" ? "عربي" : "Arabic"}{" "}
                                  </label>
                                </p>
                              )}

                              {designQuestions[item.item__id]?.content && (
                                <p className="flex lg:w-[70%] md:w-[90%] mt-2">
                                  <input
                                    placeholder={
                                      lang === "ar"
                                        ? "اضف المحتوى هنا...."
                                        : "Write content here​...."
                                    }
                                    value={
                                      uploadContent?.[item?.id]?.[filterIndex]
                                        ?.content || ""
                                    }
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        item.id,
                                        "content",
                                        item.item_name + "-" + filterIndex,
                                        filterIndex
                                      )
                                    }
                                    className="border !border-black py-2 px-2 w-full rounded-none"
                                    required
                                  ></input>
                                </p>
                              )}
                              {designQuestions[item.item__id]?.measurement && (
                                <>
                                  <p className="mb-0 font-bold">
                                    {lang === "ar"
                                      ? "القياسات"
                                      : "Measurements"}
                                  </p>
                                  <p className="ml-2 mt-2">
                                    <label
                                      className={`${
                                        lang === "ar" ? "ml-6" : "mr-6"
                                      } font-[500]`}
                                    >
                                      <input
                                        type="radio"
                                        value="Standard"
                                        checked={
                                          uploadContent[item.id]?.[filterIndex]
                                            ?.measurements === "Standard"
                                        }
                                        onChange={(e) =>
                                          handleChange(
                                            e,
                                            item.id,
                                            "measurements",
                                            item.item_name + "-" + filterIndex,
                                            filterIndex
                                          )
                                        }
                                        className="form-radio accent-[#1BA56F] mr-2"
                                      />{" "}
                                      {lang === "ar" ? "قياس عام " : "Standard"}{" "}
                                    </label>
                                    <label className="mr-2 font-[500]">
                                      <input
                                        type="radio"
                                        value="Customize"
                                        checked={
                                          uploadContent[item.id]?.[filterIndex]
                                            ?.measurements === "Customize"
                                        }
                                        onChange={(e) =>
                                          handleChange(
                                            e,
                                            item.id,
                                            "measurements",
                                            item.item_name + "-" + filterIndex,
                                            filterIndex
                                          )
                                        }
                                        className="form-radio accent-[#1BA56F] mr-2"
                                      />{" "}
                                      {lang === "ar"
                                        ? "قياس خاص "
                                        : "Customize"}{" "}
                                    </label>

                                    {uploadContent[item.id]?.[filterIndex]
                                      ?.measurements === "Customize" && (
                                      <>
                                        <label className="text-[#1BA56F] mr-2">
                                          {" "}
                                          Width :{" "}
                                          <input
                                            type="text"
                                            min="0"
                                            onChange={(e) =>
                                              handleChange(
                                                e,
                                                item.id,
                                                "width",
                                                item.item_name +
                                                  "-" +
                                                  filterIndex,
                                                filterIndex
                                              )
                                            }
                                            value={
                                              uploadContent?.[item?.id]?.[
                                                filterIndex
                                              ]?.width || ""
                                            }
                                            className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                          ></input>
                                        </label>
                                        <label className="text-[#1BA56F] mr-2">
                                          {" "}
                                          Height :{" "}
                                          <input
                                            type="text"
                                            min="0"
                                            onChange={(e) =>
                                              handleChange(
                                                e,
                                                item.id,
                                                "height",
                                                item.item_name +
                                                  "-" +
                                                  filterIndex,
                                                filterIndex
                                              )
                                            }
                                            value={
                                              uploadContent?.[item?.id]?.[
                                                filterIndex
                                              ]?.height || ""
                                            }
                                            className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                          ></input>
                                        </label>
                                        <label className="text-[#1BA56F] mr-2">
                                          {" "}
                                          Length :{" "}
                                          <input
                                            type="text"
                                            min="0"
                                            onChange={(e) =>
                                              handleChange(
                                                e,
                                                item.id,
                                                "length",
                                                item.item_name +
                                                  "-" +
                                                  filterIndex,
                                                filterIndex
                                              )
                                            }
                                            value={
                                              uploadContent?.[item?.id]?.[
                                                filterIndex
                                              ]?.length || ""
                                            }
                                            className="w-[55px] h-[25px] border !border-[#1BA56F] rounded-none"
                                          ></input>
                                        </label>
                                        <span className="text-[#1BA56F] mr-2">
                                          {" "}
                                          CM{" "}
                                        </span>{" "}
                                      </>
                                    )}
                                  </p>
                                </>
                              )}

                              {designQuestions[item.item__id]?.attachment && (
                                <>
                                  <p className="mb-2">
                                    {lang === "ar"
                                      ? "تحب ترسل ملفات اضافية؟"
                                      : "Have something to show us?"}
                                  </p>
                                  <p
                                    className={`border-b-2 ${
                                      uploadContent?.[item?.id]?.[filterIndex]
                                        ?.filename
                                        ? "w-fit"
                                        : "w-[150px]"
                                    } !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer`}
                                    onClick={() =>
                                      document
                                        .getElementById(
                                          `file-${item.id}_${filterIndex}`
                                        )
                                        .click()
                                    } // Trigger click on hidden input
                                  >
                                    <input
                                      type="file"
                                      hidden
                                      name="file"
                                      id={`file-${item.id}_${filterIndex}`} // Use a unique ID for each input
                                      onChange={(e) =>
                                        uploadFile(
                                          e,
                                          item.id,
                                          "file",
                                          item.item_name + "-" + filterIndex,
                                          filterIndex
                                        )
                                      }
                                    />
                                    <img src={uploadIcon} alt="Upload Icon" />
                                    {uploadContent?.[item?.id]?.[filterIndex]
                                      ?.filename ||
                                      (lang === "ar"
                                        ? "إضافة المحتوى"
                                        : "Upload Content")}
                                  </p>
                                </>
                              )}

                              <p className="my-6">
                                {" "}
                                <button
                                  onClick={() => {
                                    setSkipId([...skipId, item.id]);
                                  }}
                                  className={`text-[#1BA56F] py-1 px-2 border !border-[#1BA56F] ${
                                    lang === "ar" ? "ml-2" : "mr-2"
                                  } text-[18px] font-[500] uppercase`}
                                >
                                  {lang === "ar"
                                    ? "اكمل في وقت لاحق"
                                    : "Skip For Now"}
                                </button>
                                <button
                                  onClick={() =>
                                    saveContent(
                                      item.id,
                                      filterIndex,
                                      item.item__id
                                    )
                                  }
                                  className="text-white bg-[#1BA56F] py-1 px-2 text-[19px] font-[500] uppercase"
                                >
                                  {lang === "ar"
                                    ? "حفظ والتالي"
                                    : "Save & Next"}
                                </button>
                              </p>
                            </div>
                          );
                        })
                    )}
                </>
              )}
            </div>
          </div>
          <div className="basis-1/4 sticky top-0 self-start my-0">
            <div className="border-b border-black my-2 w-[100%]">
              <h3
                className={`mb-0 text-[22px] font-bold py-2 ${
                  lang === "ar" ? "pr-5" : "pl-5"
                }`}
              >
                {lang === "ar" ? "قائمه" : "Checklist"}
              </h3>
            </div>

            {/* 👇 Wrapper to align all items under heading */}
            {/* <div className="pl-5"> */}
            <div className={`${lang === "ar" ? "pr-5 pl-0" : "pl-5 pr-0"}`}>
              {order && (
                <>
                  {/* Bundle Items */}
                  {order.item_details.bundle_items.map((item, itemIndex) => {
                    if (item.item__id !== 76) {
                      return (
                        <div key={itemIndex}>
                          {Array.from(
                            { length: Math.max(1, item.qty) },
                            (_, qtyIndex) => {
                              const isUploaded = !item?.uploaded_qty?.includes(
                                qtyIndex + 1
                              );
                              return (
                                <div
                                  className="flex items-center gap-[10px] mb-1 text-[#1BA56F]"
                                  key={`bundle-${itemIndex}-${qtyIndex}`}
                                >
                                  {item.status === "questionnaire required" &&
                                  isUploaded ? (
                                    <img src={checkboxIcon} width="25px" />
                                  ) : (
                                    <img src={tickCircleIcon} />
                                  )}
                                  <p className="mb-0 font-medium">
                                    {lang === "ar"
                                      ? item?.item__name_arabic
                                      : item.item_name}{" "}
                                    {item?.qty > 1 && qtyIndex + 1}
                                  </p>
                                </div>
                              );
                            }
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}

                  {/* Addon Items */}
                  {order.item_details.addon_items.map((item, addonIndex) =>
                    Array.from(
                      { length: Math.max(1, item.qty) },
                      (_, qtyIndex) => {
                        const isUploaded = !item?.uploaded_qty?.includes(
                          qtyIndex + 1
                        );
                        return (
                          <div
                            className="flex items-center gap-[10px] mb-1 text-[#1BA56F]"
                            key={`addon-${addonIndex}-${qtyIndex}`}
                          >
                            {item.status === "questionnaire required" &&
                            isUploaded ? (
                              <img src={checkboxIcon} width="25px" />
                            ) : (
                              <img src={tickCircleIcon} />
                            )}
                            <p className="mb-0 font-medium">
                              {lang === "ar"
                                ? item?.item__name_arabic
                                : item.item_name}{" "}
                              {item?.qty > 1 && qtyIndex + 1}
                            </p>
                          </div>
                        );
                      }
                    )
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {window?.innerWidth >= 500 && <Footer isLang={lang} />}
    </>
  );
}
