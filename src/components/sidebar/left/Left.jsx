import React, { useState } from "react";
import "./left.css";
import "animate.css";

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
import { NotificationData } from "../../data/NotificationData";
import { FontsizeData } from "../../data/FontSizeThemeData";
import { ColorData } from "../../data/ColorThemeData";
import { BackgroundThemeData } from "../../data/BackgroundThemeData";

const Left = () => {
    const [active, setActive] = useState("HOME");
    const [popup, setPopup] = useState(false);
    const root = document.documentElement;

    // CUSTOMIZE THEME
    const initFontsize = localStorage.getItem("fontsize") || "font-size-1";
    const [chooseFontSize, setChooseFontSize] = useState("");

    const initColor = localStorage.getItem("color_theme") || "color-1";
    const [chooseColor, setChooseColor] = useState(initColor);

    const initBackground = localStorage.getItem("background_theme") || "bg-1";
    const [chooseBackground, setChooseBackground] = useState("");

    const handlePopup = () => {
        setPopup((popup) => !popup);
    };

    const [choose, setChoose] = useState(false);

    const handleChoose = () => {
        setChoose((choose) => !choose);
    };

    const NotificationItem = (props) => {
        return (
            <div className="notification-item">
                <div className="profile-pic">
                    <img src={props.avatar} alt="" />
                </div>
                <div className="notification-body">
                    <b>{props.name}</b>
                    {props.notificationAlert}
                    <small className="text-muted">{props.time}</small>
                </div>
            </div>
        );
    };

    // CUSTOMIZE FONTSIZE THEME
    let fontSize = "";

    switch (initFontsize) {
        case "font-size-1":
            fontSize = "10px";
            root.style.setProperty("--sticky-top-left", "3.4rem");
            root.style.setProperty("--sticky-top-right", "3.4rem");
            root.style.fontSize = fontSize;

            break;

        case "font-size-2":
            fontSize = "13px";
            root.style.setProperty("--sticky-top-left", "3.4rem");
            root.style.setProperty("--sticky-top-right", "3.4rem");
            root.style.fontSize = fontSize;

            break;

        case "font-size-3":
            fontSize = "16px";
            root.style.setProperty("--sticky-top-left", "-2rem");
            root.style.setProperty("--sticky-top-right", "-17rem");
            root.style.fontSize = fontSize;

            break;

        case "font-size-4":
            fontSize = "19px";
            root.style.setProperty("--sticky-top-left", "-5rem");
            root.style.setProperty("--sticky-top-right", "-25rem");
            root.style.fontSize = fontSize;

            break;

        case "font-size-5":
            fontSize = "22px";
            root.style.setProperty("--sticky-top-left", "-12rem");
            root.style.setProperty("--sticky-top-right", "-35rem");
            root.style.fontSize = fontSize;
            break;
    }

    const handleFontSize = (e) => {
        if (e.currentTarget.classList.contains("font-size-1")) {
            const FontSizeClass = "font-size-1";
            localStorage.setItem("fontsize", FontSizeClass);

            setChooseFontSize("font-size-1");
        } else if (e.currentTarget.classList.contains("font-size-2")) {
            const FontSizeClass = "font-size-2";
            localStorage.setItem("fontsize", FontSizeClass);

            setChooseFontSize("font-size-2");
        } else if (e.currentTarget.classList.contains("font-size-3")) {
            const FontSizeClass = "font-size-3";
            localStorage.setItem("fontsize", FontSizeClass);

            setChooseFontSize("font-size-3");
        } else if (e.currentTarget.classList.contains("font-size-4")) {
            const FontSizeClass = "font-size-4";
            localStorage.setItem("fontsize", FontSizeClass);

            setChooseFontSize("font-size-4");
        } else if (e.currentTarget.classList.contains("font-size-5")) {
            const FontSizeClass = "font-size-5";
            localStorage.setItem("fontsize", FontSizeClass);

            setChooseFontSize("font-size-5");
        }

        root.style.fontSize = fontSize;
    };

    // CUSTOMIZE COLOR THEME
    switch (initColor) {
        case "color-1":
            root.style.setProperty("--primary-color-hue", "252");
            break;
        case "color-2":
            root.style.setProperty("--primary-color-hue", "52");
            break;
        case "color-3":
            root.style.setProperty("--primary-color-hue", "352");
            break;
        case "color-4":
            root.style.setProperty("--primary-color-hue", "202");
            break;
        case "color-5":
            root.style.setProperty("--primary-color-hue", "152");
            break;
    }

    const handleColor = (e) => {
        if (e.currentTarget.classList.contains("color-1")) {
            const colorClass = "color-1";
            localStorage.setItem("color_theme", colorClass);

            setChooseColor("color-1");
        } else if (e.currentTarget.classList.contains("color-2")) {
            const colorClass = "color-2";
            localStorage.setItem("color_theme", colorClass);

            setChooseColor("color-2");
        } else if (e.currentTarget.classList.contains("color-3")) {
            const colorClass = "color-3";
            localStorage.setItem("color_theme", colorClass);

            setChooseColor("color-3");
        } else if (e.currentTarget.classList.contains("color-4")) {
            const colorClass = "color-4";
            localStorage.setItem("color_theme", colorClass);

            setChooseColor("color-4");
        } else if (e.currentTarget.classList.contains("color-5")) {
            const colorClass = "color-5";
            localStorage.setItem("color_theme", colorClass);

            setChooseColor("color-5");
        }
    };

    // CUSTOMIZE BACKGROUND THEME
    switch (initBackground) {
        case "bg-1":
            root.style.setProperty("--dark-color-lightness", "17%");
            root.style.setProperty("--light-color-lightness", "95%");
            root.style.setProperty("--white-color-lightness", "100%");
            break;

        case "bg-2":
            root.style.setProperty("--dark-color-lightness", "95%");
            root.style.setProperty("--light-color-lightness", "20%");
            root.style.setProperty("--white-color-lightness", "15%");
            break;

        case "bg-3":
            root.style.setProperty("--dark-color-lightness", "95%");
            root.style.setProperty("--light-color-lightness", "10%");
            root.style.setProperty("--white-color-lightness", "0%");
            break;
    }

    const handleBackground = (e) => {
        if (e.currentTarget.classList.contains("bg-1")) {
            const backgroundClass = "bg-1";
            localStorage.setItem("background_theme", backgroundClass);

            setChooseBackground("bg-1");
        } else if (e.currentTarget.classList.contains("bg-2")) {
            const backgroundClass = "bg-2";
            localStorage.setItem("background_theme", backgroundClass);

            setChooseBackground("bg-2");
        } else if (e.currentTarget.classList.contains("bg-3")) {
            const backgroundClass = "bg-2";
            localStorage.setItem("background_theme", backgroundClass);

            setChooseBackground("bg-3");
        }
    };

    const SetFontsize = (props) => {
        return (
            <>
                <span
                    className={
                        props.fontSizeClass +
                        (chooseFontSize === props.fontSizeClass
                            ? " active"
                            : "")
                    }
                    onClick={handleFontSize}
                ></span>
            </>
        );
    };

    const SetColor = (props) => {
        return (
            <>
                <span
                    className={
                        props.colorClass +
                        (chooseColor === props.colorClass ? " active" : "")
                    }
                    onClick={handleColor}
                ></span>
            </>
        );
    };

    const SetBackground = (props) => {
        return (
            <>
                <div
                    className={
                        props.backgroundClass +
                        (chooseBackground === props.backgroundClass
                            ? " active"
                            : "")
                    }
                    onClick={handleBackground}
                >
                    <span></span>
                    <h5 htmlFor={props.backgroundClass}>{props.name}</h5>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="left">
                <a href="#" className="profile d-flex align-items-center">
                    <div className="profile-pic">
                        <img
                            src="https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                            alt=""
                        />
                    </div>

                    <div className="handle">
                        <h4>Diana Ayi</h4>
                        <p className="text-muted">@dayi</p>
                    </div>
                </a>

                <div className="sidebar mt-3">
                    {/* HOME */}
                    <a
                        href=""
                        className={`menu-item ${
                            active === "HOME" ? "active" : ""
                        }`}
                        onClick={() => setActive("HOME")}
                    >
                        <span>
                            <UilEstate className="sidebar-icon" />
                        </span>
                        <h3 className="ms-4">Home</h3>
                    </a>

                    {/* EXPLORE */}
                    <a
                        href=""
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
                    </a>

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
                            {NotificationData.map((item, index) => (
                                <NotificationItem
                                    key={item.id}
                                    avatar={item.avatar}
                                    name={item.name}
                                    notificationAlert={item.notificationAlert}
                                    time={item.time}
                                ></NotificationItem>
                            ))}
                        </div>
                    </div>

                    {/* MESSAGES */}
                    <div
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
                    </div>

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

            <div
                className="customize-theme"
                style={{ display: `${active !== "THEME" ? "none" : "grid"}` }}
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

                    {/* FONT SIZES */}
                    <div className="font-size">
                        <h4>Font Size</h4>
                        <div>
                            <h6>Aa</h6>
                            <div className="choose-size d-flex justify-content-between align-items-center">
                                {FontsizeData.map((item, index) => (
                                    <SetFontsize
                                        key={item.id}
                                        fontSizeClass={item.fontSizeClass}
                                    />
                                ))}
                            </div>
                            <h3>Aa</h3>
                        </div>
                    </div>

                    {/* PRIMARY COLORS */}
                    <div className="color">
                        <h4>Color</h4>
                        <div className="choose-color d-flex justify-content-between align-items-center">
                            {ColorData.map((item, index) => (
                                <SetColor
                                    key={item.id}
                                    colorClass={item.colorClass}
                                />
                            ))}
                        </div>
                    </div>

                    {/* BACKGROUND COLORS */}
                    <div className="background">
                        <h4>Background</h4>
                        <div className="choose-bg d-flex justify-content-between align-items-center">
                            {BackgroundThemeData.map((item, index) => (
                                <SetBackground
                                    key={item.id}
                                    backgroundClass={item.backgroundClass}
                                    name={item.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Left;
