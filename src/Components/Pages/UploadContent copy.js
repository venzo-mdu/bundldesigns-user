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
import { processArabicText } from "../Utils/arabicFontParenthesisChecker";
import { useNavigate } from "react-router-dom";
import "../../Components/Common/Background/Bgloader";
import Loader from "../../Images/Home/load sticker.png";
import ourWorkBranding from "../../Images/ourWorkBranding.gif";

let newToastId = null;
export default function UploadContent({ lang, setLang }) {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [uploadContent, setUploadContent] = useState({});
  const [designQuestions, setDesignQuestions] = useState([]);
  const [skipId, setSkipId] = useState([]);
  const [showDetails, setDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 475);
  const [isSaveAndNext, setIsSaveAndNext] = useState(false);
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

  let [uploadFiles, setUploadFiles] = useState([]);

  // const uploadFile = async (e, id, field, name, idx) => {
  //   if (e.target.files.length) {
  //     const formData = new FormData();
  //     formData.append("file", e.target.files[0]);
  //     formData.append("file_name", e.target.files[0]?.name);

  //     try {
  //       const response = await axios.post(
  //         `${base_url}/api/upload_file/`,
  //         formData,
  //         ConfigToken()
  //       );
  //       const fileName = e.target.files[0]?.name || "";
  //       setUploadFiles((prev) => {
  //         const existing = prev.find((file) => file.id === id);
  //         if (existing) {
  //           return prev.map((file) =>
  //             file.id === id
  //               ? {
  //                   ...file,
  //                   url: [...existing.url, response.data.file_url],
  //                   name: [
  //                     ...(Array.isArray(file.name) ? file.name : [file.name]),
  //                     fileName,
  //                   ],
  //                 }
  //               : file
  //           );
  //         } else {
  //           return [
  //             ...prev,
  //             {
  //               id,
  //               url: [response.data.file_url],
  //               name: [fileName],
  //             },
  //           ];
  //         }
  //       });
  //       const docId = id.split("_")[0];
  //       setUploadContent((prev) => {
  //         const existing = prev[docId]?.[idx] || {};
  //         return {
  //           ...prev,
  //           [docId]: {
  //             ...prev[docId],
  //             [idx]: {
  //               ...existing,
  //               ...(field === "file" && {
  //                 file_url: [
  //                   ...(existing.file_url || []),
  //                   response.data.file_url,
  //                 ],
  //                 filename: e.target.files[0]?.name || "",
  //               }),
  //               item_sub_name: name,
  //             },
  //           },
  //         };
  //       });
  //     } catch (error) {
  //       console.error("Upload failed", error);
  //     }
  //     e.target.value = "";
  //   }
  // };

  const uploadFile = async (e, id, field, name, idx) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const uploadedUrls = [];
    const uploadedNames = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", file.name);

      try {
        const response = await axios.post(
          `${base_url}/api/upload_file/`,
          formData,
          ConfigToken()
        );

        uploadedUrls.push(response.data.file_url);
        uploadedNames.push(file.name);

        const docId = id.split("_")[0];
        setUploadContent((prev) => {
          const existing = prev[docId]?.[idx] || {};
          return {
            ...prev,
            [docId]: {
              ...prev[docId],
              [idx]: {
                ...existing,
                ...(field === "file" && {
                  file_url: [
                    ...(existing.file_url || []),
                    response.data.file_url,
                  ],
                  filename: file.name,
                }),
                item_sub_name: name,
              },
            },
          };
        });
      } catch (error) {
        console.error("Upload failed", error);
      }
    }

    setUploadFiles((prev) => {
      const existing = prev.find((file) => file.id === id);
      if (existing) {
        return prev.map((file) =>
          file.id === id
            ? {
                ...file,
                url: [...existing.url, ...uploadedUrls],
                name: [
                  ...(Array.isArray(file.name) ? file.name : [file.name]),
                  ...uploadedNames,
                ],
              }
            : file
        );
      } else {
        return [
          ...prev,
          {
            id,
            url: uploadedUrls,
            name: uploadedNames,
          },
        ];
      }
    });

    e.target.value = "";
  };

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

  const saveContent = async (itemId, idx, designId, filterIndex) => {
    try {
      if (
        !uploadContent?.[itemId]?.[idx]?.language &&
        designQuestions[designId]?.language
      ) {
        toastErrorMessage(
          lang === "ar"
            ? "يرجى اختيار اللغة قبل الحفظ"
            : "Please choose language before saving."
        );

        return;
      }
      if (
        !uploadContent?.[itemId]?.[idx]?.content &&
        designQuestions[designId]?.textbox
      ) {
        toastErrorMessage(
          lang === "ar"
            ? "يرجى إضافة المحتوى قبل الحفظ"
            : "Please add content before saving."
        );
        return;
      }
      if (
        !uploadContent?.[itemId]?.[idx]?.measurements &&
        designQuestions[designId]?.measurement
      ) {
        toastErrorMessage(
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

      // if (uploadContent?.[itemId][idx].file_url.length < 0) {
      //   toastErrorMessage(
      //     lang === "ar" ? "يرجى رفع المحتوى" : "Please upload the content."
      //   );
      // }
      const formData = {
        answers: {
          [itemId]: {
            [idx]: uploadContent?.[itemId]?.[idx] || {},
          },
        },

        orderId: order.id,
        status: "save_later",
      };
      setIsSaveAndNext(true);
      formData.answers[itemId][idx].file_links =
        formData.answers[itemId][idx].file_url;
      delete formData.answers[itemId][idx].file_url;
      const response = await axios.post(
        `${base_url}/api/upload_content/`,
        formData,
        ConfigToken()
      );

      if (response.status === 201) {
        setIsSaveAndNext(false);
        console.log("Content saved successfully!");
        toastMessage();
        getOrderDetails();
      } else {
        setIsSaveAndNext(false);
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
      setIsSaveAndNext(false);
      console.error("Save failed:", error.response?.data || error.message);
      // toast.error(
      //   error.response?.data?.message || lang === "ar"
      //     ? "المحاولة مرة أخرى يرجى فشل في حفظ المحتوى "
      //     : "Failed to save content. Please try again.",
      //   {
      //     icon: false,
      //     toastId: "required-value-toast7",
      //     style: {
      //       color: "#D83D99",
      //       fontWeight: "700",
      //     },
      //   }
      // );
      toastErrorMessage(
        error.response?.data?.message || lang === "ar"
          ? "المحاولة مرة أخرى يرجى فشل في حفظ المحتوى "
          : "Failed to save content. Please try again."
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

  const count = order?.item_details?.bundle_items
    ?.filter(
      (item) => item.item__id !== 76 && item.status === "questionnaire required"
    )
    .reduce((total, item) => {
      const missingUploads = Array.from({ length: item.qty }, (_, i) => i + 1)
        .filter((qty) => !(item.uploaded_qty ?? []).includes(qty))
        .filter((qty) => !skipId.includes(`${item.id}_${qty}`));

      return total + missingUploads.length;
    }, 0);

  const addonCount = order?.item_details?.addon_items
    ?.filter((item) => item.status === "questionnaire required")
    .reduce((total, item) => {
      const missingUploads = Array.from({ length: item.qty }, (_, i) => i + 1)
        .filter((qty) => !(item.uploaded_qty ?? []).includes(qty))
        .filter((qty) => !skipId.includes(`${item.id}_${qty}`));

      return total + missingUploads.length;
    }, 0);

  useEffect(() => {
    if (addonCount + count === 0) {
      navigate(`/dashboard?order_id=${orderId}`);
    }
  }, [skipId, count, addonCount]); // Add all relevant dependencies

  return loading ? (
    <Bgloader />
  ) : (
    <div>
      <div>
        {isSaveAndNext && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "auto",
              userSelect: "none",
              zIndex: 9999,
            }}
          >
            <img
              src={ourWorkBranding}
              alt="loader-round-icon"
              style={{ width: 200, height: 200 }}
              className="loader"
            />
          </div>
        )}
      </div>
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
                {" "}
               <Addons
                    order={order}
                    skipId={skipId}
                    uploadFiles={uploadFiles}
                    setUploadFiles={setUploadFiles}
                    lang={lang}
                    designQuestions={designQuestions}
                    uploadContent={uploadContent}
                    handleChange={handleChange}
                    uploadFile={uploadFile}
                    uploadIcon={uploadIcon}
                    setSkipId={setSkipId}
                    saveContent={saveContent}
                    setUploadContent={setUploadContent}
                  />

                  <BundlOrder
                    order={order}
                    skipId={skipId}
                    uploadFiles={uploadFiles}
                    setUploadFiles={setUploadFiles}
                    lang={lang}
                    designQuestions={designQuestions}
                    uploadContent={uploadContent}
                    handleChange={handleChange}
                    uploadFile={uploadFile}
                    uploadIcon={uploadIcon}
                    setSkipId={setSkipId}
                    saveContent={saveContent}
                    setUploadContent={setUploadContent}
                  />
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
                                              ? processArabicText(
                                                  item?.item__name_arabic
                                                )
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
                                        ? processArabicText(
                                            item?.item__name_arabic
                                          )
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
                window.location.href = `/dashboard?order_id=${order.id}`;
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
                  <Addons
                    order={order}
                    skipId={skipId}
                    uploadFiles={uploadFiles}
                    setUploadFiles={setUploadFiles}
                    lang={lang}
                    designQuestions={designQuestions}
                    uploadContent={uploadContent}
                    handleChange={handleChange}
                    uploadFile={uploadFile}
                    uploadIcon={uploadIcon}
                    setSkipId={setSkipId}
                    saveContent={saveContent}
                    setUploadContent={setUploadContent}
                  />

                  <BundlOrder
                    order={order}
                    skipId={skipId}
                    uploadFiles={uploadFiles}
                    setUploadFiles={setUploadFiles}
                    lang={lang}
                    designQuestions={designQuestions}
                    uploadContent={uploadContent}
                    handleChange={handleChange}
                    uploadFile={uploadFile}
                    uploadIcon={uploadIcon}
                    setSkipId={setSkipId}
                    saveContent={saveContent}
                    setUploadContent={setUploadContent}
                  />
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

            <div className={`${lang === "ar" ? "pr-5 pl-0" : "pl-5 pr-0"}`}>
              {order && (
                <>
                  {order?.item_details?.bundle_items?.map((item, itemIndex) => {
                    if (item?.item__id !== 76) {
                      return (
                        <div key={itemIndex}>
                          {Array.from(
                            { length: Math.max(1, item.qty) },
                            (_, qtyIndex) => {
                              const isUploaded = !item?.uploaded_qty?.includes(
                                qtyIndex + 1
                              );
                              return (
                                <div className="flex items-center gap-[10px] mb-1  text-[#1BA56F]">
                                  {item.status == "questionnaire required" &&
                                  isUploaded ? (
                                    // <div className="w-4 h-4 border-2 border-[#1BA56F] rounded-full"></div>
                                    <img
                                      src={checkboxIcon}
                                      width={"25px"}
                                    ></img>
                                  ) : (
                                    <img src={tickCircleIcon}></img>
                                  )}
                                  <p className="mb-0 font-medium">
                                    {lang === "ar"
                                      ? processArabicText(
                                          item?.item__name_arabic
                                        )
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

                  {order.item_details.addon_items.map((item) =>
                    Array.from(
                      { length: Math.max(1, item.qty) },
                      (_, qtyIndex) => {
                        const isUploaded = !item?.uploaded_qty?.includes(
                          qtyIndex + 1
                        );
                        return (
                          <div className="flex items-center gap-[10px] mb-1 text-[#1BA56F]">
                            {item.status == "questionnaire required" &&
                            isUploaded ? (
                              // <div className="w-4 h-4 border-2 border-[#1BA56F] rounded-full"></div>
                              <img src={checkboxIcon} width={"25px"}></img>
                            ) : (
                              <img src={tickCircleIcon}></img>
                            )}
                            <p className="mb-0 font-medium">
                              {lang === "ar"
                                ? processArabicText(item?.item__name_arabic)
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
    </div>
  );
}
