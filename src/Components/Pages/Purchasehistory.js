import React, { useState, useEffect } from "react";
import axios from "axios";
import { ConfigToken } from "../Auth/ConfigToken";
import { Footer } from "../Common/Footer/Footer";
import { Navbar } from "../Common/Navbar/Navbar";
import dashboard from "../../json/dashboard.json";
import reload from "../../Images/reload.svg";
import { format } from "date-fns";
import { DashboardPopup } from "../Common/Popup/DashboardPopup";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Bgloader } from "../Common/Background/Bgloader";
import DoneIcon from "@mui/icons-material/Done";
import { BorderAllRounded } from "@mui/icons-material";
import { amountDecimal } from "../Utils/amountDecimal";
import workOurGIF from "../../Images/ourWorkGIF.gif";
import workBrandGIF from "../../Images/ourWorkBranding.gif";

export const Purchasehistory = ({ lang, setLang }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [reOrderId, setReOrderId] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [purchased, setPurchased] = useState("not");
  const [showFull, setShowFull] = useState(false);
  const [dashboardJson, setDashboardJson] = useState(dashboard);
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const location = useLocation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(`${base_url}/api/order/`, ConfigToken());
      if (response.data) {
        const resProjects = response.data.data.filter(
          (item) => item.order_status !== "in_cart"
        );
        setPurchases(resProjects);
      }
      setLoading(false);
    })();
  }, []);

  const CheckCart = async (id) => {
    const response = await axios.get(
      `${base_url}/api/order/cart/`,
      ConfigToken()
    );
    console.log(response);
    if (response.status === 200) {
      reOrder(id);
    } else {
      setReOrderId(id);
      setOpenPopup(true);
    }
  };

  const reOrder = async (id) => {
    await axios.get(`${base_url}/api/reorder/${id}/`, ConfigToken());
    window.location.href = "/mycart";
  };

  return loading ? (
    <Bgloader />
  ) : (
    <div>
      <Navbar isLang={lang} setIsLang={setLang} />
      {window.innerWidth > 768 ? (
        purchases.length > 0 ? (
          <div className="px-14 mt-4 mb-4">
            <h2 className="lg:text-[32px] text-[#000] md:text-[24px] uppercase">
              {lang === "ar" ? "تاريخ الشراء" : dashboardJson.third_title}
            </h2>
            <table className="w-full !border-[#00000080] border-separate border-spacing-y-2 border-spacing-x-0">
              <thead>
                <tr className="!mb-4">
                  {Object.keys(dashboardJson.table_heads).map((key) => (
                    <th className="text-[#00000080] pb-2 lg:text-[20px] md:text-[16px] font-Helvetica font-medium">
                      {lang === "ar"
                        ? dashboardJson.table_heads_arabic[key]
                        : dashboardJson.table_heads[key]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {purchases.map((project, index) => (
                  <tr key={project.id}>
                    <td
                      className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${
                        index !== purchases.length - 1
                          ? "border-b !border-[#00000080]"
                          : ""
                      }`}
                    >
                      {project.id}
                    </td>
                    <td
                      className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${
                        index !== purchases.length - 1
                          ? "border-b !border-[#00000080]"
                          : ""
                      }`}
                    >
                      {project.project_name}
                    </td>
                    <td
                      className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${
                        index !== purchases.length - 1
                          ? "border-b !border-[#00000080]"
                          : ""
                      }`}
                    >
                      {Math.round(project.grand_total)}
                    </td>
                    <td
                      className={`lg:text-[20px] font-medium md:text-[16px] pb-2 text-[#1BA56F] ${
                        index !== purchases.length - 1
                          ? "border-b !border-[#00000080]"
                          : ""
                      }`}
                    >
                      {lang === "ar" ? "مكتمل" : "Completed"}
                    </td>
                    <td
                      className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${
                        index !== purchases.length - 1
                          ? "border-b !border-[#00000080]"
                          : ""
                      }`}
                    >
                      {format(new Date(project.purchase_date), "dd/MM/yy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="relative py-10 pb-0">
            <img
              className={`absolute ${
                lang === "ar"
                  ? "sm:right-12 right-12 xs:right-[-3rem]"
                  : "sm:left-12 left-12 xs:left-[-3rem]"
              } sm:w-[200px] w-[200px] xs:w-[125px]`}
              style={{ transform: "rotate(350deg)" }}
              src={workOurGIF}
            />
            <div className="w-[48%] text-center mx-auto">
              <h1 className="text-[24px] font-semibold text-black mb-4">
                {lang === "ar" ? "لا توجد طلبات حتى الآن." : "No orders yet."}
              </h1>
              <p className="flex justify-center mb-0 mt-0">
                <img
                  className="animate-rotate-animation"
                  width="150px"
                  height="110px"
                  src={workBrandGIF}
                />
              </p>
              <h2 className="lg:text-[32px] text-black mt-6">
                {lang === "ar"
                  ? "جاهز تبدأ رحلتك الابداعية معنا؟"
                  : "Inspired to start your journey to launch your next big thing?"}
              </h2>
              <p className="text-center">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="py-1 px-3 mt-[50px] border-black border-[1px] mb-8 bg-white hover:bg-black text-black uppercase hover:text-white"
                >
                  {lang === "ar" ? "ابدأ مشروعك الآن" : "Get started !"}
                </button>
              </p>
            </div>
            <img
              width="300px"
              className={`absolute sm:w-[300px] w-[300px] xs:w-[150px] xs:top-[30%] sm:top-[14%] ${
                lang === "ar"
                  ? "xs:left-[-14%] sm:left-[3%] left-[3%]"
                  : "xs:right-[-14%] sm:right-[3%] right-[3%]"
              }`}
              style={{ transform: "rotate(320deg)" }}
              src={workOurGIF}
            />
          </div>
        )
      ) : purchases.length > 0 ? (
        <div className="w-full px-[8%] my-[10%]">
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-[500] font-Helvetica opacity-50">
              {lang === "ar" ? "تاريخ الشراء" : "Purchase History "}
            </p>
            <p
              className="underline text-[20px] font-[500] font-Helvetica text-[#1BA56F] cursor-pointer"
              onClick={() => setShowFull(!showFull)}
            >
              {purchases.length > 1? showFull ? "Show Less" : "See More":null}
            </p>
          </div>
          <div
            className={`transition-all duration-500 ease-out ${
              showFull ? "h-auto" : "h-[165px] overflow-hidden relative"
            }`}
          >
            {purchases.map((order, index) => (
              <div
                key={index}
                className="border-b border-gray-300 py-2 flex flex-col md:flex-row md:items-center justify-between"
              >
                <div className="flex justify-between w-full md:w-[50%]">
                  <p className="text-[22px] font-[700] font-Helvetica">
                    {order.project_name.length > 9
                      ? order.project_name.substring(0, 5) + " (...)"
                      : order.project_name}
                  </p>
                  <p className="text-[22px] font-[700] font-Helvetica">
                    {amountDecimal(Math.round(order.grand_total))} SAR
                  </p>
                </div>
                <div className="flex justify-between w-full md:w-[50%] mt-1 md:mt-0">
                  <p className="text-[20px] font-[500] text-gray-500 font-Helvetica">
                    {order.id}
                  </p>
                  <p className="text-[20px] font-[500] text-gray-500 font-Helvetica">
                    {format(new Date(order.purchase_date), "dd/MM/yy")}
                  </p>
                  <p className="text-[20px] font-[500] font-Helvetica text-[#1BA56F]">
                    {lang === "ar" ? "مكتمل" : "Completed"}
                  </p>
                </div>
              </div>
            ))}
            {!showFull && (
              <div className="absolute bottom-[-40px] left-0 w-full h-[80px] bg-gradient-to-t from-white via-white/90 to-transparent shadow-[1px] pointer-events-none transition-all duration-500 ease-out"></div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative py-10 pb-0">
          <img
            className={`absolute ${
              lang === "ar"
                ? "sm:right-12 right-12 xs:right-[-3rem]"
                : "sm:left-12 left-12 xs:left-[-3rem]"
            } sm:w-[200px] w-[200px] xs:w-[125px]`}
            style={{ transform: "rotate(350deg)" }}
            src={workOurGIF}
          />
          <div className="w-[48%] text-center mx-auto">
            <h1 className="text-[24px] font-semibold text-black mb-4">
              {lang === "ar" ? "لا توجد طلبات حتى الآن." : "No orders yet."}
            </h1>
            <p className="flex justify-center mb-0 mt-0">
              <img
                className="animate-rotate-animation"
                width="150px"
                height="110px"
                src={workBrandGIF}
              />
            </p>
            <h2 className="lg:text-[32px] text-black mt-6">
              {lang === "ar"
                ? "جاهز تبدأ رحلتك الابداعية معنا؟"
                : "Inspired to start your journey to launch your next big thing?"}
            </h2>
            <p className="text-center">
              <button
                onClick={() => (window.location.href = "/")}
                className="py-1 px-3 mt-[50px] border-black border-[1px] mb-8 bg-white hover:bg-black text-black uppercase hover:text-white"
              >
                {lang === "ar" ? "ابدأ مشروعك الآن" : "Get started !"}
              </button>
            </p>
          </div>
          <img
            width="300px"
            className={`absolute sm:w-[300px] w-[300px] xs:w-[150px] xs:top-[30%] sm:top-[14%] ${
              lang === "ar"
                ? "xs:left-[-14%] sm:left-[3%] left-[3%]"
                : "xs:right-[-14%] sm:right-[3%] right-[3%]"
            }`}
            style={{ transform: "rotate(320deg)" }}
            src={workOurGIF}
          />
        </div>
      )}
      {/* <div className="w-full" style={
          location.pathname === "/purchase-history"
            ? { position: "absolute", bottom: 0 }
            : {}
        }> */}
      <Footer
        isLang={lang}
          // style={
          //   location.pathname === "/purchase-history"
          //     ? { position: "absolute", bottom: 0 }
          //     : {}
          // }
      />
      {/* </div> */}

      {openPopup && (
        <DashboardPopup
          openpopup={openPopup}
          isCancel={false}
          setPopup={setOpenPopup}
          title={lang === "ar" ? "إفراغ السلة" : "Empty your Cart"}
          onClick={() => reOrder(reOrderId)}
          save={lang === "ar" ? "نعم" : "Yes"}
          cancel={lang === "ar" ? "الإلغاء" : "Cancel"}
        />
      )}
    </div>
  );
};
