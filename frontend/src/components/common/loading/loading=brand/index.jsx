import { memo } from "react";
import isEqual from "react-fast-compare";

import { LOGO_YANJI_SOCIAL } from "../../../../assets";

import "../loading.css";

const LoadingBrand = () => {
  return (
    <div
      id="loading-page"
      className="d-flex justify-content-center align-items-center fs-4"
    >
      <div className="w-25 h-25 d-flex justify-content-center align-items-center mb-3">
        <img src={LOGO_YANJI_SOCIAL} alt="yanji social" />
      </div>
      <span
        className="fw-bold"
        style={{
          fontSize: "3rem",
        }}
      >
        Yanji Social
      </span>
    </div>
  );
};

export default memo(LoadingBrand, isEqual);
