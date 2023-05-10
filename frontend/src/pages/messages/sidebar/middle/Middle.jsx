import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../../../style/pages/messages/middle/middle.css";

import Photo from "../../../../assets/avatar/profile-pic.png";

const Middle = () => {
    return (
        <>
            <div className="middle-msg-page">
                <div className="middle-container">
                    {/* HEADER */}
                    <div className="middle-container-header d-flex align-items-center justify-content-between py-3 px-4 pb-3">
                        <div className="d-flex align-items-center">
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={Photo}
                                alt="Avatar user"
                                className="rounded-circle middle-avatar-chat"
                            />
                            <span className="ms-2 fs-4 fw-bold">Yanji</span>
                        </div>
                        <div className="d-flex fs-4">
                            <span
                                aria-label="Gọi điện"
                                className="icon d-flex justify-content-center align-items-center rounded-circle"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-phone" />
                            </span>
                            <span
                                aria-label="Gọi video"
                                className="icon d-flex justify-content-center align-items-center rounded-circle mx-4"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-video" />
                            </span>
                            <span
                                aria-label="Xem thêm thông tin"
                                className="icon d-flex justify-content-center align-items-center rounded-circle"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                            </span>
                        </div>
                    </div>
                    {/* BODY */}
                    <div className="middle-container-body px-4 pt-4">
                        <div className="middle-container-body__left-text">
                            <p
                                className="fs-4"
                                style={{
                                    width: "fit-content",
                                    marginBottom: "2%",
                                    padding: "1.5% 5%",
                                    border: "1px solid blue",
                                    borderRadius: "10%",
                                }}
                            >
                                Text
                            </p>
                            <p
                                className="fs-4"
                                style={{
                                    width: "fit-content",
                                    marginBottom: "2%",
                                    padding: "1.5% 5%",
                                    border: "1px solid blue",
                                    borderRadius: "10%",
                                }}
                            >
                                Bạn đã thu hồi
                            </p>
                        </div>
                        <div className="d-flex flex-column align-items-end middle-container-body__right-text">
                            <p
                                className="fs-4"
                                style={{
                                    width: "fit-content",
                                    marginBottom: "2%",
                                    padding: "1.5% 5%",
                                    border: "1px solid blue",
                                    borderRadius: "10%",
                                }}
                            >
                                Text
                            </p>
                            <p
                                className="fs-4"
                                style={{
                                    width: "fit-content",
                                    marginBottom: "2%",
                                    padding: "1.5% 5%",
                                    border: "1px solid blue",
                                    borderRadius: "10%",
                                }}
                            >
                                Bạn đã thu hồi
                            </p>
                        </div>
                    </div>
                    {/* FOOTER */}
                    <div className="middle-container-footer p-4 d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between">
                            <span
                                className="icon fs-3"
                                aria-label="Mở hành động khác"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                            </span>
                            <span
                                className="icon fs-3 mx-3"
                                aria-label="Đính kèm file"
                            >
                                <FontAwesomeIcon icon="fa-regular fa-image" />
                            </span>
                            <span className="icon fs-3" aria-label="Chọn emoji">
                                <FontAwesomeIcon icon="fa-solid fa-face-laugh-beam" />
                            </span>
                        </div>

                        <div className="user-input-chat">
                            <input
                                type="text"
                                className="rounded py-2 px-3 fs-4"
                                placeholder="Text your message here..."
                                maxLength="1000"
                                style={{
                                    border: "1px solid var(--color-primary)",
                                }}
                            />
                        </div>
                        <span
                            className="icon fs-3 d-flex justify-content-end align-items-center"
                            style={{
                                width: "fit-content",
                                borderRadius: "0.5rem",
                                padding: "0.8rem",
                            }}
                            aria-label="Thả cảm xúc"
                        >
                            <FontAwesomeIcon icon="fa-regular fa-thumbs-up" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Middle;
