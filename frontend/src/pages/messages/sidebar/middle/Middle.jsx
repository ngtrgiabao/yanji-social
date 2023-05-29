import { useEffect, useRef, useState, useCallback } from "react";
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
    faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
// import MagicBell, {
//     FloatingNotificationInbox,
// } from "@magicbell/magicbell-react";
// import EmojiPicker from "emoji-picker-react";

import "../../../../style/pages/messages/middle/middle.css";

import Photo from "../../../../assets/avatar/profile-pic.png";

import { SOCKET_URL } from "../../../../constants/backend.url.constant";

import {
    sendMessage,
    getMessagesByRoomID,
    deleteMessage,
} from "../../../../redux/request/messageRequest";
import { useTimeAgo } from "../../../../hooks/useTimeAgo";

const Middle = () => {
    const [message, setMessage] = useState("");
    const [active, setActive] = useState(false);
    const [messageID, setMessageID] = useState("");
    const [messageThread, setMessageThread] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [titleConversation, setTitleConversation] = useState(null);
    const dispatch = useDispatch();
    const formatTime = useTimeAgo;

    const socketRef = useRef(null);
    const scrollRef = useRef();

    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}`;

    const sender = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const friendName = useSelector((state) => {
        return state.user.user.currentUser?.user;
    });

    useEffect(() => {
        let isCancelled = false;

        if (friendName && !isCancelled) {
            // This conditional will filter one user in list of users
            if (friendName._id) {
                const value = friendName.username;

                setTitleConversation(value);
            }
        }

        return () => {
            isCancelled = true;
        };
    }, [currentConversation]);

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
            [currentConversation, messageThread]
        ),

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

        socket.on("server", handleSocket.serverResponse);
        socket.on("receive-message", handleSocket.receivedMessage);
        socket.on("disconnect", handleSocket.disconnect);

        return () => {
            socket.off("server", handleSocket.serverResponse);
            socket.off("receive-message", handleSocket.receivedMessage);
            socket.off("disconnect", handleSocket.disconnect);
        };
    }, [
        handleSocket.serverResponse,
        handleSocket.receivedMessage,
        handleSocket.disconnect,
    ]);

    const currentRoom = useSelector((state) => {
        return state.room.room?.currentRoom;
    });

    // Loop each room
    useEffect(() => {
        let isCancelled = false;

        if (currentRoom && !isCancelled) {
            const roomData = currentRoom.data;

            // This conditional will filter one room in list of rooms
            if (roomData && roomData._id) {
                const value = roomData._id;
                setCurrentConversation(value);
            }
        }

        return () => {
            isCancelled = true;
        };
    }, [currentRoom]);

    const handleMsg = {
        changeInputMsg: (e) => {
            setMessage(e.target.value);
        },
        submit: (e) => {
            e.preventDefault();

            if (currentConversation) {
                const newMessage = {
                    sender: sender._id,
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
        },
        deleteMsg: async () => {
            await deleteMessage(messageID, dispatch);
            setMessageThread((prevMessageThread) =>
                prevMessageThread.filter((message) => message._id !== messageID)
            );
            setActive(false);
        },
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

    const handlePopup = () => {
        setActive((active) => !active);
    };

    // Auto scroll to bottom
    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messageThread]);

    const renderConfirmPopup = () => {
        return (
            active && (
                <div
                    className="confirm-container d-flex justify-content-center align-items-center"
                    onClick={() => setActive(false)}
                >
                    <div
                        id="confirm"
                        className="confirm-container__dialog p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="confirm-container__dialog-title d-block fs-3 text-white mb-4">
                            Bạn muốn xóa tin nhắn này?
                        </span>
                        <div className="confirm-container__dialog-footer fs-5 d-flex justify-content-end">
                            <span
                                onClick={() => handlePopup()}
                                className="confirm-container__dialog-close"
                            >
                                Close
                            </span>
                            <span
                                onClick={() => handleMsg.deleteMsg()}
                                className="confirm-container__dialog-confirm"
                            >
                                Delete
                            </span>
                        </div>
                    </div>
                </div>
            )
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
                        {titleConversation}
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

    const renderMessages = () => {
        return messageThread.map((message, index) =>
            message.sender === sender._id ? (
                <div
                    key={index}
                    className="middle-container-body__right-text mb-2 fs-4 animate__animated animate__slideInRight d-flex align-items-end flex-column"
                >
                    <div className="d-flex align-items-center justify-content-end w-100">
                        <span
                            className="dot-icon"
                            onClick={() => {
                                setMessageID(message._id);
                                handlePopup();
                            }}
                            style={{
                                cursor: "pointer",
                                width: "2.3rem",
                                height: "2.3rem",
                                borderRadius: "50%",
                            }}
                            aria-label="Xem thêm"
                        >
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </span>
                        <span className="middle-container-body__right-message-content ms-3">
                            {message.message}
                        </span>
                    </div>
                    <div className="middle-container-body__right-time">
                        {formatTime(message.createdAt) || "now"}
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
                    </div>
                    <div className="middle-container-body__left-time">
                        {formatTime(message.createdAt) || "now"}
                    </div>
                </div>
            )
        );
    };

    const renderBodyConversation = () => {
        return (
            <div className="middle-container-body scrollbar px-4 py-5 fs-3">
                {renderMessages()}
                <div ref={scrollRef} />
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message) {
            handleMsg.submit(e);
        }
    };

    const handleSendLike = (emoji) => {
        if (currentConversation) {
            const newMessage = {
                sender: sender._id,
                message: emoji,
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

    const renderFooterConversation = () => {
        return (
            <form
                onSubmit={handleSubmit}
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
                        onChange={(e) => handleMsg.changeInputMsg(e)}
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
                    aria-label="Gửi tin nhắn"
                    role="button"
                    onClick={handleSubmit}
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
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
                className="h-100 d-flex justify-content-center align-items-center fs-1 text-center"
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
                {/* <EmojiPicker /> */}
            </div>
        </>
    );
};

export default Middle;
