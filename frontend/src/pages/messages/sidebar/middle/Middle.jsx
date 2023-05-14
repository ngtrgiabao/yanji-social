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
} from "@fortawesome/free-solid-svg-icons";

import "../../../../style/pages/messages/middle/middle.css";

import Photo from "../../../../assets/avatar/profile-pic.png";

import { SOCKET_URL } from "../../../../constants/backend.url.constant";
import { sendMessage } from "../../../../redux/request/messageRequest";

const Middle = () => {
    let [message, setMessage] = useState("");
    const messageBlock = useRef(null);
    const dispatch = useDispatch();

    const socketRef = useRef(null);
    if (!socketRef.current) {
        socketRef.current = io(SOCKET_URL);
    }
    const socket = socketRef.current;

    const userID = useSelector((state) => {
        return state.auth.login.currentUser?.data._id;
    });

    useEffect(() => {
        socket.emit("send-msg", {
            msg: "Hello from react 😀",
        });

        socket.on("server", (data) => {
            console.log(data);
        });

        socket.on("chat-message", (data) => {
            const { message, userID } = data;
            const item = document.createElement("p");
            item.className = "fs-4";
            item.style.width = "fit-content";
            item.style.marginBottom = "2%";
            item.style.padding = "1.5% 5%";
            item.style.border = "1px solid blue";
            item.style.borderRadius = "10%";
            item.innerHTML = message + " " + userID;

            messageBlock.current.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });

        socket.on("disconnect", () => {
            console.log("Server disconnected :<");
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMessage = {
            userID,
            message,
        };

        sendMessage(newMessage, dispatch)
            .then(() => {
                if (message) {
                    socket.emit("chat-message", { message, userID });
                    setMessage("");
                }
                alert("Send message successfully");
            })
            .catch((error) => {
                alert("Failed to send message");
                console.error("Failed to send message", error);
            });
    };

    return (
        <>
            <div className="middle-msg-page">
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
                    <div className="middle-container-body px-4 pt-4">
                        <div className="middle-container-body__left-text"></div>
                        <div
                            ref={messageBlock}
                            className="d-flex flex-column align-items-end middle-container-body__right-text"
                        ></div>
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
                                maxLength="500"
                                style={{
                                    border: "1px solid var(--color-primary)",
                                }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
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
            </div>
        </>
    );
};

export default Middle;
