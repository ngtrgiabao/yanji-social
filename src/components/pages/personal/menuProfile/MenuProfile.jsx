import React, { useState } from "react";
import { UitEllipsisV } from "@iconscout/react-unicons-thinline";
import {
    UilSearch,
    UilEye,
    UilExclamationTriangle,
    UilBookmark,
    UilClock,
    UilListUl,
    UilUserCircle,
} from "@iconscout/react-unicons";

import "./menuProfile.css";
function MenuProfile() {
    const menuItems = [
        {
            id: 1,
            title: "Post",
        },
        {
            id: 2,
            title: "Introduce",
        },
        {
            id: 3,
            title: "Friends",
        },
        {
            id: 4,
            title: "Picture",
        },
        {
            id: 5,
            title: "Video",
        },
        {
            id: 6,
            title: "Checkin",
        },
    ];

    const boxSettingProfileItems = [
        {
            id: 1,
            icon: UilEye,
            title: "See mode",
        },
        {
            id: 2,
            icon: UilSearch,
            title: "Search",
        },
        {
            id: 3,
            icon: UilExclamationTriangle,
            title: "Account status",
        },
        {
            id: 4,
            icon: UilBookmark,
            title: "Saved",
        },
        {
            id: 5,
            icon: UilClock,
            title: "Stories saved",
        },
        {
            id: 6,
            icon: UilListUl,
            title: "Dictionary",
        },
        {
            id: 7,
            icon: UilUserCircle,
            title: "Setting profile and tag",
        },
    ];

    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        setChecked((checked) => !checked);
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <nav className="navbar menu-list navbar-expand-lg ">
                    <div
                        className="d-flex flex-row navbar-collapse"
                        id="main_nav"
                    >
                        <ul className="navbar-nav d-flex align-items-center flex-row">
                            {menuItems.map((item) => (
                                <li key={item.id} className="nav-item">
                                    <a href="#">{item.title}</a>
                                </li>
                            ))}
                            <li className="nav-item dropdown">
                                <a href="#" data-bs-toggle="dropdown">
                                    More
                                </a>
                                <ul className="dropdown-menu rounded-3">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Book
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Sports
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Movies
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>

                <span
                    className="btn text-light d-flex align-items-center py-1 px-3 me-2"
                    onClick={handleClick}
                >
                    <UitEllipsisV className="dots" />
                    {checked && (
                        <div className="box-setting-profile rounded-3">
                            <div className="p-3">
                                {boxSettingProfileItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="box-setting-profile-item d-flex align-items-center  rounded-3 p-2"
                                    >
                                        <span>
                                            <item.icon size={20} />
                                        </span>
                                        <p className="ms-3 my-3 fs-4 fw-bold">
                                            {item.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </span>
            </div>
        </>
    );
}

export default MenuProfile;
