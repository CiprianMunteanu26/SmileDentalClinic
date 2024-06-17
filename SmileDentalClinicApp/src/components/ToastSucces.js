import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
const ToastSucces = ({ message, duration, resetError }) =>
{
    useEffect(() =>
    {
        const showToast = () =>
        {
            toast.success(message, {
                autoClose: duration,
                position: toast.POSITION.BOTTOM_CENTER,
                onClose: resetError,
            });
        };

        showToast();

        const timer = setTimeout(() =>
        {
            toast.dismiss();
        }, duration);

        return () => clearTimeout(timer);
    }, [message, duration]);

    return null;
};
export default ToastSucces;