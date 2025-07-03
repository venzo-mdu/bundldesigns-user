import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
function Addons({
  order,
  skipId,
  uploadFiles,
  setUploadFiles,
  lang,
  designQuestions,
  uploadContent,
  handleChange,
  uploadFile,
  uploadIcon,
  setSkipId,
  saveContent,
  setUploadContent,
}) {
  const navigate = useNavigate();
  let orderItemRemain = order?.item_details?.bundle_items.filter(
    (item) =>
      item.item__id !== 76 &&
      !skipId?.includes(item.id) &&
      item.status == "questionnaire required"
  );

  // const removeFile = (fileItem, nameIndex) => {
  //   setUploadFiles(
  //     (prev) =>
  //       prev
  //         .map((file) => {
  //           if (file.id === fileItem.id) {
  //             const newNames = [...file.name];
  //             const newUrls = [...file.url];

  //             newNames.splice(nameIndex, 1);
  //             newUrls.splice(nameIndex, 1);

  //             // Remove object if no names/urls left
  //             if (newNames.length === 0) {
  //               return null;
  //             }

  //             return {
  //               ...file,
  //               name: newNames,
  //               url: newUrls,
  //             };
  //           }
  //           return file;
  //         })
  //         .filter(Boolean) // remove nulls (empty objects)
  //   );
  // };

  const removeFile = (id, indexToRemove) => {
    if (typeof id.id !== "string") {
      console.error("Invalid id in removeFile:", id);
      return;
    }

    // 1. Update uploadFiles (array-based)
    setUploadFiles((prev) => {
      const fileIndex = prev.findIndex((file) => file.id === id.id);
      if (fileIndex === -1) return prev;

      const updated = [...prev];
      const fileEntry = updated[fileIndex];

      const updatedNames = [...fileEntry.name];
      const updatedUrls = [...fileEntry.url];

      updatedNames.splice(indexToRemove, 1);
      updatedUrls.splice(indexToRemove, 1);

      if (updatedNames.length === 0) {
        updated.splice(fileIndex, 1);
      } else {
        updated[fileIndex] = {
          ...fileEntry,
          name: updatedNames,
          url: updatedUrls,
        };
      }

      return updated;
    });

    // 2. Update uploadContent (object-based)
    const docId = id.id.split("_")[0];
    const idx = parseInt(id.id.split("_")[1], 10);

    setUploadContent((prev) => {
      const existing = prev?.[docId]?.[idx];
      if (!existing) return prev;

      const updatedUrls = [...(existing.file_url || [])];
      updatedUrls.splice(indexToRemove, 1);

      const updatedEntry = {
        ...existing,
        file_url: updatedUrls,
      };

      if (updatedUrls.length === 0) {
        delete updatedEntry.filename;
        delete updatedEntry.file_url;
      }
      return {
        ...prev,
        [docId]: {
          ...prev[docId],
          [idx]: updatedEntry,
        },
      };
    });
  };
  return (
    <AnimatePresence>
      {order?.item_details?.bundle_items
        .filter(
          (item) =>
            item.item__id !== 76 &&
            // !skipId?.includes(item.id) &&
            item.status == "questionnaire required"
        )
        .map((item, index, filterArr) =>
          Array.from({ length: item.qty }, (_, qtyIndex) => qtyIndex + 1)
            .filter((qty) => !item.uploaded_qty?.includes(qty))
            .map((filterIndex) => {
              const hasMultipleQty = item.qty < 1;
              if (!skipId.includes(`${item.id}_${filterIndex}`)) {
                return (
                  <motion.div
                    key={`${item.id}_${filterIndex}`} // <- unique key
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6 }}
                    layout
                    layoutTransition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div
                      // className={`${
                      //   filterArr.length === 1 ||
                      //   ((index === filterArr.length - 1 ||
                      //     order.item_details.bundle_items?.length === 0) &&
                      //     hasMultipleQty)
                      //     ? ""
                      //     : ""
                      // } pl-[5%] space-x-2 mt-[2%] ${
                      //   lang === "ar" ? "mr-8" : "text-left"
                      // }`}
                      className={`${
                      (filterArr.length === 1 ||
                        index === filterArr.length - 1 ||
                        order.item_details.addon_items?.length === 0) &&
                      !hasMultipleQty
                        ? ""
                        : ""
                    } ${
                      window.innerWidth > 475 && lang === "ar"
                        ? "mr-8"
                        : window.innerWidth < 475 && lang === "ar"
                        ? "mr-0"
                        : "text-left"
                    } ${
                      window.innerWidth > 475 && "pl-[5%]"
                    } space-x-2 mt-[2%]`}
                    >
                      <div 
                      // className="-ml-[5%] w-[calc(100%+5%)] border-y border-black py-2"
                      className={`${
                        window.innerWidth > 475 && "-ml-[5%]"
                      } w-[calc(100%+5%)] border-y border-black py-2`}
                      >
                        <div className="pl-[5%]">
                          <p className="mb-0 font-semibold text-[18px]">
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
                                : "Write content here...."
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
                            {lang === "ar" ? "القياسات" : "Measurements"}
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
                              {lang === "ar" ? "قياس خاص " : "Customize"}{" "}
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
                                        item.item_name + "-" + filterIndex,
                                        filterIndex
                                      )
                                    }
                                    value={
                                      uploadContent?.[item?.id]?.[filterIndex]
                                        ?.width || ""
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
                                        item.item_name + "-" + filterIndex,
                                        filterIndex
                                      )
                                    }
                                    value={
                                      uploadContent?.[item?.id]?.[filterIndex]
                                        ?.height || ""
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
                                        item.item_name + "-" + filterIndex,
                                        filterIndex
                                      )
                                    }
                                    value={
                                      uploadContent?.[item?.id]?.[filterIndex]
                                        ?.length || ""
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
                              lang === "ar" ? "w-[100px]" : "w-[160px]"
                            } ${
                              uploadContent?.[item?.id]?.[filterIndex]?.filename
                                ? "w-fit"
                                : ""
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
                              multiple
                              name="file"
                              id={`file-${item.id}_${filterIndex}`}
                              onChange={(e) =>
                                uploadFile(
                                  e,
                                  // item.id,
                                  `${item.id}_${filterIndex}`,
                                  "file",
                                  item.item_name + "-" + filterIndex,
                                  filterIndex
                                )
                              }
                            />
                            <img src={uploadIcon} alt="Upload Icon" />
                            {
                              // uploadContent?.[item?.id]?.[filterIndex]
                              //   ?.filename ||
                              lang === "ar" ? "إضافة المحتوى" : "Upload Content"
                            }
                          </p>
                          {/* <div className="flex gap-2">
                            {uploadFiles?.length > 0 &&
                              uploadFiles
                                // .filter((ele) => ele.id === item.id)
                                .map((ele, idx) => {
                                  if(ele.id === `${item.id}_${filterIndex}`){
                                    return  <span className="bg-black text-white py-1 px-2 mr-2">
                                    {ele.name}{" "}
                                    <CloseIcon
                                      onClick={() => removeFile(ele)}
                                      className="ml-2 cursor-pointer"
                                    />
                                  </span>
                                  }
                                })}
                          </div> */}

                          {uploadFiles?.length > 0 &&
                            uploadFiles.map((ele, idx) => {
                              if (ele.id === `${item.id}_${filterIndex}`) {
                                return (
                                  <div key={idx} className="flex flex-wrap">
                                    {ele.name.map((name, i) => (
                                      <div
                                        key={i}
                                        className="bg-black text-[14px] text-white py-1 px-2 mr-2 mb-2 flex items-center"
                                      >
                                        {name}
                                        <CloseIcon
                                          onClick={() => removeFile(ele, i)}
                                          className="ml-2 cursor-pointer"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                );
                              }
                            })}
                        </>
                      )}
                      <p className="my-6 flex justify-start">
                        {" "}
                        <button
                          onClick={() => {
                            setSkipId([...skipId, `${item.id}_${filterIndex}`]);
                          }}
                          className={`text-[#1BA56F] cursor-pointer py-1 px-2 border !border-[#1BA56F] ${
                            lang === "ar" ? "ml-2" : "mr-2"
                          } text-[14px] font-[500] uppercase`}
                        >
                          {lang === "ar" ? "اكمل في وقت لاحق" : "Skip For Now"}
                        </button>
                        <button
                          onClick={() =>
                            saveContent(
                              item.id,
                              filterIndex,
                              item.item__id,
                              `${item.id}_${filterIndex}`
                            )
                          }
                          className="text-white cursor-pointer bg-[#1BA56F] py-1 px-2 text-[14px] font-[500] uppercase"
                        >
                          {lang === "ar" ? "حفظ والتالي" : "Save & Next"}
                        </button>
                      </p>
                    </div>
                  </motion.div>
                );
              }
            })
        )}
    </AnimatePresence>
  );
}

export default Addons;
