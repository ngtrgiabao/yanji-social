import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faHeart as liked, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../style/components/notificationCard.css";

import {
    COMMENT_POST,
    LIKE_POST,
    SHARE_POST,
} from "../constants/noti.type.constant";

import { getUserByID } from "../redux/request/userRequest";
import { getNotificationByID } from "../redux/request/notificationRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";
import UserInfoPopup from "./UserInfoPopup";

const NotificationCard = ({ sender, type, createdAt }) => {
    const [notiInfo, setNotiInfo] = useState({
        senderName: "",
        profilePicture: "",
    });
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();
    const formatTime = useTimeAgo;

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
            className="fs-4 animate__animated animate__fadeIn d-flex align-items-center border-bottom border-dark p-3 position-relative"
            style={{
                background: "var(--color-primary)",
                color: "var(--color-dark)",
                width: "45%",
                minHeight: "5.5rem",
                zIndex: "1",
            }}
        >
            {notiInfo.senderName ? (
                <div className="w-100">
                    <div
                        className="d-flex align-items-center justify-content-between mb-4"
                        data-title
                    >
                        <div
                            style={{
                                color: "var(--color-dark)",
                            }}
                            className="d-flex align-items-center fw-bold w-100"
                        >
                            {(() => {
                                switch (parseInt(type, 10)) {
                                    case LIKE_POST:
                                        return <FontAwesomeIcon icon={liked} />;
                                    case COMMENT_POST:
                                        return (
                                            <FontAwesomeIcon icon={faComment} />
                                        );
                                    case SHARE_POST:
                                        return (
                                            <FontAwesomeIcon icon={faRepeat} />
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
                                    <img src={notiInfo.profilePicture} alt="" />
                                </Link>
                                <div>{formatTime(createdAt)}</div>
                            </div>
                        </div>
                    </div>

                    <div data-content>
                        <Link
                            to={"/user/" + sender}
                            className="fw-bold me-1 sender-notification"
                            onMouseOver={() => setIsActive(true)}
                            onMouseLeave={() => setIsActive(false)}
                        >
                            {notiInfo.senderName}
                        </Link>
                        {(() => {
                            switch (parseInt(type, 10)) {
                                case LIKE_POST:
                                    return "liked your post";
                                case COMMENT_POST:
                                    return "commented on your post";
                                case SHARE_POST:
                                    return "shared your post";
                                default:
                                    return "";
                            }
                        })()}
                    </div>
                </div>
            ) : (
                <>Loading...</>
            )}

            {isActive && <UserInfoPopup userID={sender} />}
        </div>
    );
};

export default NotificationCard;
