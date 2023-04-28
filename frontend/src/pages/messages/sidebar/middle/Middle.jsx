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
                                src={Photo}
                                alt=""
                                className="rounded-circle middle-avatar-chat"
                            />
                            <span className="ms-2 fs-4 fw-bold">Yanji</span>
                        </div>
                        <div className="d-flex fs-4">
                            <span className="icon d-flex justify-content-center align-items-center rounded-circle">
                                <FontAwesomeIcon icon="fa-solid fa-phone" />
                            </span>
                            <span className="icon d-flex justify-content-center align-items-center rounded-circle mx-4">
                                <FontAwesomeIcon icon="fa-solid fa-video" />
                            </span>
                            <span className="icon d-flex justify-content-center align-items-center rounded-circle">
                                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                            </span>
                        </div>
                    </div>
                    {/* BODY */}
                    <div className="middle-container-body px-4 pt-4">
                        <div className="middle-container-body__left-text">
                            <span className="d-block p-3">
                                <p className="m-0">Text</p>
                            </span>
                            <span className="d-block p-3">
                                <p className="m-0">Bạn đã thu hồi</p>
                            </span>
                        </div>
                        <div className="d-flex flex-column align-items-end middle-container-body__right-text">
                            <span className="p-3 d-block">
                                <p className="m-0">Text</p>
                            </span>
                            <span className="p-3 d-block">
                                <p className="m-0">Bạn đã thu hồi</p>
                            </span>
                        </div>
                    </div>
                    {/* FOOTER */}
                    <div className="middle-container-footer p-4">
                        <div className="d-flex justify-content-between px-5">
                            <span className="icon fs-2 rounded-circle">
                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                            </span>
                            <span className="icon fs-2 rounded-circle mx-3">
                                <FontAwesomeIcon icon="fa-regular fa-image" />
                            </span>
                            <span className="icon fs-2 rounded-circle">
                                <FontAwesomeIcon icon="fa-solid fa-face-laugh-beam" />
                            </span>
                        </div>
                        <div className="user-input-chat">
                            <input
                                type="text"
                                // ref={postInput}
                                className="rounded border-0 p-2 fs-4"
                                placeholder="Text your message here..."
                            />

                            {/* <p
                                className="mb-0"
                                // onClick={handlePostInput}
                                style={{
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }}
                            >
                                TEXT YOUR MIND HERE :3
                            </p> */}
                        </div>
                        <span className="icon fs-2 d-flex justify-content-end align-items-center pe-3">
                            <FontAwesomeIcon icon="fa-regular fa-thumbs-up" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Middle;
