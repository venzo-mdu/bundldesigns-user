import toast from "react-hot-toast";

let toastId = null;

const useToastMessage = () => {
  const showToast = (message, color) => {
    if (toastId) {
      toast.dismiss(toastId);
    }

    toastId = toast(message, {
      duration: 3000,
      style: {
        color: color,
        border: `1px solid ${color}`,
        fontWeight: "700",
        background: "#fff",
        boxShadow: "none",
        borderRadius: "0px",
      },
    });
  };

  return { showToast };
};

export default useToastMessage;
