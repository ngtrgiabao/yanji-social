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

import DEFAULT_AVATAR from "../../assets/background/default_bg_user.svg";
import { useDispatch, useSelector } from "react-redux";
import { getUserByID } from "../../redux/request/userRequest";
import { Link } from "react-router-dom";

const MessagesRight = () => {
    const [active, setActive] = useState("");
    const [isChoose, setIsChoose] = useState(false);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [friend, setFriend] = useState({
        id: "",
        username: "",
        profilePicture: "",
    });

    const currentRoom = useSelector((state) => {
        return state.room.room?.currentRoom;
    });
    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        let isCancelled = false;

        if (currentRoom && !isCancelled) {
            const roomData = currentRoom.data;

            if (roomData?._id) {
                const { participants, _id } = roomData;
                const friendID = participants.find(
                    (id) => id !== currentUser._id
                );

                setFriend((prevFriend) => ({
                    ...prevFriend,
                    id: friendID,
                }));

                setCurrentConversation(_id);
            }
        }

        return () => {
            isCancelled = true;
        };
    }, [currentRoom, currentUser._id]);

    const dispatch = useDispatch();

    useEffect(() => {
        let isCancelled = false;

        if (friend.id && !isCancelled) {
            getUserByID(friend.id, dispatch).then((data) => {
                const { username, profilePicture } = data.user;

                setFriend({
                    username: username,
                    profilePicture: profilePicture,
                });
            });
        }

        return () => {
            isCancelled = true;
        };
    }, [currentConversation, dispatch, friend]);

    const handleChoose = (setting) => {
        setActive(setting);
        setIsChoose((isChoose) => !isChoose);
    };

    const renderAvatarUser = () => {
        return (
            <div className="d-flex flex-column align-items-center mb-4">
                <div
                    className="right-container-header rounded rounded-circle overflow-hidden d-flex justify-content-center align-items-center fs-3 fw-bold"
                    style={{
                        background: "var(--color-primary)",
                    }}
                >
                    {friend.profilePicture ? (
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={friend.profilePicture}
                            alt="Avatar user"
                            className="w-100"
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <>{friend.username}</>
                    )}
                </div>
                <p className="mt-2 mb-0 fs-4 fw-bold">{friend.username}</p>
                <span className="opacity-75">Online 3mins ago</span>
            </div>
        );
    };

    const renderActionUser = () => {
        return (
            <div className="right-container-body d-flex justify-content-between fs-5">
                {/* PROFILE */}
                <Link
                    to={`/user/${friend.id}`}
                    className="d-flex flex-column align-items-center"
                >
                    <span
                        className="p-3 rounded-circle text-center mb-2 icon"
                        style={{ width: "4rem", height: "4rem" }}
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <span>Profile</span>
                </Link>
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
