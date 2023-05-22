import React, { useDebugValue, useEffect, useRef, useState } from "react";
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
import MagicBell, {
    FloatingNotificationInbox,
} from "@magicbell/magicbell-react";

import "../../../../style/pages/messages/middle/middle.css";

import Photo from "../../../../assets/avatar/profile-pic.png";

import { SOCKET_URL } from "../../../../constants/backend.url.constant";

import {
    sendMessage,
    getMessagesByRoomID,
    deleteMessage,
} from "../../../../redux/request/messageRequest";
import { useCallback } from "react";

const Middle = () => {
    const [message, setMessage] = useState("");
    const [active, setActive] = useState(false);
    const [messageID, setMessageID] = useState("");
    const [messageThread, setMessageThread] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const socketRef = useRef(null);
    const scrollRef = useRef();
    const dispatch = useDispatch();

    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}`;

    const sender = useSelector((state) => {
        return state.auth.login.currentUser?.data._id;
    });

    const handleSocket = {
        serverResponse: useCallback((data) => {
            console.log(data);
        }, []),
        receivedMessage: useCallback(
            (data) => {
                const { roomId } = data;
                roomId === currentConversation &&
                    setMessageThread((prevMessageThread) => [
                        ...prevMessageThread,
                        data,
                    ]);
            },
            [currentConversation]
        ),
        getUsers: useCallback((user) => {
            // console.log(user);
        }, []),
        disconnect: useCallback(() => {
            console.log("Server disconnected :<");
        }, []),
    };

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);
        const socket = socketRef.current;

        socket.emit("client", {
            msg: "Hello from client 😀",
        });

        socket.emit("add-user", {
            user: sender,
        });

        socket.on("server", handleSocket.serverResponse);
        socket.on("receive-message", handleSocket.receivedMessage);
        socket.on("get-users", handleSocket.getUsers);
        socket.on("disconnect", handleSocket.disconnect);

        return () => {
            socket.off("server", handleSocket.serverResponse);
            socket.off("receive-message", handleSocket.receivedMessage);
            socket.off("get-users", handleSocket.getUsers);
            socket.off("disconnect", handleSocket.disconnect);
        };
    }, [
        handleSocket.serverResponse,
        handleSocket.receivedMessage,
        handleSocket.getUsers,
        handleSocket.disconnect,
    ]);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentConversation) {
            const newMessage = {
                sender: sender,
                message: message,
                time: time,
                roomId: currentConversation,
            };

            sendMessage(newMessage, dispatch)
                .then(async () => {
                    if (message) {
                        await socketRef.current.emit(
                            "send-message",
                            newMessage
                        );
                        setMessage("");
                    }
                })
                .catch((error) => {
                    alert("Failed to send message");
                    console.error("Failed to send message", error);
                });
        }
    };

    useEffect(() => {
        let isCancalled = false;

        if (currentConversation) {
            getMessagesByRoomID(currentConversation, dispatch)
                .then((data) => {
                    if (!isCancalled) {
                        Object.keys(data).forEach((key) => {
                            if (key === "messages") {
                                const value = data[key];
                                setMessageThread(value);
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.error("Failed to get messages", error);
                });
        }
        return () => {
            isCancalled = true;
        };
    }, [currentConversation, dispatch]);

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

    const renderConfirmPopup = () => {
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

    const renderTitleConversation = () => {
        return (
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
                    <span className="ms-2 fs-4 fw-bold">
                        {currentConversation}
                    </span>
                </div>
                <div className="d-flex fs-4">
                    <span
                        aria-label="Gọi điện"
                        role="button"
                        className="icon d-flex justify-content-center align-items-center rounded-circle"
                    >
                        <FontAwesomeIcon icon={faPhone} />
                    </span>
                    <span
                        aria-label="Gọi video"
                        role="button"
                        className="icon d-flex justify-content-center align-items-center rounded-circle mx-4"
                    >
                        <FontAwesomeIcon icon={faVideo} />
                    </span>
                    <span
                        aria-label="Xem thêm thông tin"
                        role="button"
                        className="icon d-flex justify-content-center align-items-center rounded-circle"
                    >
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </span>
                </div>
            </div>
        );
    };

    const renderBodyConversation = () => {
        return (
            <div className="middle-container-body scrollbar px-4 pt-4 fs-3">
                {renderMessages()}
                <div ref={scrollRef} />
            </div>
        );
    };

    const renderFooterConversation = () => {
        return (
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
                        role="button"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span
                        className="icon fs-3 mx-3"
                        aria-label="Đính kèm file"
                        role="button"
                    >
                        <FontAwesomeIcon icon={faImage} />
                    </span>
                    <span
                        className="icon fs-3"
                        aria-label="Chọn emoji"
                        role="button"
                    >
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
        );
    };

    const renderConversation = () => {
        return currentConversation ? (
            <div className="middle-container">
                {renderTitleConversation()}
                {renderBodyConversation()}
                {renderFooterConversation()}
            </div>
        ) : (
            <div
                className="h-100 d-flex justify-content-center align-items-center fs-1"
                style={{
                    fontWeight: "bold",
                }}
            >
                Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
            </div>
        );
    };

    return (
        <>
            <div className="middle-msg-page relative">
                {/* <MagicBell
                    apiKey="84b8e554127e05465dcec54678d0f49859b4a548"
                    userEmail="mary@example.com"
                >
                    {(props) => (
                        <FloatingNotificationInbox height={500} {...props} />
                    )}
                </MagicBell> */}
                {renderConversation()} {renderConfirmPopup()}
            </div>
        </>
    );
};

export default Middle;
