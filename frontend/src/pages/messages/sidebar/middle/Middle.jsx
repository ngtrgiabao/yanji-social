import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faVideo,
    faPhone,
    faCircleInfo,
    faPlus,
    faImage,
    faFaceLaughBeam,
    faThumbsUp,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

import "../../../../style/pages/messages/middle/middle.css";

import Photo from "../../../../assets/avatar/profile-pic.png";

import { SOCKET_URL } from "../../../../constants/backend.url.constant";

import {
    sendMessage,
    getMessagesByRoomID,
    deleteMessage,
} from "../../../../redux/request/messageRequest";

const Middle = () => {
    const [message, setMessage] = useState("");
    const [active, setActive] = useState(false);
    const [messageThread, setMessageThread] = useState([]);
    const [messageID, setMessageID] = useState("");
    const scrollRef = useRef();
    const dispatch = useDispatch();

    const socketRef = useRef(null);
    if (!socketRef.current) {
        socketRef.current = io(SOCKET_URL);
    }
    const socket = socketRef.current;

    const sender = useSelector((state) => {
        return state.auth.login.currentUser?.data._id;
    });

    useEffect(() => {
        socket.emit("client", {
            msg: "Hello from client 😀",
        });

        socket.on("server", (data) => {
            console.log(data);
        });

        socket.on("receive-message", (data) => {
            setMessageThread((prevMessageThread) => [
                ...prevMessageThread,
                data,
            ]);
        });

        socket.on("disconnect", () => {
            console.log("Server disconnected :<");
        });
    }, [socket]);

    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}`;

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMessage = {
            sender,
            message,
            time,
            roomId: "6461eed0ccade08bb3c5329f",
        };

        sendMessage(newMessage, dispatch)
            .then(async () => {
                if (message) {
                    await socket.emit("send-message", newMessage);
                    setMessage("");
                }
            })
            .catch((error) => {
                alert("Failed to send message");
                console.error("Failed to send message", error);
            });
    };

    // FIX
    useEffect(() => {
        getMessagesByRoomID("6461eed0ccade08bb3c5329f", dispatch)
            .then((data) => {
                Object.keys(data).forEach((key) => {
                    if (key === "messages") {
                        const value = data[key];
                        setMessageThread(value);
                    }
                });
            })
            .catch((error) => {
                console.error("Failed to get messages", error);
            });
    }, []);

    const handleDeleteMsg = () => {
        deleteMessage(messageID, dispatch)
            .then(() => {
                setMessageThread((prevMessageThread) =>
                    prevMessageThread.filter(
                        (message) => message._id !== messageID
                    )
                );
            })
            .catch((error) => {
                alert("Failed to delete message :<", error);
                console.error("Failed to delete message");
            });

        setActive(false);
    };

    const handlePopup = () => {
        setActive((active) => !active);
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messageThread]);

    const renderMessages = () => {
        return messageThread.map((message, index) =>
            message.sender === sender ? (
                <div
                    key={index}
                    className="middle-container-body__right-text mb-2 fs-4 animate__animated animate__slideInRight d-flex align-items-end flex-column"
                >
                    <div className="d-flex align-items-center justify-content-end w-100">
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger"
                            onClick={() => {
                                setMessageID(message._id);
                                handlePopup();
                            }}
                            style={{
                                cursor: "pointer",
                            }}
                        />
                        <span className="middle-container-body__right-message-content ms-3">
                            {message.message}
                        </span>
                    </div>
                    <div className="middle-container-body__right-time">
                        {time}
                    </div>
                </div>
            ) : (
                <div
                    key={index}
                    className="middle-container-body__left-text mb-2 fs-4 animate__animated animate__slideInLeft d-flex flex-column"
                >
                    <div className="d-flex justify-content-start align-items-center w-100">
                        <span className="middle-container-body__left-message-content me-2">
                            {message.message}
                        </span>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger"
                            onClick={() => {
                                setMessageID(message._id);
                                handlePopup();
                            }}
                            style={{
                                cursor: "pointer",
                            }}
                        />
                    </div>
                    <div className="middle-container-body__left-time">
                        {time}
                    </div>
                </div>
            )
        );
    };

    const confirmPopup = () => {
        return (
            <div id="confirm" className="p-4" role="document" hidden={!active}>
                <div className="d-flex justify-content-between align-items-center fs-3 border-bottom text-white">
                    <div className="fw-bold text-uppercase">
                        Xác nhận xóa tin nhắn này
                    </div>
                    <span
                        className="fs-1 close p-1"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => handlePopup()}
                    >
                        &times;
                    </span>
                </div>
                <span className="py-4 pb-5 d-block fs-3 text-white">
                    Bạn muốn xóa tin nhắn này?
                </span>
                <div className="fs-3 d-flex justify-content-end">
                    <button
                        className="py-2 p-4 me-2"
                        onClick={() => handlePopup()}
                    >
                        Close
                    </button>
                    <button
                        className="py-2 p-4 fw-bold text-white bg-danger"
                        onClick={() => handleDeleteMsg()}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="middle-msg-page relative">
                <div className="middle-container">
                    {/* HEADER */}
                    <div className="middle-container-header d-flex align-items-center justify-content-between py-3 px-4 pb-3">
                        <div className="d-flex align-items-center">
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={Photo}
                                alt="Avatar user"
                                className="rounded-circle middle-avatar-chat"
                            />
                            <span className="ms-2 fs-4 fw-bold">Yanji</span>
                        </div>
                        <div className="d-flex fs-4">
                            <span
                                aria-label="Gọi điện"
                                className="icon d-flex justify-content-center align-items-center rounded-circle"
                            >
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <span
                                aria-label="Gọi video"
                                className="icon d-flex justify-content-center align-items-center rounded-circle mx-4"
                            >
                                <FontAwesomeIcon icon={faVideo} />
                            </span>
                            <span
                                aria-label="Xem thêm thông tin"
                                className="icon d-flex justify-content-center align-items-center rounded-circle"
                            >
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </span>
                        </div>
                    </div>
                    {/* BODY */}
                    <div className="middle-container-body scrollbar px-4 pt-4 fs-3">
                        {renderMessages()}
                        <div ref={scrollRef} />
                    </div>
                    {/* FOOTER */}
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                        className="middle-container-footer p-4 d-flex justify-content-between align-items-center"
                    >
                        <div className="d-flex justify-content-between">
                            <span
                                className="icon fs-3"
                                aria-label="Mở hành động khác"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            <span
                                className="icon fs-3 mx-3"
                                aria-label="Đính kèm file"
                            >
                                <FontAwesomeIcon icon={faImage} />
                            </span>
                            <span className="icon fs-3" aria-label="Chọn emoji">
                                <FontAwesomeIcon icon={faFaceLaughBeam} />
                            </span>
                        </div>

                        <div className="user-input-chat">
                            <input
                                type="text"
                                className="rounded py-2 px-3 fs-4"
                                placeholder="Text your message here..."
                                maxLength="3500"
                                style={{
                                    border: "1px solid var(--color-primary)",
                                }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <span
                            className="icon fs-3 d-flex justify-content-end align-items-center"
                            style={{
                                width: "fit-content",
                                borderRadius: "0.5rem",
                                padding: "0.8rem",
                            }}
                            aria-label="Thả cảm xúc"
                        >
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </span>
                    </form>
                </div>

                {confirmPopup()}
            </div>
        </>
    );
};

export default Middle;
