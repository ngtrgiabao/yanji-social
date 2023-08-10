import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck as seenIcon,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
    faCircleCheck as unseenIcon,
    faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

import { useTimeAgo } from "../hooks/useTimeAgo";

const Message = ({
    sender,
    onUpdateMsg,
    onDeleteMsg,
    onPreviewImage,
    content,
    media,
    createdAt,
    updatedAt,
    loadingMsg,
}) => {
    const formatTime = useTimeAgo;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    return sender === currentUser._id ? (
        <div
            className="middle-container-body__right-text mb-3 fs-4 animate__animated animate__slideInRight d-flex align-items-end flex-column"
            data-title="current_user"
        >
            <div className="d-flex align-items-center justify-content-end w-100">
                <span
                    className="action-message fs-5"
                    onClick={onUpdateMsg}
                    style={{
                        cursor: "pointer",
                        width: "2.3rem",
                        height: "2.3rem",
                    }}
                    aria-label="Chỉnh sửa"
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </span>
                <span
                    className="action-message fs-5 text-danger"
                    onClick={onDeleteMsg}
                    style={{
                        cursor: "pointer",
                        width: "2.3rem",
                        height: "2.3rem",
                    }}
                    aria-label="Xóa"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </span>
                <div className="middle-container-body__right-message-content ms-2">
                    {media ? (
                        <img
                            src={media}
                            alt="image_uploaded"
                            onClick={onPreviewImage}
                        />
                    ) : (
                        <div className="middle-container-body__right-message-content-text">
                            {content}
                        </div>
                    )}
                </div>
            </div>
            <div className="middle-container-body__right-time">
                {formatTime(createdAt) || "now"}
                {createdAt !== updatedAt && (
                    <> - edited {formatTime(updatedAt)}</>
                )}
                {/* {message.isRead ? (
                            <FontAwesomeIcon className="ms-1" icon={seenIcon} />
                        ) : (
                            <FontAwesomeIcon
                                className="ms-1"
                                icon={unseenIcon}
                            />
                        )} */}
            </div>
        </div>
    ) : (
        <div
            className="middle-container-body__left-text mb-3 fs-4 animate__animated animate__slideInLeft d-flex flex-column"
            data-title="friend"
        >
            <div className="d-flex justify-content-start align-items-center w-100">
                <span className="middle-container-body__left-message-content me-2 overflow-hidden">
                    {loadingMsg ? (
                        "Loading message..."
                    ) : (
                        <>
                            {media ? (
                                <img
                                    src={media}
                                    alt="image_uploaded"
                                    onClick={onPreviewImage}
                                />
                            ) : (
                                <div className="middle-container-body__left-message-content-text">
                                    {content}
                                </div>
                            )}
                        </>
                    )}
                </span>
            </div>
            <div className="middle-container-body__left-time">
                {formatTime(createdAt) || "now"}
            </div>
        </div>
    );
};

export default Message;
