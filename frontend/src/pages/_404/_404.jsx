import React from "react";
import { Link } from "react-router-dom";

import "./style/_404.css";

import { BG_NOT_FOUND } from "../../assets/";

const _404 = () => {
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
        <Link to="/" className="text-decoration-underline">
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default _404;
