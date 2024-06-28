import { memo } from "react";
import isEqual from "react-fast-compare";

const ChooseColorBtn = ({ colorName, textColorTheme, onTextColorChange }) => {
  return (
    <span
      key={colorName}
      className={colorName + (textColorTheme === colorName ? " active" : "")}
      onClick={() => onTextColorChange(colorName)}
    ></span>
  );
};

export default memo(ChooseColorBtn, isEqual);
