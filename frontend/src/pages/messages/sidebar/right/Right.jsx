import React, { useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./right.css";

import Photo from "../../../../images/profile-pic.png";

const Right = (props) => {
    const { avatarUser } = props;

    const [active, setActive] = useState("");
    const [isChoose, setIsChoose] = useState(false);

    const handleChoose = (setting) => {
        setActive(setting);
        setIsChoose((isChoose) => !isChoose);
    };

    return (
        <>
            <div className="right-msg-page p-4">
                <div className="right-container d-flex flex-column align-items-center">
                    {/* HEADER */}
                    <div className="right-container-header d-flex flex-column align-items-center mb-4">
                        <img
                            src={Photo}
                            alt=""
                            className="rounded-circle right-avatar-chat"
                        />
                        <p className="mt-2 mb-0 fs-4 fw-bold">Yanji</p>
                        <span className="opacity-75">Online 3mins ago</span>
                    </div>
                    {/* BODY */}
                    <div className="right-container-body d-flex justify-content-between fs-5">
                        {/* PROFILE */}
                        <div className="d-flex flex-column align-items-center">
                            <span
                                className="p-3 rounded-circle text-center mb-2 icon"
                                style={{ width: "4rem", height: "4rem" }}
                            >
                                <FontAwesomeIcon icon="fa-regular fa-user" />
                            </span>
                            <span>Profile</span>
                        </div>
                        {/* TURN OFF NOTIFICATION */}
                        <div className="d-flex flex-column align-items-center">
                            <span
                                className="p-3 rounded-circle text-center mb-2 icon"
                                style={{ width: "4rem", height: "4rem" }}
                            >
                                <FontAwesomeIcon icon="fa-regular fa-bell-slash" />
                            </span>
                            <span>Turn off notification</span>
                        </div>
                        {/* SEARCH */}
                        <div className="d-flex flex-column align-items-center">
                            <span
                                className="p-3 rounded-circle text-center mb-2 icon"
                                style={{ width: "4rem", height: "4rem" }}
                            >
                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                            </span>
                            <span>Search</span>
                        </div>
                    </div>
                    {/* FOOTER */}
                    <ul className="right-container-footer mt-4 d-flex flex-column justify-content-center ps-0">
                        {/* SETTING CHAT */}
                        <div>
                            <div
                                className="d-flex justify-content-between fs-4 mb-0 p-3 drop-menu"
                                onClick={() => {
                                    handleChoose("SETTING-CHAT");
                                }}
                            >
                                <p className="mb-0">Setting this chat</p>
                                <span>
                                    <FontAwesomeIcon
                                        icon="fa-solid fa-caret-down"
                                        style={{
                                            transform: `${
                                                active === "SETTING-CHAT" &&
                                                isChoose
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)"
                                            }`,
                                        }}
                                    />
                                </span>
                            </div>
                            {/* DROP MENU */}
                            {isChoose && active === "SETTING-CHAT" && (
                                <ul className="ps-0 fs-4">
                                    <li className="drop-menu-item p-3">
                                        <div>
                                            <span className="icon">😃</span>
                                            <span>Change emotion</span>
                                        </div>
                                    </li>
                                    <li className="drop-menu-item p-3">
                                        <div>
                                            <span className="icon">
                                                <FontAwesomeIcon icon="fa-solid fa-font" />
                                            </span>
                                            <span>Change nickname</span>
                                        </div>
                                    </li>
                                    <li className="drop-menu-item p-3">
                                        <div>
                                            <span className="icon">
                                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                                            </span>
                                            <span>Search in chat</span>
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </div>

                        {/* SETTING VIDEO, FILE AND LINKS */}
                        <div>
                            <div
                                className="d-flex justify-content-between fs-4 mb-0 p-3 drop-menu"
                                onClick={() => {
                                    handleChoose("SETTING-FILE");
                                }}
                            >
                                <p className="mb-0">Videos, files and links</p>
                                <span>
                                    <FontAwesomeIcon
                                        icon="fa-solid fa-caret-down"
                                        style={{
                                            transform: `${
                                                active === "SETTING-FILE" &&
                                                isChoose
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)"
                                            }`,
                                        }}
                                    />
                                </span>
                            </div>
                            {/* DROP MENU */}
                            {isChoose && active === "SETTING-FILE" && (
                                <ul className="ps-0 fs-4">
                                    <li className="drop-menu-item p-3">
                                        <div>
                                            <span className="icon">
                                                <FontAwesomeIcon icon="fa-solid fa-photo-film" />
                                            </span>
                                            <span>Media</span>
                                        </div>
                                    </li>
                                    <li className="drop-menu-item p-3">
                                        <div>
                                            <span className="icon">
                                                <FontAwesomeIcon icon="fa-solid fa-file" />
                                            </span>
                                            <span>File</span>
                                        </div>
                                    </li>
                                    <li className="drop-menu-item p-3">
                                        <div>
                                            <span className="icon">
                                                <FontAwesomeIcon icon="fa-solid fa-link" />
                                            </span>
                                            <span>Links</span>
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </div>

                        {/* SETTING PRIVATE, PRIVACY */}
                        <div>
                            <div
                                className="d-flex justify-content-between fs-4 mb-0 p-3 drop-menu"
                                onClick={() => {
                                    handleChoose("SETTING-PRIVATE");
                                }}
                            >
                                <p className="mb-0">Private and support</p>
                                <span>
                                    <FontAwesomeIcon
                                        icon="fa-solid fa-caret-down"
                                        style={{
                                            transform: `${
                                                active === "SETTING-PRIVATE" &&
                                                isChoose
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)"
                                            }`,
                                        }}
                                    />
                                </span>
                            </div>
                            {/* DROP MENU */}
                            {isChoose && active === "SETTING-PRIVATE" && (
                                <ul className="ps-0 fs-4">
                                    <li className="drop-menu-item p-3">
                                        <div>
                                            <span className="icon">
                                                <FontAwesomeIcon icon="fa-regular fa-bell" />
                                            </span>
                                            <span>Turn off notification</span>
                                        </div>
                                    </li>
                                    <li className="drop-menu-item p-3">
                                        <div>
                                            <span className="icon">
                                                <FontAwesomeIcon icon="fa-solid fa-comment-slash" />
                                            </span>
                                            <span>Delete chat</span>
                                        </div>
                                    </li>
                                    <li className="drop-menu-item p-3">
                                        <div>
                                            <span className="icon">
                                                <FontAwesomeIcon icon="fa-solid fa-user-xmark" />
                                            </span>
                                            <span>Block user</span>
                                        </div>
                                    </li>
                                    <li className="drop-menu-item p-3">
                                        <div>
                                            <span className="icon">
                                                <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
                                            </span>
                                            <span>Report</span>
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Right;
