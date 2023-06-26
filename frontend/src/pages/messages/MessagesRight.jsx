import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faBellSlash,
    faBell,
} from "@fortawesome/free-regular-svg-icons";
import {
    faMagnifyingGlass,
    faCaretDown,
    faFont,
    faPhotoFilm,
    faFile,
    faLink,
    faCommentSlash,
    faUserXmark,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import "../../style/pages/messages/messagesRight.css";

import Photo from "../../assets/avatar/profile-pic.png";
import { useSelector } from "react-redux";

const MessagesRight = () => {
    const [active, setActive] = useState("");
    const [isChoose, setIsChoose] = useState(false);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [titleConversation, setTitleConversation] = useState(null);

    const currentRoom = useSelector((state) => {
        return state.room.room?.currentRoom;
    });

    useEffect(() => {
        let isCancelled = false;

        if (currentRoom && !isCancelled) {
            const roomData = currentRoom.data;

            if (roomData && roomData._id) {
                const value = roomData._id;

                setCurrentConversation(value);
            }
        }

        return () => {
            isCancelled = true;
        };
    }, [currentRoom]);

    const friendName = useSelector((state) => {
        return state.user.user.currentUser?.user;
    });

    useEffect(() => {
        let isCancelled = false;

        if (friendName && !isCancelled) {
            if (friendName._id) {
                const value = friendName.username;

                setTitleConversation(value);
            }
        }

        return () => {
            isCancelled = true;
        };
    }, [currentConversation]);

    const handleChoose = (setting) => {
        setActive(setting);
        setIsChoose((isChoose) => !isChoose);
    };

    const renderAvatarUser = () => {
        return (
            <div className="right-container-header d-flex flex-column align-items-center mb-4">
                <img
                    loading="lazy"
                    role="presentation"
                    decoding="async"
                    src={Photo}
                    alt="Avatar user"
                    className="rounded-circle right-avatar-chat"
                />
                <p className="mt-2 mb-0 fs-4 fw-bold">{titleConversation}</p>
                <span className="opacity-75">Online 3mins ago</span>
            </div>
        );
    };

    const renderActionUser = () => {
        return (
            <div className="right-container-body d-flex justify-content-between fs-5">
                {/* PROFILE */}
                <div className="d-flex flex-column align-items-center">
                    <span
                        className="p-3 rounded-circle text-center mb-2 icon"
                        style={{ width: "4rem", height: "4rem" }}
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <span>Profile</span>
                </div>
                {/* TURN OFF NOTIFICATION */}
                <div className="d-flex flex-column align-items-center">
                    <span
                        className="p-3 rounded-circle text-center mb-2 icon"
                        style={{ width: "4rem", height: "4rem" }}
                    >
                        <FontAwesomeIcon icon={faBellSlash} />
                    </span>
                    <span>Turn off notification</span>
                </div>
                {/* SEARCH */}
                <div className="d-flex flex-column align-items-center">
                    <span
                        className="p-3 rounded-circle text-center mb-2 icon"
                        style={{ width: "4rem", height: "4rem" }}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <span>Search</span>
                </div>
            </div>
        );
    };

    const renderSettingChat = () => {
        return (
            <div
                className="d-flex justify-content-between fs-4 mb-0 p-3 drop-menu"
                onClick={() => {
                    handleChoose("SETTING-CHAT");
                }}
            >
                <p className="mb-0">Setting this chat</p>
                <span>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        style={{
                            transform: `${
                                active === "SETTING-CHAT" && isChoose
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)"
                            }`,
                        }}
                    />
                </span>
            </div>
        );
    };

    const renderSubSettingChat = () => {
        return (
            isChoose &&
            active === "SETTING-CHAT" && (
                <ul className="ps-0 fs-4 ms-4">
                    <li className="drop-menu-item p-3">
                        <div>
                            <span className="icon">😃</span>
                            <span>Change emotion</span>
                        </div>
                    </li>
                    <li className="drop-menu-item p-3">
                        <div>
                            <span className="icon">
                                <FontAwesomeIcon icon={faFont} />
                            </span>
                            <span>Change nickname</span>
                        </div>
                    </li>
                    <li className="drop-menu-item p-3">
                        <div>
                            <span className="icon">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                            <span>Search in chat</span>
                        </div>
                    </li>
                </ul>
            )
        );
    };

    const renderViewFile = () => {
        return (
            <div
                className="d-flex justify-content-between fs-4 mb-0 p-3 drop-menu"
                onClick={() => {
                    handleChoose("SETTING-FILE");
                }}
            >
                <p className="mb-0">Videos, files and links</p>
                <span>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        style={{
                            transform: `${
                                active === "SETTING-FILE" && isChoose
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)"
                            }`,
                        }}
                    />
                </span>
            </div>
        );
    };

    const renderSubViewFile = () => {
        return (
            isChoose &&
            active === "SETTING-FILE" && (
                <ul className="ps-0 fs-4 ms-3">
                    <li className="drop-menu-item p-3">
                        <div>
                            <span className="icon">
                                <FontAwesomeIcon icon={faPhotoFilm} />
                            </span>
                            <span>Media</span>
                        </div>
                    </li>
                    <li className="drop-menu-item p-3">
                        <div>
                            <span className="icon">
                                <FontAwesomeIcon icon={faFile} />
                            </span>
                            <span>File</span>
                        </div>
                    </li>
                    <li className="drop-menu-item p-3">
                        <div>
                            <span className="icon">
                                <FontAwesomeIcon icon={faLink} />
                            </span>
                            <span>Links</span>
                        </div>
                    </li>
                </ul>
            )
        );
    };

    const renderSettingPrivateAndPrivacy = () => {
        return (
            <div
                className="d-flex justify-content-between fs-4 mb-0 p-3 drop-menu"
                onClick={() => {
                    handleChoose("SETTING-PRIVATE");
                }}
            >
                <p className="mb-0">Private and support</p>
                <span>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        style={{
                            transform: `${
                                active === "SETTING-PRIVATE" && isChoose
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)"
                            }`,
                        }}
                    />
                </span>
            </div>
        );
    };
    
    const renderSubSettingPrivateAndPrivacy = () => {
        return (
            isChoose &&
            active === "SETTING-PRIVATE" && (
                <ul className="ps-0 fs-4 ms-3">
                    <li className="drop-menu-item p-3">
                        <div>
                            <span className="icon">
                                <FontAwesomeIcon icon={faBell} />
                            </span>
                            <span>Turn off notification</span>
                        </div>
                    </li>
                    <li className="drop-menu-item p-3">
                        <div>
                            <span className="icon">
                                <FontAwesomeIcon icon={faCommentSlash} />
                            </span>
                            <span>Delete chat</span>
                        </div>
                    </li>
                    <li className="drop-menu-item p-3">
                        <div>
                            <span className="icon">
                                <FontAwesomeIcon icon={faUserXmark} />
                            </span>
                            <span>Block user</span>
                        </div>
                    </li>
                    <li className="drop-menu-item p-3">
                        <div>
                            <span className="icon">
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                            </span>
                            <span>Report</span>
                        </div>
                    </li>
                </ul>
            )
        );
    };

    return (
        currentConversation && (
            <div className="right-msg-page p-4">
                <div className="right-container scrollbar d-flex flex-column align-items-center">
                    {renderAvatarUser()}
                    {renderActionUser()}
                    <div className="right-container-footer mt-4 d-flex flex-column justify-content-center ps-0">
                        <>
                            {renderSettingChat()}
                            {renderSubSettingChat()}
                        </>
                        <>
                            {renderViewFile()}
                            {renderSubViewFile()}
                        </>
                        <>
                            {renderSettingPrivateAndPrivacy()}
                            {renderSubSettingPrivateAndPrivacy()}
                        </>
                    </div>
                </div>
            </div>
        )
    );
};

export default MessagesRight;
