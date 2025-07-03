import React, { useCallback, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { base_url } from "../Auth/BackendAPIUrl";
// import { ToastContainer, toast } from "react-toastify";
import BlackDollor from "../../Images/BundlDetail/blackdollor.svg";
import BlackTime from "../../Images/BundlDetail/blacktime.svg";
import { ConfigToken } from "../Auth/ConfigToken";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { amountDecimal } from "../Utils/amountDecimal";
import toast, { Toaster } from "react-hot-toast";
import { processArabicText } from "../Utils/arabicFontParenthesisChecker";
import { use } from "react";
import { useLocation } from "react-router-dom";
import { Language } from "@mui/icons-material";
let toastId = null;
export const Accordian = ({
  addOnLang,
  handleAddOnChange,
  accordianTitle,
  addOnPayload,
  extraQty,
  bundlePackageId,
  textColor,
  searchParams = null,
  isLang,
  isSameBundl,
  lang,
}) => {
  const location = useLocation();
  const isCustomBundl = location.pathname === "/custombundl";
  const [isArabic, setIsArabic] = useState("");

  useEffect(() => {
    setIsArabic(localStorage.getItem("lang"));
  }, []);

  const [isDropdown, setIsDropdown] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [addOnData, setAddonData] = useState({});
  const [quantities, setQuantities] = useState({});
  const titleArr = [
    "Branding",
    "Stationary",
    "Social Media",
    "Products",
    "Documents",
    "E-Designs",
    "Space Design",
  ];

  useEffect(() => {
    getAddons();
  }, [isSameBundl]);

  useEffect(() => {
    addOnPayload(addOnPayloads());
  }, [addOnData, quantities, extraQty, isLang]);

  useEffect(() => {
    setIsArabic(localStorage.getItem("lang"));
  }, [localStorage.getItem("lang")]);

  // const getAddons = async () => {

  //   try {
  //     const url = window.location.pathname === "/custombundl"
  //       ? `${base_url}/api/package/`
  //       : `${base_url}/api/package/?bundle_id=${bundlePackageId}`;

  //     const response = await axios.get(url
  //       // , ConfigToken()
  //     );

  //     const localAddonData = JSON.parse(localStorage.getItem('payloads') || '{}');

  //     if (localAddonData?.addons) {
  //       const transformedData = localAddonData.addons.item_list.reduce((acc, item) => {
  //         const categoryKey = item.category;
  //         const categoryData = response?.data?.designs_details?.[categoryKey];

  //         if (!categoryData || !categoryData.design_list) return acc;

  //         const matchedDesign = categoryData.design_list.find(design => design.id === item.design_id);

  //         if (!matchedDesign) return acc;

  //         // If the category doesn't exist in the accumulator yet, initialize it with full metadata
  //         if (!acc.designs_details[categoryKey]) {
  //           const { name_english, name_arabic, icon } = categoryData;
  //           acc.designs_details[categoryKey] = {
  //             name_english,
  //             name_arabic,
  //             icon,
  //             design_list: []
  //           };
  //         }

  //         // Push matched design
  //         acc.designs_details[categoryKey].design_list.push(matchedDesign);

  //         return acc;
  //       }, { designs_details: {} });

  //       console.log(transformedData, "transformedData");
  //       setAddonData(transformedData);
  //     }

  //     else {
  //       if (response.data) {
  //         setAddonData(response.data);

  //         if (searchParams) {
  //           const searchIndex = titleArr.findIndex((key) => {
  //             const designs = response.data.designs_details[key]?.design_list || [];
  //             return designs.some((item) => item.id == searchParams);
  //           });

  //           if (searchIndex !== -1) {
  //             setIsDropdown((prevState) =>
  //               prevState.map((_, i) => (i === searchIndex ? true : false)) // Open only the matched dropdown
  //             );
  //           } else {
  //             console.warn("No matching index found for searchParams");
  //           }
  //         }
  //       }
  //     }

  //   } catch (error) {
  //     console.error("Error fetching addons data:", error);
  //   }

  // };

  const getAddons = async () => {
    try {
      const url =
        window.location.pathname === "/custombundl"
          ? `${base_url}/api/package/`
          : `${base_url}/api/package/?bundle_id=${bundlePackageId}`;

      const response = await axios.get(url);
      const responseData = response?.data || {};

      const localAddonData = isSameBundl
        ? JSON.parse(localStorage.getItem("payloads"))
        : {};
      const localItems = localAddonData?.addons?.item_list || [];

      const quantityMap = {}; // To initialize quantities state

      if (responseData.designs_details) {
        Object.entries(responseData.designs_details).forEach(
          ([categoryKey, categoryData]) => {
            if (!categoryData.design_list) return;

            categoryData.design_list = categoryData.design_list.map(
              (design) => {
                const localMatch = localItems.find(
                  (item) =>
                    item.category === categoryKey &&
                    item.design_id === design.id
                );

                if (localMatch) {
                  const qty = localMatch.qty || 0;
                  quantityMap[design.name_english] = parseInt(qty);
                  return { ...design, quantity: qty }; // Add quantity to design
                }

                return { ...design, quantity: 0 }; // Default quantity if no match
              }
            );
          }
        );
      }

      setAddonData(responseData);
      setQuantities(quantityMap);

      // Dropdown toggle based on searchParams
      if (searchParams && responseData.designs_details) {
        const searchIndex = titleArr.findIndex((key) => {
          const designs = responseData.designs_details[key]?.design_list || [];
          return designs.some((item) => item.id == searchParams);
        });

        if (searchIndex !== -1) {
          setIsDropdown((prevState) =>
            prevState.map((_, i) => i === searchIndex)
          );
        }
      }
    } catch (error) {
      console.error("Error fetching addons data:", error);
    }
  };

  const toggleDropdown = (index) => {
    setIsDropdown((prevState) =>
      prevState.map((_, i) => (i === index ? !prevState[i] : false))
    );
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
    let customBundl = window.location.href.split("/")[3];

    if (colors[path]) {
      setThemeColor(colors[path]);
    } else if (customBundl === "custombundl") {
      setThemeColor("#1BA56F");
    }
  }, []);

  const toastMessage = () => {
    const message =
      isArabic === "ar" ? "تم تحديث السلة بنجاح." : "Cart updated successfully";

    if (toastId) {
      toast.dismiss(toastId);
    }

    toastId = toast(message, {
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

  const handleQuantityChange = (designName, change) => {
    toastMessage();

    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[designName] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      return { ...prevQuantities, [designName]: newQuantity };
    });
  };

  let total_price = 0;
  const addOnPayloads = () => {
    const allDesigns = titleArr.flatMap(
      (title) => addOnData.designs_details?.[title]?.design_list || []
    );
    let total_time = allDesigns
      .filter(
        (design) =>
          (quantities[design.name_english] || 0) +
            (extraQty[design.name_english] || 0) >
          0
      )
      .reduce((max, design) => {
        return Math.max(max, design.time);
      }, 0);

    // Filter and map designs with non-zero quantities
    const item_list = allDesigns
      .filter(
        (design) =>
          (quantities[design.name_english] || 0) +
            (extraQty[design.name_english] || 0) >
          0
      ) // Include only non-zero quantities
      .map((design) => {
        const quantity =
          (quantities[design.name_english] || 0) +
          (extraQty[design.name_english] || 0);
        const current_total =
          quantity == 1
            ? parseFloat(design.price)
            : parseFloat(design.price) +
              (parseFloat(design.price) / 100) *
                design.price_increment *
                (quantity - 1);
        total_price += current_total;

        const foundCategory = titleArr.find((title) =>
          addOnData.designs_details?.[title]?.design_list.some(
            (item) => item.id === design.id
          )
        );
        return {
          design_id: design.id,
          addon_name: design.name_english,
          language:design.name_english === "Logo & Identity"?addOnLang.find((ele)=>ele.isChecked).language:null,
          addon_arabic: design.name_arabic,
          unit_price: design.price.toString(),
          unit_time: design.time.toString(),
          price_increment: design.price_increment,
          qty: quantity.toString(),
          item_type: "addon",
          total_price: current_total,
          category: foundCategory
            ? isLang === "ar"
              ? addOnData.designs_details?.[foundCategory]?.name_arabic
              : addOnData.designs_details?.[foundCategory]?.name_english
            : "",
        };
      });
    const taxRate = 18; // Define the tax rate
    const tax = Math.round(total_price * (taxRate / 100));
    // Prepare payload
    const payload = {
      order_name: "Addons",
      total_time: total_time,
      total_price: total_price,
      tax_treatment: taxRate,
      tax: tax,
      item_list: item_list,
    };

    return payload;
  };
  const path = window?.location?.href?.split("/")[3];

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            color: "#1BA56F",
            fontWeight: "700",
          },
        }}
      />

      {/* <div className="bundl-accordian"> */}
      <div className={`${path === "custombundl" ? null : "bundl-accordian"}`}>
        <p
          className={`accordian-heading mb-1  leading-[1.2] ${
            isLang === "ar" ? "text-right" : "text-left"
          }`}
        >
          {accordianTitle}
        </p>
        <p
          className={`xs:tesxt-[20px] sm:text-[16px] text-[16px] xs:w-full sm:w-full w-full ${
            isLang === "ar" ? "text-right" : "text-left"
          }`}
          style={{ opacity: "50%" }}
        >
          {isLang === "ar"
            ? "اطلب أي عناصر تحتاجها "
            : "Add anything you want to your bundle to fit your brand!"}
        </p>
        <div className="tab-buttons !border-b-0">
          {titleArr.map((title, index) => (
            <button
              key={index}
              style={{
                color: isDropdown[index] ? "#fff" : textColor,
                border: `1px solid ${textColor}`,
                backgroundColor: isDropdown[index] ? textColor : "#fff",
              }}
              className={`!font-[500] uppercase !text-[${textColor}] ${
                isDropdown[index] ? "active-button" : "accordian-button"
              } accordion-btn-${index + 1}`}
              onClick={() => {
                toggleDropdown(index);
                // const element = document.getElementById(`${index}_list`);
                // element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setTimeout(() => {
                  const element = document.getElementById(`${index}_list`);
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }, 400);
              }}
            >
              {isLang === "ar"
                ? addOnData?.designs_details?.[title]?.name_arabic
                : title}
            </button>
          ))}
        </div>
        <div
          className={`${
            window.innerWidth <= 475 ? (isCustomBundl ? "pb-8" : "pb-20") : ""
          }`}
        >
          {titleArr.map((title, index) => (
            <Accordion
              style={{ cursor: "pointer" }}
              id={`${index}_list`}
              sx={{
                boxShadow: "none !important",
                borderBottom:
                  index === titleArr.length - 1 ? "none" : "1px solid #000000",
                paddingTop: index == 0 ? "18px" : "auto",
                "&::before": {
                  display: "none", // Hides the default before border
                },
              }}
              key={index}
              expanded={isDropdown[index]}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="text-[#000]" />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
                onClick={() => {
                  toggleDropdown(index);
                  setTimeout(() => {
                    const element = document.getElementById(`${index}_list`);
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }, 400);
                }}
                sx={{
                  border: "none",
                }}
              >
                <Typography className="!font-[700] !text-[22px]">
                  {isLang === "ar"
                    ? addOnData?.designs_details?.[title]?.name_arabic
                    : title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {addOnData &&
                  addOnData.designs_details &&
                  addOnData.designs_details[title] &&
                  addOnData.designs_details[title].design_list?.length > 0
                    ? addOnData.designs_details[title].design_list?.map(
                        (design, i) => {
                          return (
                            <div
                              style={{
                                borderBottom:
                                  i ===
                                  addOnData.designs_details[title].design_list
                                    .length -
                                    1
                                    ? "none"
                                    : `1px solid black`,
                              }}
                            >
                              <div
                                id={design.id}
                                style={{
                                  display: "flex",
                                  // borderBottom:
                                  //   i ===
                                  //   addOnData.designs_details[title].design_list
                                  //     .length -
                                  //     1
                                  //     ? "none"
                                  //     : `1px solid black`,
                                  padding:
                                    window.innerWidth <= 475 ? "3% 0%" : "1% 0",
                                }}
                                className="items-center flex-wrap"
                              >
                                <Typography
                                  sx={{
                                    // color:  `${design.id == searchParams?'#0F5C3C': textColor}` ,
                                    color: "#000000",
                                    display: "block",
                                    marginRight: "5px",
                                    marginBottom: "8px",
                                    fontWeight: "500",
                                    fontSize: "18px",
                                  }}
                                  className={`sm:basis-[35%] basis-[35%] xs:basis-[69%] ${
                                    isLang === "ar" ? "text-right" : "text-left"
                                  }`}
                                >
                                  {isLang === "ar" ? (
                                    processArabicText(design.name_arabic)
                                  ) : title === "Branding" &&
                                    design.name_english ===
                                      "Logo & Identity" ? (
                                    <div className="flex flex-col gap-2">
                                      <span>{design.name_english}</span>
                                    </div>
                                  ) : (
                                    design.name_english
                                  )}
                                </Typography>
                                <p
                                  className={`flex xs:order-3 sm:order-2 items-center sm:w-[35%] w-[35%] xs:w-[100%] !mb-2 ${
                                    bundlePackageId && "xs:hidden sm:flex"
                                  }`}
                                >
                                  <p className="flex items-center mb-1 sm:min-w-[120px] min-w-[120px] xs:min-w-[100px] font-[500]">
                                    <img
                                      src={BlackDollor}
                                      alt="Price icon"
                                      className={`inline-block ${
                                        isLang === "ar" ? "ml-2" : "mr-2"
                                      }`}
                                    />
                                    {amountDecimal(Math.round(design.price))}{" "}
                                    {isLang === "ar" ? "ريال" : "SAR"}
                                  </p>
                                  <p className="flex items-center mb-1 font-[500] uppercase">
                                    <img
                                      src={BlackTime}
                                      alt="Time icon"
                                      className={`inline-block ${
                                        isLang === "ar" ? "ml-1" : "mr-1"
                                      }`}
                                    />
                                    {Math.round(design.time)}{" "}
                                    {isLang === "ar" ? "يوما" : "Days"}
                                  </p>
                                </p>

                                <p
                                  style={{ color: "#000000" }}
                                  className={`xs:order-2 sm:order-3 sm:w-[29%] w-[29%] xs:w-[29%] max-h-[36px] !mb-2 flex ${
                                    isLang === "ar"
                                      ? "flex-row-reverse"
                                      : "flex-row justify-end"
                                  }  text-[${textColor}] `}
                                >
                                  <button
                                    style={{
                                      borderColor: "#000000",
                                      borderStyle: "solid",
                                      borderWidth: "1px",
                                    }}
                                    onClick={() =>
                                      handleQuantityChange(
                                        design.name_english,
                                        -1
                                      )
                                    }
                                    className={`${
                                      isLang === "ar"
                                        ? "!border-r-0"
                                        : "!border-r-0"
                                    }  !py-[17px]  px-1  flex  items-center`}
                                  >
                                    <RemoveIcon />
                                  </button>
                                  <span
                                    style={{
                                      borderColor: "#000000",
                                      borderStyle: "solid",
                                      borderWidth: "1px",
                                    }}
                                    className={`${
                                      isLang === "ar"
                                        ? "!border-r-0"
                                        : "!border-r-0"
                                    } px-2 !text-[20px]`}
                                  >
                                    {" "}
                                    {quantities[design.name_english] || 0}
                                  </span>
                                  <button
                                    style={{
                                      borderColor: "#000000",
                                      borderStyle: "solid",
                                      borderWidth: "1px",
                                    }}
                                    //                                    onClick={() => {
                                    //   console.log(design, "design");
                                    //   ;

                                    //   const isLogoAndIdentity = design.name_english === "Logo & Identity";
                                    //   const isCustomBundle = path === "custombundl";

                                    //   if (isLogoAndIdentity && isCustomBundle) {
                                    //     if (design.quantity < 1) {
                                    //       handleQuantityChange(design.name_english, 1);
                                    //     }
                                    //     // Else: do nothing, as quantity is already 1 or more
                                    //   } else {
                                    //     handleQuantityChange(design.name_english, 1);
                                    //   }
                                    // }}

                                    onClick={() => {
                                      
                                      const isLogoAndIdentity =
                                        design.name_english ===
                                        "Logo & Identity";
                                      const isCustomBundle =
                                        path === "custombundl";
                                      const currentQuantity =
                                        quantities["Logo & Identity"];

                                      if (isLogoAndIdentity && isCustomBundle) {
                                        if (currentQuantity === undefined || currentQuantity === 0) {
                                          handleQuantityChange(
                                            design.name_english,
                                            1
                                          );
                                        }
                                        // Do nothing if already set (i.e., prevent adding again)
                                      } else {
                                        handleQuantityChange(
                                          design.name_english,
                                          1
                                        );
                                      }
                                    }}
                                    className={`flex  items-center px-1  !py-[5px] `}
                                  >
                                    <AddIcon />
                                  </button>
                                </p>
                              </div>
                              {design.name_english === "Logo & Identity" &&
                                path === "custombundl" && (
                                  <div
                                    className={`flex md:ml-[16%]  
                                                  lg:ml-[12%] macm2:ml-[11%] macm3:ml-[2%] macm1:ml-[11%]
                                                  lmd2:ml-[15%] ${
                                                    window.innerWidth > 1440 &&
                                                    "ml-[1%]"
                                                  }
                                                  ${
                                                    window.innerWidth > 1440 &&
                                                    "ml-[10%]"
                                                  }
                                                  items-center mb-4 justify-center`}
                                  >
                                    <Typography>
                                      <div className="flex gap-2">
                                        {addOnLang?.map((ele) => {
                                          return (
                                            <div
                                              className={`flex gap-1 ${
                                                window.innerWidth > 379
                                                  ? "text-[16px]"
                                                  : "text-[15px]"
                                              }   items-center cursor-pointer`}
                                              key={`${ele.id}-${ele.language}`}
                                            >
                                              <input
                                                type="radio"
                                                checked={ele.isChecked}
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
                                                  window.innerWidth < 346
                                                    ? "text-[12px]"
                                                    : window.innerWidth < 362
                                                    ? "text-[14px]"
                                                    : window.innerWidth < 379
                                                    ? "text-[15px]"
                                                    : window.innerWidth <= 475
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
                          );
                        }
                      )
                    : "No designs available"}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};
