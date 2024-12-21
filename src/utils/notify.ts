import { toast } from "react-toastify";

export const notify = (msg, type) => {
    if (type === 'success') {
        toast.success(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            pauseOnHover: true,
            style: {
              background: 'linear-gradient(to right, #8e2de2, #4a00e0)', // neon purple gradient
              color: 'white',
              borderRadius: '8px',
              fontSize: '16px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // glowing effect
              padding: '12px 20px',
              fontFamily: "'Roboto', sans-serif",
            }
          });
          return;
    }
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      pauseOnHover: true,
      style: {
        background: 'linear-gradient(to right, #8e2de2, #4a00e0)', // neon purple gradient
        color: 'white',
        borderRadius: '8px',
        fontSize: '16px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // glowing effect
        padding: '12px 20px',
        fontFamily: "'Roboto', sans-serif",
      }
    });
};
