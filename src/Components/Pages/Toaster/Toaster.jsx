import { useRef } from "react";
import toast from "react-hot-toast";

const useToastMessage = () => {
  const toastIdRef = useRef(null);

  const dismissOldToast = () => {
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
    }
  };

  const showToast = (message, color = "#000", fontWeight = "700") => {
    dismissOldToast();
    toastIdRef.current = toast(message, {
      duration: 3000,
      style: {
        color,
        border: `1px solid ${color}`,
        fontWeight,
        background: "#fff",
        boxShadow: "none",
        borderRadius: "0px",
      },
    });
  };

  const showSuccessToast = (message = "Operation successful") => {
    showToast(message, "#1BA56F", "700");
  };

  const showErrorToast = (message = "Something went wrong", color) => {
    showToast(message, color, "700");
  };

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
  };
};
export default useToastMessage;