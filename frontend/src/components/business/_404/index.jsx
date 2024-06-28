import isEqual from "react-fast-compare";
import { Link } from "react-router-dom";

import { BG_NOT_FOUND } from "../../../assets";
import { RouteNames } from "../../../constant/routes";

import "./_404.css";
import { memo } from "react";

function _404() {
  return (
    <div
      id="not-found"
      className="d-flex justify-content-center align-items-center"
    >
      <div className="bg_404 d-flex justify-content-center align-items-center flex-column">
        <img
          loading="lazy"
          role="presentation"
          decoding="async"
          src={BG_NOT_FOUND}
          alt="background"
        />
        <span className="my-3 fs-1 fw-bolder text-center">
          Bạn hiện không xem được nội dung này
        </span>
        <Link to={RouteNames.HOME} className="text-decoration-underline">
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default memo(_404, isEqual);
