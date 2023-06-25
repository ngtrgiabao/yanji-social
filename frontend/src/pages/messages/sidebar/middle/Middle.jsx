import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faVideo,
    faPhone,
    faCircleInfo,
    faImage,
    faFaceLaughBeam,
    faX,
    faCircleCheck as seenIcon,
    faTrash,
    faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import {
    faPaperPlane,
    faCircleCheck as unseenIcon,
    faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
// import MagicBell, {
//     FloatingNotificationInbox,
// } from "@magicbell/magicbell-react";
import axios from "axios";

import "../../../../style/pages/messages/middle/middle.css";

import Photo from "../../../../assets/avatar/profile-pic.png";

//TODO Fix layout message content, fix avatar user

import {
    sendMessage,
    getMessagesByRoomID,
    deleteMessage,
    updateMessage,
    getMessageByID,
    markMessageSeen,
} from "../../../../redux/request/messageRequest";
import { useTimeAgo } from "../../../../hooks/useTimeAgo";
import PreviewImage from "../../../../components/PreviewImage";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import useUploadImage from "../../../../hooks/useUploadImage";

const Middle = () => {
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState("");
    const [active, setActive] = useState("");
    const [messageID, setMessageID] = useState(null);
    const [oldMessage, setOldMessage] = useState("");
    const [messageThread, setMessageThread] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [imageSelected, setImageSelected] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [friend, setFriend] = useState({ name: "", avatar: "" });
    const [base64Image, setBase64Image] = useState(""); // Base64 string representing the image

    const uploadImgRef = useRef(null);

    const dispatch = useDispatch();
    const formatTime = useTimeAgo;
    const cloudStorage = useUploadImage;

    const socketRef = useRef(null);
    const scrollRef = useRef();
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}`;

    const sender = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const friendInfo = useSelector((state) => {
        return state.user.user.currentUser?.user;
    });

    useEffect(() => {
        let isCancelled = false;

        if (friendInfo && !isCancelled) {
            // This conditional will filter one user in list of users
            if (friendInfo._id) {
                setFriend({
                    name: friendInfo.username,
                    avatar: friendInfo.profilePicture,
                });
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
            [currentConversation]
        ),
        updatedMessage: useCallback(
            (data) => {
                const { msgID } = data;

                setMessageThread((prevMessageThread) => {
                    const updatedThread = prevMessageThread.map((message) =>
                        message._id === msgID ? data : message
                    );
                    return updatedThread;
                });
            },
            [messageThread]
        ),
        deletedMesssage: useCallback(
            (msgID) => {
                setMessageThread((prevMessageThread) => {
                    const updatedThread = prevMessageThread.filter(
                        (message) => message._id !== msgID
                    );
                    return updatedThread;
                });
            },
            [messageThread]
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
        socket.on("updated-message", handleSocket.updatedMessage);
        socket.on("deleted-message", handleSocket.deletedMesssage);
        socket.on("disconnect", handleSocket.disconnect);

        return () => {
            socket.off("server", handleSocket.serverResponse);
            socket.off("receive-message", handleSocket.receivedMessage);
            socket.off("updated-message", handleSocket.updatedMessage);
            socket.off("deleted-message", handleSocket.deletedMesssage);
            socket.off("disconnect", handleSocket.disconnect);
        };
    }, [
        handleSocket.serverResponse,
        handleSocket.receivedMessage,
        handleSocket.updatedMessage,
        handleSocket.deletedMesssage,
        handleSocket.disconnect,
        SOCKET_URL,
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
        updateMsg: async (msgID) => {
            setMessageID(msgID);

            await getMessageByID(msgID, dispatch).then((data) => {
                setMessage(data?.data.message);
                setOldMessage(data?.data.message);
            });

            setEdit(true);
        },
        deleteMsg: async (msgID) => {
            setMessageID(msgID);

            setActive("DELETE_MSG");
        },
        markMsgSeen: async (data) => {
            const friendMsg = data.messages.filter(
                (m) => m.sender !== sender._id
            );
            const messageKeys = Object.keys(friendMsg);
            const latestMessageKey = messageKeys[messageKeys.length - 1];
            if (latestMessageKey) {
                const latestMessage = friendMsg[latestMessageKey];
                const markMsg = {
                    ...latestMessage,
                    msgID: latestMessage._id,
                    isRead: true,
                };
                await markMessageSeen(markMsg, dispatch);
            }
        },
        sendEmoji: (e) => {
            const sym = e.unified.split("_");
            const codeArray = [];

            sym.forEach((el) => codeArray.push("0x" + el));
            let emoji = String.fromCodePoint(...codeArray);

            setMessage(message + emoji);
        },
        reviewImageBeforeUpload: (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result;
                    setBase64Image(base64);
                };
                reader.readAsDataURL(file);
            }
        },
        sendLike: (emoji) => {
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
        },
    };

    const handleDeleteMsg = async (msgID) => {
        await deleteMessage(msgID, dispatch).then(async () => {
            await socketRef.current.emit("delete-message", msgID);
        });

        setActive("");
    };

    const handleEditMsg = () => {
        if (message !== oldMessage && edit) {
            if (message === "") {
                setActive("");
                setEdit(false);
            } else {
                const updateMsg = {
                    msgID: messageID,
                    message: message,
                    sender: sender._id,
                };

                updateMessage(updateMsg, dispatch).then(async () => {
                    await socketRef.current.emit("update-message", updateMsg);

                    setEdit(false);
                    setMessage("");
                });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message && !edit) {
            handleMsg.submit(e);
        }

        handleEditMsg();
    };

    // Get msg thread by room ID
    useEffect(() => {
        let isCancalled = false;

        if (currentConversation) {
            getMessagesByRoomID(currentConversation, dispatch)
                .then(async (data) => {
                    if (!isCancalled) {
                        Object.keys(data).forEach((key) => {
                            if (key === "messages") {
                                const value = data[key];
                                setMessageThread(value);
                            }
                        });

                        //! Fix mark seen doesn't show edited msg
                        // handleMsg.markMsgSeen(data);
                    }
                })
                .catch((error) => {
                    console.error("Failed to get messages", error);
                });
        }
        return () => {
            isCancalled = true;
        };
    }, [currentConversation, dispatch, sender._id]);

    // Auto scroll to bottom
    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messageThread]);

    const handleUploadImage = async () => {
        uploadImgRef.current.click();
    };

    const uploadImage = async () => {
        const result = await cloudStorage(imageSelected);

        const imageUrl = result.secure_url;

        if (currentConversation) {
            const newMessage = {
                sender: sender._id,
                time: time,
                roomId: currentConversation,
                media: imageUrl,
            };

            sendMessage(newMessage, dispatch)
                .then(async () => {
                    await socketRef.current.emit("send-message", newMessage);
                })
                .catch((error) => {
                    alert("Failed to send message");
                    console.error("Failed to send message", error);
                });
        }

        setActive("");
    };

    const renderTitleConversation = () => {
        return (
            <div className="middle-container-header d-flex align-items-center justify-content-between py-3 px-4 pb-3">
                <div className="d-flex align-items-center">
                    <div className="middle-avatar-chat rounded-circle">
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={friend.avatar || Photo}
                            alt="Avatar user"
                        />
                    </div>

                    <span className="ms-2 fs-4 fw-bold">{friend.name}</span>
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

    const handlePreviewImage = (imgSrc) => {
        setActive("PREVIEW_IMAGE");
        setImgSrc(imgSrc);
    };

    const loadingMsg = useSelector((state) => {
        return state.message.message.isFetching;
    });

    const renderMessages = () => {
        return messageThread.map((message, index) =>
            message.sender === sender._id ? (
                <div
                    key={index}
                    className="middle-container-body__right-text mb-3 fs-4 animate__animated animate__slideInRight d-flex align-items-end flex-column"
                >
                    <div className="d-flex align-items-center justify-content-end w-100">
                        <span
                            className="action-message fs-5"
                            onClick={() => handleMsg.updateMsg(message._id)}
                            style={{
                                cursor: "pointer",
                                width: "2.3rem",
                                height: "2.3rem",
                                borderRadius: "50%",
                            }}
                            aria-label="Chỉnh sửa"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </span>
                        <span
                            className="action-message fs-5 text-danger"
                            onClick={() => handleMsg.deleteMsg(message._id)}
                            style={{
                                cursor: "pointer",
                                width: "2.3rem",
                                height: "2.3rem",
                                borderRadius: "50%",
                            }}
                            aria-label="Xóa"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <div className="middle-container-body__right-message-content ms-2">
                            {loadingMsg ? (
                                "Loading message..."
                            ) : (
                                <>
                                    {message.media ? (
                                        <img
                                            src={message.media}
                                            alt="image_uploaded"
                                            onClick={() =>
                                                handlePreviewImage(
                                                    message.media
                                                )
                                            }
                                        />
                                    ) : (
                                        <div className="middle-container-body__right-message-content-text">
                                            {message.message}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="middle-container-body__right-time">
                        {formatTime(message.createdAt) || "now"}
                        {message.createdAt !== message.updatedAt && (
                            <> - edited {formatTime(message.updatedAt)}</>
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
                    key={index}
                    className="middle-container-body__left-text mb-3 fs-4 animate__animated animate__slideInLeft d-flex flex-column"
                >
                    <div className="d-flex justify-content-start align-items-center w-100">
                        <span className="middle-container-body__left-message-content me-2">
                            {loadingMsg ? (
                                "Loading message..."
                            ) : (
                                <>
                                    {message.media ? (
                                        <img
                                            src={message.media}
                                            alt="image_uploaded"
                                            onClick={() =>
                                                handlePreviewImage(
                                                    message.media
                                                )
                                            }
                                        />
                                    ) : (
                                        <div className="middle-container-body__left-message-content-text">
                                            {message.message}
                                        </div>
                                    )}
                                </>
                            )}
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
            <div className="middle-container-body scrollbar px-4 py-4 fs-3">
                {renderMessages()}
                <div ref={scrollRef} />
            </div>
        );
    };

    const handleCancelEditMsg = () => {
        setEdit(false);
        setMessage("");
    };

    const renderLabelEditMessage = () => {
        return (
            <span
                className="position-absolute bottom-100 bg-warning text-black h-100 p-3"
                style={{
                    left: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "max-content",
                    fontWeight: "bolder",
                }}
            >
                Chỉnh sửa tin nhắn
            </span>
        );
    };

    const renderPopupConfirmDeleteMsg = () => {
        return (
            active === "DELETE_MSG" && (
                <ConfirmDialog
                    title="Bạn muốn xóa tin nhắn này?"
                    onClose={() => setActive("")}
                    onConfirm={() => handleDeleteMsg(messageID)}
                    confirmButtonText="Delete"
                />
            )
        );
    };

    const downloadImage = async () => {
        try {
            const response = await fetch(imgSrc);
            const blob = await response.blob();

            const anchor = document.createElement("a");
            anchor.href = URL.createObjectURL(blob);
            anchor.download = "image.jpg";
            anchor.style.display = "none";
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        } catch (error) {
            console.error("Error downloading image:", error);
        }
    };

    const renderPopupConfirmUploadImg = () => {
        return (
            active === "UPLOAD_IMAGE" &&
            imageSelected && (
                <ConfirmDialog
                    title="Bạn muốn gửi hình ảnh này?"
                    children={
                        <img src={base64Image} alt="image_before_upload" />
                    }
                    onClose={() => setActive("")}
                    onConfirm={uploadImage}
                    confirmButtonText="Send"
                />
            )
        );
    };

    const renderPreviewPopupImage = () => {
        return (
            active === "PREVIEW_IMAGE" && (
                <ConfirmDialog
                    children={<PreviewImage imgSrc={imgSrc} />}
                    onClose={() => setActive("")}
                    onConfirm={downloadImage}
                    confirmButtonText="Download"
                />
            )
        );
    };

    const renderFooterConversation = () => {
        return (
            <form
                onSubmit={handleSubmit}
                className="middle-container-footer px-3 d-flex justify-content-between align-items-center"
            >
                <div className="d-flex justify-content-between position-relative">
                    <span
                        className="icon fs-3 border-0"
                        aria-label="Đính kèm tệp tin"
                        role="button"
                        style={{
                            width: "2em",
                            height: "2em",
                            borderRadius: "0.5rem",
                            padding: "0.8rem",
                        }}
                    >
                        <FontAwesomeIcon icon={faPaperclip} />
                    </span>

                    <span
                        className="icon fs-3 mx-3 border-0"
                        aria-label="Đính kèm file"
                        role="button"
                        style={{
                            width: "2em",
                            height: "2em",
                            borderRadius: "0.5rem",
                            padding: "0.8rem",
                        }}
                        onClick={() => {
                            handleUploadImage();
                            setActive("UPLOAD_IMAGE");
                        }}
                    >
                        <FontAwesomeIcon icon={faImage} />
                    </span>

                    <input
                        type="file"
                        name=""
                        id=""
                        ref={uploadImgRef}
                        hidden={true}
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                            setImageSelected(e.target.files[0]);
                            handleMsg.reviewImageBeforeUpload(e);
                        }}
                    />

                    {/* Emoji picker */}
                    <div
                        className="position-absolute"
                        style={{
                            bottom: "120%",
                        }}
                        hidden={active !== "EMOJI"}
                    >
                        <Picker
                            data={data}
                            emojiSize={22}
                            emojiButtonSize={29}
                            maxFrequentRows={0}
                            onEmojiSelect={(e) => handleMsg.sendEmoji(e)}
                            locale="vi"
                            perLine={8}
                            previewPosition="none"
                        />
                    </div>
                    <span
                        className="icon fs-3 border-0"
                        aria-label="Chọn emoji"
                        role="button"
                        style={{
                            width: "2em",
                            height: "2em",
                            borderRadius: "0.5rem",
                            padding: "0.8rem",
                        }}
                        onClick={() => {
                            active !== "EMOJI"
                                ? setActive("EMOJI")
                                : setActive("");
                        }}
                    >
                        <FontAwesomeIcon icon={faFaceLaughBeam} />
                    </span>
                </div>

                <div className="user-input-chat position-relative mx-3">
                    {edit && renderLabelEditMessage()}
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

                {edit ? (
                    <span
                        className="icon fs-3 d-flex justify-content-center border-0 align-items-center bg-danger"
                        style={{
                            width: "2em",
                            height: "2em",
                            borderRadius: "0.5rem",
                            padding: "0.8rem",
                        }}
                        aria-label="Hủy chỉnh sửa"
                        role="button"
                        onClick={() => handleCancelEditMsg()}
                    >
                        <FontAwesomeIcon icon={faX} />
                    </span>
                ) : (
                    <span
                        className="icon fs-3 d-flex justify-content-center border-0 align-items-center"
                        style={{
                            width: "2em",
                            height: "2em",
                            borderRadius: "0.5rem",
                            padding: "0.8rem",
                        }}
                        aria-label="Gửi tin nhắn"
                        role="button"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </span>
                )}
            </form>
        );
    };

    const renderConversation = () => {
        return currentConversation ? (
            <div className="middle-container d-flex flex-column justify-content-between h-100 pb-3">
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
                {renderConversation()} {renderPopupConfirmDeleteMsg()}
                {renderPopupConfirmUploadImg()}
                {renderPreviewPopupImage()}
            </div>
        </>
    );
};

export default Middle;
