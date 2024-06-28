import { memo } from "react";
import isEqual from "react-fast-compare";

const ChooseBgBtn = ({ bgName, bgTheme, content, onBackgroundChange }) => {
  return (
    <div
      key={bgName}
      className={bgName + (bgTheme === bgName ? " active" : "")}
      onClick={() => onBackgroundChange(bgName)}
    >
      <span></span>
      <h5 htmlFor={bgName}>{content}</h5>
    </div>
  );
};

export default memo(ChooseBgBtn, isEqual);
