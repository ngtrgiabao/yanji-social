import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import "../../style/pages/home/homeLeft.css";

import DEFAULT_AVATAR from "../../assets/background/default_bg_user.svg";

import { getUserByID } from "../../redux/request/userRequest";

// SETTINGS
import FontSizeTheme from "./customTheme/FontSizeTheme";
import BackgroundTheme from "./customTheme/BackgroundTheme";
import ColorTheme from "./customTheme/ColorTheme";
import PostPopup from "../../components/PostPopup";
import { io } from "socket.io-client";

const HomeLeft = ({ socket, isReadNotification }) => {
    const [active, setActive] = useState("HOME");
    const [avatar, setAvatar] = useState("");
    const [popup, setPopup] = useState(false);
    const [user, setUser] = useState({
        _id: "",
        profilePicture: "",
        username: "",
    });
    const dispatch = useDispatch();

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

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
    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        currentUser &&
            getUserByID(currentUser._id, dispatch).then((data) => {
                const { _id, profilePicture, username } = data.user;
                setUser({
                    _id: _id,
                    profilePicture: profilePicture,
                    username: username,
                });
            });
    }, [currentUser, dispatch]);

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
            <Link
                to="/notification"
                className={`menu-item ${
                    active === "NOTIFICATION" ? "active" : ""
                }`}
                onClick={() => {
                    setActive("NOTIFICATION");
                }}
                id="notification"
                title="Thông báo"
            >
                <span>
                    <UilBell className="sidebar-icon" />
                    {isReadNotification && (
                        <small
                            className="notification-count bg-danger"
                            style={{
                                display: `${
                                    active === "NOTIFICATION" ? "none" : ""
                                }`,
                            }}
                        ></small>
                    )}
                </span>
                <h3 className="ms-4">Notification</h3>
            </Link>
        );
    };

    const renderMessageBtn = () => {
        return (
            currentUser?._id && (
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
                        {/* <small
                            className="notification-count bg-danger"
                            style={{
                                display: `${
                                    active === "MESSAGES" ? "none" : ""
                                }`,
                            }}
                        ></small> */}
                    </span>
                    <h3 className="ms-4">Messages</h3>
                </Link>
            )
        );
    };

    const renderBookmarkBtn = () => {
        return (
            <Link
                to="/bookmarks"
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
                hidden={active !== "THEME"}
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

    const handlePopup = () => {
        setPopup((popup) => !popup);
    };

    const renderPostPopup = () => {
        return (
            currentUser?._id &&
            popup && (
                <PostPopup
                    socket={socket}
                    onPopup={handlePopup}
                    extendClass="animate__animated animate__fadeIn"
                />
            )
        );
    };

    const handleSocket = {
        follow: useCallback(async (data) => {
            const { userRoute } = data;

            // if (userRoute === currentUser._id) {
            //     alert("hello");
            // }
        }, []),
    };

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.on("followed", handleSocket.follow);

        return () => {
            socket.off("followed", handleSocket.follow);
        };
    }, [SOCKET_URL, handleSocket.follow]);

    return (
        <>
            <div className="left animate__animated animate__bounceInLeft">
                <Link
                    to={currentUser ? `/user/${user._id}` : "/"}
                    className="profile d-flex align-items-center"
                    title="Truy cập trang cá nhân"
                >
                    <div className="profile-pic">
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={
                                currentUser
                                    ? user.profilePicture || DEFAULT_AVATAR
                                    : DEFAULT_AVATAR
                            }
                            alt="Avatar user"
                            className="w-100"
                        />
                    </div>

                    <div className="handle">
                        <h4>{currentUser ? `${user.username}` : `user`}</h4>
                        <p className="text-muted m-0">
                            @{currentUser ? user.username : "user"}
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
                    onClick={handlePopup}
                >
                    Create Post
                </label>
            </div>

            {renderCustomThemePopup()}
            {renderPostPopup()}
        </>
    );
};

export default HomeLeft;
