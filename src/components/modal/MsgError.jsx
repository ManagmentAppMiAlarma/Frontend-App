import { toast } from "react-toastify";

export const MsgError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 800,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};
