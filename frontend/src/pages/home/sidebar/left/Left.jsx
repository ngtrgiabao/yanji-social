import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

import "../../../../style/pages/home/sidebar/left/left.css";

// SETTINGS
import FontSizeTheme from "./custom-theme/fontsize-theme/FontSizeTheme";
import BackgroundTheme from "./custom-theme/background-theme/BackgroundTheme";
import ColorTheme from "./custom-theme/color-theme/ColorTheme";
import NotificationPopup from "./notification-popup/NotificationPopup";

import ProfilePic from "../../../../assets/avatar/profile-pic.png";

const Left = () => {
    const [active, setActive] = useState("HOME");
    const [avatar, setAvatar] = useState("");

    const [popup, setPopup] = useState(false);

    const handleNotification = () => {
        setPopup((popup) => !popup);
    };

    // CLEANUP URL WHEN CHANGE IMG
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    // SAVE IMG TO LOCAL
    useEffect(() => {
        avatar && window.localStorage.setItem("avatar", avatar);
    }, [avatar]);

    // GET IMG FROM LOCAL
    useEffect(() => {
        const data = window.localStorage.getItem("avatar");
        setAvatar(data);
    }, [avatar]);

    /*
    1. It’s using the useSelector hook to get the currentUser from the Redux store.
    2. It’s using the optional chaining operator to check if the currentUser is not null.
    3. It’s returning the currentUser.
    */
    const user = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const userID = useSelector((state) => {
        return state.auth.login.currentUser?.data._id;
    });

    const renderHomeBtn = () => {
        return (
            <Link
                to="/"
                className={`menu-item ${active === "HOME" ? "active" : ""}`}
                onClick={() => setActive("HOME")}
                title="Truy cập trang chủ"
            >
                <span>
                    <UilEstate className="sidebar-icon" />
                </span>
                <h3 className="ms-4">Home</h3>
            </Link>
        );
    };

    const renderExploreBtn = () => {
        return (
            <Link
                to="/explore"
                className={`menu-item ${active === "EXPLORE" ? "active" : ""}`}
                onClick={() => {
                    setActive("EXPLORE");
                }}
                title="Khám phá"
            >
                <span>
                    <UilCompass className="sidebar-icon" />
                </span>
                <h3 className="ms-4">Explore</h3>
            </Link>
        );
    };

    const renderNotificationBtn = () => {
        return (
            <div
                className={`menu-item ${
                    active === "NOTIFICATION" ? "active" : ""
                }`}
                onClick={() => {
                    setActive("NOTIFICATION");
                    handleNotification();
                }}
                id="notification"
                title="Thông báo"
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
                {popup && (
                    <div className="notification-popup animate__animated animate__fadeIn animate__fast">
                        <NotificationPopup />
                    </div>
                )}
            </div>
        );
    };

    const renderMessageBtn = () => {
        return (
            userID && (
                <Link
                    to="/messages"
                    className={`menu-item ${
                        active === "MESSAGES" ? "active" : ""
                    }`}
                    onClick={() => {
                        setActive("MESSAGES");
                    }}
                    id="message-notification"
                    title="Gửi tin nhắn"
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
            )
        );
    };

    const renderBookmarkBtn = () => {
        return (
            <Link
                to="/"
                className={`menu-item ${
                    active === "BOOKMARKS" ? "active" : ""
                }`}
                onClick={() => {
                    setActive("BOOKMARKS");
                }}
                title="Bài viết đã lưu"
            >
                <span>
                    <UilBookmark className="sidebar-icon" />
                </span>
                <h3 className="ms-4">Bookmarks</h3>
            </Link>
        );
    };

    const renderAnalyticsBtn = () => {
        return (
            <Link
                to="/"
                className={`menu-item ${
                    active === "ANALYTICS" ? "active" : ""
                }`}
                onClick={() => {
                    setActive("ANALYTICS");
                }}
                title="Phân tích dữ liệu cá nhân"
            >
                <span>
                    <UilAnalysis className="sidebar-icon" />
                </span>
                <h3 className="ms-4">Analytics</h3>
            </Link>
        );
    };

    const renderThemeBtn = () => {
        return (
            <div
                className={`menu-item ${active === "THEME" ? "active" : ""}`}
                id="theme"
                onClick={() => {
                    setActive("THEME");
                }}
                title="Đổi giao diện"
            >
                <span>
                    <UilPalette className="sidebar-icon" />
                </span>
                <h3 className="ms-4">Theme</h3>
            </div>
        );
    };

    const renderSettingBtn = () => {
        return (
            <div
                className={`menu-item ${active === "SETTINGS" ? "active" : ""}`}
                onClick={() => {
                    setActive("SETTINGS");
                }}
                title="Cài đặt"
            >
                <span>
                    <UilSetting className="sidebar-icon" />
                </span>
                <h3 className="ms-4">Settings</h3>
            </div>
        );
    };

    const renderCustomThemePopup = () => {
        return (
            <div
                className="customize-theme"
                style={{
                    display: `${active === "THEME" ? "grid" : "none"}`,
                }}
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
        );
    };

    return (
        <>
            <div className="left animate__animated animate__bounceInLeft">
                <Link
                    to={user ? `/user/${userID}` : "/"}
                    className="profile d-flex align-items-center"
                    title="Truy cập trang cá nhân"
                >
                    <div className="profile-pic">
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={user ? ProfilePic : avatar || ProfilePic}
                            alt="Avatar user"
                        />
                    </div>

                    <div className="handle">
                        <h4>{user ? `${user.username}` : `user`}</h4>
                        <p className="text-muted m-0">
                            @{user ? user.username : "user"}
                        </p>
                    </div>
                </Link>

                <div className="sidebar mt-3">
                    {renderHomeBtn()}
                    {renderExploreBtn()}
                    {renderNotificationBtn()}
                    {renderMessageBtn()}
                    {renderBookmarkBtn()}
                    {renderAnalyticsBtn()}
                    {renderThemeBtn()}
                    {renderSettingBtn()}
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
            {renderCustomThemePopup()}
        </>
    );
};

export default Left;
