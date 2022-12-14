import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
    UilEstate,
    UilCompass,
    UilBell,
    UilChat,
    UilBookmark,
    UilAnalysis,
    UilPalette,
    UilSetting,
} from "@iconscout/react-unicons";

import "./left.css";

// SETTINGS
import FontSizeTheme from "./custom-theme/fontsize/FontSizeTheme";
import BackgroundTheme from "./custom-theme/backgroundTheme/BackgroundTheme";
import ColorTheme from "./custom-theme/colorTheme/ColorTheme";
import NotificationPopup from "./notificationPopup/NotificationPopup";

import ProfilePic from "../../../images/profile-pic.png";

const Left = () => {
    const [active, setActive] = useState("HOME");
    const [popup, setPopup] = useState(false);

    const handlePopup = () => {
        setPopup((popup) => !popup);
    };

    const [choose, setChoose] = useState(false);

    const handleChoose = () => {
        setChoose((choose) => !choose);
    };

    return (
        <>
            <div className="left">
                <Link to="/user" className="profile d-flex align-items-center">
                    <div className="profile-pic">
                        <img src={ProfilePic} alt="" />
                    </div>

                    <div className="handle">
                        <h4>Nguyen Tran Gia Bao (Yanji)</h4>
                        <p className="text-muted">@yanji</p>
                    </div>
                </Link>

                <div className="sidebar mt-3">
                    {/* HOME */}
                    <Link
                        to="/"
                        className={`menu-item ${
                            active === "HOME" ? "active" : ""
                        }`}
                        onClick={() => setActive("HOME")}
                    >
                        <span>
                            <UilEstate className="sidebar-icon" />
                        </span>
                        <h3 className="ms-4">Home</h3>
                    </Link>

                    {/* EXPLORE */}
                    <Link
                        to="/explore"
                        className={`menu-item ${
                            active === "EXPLORE" ? "active" : ""
                        }`}
                        onClick={() => {
                            setActive("EXPLORE");
                        }}
                    >
                        <span>
                            <UilCompass className="sidebar-icon" />
                        </span>
                        <h3 className="ms-4">Explore</h3>
                    </Link>

                    {/* NOTIFICATION */}
                    <div
                        className={`menu-item ${
                            active === "NOTIFICATION" ? "active" : ""
                        }`}
                        onClick={() => {
                            setActive("NOTIFICATION");
                            handlePopup();
                        }}
                        id="notification"
                    >
                        <span>
                            <UilBell className="sidebar-icon" />
                            <small
                                className="notification-count bg-danger"
                                style={{
                                    display: `${
                                        active === "NOTIFICATION" ? "none" : ""
                                    }`,
                                }}
                            >
                                9+
                            </small>
                        </span>
                        <h3 className="ms-4">Notification</h3>

                        {/* NOTIFICATION POPUP */}
                        <div
                            className="notification-popup animate__animated animate__fadeIn animate__fast"
                            style={{
                                display: `${
                                    popup && active === "NOTIFICATION"
                                        ? "block"
                                        : ""
                                }`,
                            }}
                        >
                            <NotificationPopup />
                        </div>
                    </div>

                    {/* MESSAGES */}
                    <Link
                        to="/messages"
                        className={`menu-item ${
                            active === "MESSAGES" ? "active" : ""
                        }`}
                        onClick={() => {
                            setActive("MESSAGES");
                            handleChoose();
                            // setTimeout(() => {
                            //     setChoose(false);
                            // }, 2000);
                        }}
                        id="message-notification"
                    >
                        <span>
                            <UilChat className="sidebar-icon" />
                            <small
                                className="notification-count bg-danger"
                                style={{
                                    display: `${
                                        active === "MESSAGES" ? "none" : ""
                                    }`,
                                }}
                            >
                                6
                            </small>
                        </span>
                        <h3 className="ms-4">Messages</h3>
                    </Link>

                    {/* BOOKMARKS */}
                    <a
                        href=""
                        className={`menu-item ${
                            active === "BOOKMARKS" ? "active" : ""
                        }`}
                        onClick={() => {
                            setActive("BOOKMARKS");
                        }}
                    >
                        <span>
                            <UilBookmark className="sidebar-icon" />
                        </span>
                        <h3 className="ms-4">Bookmarks</h3>
                    </a>

                    {/* ANALYTICS */}
                    <a
                        href=""
                        className={`menu-item ${
                            active === "ANALYTICS" ? "active" : ""
                        }`}
                        onClick={() => {
                            setActive("ANALYTICS");
                        }}
                    >
                        <span>
                            <UilAnalysis className="sidebar-icon" />
                        </span>
                        <h3 className="ms-4">Analytics</h3>
                    </a>

                    {/* THEME */}
                    <div
                        className={`menu-item ${
                            active === "THEME" ? "active" : ""
                        }`}
                        id="theme"
                        onClick={() => {
                            setActive("THEME");
                        }}
                    >
                        <span>
                            <UilPalette className="sidebar-icon" />
                        </span>
                        <h3 className="ms-4">Theme</h3>
                    </div>

                    {/* SETTINGS */}
                    <div
                        className={`menu-item ${
                            active === "SETTINGS" ? "active" : ""
                        }`}
                        onClick={() => {
                            setActive("SETTINGS");
                        }}
                    >
                        <span>
                            <UilSetting className="sidebar-icon" />
                        </span>
                        <h3 className="ms-4">Settings</h3>
                    </div>
                </div>
                {/* END OF SIDEBAR */}

                <label
                    htmlFor="create-post"
                    className="btn btn-primary mt-3 py-3"
                >
                    Create Post
                </label>
            </div>

            {/* CUSTOMIZE THEME */}
            <div
                className="customize-theme"
                style={{ display: `${active === "THEME" ? "grid" : "none"}` }}
                onClick={() => setActive("")}
            >
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
            </div>
        </>
    );
};

export default Left;
