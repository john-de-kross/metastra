import { toast } from 'react-toastify';


const toastAlert = {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    info: (message) => toast.info(message),
    warning: (message) => toast.warning(message),
}

export default toastAlert;