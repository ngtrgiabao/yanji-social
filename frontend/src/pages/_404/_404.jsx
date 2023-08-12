import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./style/_404.css";

import NOT_FOUND_BG from "../../assets/background/404.webp";

const _404 = () => {
    useEffect(() => {
        // console.clear();
    }, []);

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
                    src={NOT_FOUND_BG}
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
