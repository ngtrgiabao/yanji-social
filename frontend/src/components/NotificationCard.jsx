import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { faComment, faUser } from "@fortawesome/free-regular-svg-icons";
import {
    faHeart as liked,
    faRepeat,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style/notificationCard.css";

import {
    COMMENT_POST,
    LIKE_POST,
    SHARE_POST,
    NEW_FOLLOWER,
    NEW_MSG,
} from "../constants/noti.type.constant";

import { getUserByID } from "../redux/request/userRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";

const NotificationCard = ({ sender, type, isRead, createdAt }) => {
    const [notiInfo, setNotiInfo] = useState({
        senderName: "",
        profilePicture: "",
    });
    const dispatch = useDispatch();
    const formatTypeNotification = parseInt(type, 10);
    const formatTime = useTimeAgo;
    const navigate = useNavigate();

    const handleDirectlyLink = (link) => {
        navigate(link);
    };

    const handleNotificationClick = () => {
        if (!isRead && formatTypeNotification === NEW_MSG) {
            handleDirectlyLink("/messages");
        }
    };

    useEffect(() => {
        let isCancelled = false;

        getUserByID(sender, dispatch).then((data) => {
            if (!isCancelled) {
                const { username, profilePicture } = data.user;

                setNotiInfo({
                    senderName: username,
                    profilePicture: profilePicture,
                });
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [sender, dispatch]);

    return (
        <div
            className={`fs-4 animate__animated animate__fadeIn d-flex align-items-center p-3 position-relative ${
                !isRead && "bg-dark text-white"
            } my-2`}
            style={{
                color: "var(--color-dark)",
                width: "45%",
                minHeight: "5.5rem",
                border: "1px solid",
                borderRadius: "0.5rem",
            }}
            onClick={() => handleNotificationClick()}
            data-card
        >
            <div className="w-100" data-content>
                <div
                    className="d-flex align-items-center justify-content-between mb-4"
                    data-title
                >
                    <div
                        style={{
                            color: "var(--color-dark)",
                        }}
                        className={`d-flex align-items-center fw-bold w-100 ${
                            !isRead && "bg-dark text-white"
                        }`}
                    >
                        {(() => {
                            switch (formatTypeNotification) {
                                case LIKE_POST:
                                    return <FontAwesomeIcon icon={liked} />;
                                case COMMENT_POST:
                                    return <FontAwesomeIcon icon={faComment} />;
                                case SHARE_POST:
                                    return (
                                        <FontAwesomeIcon
                                            style={{
                                                transform: "rotate(90deg)",
                                            }}
                                            icon={faRepeat}
                                        />
                                    );
                                case NEW_FOLLOWER:
                                    return <FontAwesomeIcon icon={faUser} />;
                                case NEW_MSG:
                                    return (
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    );
                                default:
                                    return "";
                            }
                        })()}
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <Link
                                to={"/user/" + sender}
                                className="profile-pic ms-3"
                            >
                                <img
                                    loading="lazy"
                                    role="presentation"
                                    decoding="async"
                                    src={notiInfo.profilePicture}
                                    alt="Avatar user"
                                    className="w-100"
                                />
                            </Link>
                            <div>{formatTime(createdAt)}</div>
                        </div>
                    </div>
                </div>

                <div data-content>
                    <Link
                        to={"/user/" + sender}
                        className={`fw-bold me-1 sender-notification ${
                            !isRead && "bg-dark text-white"
                        }`}
                    >
                        {notiInfo.senderName}
                    </Link>
                    {(() => {
                        switch (formatTypeNotification) {
                            case LIKE_POST:
                                return "liked your post";
                            case COMMENT_POST:
                                return "commented on your post";
                            case SHARE_POST:
                                return "shared your post";
                            case NEW_FOLLOWER:
                                return "followed you";
                            case NEW_MSG:
                                return "sent you a message";
                            default:
                                return "";
                        }
                    })()}
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;
