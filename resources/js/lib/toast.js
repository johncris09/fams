import { ToastContainer, toast } from 'react-toastify';
export function showToast(message, type = "warning", options = {}) {
    toast(message, {
        autoClose: 3000,
        type: type,
        position: toast.POSITION.TOP_RIGHT,
        transition: "slide",
        ...options,
    });
}
