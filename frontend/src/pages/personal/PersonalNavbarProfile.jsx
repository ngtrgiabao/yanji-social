import { useEffect, useState, useRef } from "react";
import { UitEllipsisV } from "@iconscout/react-unicons-thinline";
import {
    faCaretDown,
    faFileArrowDown,
    faBookmark,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../style/pages/personal/personalNavbarProfile.css";

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

const PersonalNavbarProfile = () => {
    const [checked, setChecked] = useState(false);
    const exportData = useRef(null);
    const navigate = useNavigate();

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handleExportData = () => {
        exportData.current.link.click();
    };

    const handleVisitSavedPost = () => {
        navigate("/bookmarks");
    };

    const boxSettingProfileItems = [
        {
            icon: faFileArrowDown,
            title: "Export Data",
            handleClick: handleExportData,
        },
        {
            icon: faBookmark,
            title: "Saved",
            handleClick: handleVisitSavedPost,
        },
        {
            icon: faUserCircle,
            title: "Setting profile",
            handleClick: null,
        },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".box-setting-profile")) {
                setChecked(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleSettingPersonalPage = (e) => {
        e.stopPropagation();
        setChecked((checked) => !checked);
    };

    const renderSettingProfile = () => {
        return (
            <span
                className="btn btn-dots text-light d-flex align-items-center py-1 px-3 me-2"
                onClick={(e) => handleSettingPersonalPage(e)}
            >
                <UitEllipsisV className="dots" />
                {checked && (
                    <div className="box-setting-profile rounded-3">
                        <div className="p-3">
                            {boxSettingProfileItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="box-setting-profile-item d-flex align-items-center rounded-3 p-2 px-3"
                                    onClick={() => item.handleClick()}
                                >
                                    <FontAwesomeIcon
                                        className="fs-3"
                                        icon={item.icon}
                                    />
                                    <p className="ms-3 my-3 fs-4 fw-bold">
                                        {item.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </span>
        );
    };

    const csvData = [
        ["username", "password", "email"],
        [currentUser.username, currentUser.password, currentUser.email],
    ];

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
                                    <a
                                        href="#"
                                        className={`${
                                            item.id === 1 ? "active" : ""
                                        }`}
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}

                            {/* Export user data */}
                            <CSVLink
                                ref={exportData}
                                data={csvData}
                                filename={`${currentUser.username}-data.csv`}
                                target="_blank"
                                style={{ display: "none" }}
                            />

                            <li className="nav-item dropdown">
                                <a href="#" data-bs-toggle="dropdown">
                                    More
                                    <FontAwesomeIcon
                                        icon={faCaretDown}
                                        className="ms-2"
                                    />
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
                {renderSettingProfile()}
            </div>
        </>
    );
};

export default PersonalNavbarProfile;
