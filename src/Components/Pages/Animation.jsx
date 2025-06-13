import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
import { toast, ToastContainer } from "react-toastify";

const initialData = [
  { id: 1, title: "Cart One", description: "Items: Apple, Banana, Mango" },
  { id: 2, title: "Cart Two", description: "Items: Milk, Bread, Butter" },
  { id: 3, title: "Cart Three", description: "Items: Rice, Dal, Oil" },
  { id: 4, title: "Cart Four", description: "Items: Eggs, Cheese, Yogurt" },
  { id: 5, title: "Cart One", description: "Items: Apple, Banana, Mango" },
  { id: 6, title: "Cart Two", description: "Items: Milk, Bread, Butter" },
  { id: 7, title: "Cart Three", description: "Items: Rice, Dal, Oil" },
  { id: 8, title: "Cart Four", description: "Items: Eggs, Cheese, Yogurt" },
];

const AnimatedCart = ({ id, title, description, onRemove }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      layout
      layoutTransition={{ duration: 0.6, ease: "easeInOut" }}
      className="border-2 border-gray-300 rounded-xl p-6 my-6 w-full max-w-md mx-auto bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div
        className="flex justify-between items-start"
        style={{ border: "1px solid", padding: "20px", margin: "10px" }}
      >
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <button
          onClick={() => onRemove(id)}
          className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
};

export default function Animation({ lang, setLang }) {
  const [cartData, setCartData] = useState(initialData);

  const handleRemove = (id) => {
    setCartData((prev) => prev.filter((cart) => cart.id !== id));
  };

  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [uploadContent, setUploadContent] = useState({});
  const [designQuestions, setDesignQuestions] = useState([]);
  const [skipId, setSkipId] = useState([]);
  const [showDetails, setDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 475);

  const [order, setOrder] = useState(null);
  const getOrderDetails = async () => {
    // const response = await axios.get(
    //   `${base_url}/api/order/${orderId}/`,
    //   ConfigToken()
    // );
    // if (response.data) {
    //   setOrder(response.data.data);
    //   setDesignQuestions(response.data.design_question);
    // }
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

  const saveContent = async (itemId, idx, designId) => {
    console.log(designId);
    try {
      if (
        !uploadContent?.[itemId]?.[idx]?.language &&
        designQuestions[designId]?.language
      ) {
        toast.error(
          lang === "ar"
            ? "يرجى اختيار اللغة قبل الحفظ"
            : "Please choose language before saving.",
          {
            icon: false,
            toastId: "required-value-toast1",
            style: {
              color: "#D83D99",
              fontWeight: "700",
            },
          }
        );
        return;
      }
      if (
        !uploadContent?.[itemId]?.[idx]?.content &&
        designQuestions[designId]?.textbox
      ) {
        toast.error(
          lang === "ar"
            ? "يرجى إضافة المحتوى قبل الحفظ"
            : "Please add content before saving.",
          {
            icon: false,
            toastId: "required-value-toast2",
            style: {
              color: "#D83D99",
              fontWeight: "700",
            },
          }
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
        toast.success("Content saved successfully!", {
          icon: false,
          toastId: "required-value-toast5",
          style: {
            color: "#1BA56F",
            fontWeight: "700",
          },
        });
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
      <ToastContainer />
      <Navbar isLang={lang} setIsLang={setLang} />
      <div className="p-8 bg-gray-50 min-h-screen">
        <AnimatePresence>
          {cartData.map((cart) => (
            <AnimatedCart
              key={cart.id}
              id={cart.id}
              title={cart.title}
              description={cart.description}
              onRemove={handleRemove}
            />
          ))}
        </AnimatePresence>
      </div>
      {window?.innerWidth >= 500 && <Footer isLang={lang} />}
    </>
  );
}
