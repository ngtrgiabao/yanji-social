import { memo } from "react";
import isEqual from "react-fast-compare";
import { FontSizeTheme, ColorTheme, BackgroundTheme } from "../custom-theme";

const CustomTheme = () => {
  return (
    <div
      className="card animate__animated animate__fadeInLeft"
      onClick={(e) => {
        if (e.currentTarget.classList.contains("card")) {
          e.stopPropagation();
        }
      }}
    >
      <h2>Customize your view</h2>
      <p className="text-muted">
        Manage your font size, color, and background.
      </p>

      <>
        <FontSizeTheme />
        <ColorTheme />
        <BackgroundTheme />
      </>
    </div>
  );
};

export default memo(CustomTheme, isEqual);
