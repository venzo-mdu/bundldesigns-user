import { useState } from "react";

function OrderAddons({
  order,
  skipId,
  visibleAddOnCards,
  lang,
  designQuestions,
  uploadContent,
  handleChange,

  uploadFile,
  uploadIcon,
  setSkipId,
  saveContent,
  addOnhandleRemove,
}) {
  const [transitioningCard, setTransitioningCard] = useState(null);
  const [movingUpCard, setMovingUpCard] = useState(null);

  // const handleRemoveWithAnimation = (id, filterIndex) => {
  //   const key = `${id}_${filterIndex}`;
  //   const currentIndex = visibleAddOnCards.findIndex(
  //     (c) => `${c.id}_${c.filterIndex}` === key
  //   );
  //   const nextCard = visibleAddOnCards[currentIndex + 1];
  //   const nextKey = nextCard ? `${nextCard.id}_${nextCard.filterIndex}` : null;

  //   setTransitioningCard(key);
  //   if (nextKey) {
  //     setMovingUpCard(nextKey);
  //   }

  //   setTimeout(() => {
  //     addOnhandleRemove(id, filterIndex);
  //     setTransitioningCard(null);
  //     setMovingUpCard(null);
  //   }, 1000);
  // };

  const handleRemoveWithAnimation = (id, filterIndex) => {
  const key = `${id}_${filterIndex}`;
  const currentIndex = visibleAddOnCards.findIndex(
    (c) => `${c.id}_${c.filterIndex}` === key
  );
  const prevCard = visibleAddOnCards[currentIndex - 1];
  const prevKey = prevCard ? `${prevCard.id}_${prevCard.filterIndex}` : null;

  setTransitioningCard(key);
  if (prevKey) {
    setMovingUpCard(prevKey);
  }

  setTimeout(() => {
    addOnhandleRemove(id, filterIndex);
    setTransitioningCard(null);
    setMovingUpCard(null);
  }, 1000);
};


  return (
    <div>
      {order
        .filter(
          (item) =>
            !skipId?.includes(item.id) &&
            item.status === "questionnaire required"
        )
        .map((item, index, filteredArr) =>
          Array.from({ length: item.qty }, (_, qtyIndex) => qtyIndex + 1)
            .filter((qty) => !item.uploaded_qty?.includes(qty))
            .map((filterIndex) => {
              console.log(filterIndex, "after filter");
              const hasMultipleQty = item.qty < 1;
              return (
                <div
                  key={`${item.id}_${filterIndex}`}
                  className="addon-card"
                  style={{
                    transition: "all 0.4s ease",
                    transform:
                      transitioningCard === `${item.id}_${filterIndex}`
                        ? "translateY(-100%)"
                        : movingUpCard === `${item.id}_${filterIndex}`
                        ? "translateY(-10px)"
                        : "translateY(0)",
                    opacity:
                      transitioningCard === `${item.id}_${filterIndex}` ? 0 : 1,
                    padding: "10px",
                    marginBottom: "10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    className={`${
                      (filteredArr.length === 1 ||
                        index === filteredArr.length - 1 ||
                        order?.length === 0) &&
                      !hasMultipleQty
                        ? ""
                        : "border-b !border-black"
                    } px-[5%] space-x-2 mt-[2%]`}
                    key={`${item.qty}_${index}`}
                  >
                    <p className="mb-0 font-semibold text-[22px">
                      {" "}
                      Addons -{" "}
                      {lang === "ar"
                        ? item?.item__name_arabic
                        : item.item_name}{" "}
                      {item?.qty > 1 && filterIndex}
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
                      <p className="flex lg:w-[70%] md:w-[90%] mt-2">
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
                          className="border !border-black py-2 px-2 w-full rounded-none"
                          required
                        ></input>
                      </p>
                    )}
                    {designQuestions[item.item__id]?.measurement && (
                      <>
                        <p className="mb-0 font-bold">
                          {lang === "ar" ? "القياسات" : "Measurements"}
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
                          {uploadContent?.[item?.id]?.[filterIndex]?.filename ||
                            (lang === "ar"
                              ? "تحميل المحتوى"
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
                        {lang === "ar" ? "اكمل في وقت لاحق" : "Skip For Now"}
                      </button>
                      <button
                        onClick={() => {
                          saveContent(item.id, filterIndex, item.item__id);
                          handleRemoveWithAnimation(item.id, filterIndex);
                        }}
                        className="text-white bg-[#1BA56F] px-3 py-1 rounded"
                      >
                        {lang === "ar" ? "حفظ ومتابعة" : "Save & Next"}
                      </button>
                    </p>
                  </div>
                </div>
              );
            })
        )}
    </div>
  );
}

export default OrderAddons;
