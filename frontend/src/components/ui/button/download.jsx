import { memo } from "react";
import isEqual from "react-fast-compare";

const DownloadBtn = ({ label, filename }) => {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = filename;
    a.download = filename;
    a.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="p-2 text-white mt-2 fs-3"
      style={{
        background: "var(--color-author)",
        fontWeight: "bold",
        borderRadius: "0.5em",
      }}
    >
      {label}
    </button>
  );
};

export default memo(DownloadBtn, isEqual);
