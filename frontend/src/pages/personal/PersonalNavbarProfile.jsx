import { useEffect, useState, createElement } from "react";
import { UitEllipsisV } from "@iconscout/react-unicons-thinline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import {
    UilSearch,
    UilEye,
    UilExclamationTriangle,
    UilBookmark,
    UilClock,
    UilListUl,
    UilUserCircle,
} from "@iconscout/react-unicons";

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

const boxSettingProfileItems = [
    {
        id: 1,
        icon: UilEye,
        title: "See mode",
        handleClick: () => alert("hello"),
    },
    {
        id: 2,
        icon: UilSearch,
        title: "Search",
        handleClick: null,
    },
    {
        id: 3,
        icon: UilExclamationTriangle,
        title: "Account status",
        handleClick: null,
    },
    {
        id: 4,
        icon: UilBookmark,
        title: "Saved",
        handleClick: null,
    },
    {
        id: 5,
        icon: UilClock,
        title: "Stories saved",
        handleClick: null,
    },
    {
        id: 6,
        icon: UilListUl,
        title: "Dictionary",
        handleClick: null,
    },
    {
        id: 7,
        icon: UilUserCircle,
        title: "Setting profile and tag",
        handleClick: null,
    },
];

const PersonalNavbarProfile = () => {
    const [checked, setChecked] = useState(false);

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

    const handleClick = (e) => {
        e.stopPropagation();
        setChecked((checked) => !checked);
    };

    const renderSettingProfile = () => {
        return (
            <span
                className="btn btn-dots text-light d-flex align-items-center py-1 px-3 me-2"
                onClick={handleClick}
            >
                <UitEllipsisV className="dots" />
                {checked && (
                    <div className="box-setting-profile rounded-3">
                        <div className="p-3">
                            {boxSettingProfileItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="box-setting-profile-item d-flex align-items-center rounded-3 p-2"
                                    onClick={() => item.handleClick()}
                                >
                                    <span>
                                        {createElement(item.icon, {
                                            size: 20,
                                        })}
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
        );
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
