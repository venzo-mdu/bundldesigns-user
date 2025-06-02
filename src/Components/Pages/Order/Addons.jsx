import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Addons({
  order,
  skipId,
  lang,
  designQuestions,
  uploadContent,
  handleChange,
  uploadFile,
  uploadIcon,
  setSkipId,
  saveContent,
}) {
  return (
    <AnimatePresence>
      {order?.item_details?.bundle_items
        .filter(
          (item) =>
            item.item__id !== 76 &&
            !skipId?.includes(item.id) &&
            item.status == "questionnaire required"
        )
        .map((item, index, filterArr) =>
          Array.from({ length: item.qty }, (_, qtyIndex) => qtyIndex + 1)
            .filter((qty) => !item.uploaded_qty?.includes(qty))
            .map((filterIndex) => {
              const hasMultipleQty = item.qty < 1;
              console.log(designQuestions[item.item__id]);
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
                    className={`${
                      filterArr.length === 1 ||
                      ((index === filterArr.length - 1 ||
                        order.item_details.bundle_items?.length === 0) &&
                        hasMultipleQty)
                        ? ""
                        : "border-b border-black"
                    } px-[5%] space-x-2 mt-[2%]`}
                  >
                    <p className="mb-0 font-semibold text-[22px">
                      {lang === "ar" ? item?.item__name_arabic : item.item_name}{" "}
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
                      <p className="flex lg:w-[70%] md:w-[90%]">
                        <input
                          placeholder={
                            lang === "ar"
                              ? "الشعار والرقم ...."
                              : "Slogan & Number...."
                          }
                          value={
                            uploadContent?.[item?.id]?.[filterIndex]?.content ||
                            ""
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
                              <span className="text-[#1BA56F] mr-2"> CM </span>{" "}
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
                            uploadContent?.[item?.id]?.[filterIndex]?.filename
                              ? "w-fit"
                              : "w-[150px]"
                          } !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer`}
                          onClick={() =>
                            document
                              .getElementById(`file-${item.id}_${filterIndex}`)
                              .click()
                          } // Trigger click on hidden input
                        >
                          <input
                            type="file"
                            hidden
                            name="file"
                            id={`file-${item.id}_${filterIndex}`}
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
                          {uploadContent?.[item?.id]?.[filterIndex]?.filename ||
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
                        {lang === "ar" ? "اكمل في وقت لاحق" : "Skip For Now"}
                      </button>
                      <button
                        onClick={() =>
                          saveContent(item.id, filterIndex, item.item__id)
                        }
                        className="text-white bg-[#1BA56F] py-1 px-2 text-[19px] font-[500] uppercase"
                      >
                        {lang === "ar" ? "حفظ والتالي" : "Save & Next"}
                      </button>
                    </p>
                  </div>
                </motion.div>
              );
            })
        )}
    </AnimatePresence>
  );
}

export default Addons;
