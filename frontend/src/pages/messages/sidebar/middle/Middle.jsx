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
    getMessages,
    deleteMessage,
} from "../../../../redux/request/messageRequest";
import { getRooms } from "../../../../redux/request/roomRequest";
import PopupConfirm from "../../../../components/popup/PopupConfirm";

const Middle = () => {
    const [message, setMessage] = useState("");
    const [active, setActive] = useState(false);
    const [messageThread, setMessageThread] = useState([]);
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
    }, []);

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

    useEffect(() => {
        getMessages("6461eed0ccade08bb3c5329f", dispatch)
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
        // getRooms(dispatch)
        //     .then((data) => {
        //         Object.keys(data).forEach((key) => {
        //             if (key === "rooms") {
        //                 // Return first item in room data include participants in rooms
        //                 const value = data[key][0].participants;
        //                 setTest((prevTest) => [...prevTest, value]);
        //             }
        //         });
        //     })
        //     .catch((error) => {
        //         alert("Failed to get rooms");
        //         console.error("Failed to get rooms", error);
        //     });
    }, []);

    const handleDeleteMsg = (value) => {
        setActive(true);
        // deleteMessage(value, dispatch)
        //     .then(() => {
        //         setMessageThread((prevMessageThread) =>
        //             prevMessageThread.filter((message) => message._id !== value)
        //         );
        //     })
        //     .catch((error) => {
        //         alert("Failed to delete message :<", error);
        //         console.error("Failed to delete message");
        //     });
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messageThread]);

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
                        {messageThread.map((message, index) =>
                            message.sender === sender ? (
                                <div
                                    key={index}
                                    className="middle-container-body__right-text mb-2 fs-4 animate__animated animate__slideInRight"
                                >
                                    <div className="w-100 d-flex justify-content-end align-items-center">
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-danger"
                                            onClick={() =>
                                                handleDeleteMsg(message._id)
                                            }
                                        />
                                        <span className="middle-container-body__right-message-content ms-3">
                                            {message.message} - {message._id}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    className="middle-container-body__left-text mb-2 fs-4 animate__animated animate__slideInLeft"
                                >
                                    <div className="w-100 d-flex justify-content-start align-items-center">
                                        <span className="middle-container-body__left-message-content me-2">
                                            {message.message}
                                        </span>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-danger"
                                            onClick={() =>
                                                handleDeleteMsg(message._id)
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        )}
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

                <PopupConfirm title="Confirm delete message" />
            </div>
        </>
    );
};

export default Middle;
