import { useCallback, useEffect } from "react";
import { ToastEnum } from "../../type/enums";
import "./styles/toast.css";

const ToastAlert = ({ toastList, onChangeList }) => {
  // Define the background color for each toast status
  const toastBg = {
    [ToastEnum.SUCCESS]: "var(--color-success)",
    [ToastEnum.INFO]: "var(--color-info)",
    [ToastEnum.DANGER]: "var(--color-danger)",
    [ToastEnum.WARN]: "var(--color-warn)",
  };

  const closeToast = useCallback(
    (id) => {
      const toastListItem = toastList.filter((t) => t.id !== id);
      onChangeList(toastListItem);
    },
    [toastList, onChangeList],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        closeToast(toastList[0].id);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [toastList]);

  return (
    <div className="fs-4 position-fixed z-3 notification-container button-right">
      {toastList.map((toast) => (
        <div
          key={toast.id}
          className="notification text-black toast-content mb-4 border-0 rounded rounded-5"
          style={{ background: toastBg[toast.status] }}
        >
          <button
            className="border-0 text-black"
            onClick={() => closeToast(toast.id)}
          >
            X
          </button>
          <div>
            <p className="fw-bold fs-4 mt-0 title">{toast.title}</p>
            <p className="description">{toast.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastAlert;
