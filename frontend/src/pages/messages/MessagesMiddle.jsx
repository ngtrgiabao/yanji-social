import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    faVideo,
    faPhone,
    faCircleInfo,
    faImage,
    faFaceLaughBeam,
    faX,
    faCircleCheck as seenIcon,
    faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import {
    faPaperPlane,
    faCircleCheck as unseenIcon,
} from "@fortawesome/free-regular-svg-icons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
// import MagicBell, {
//     FloatingNotificationInbox,
// } from "@magicbell/magicbell-react";

import "../../style/pages/messages/messagesMiddle.css";

import {
    sendMessage,
    getMessagesByRoomID,
    deleteMessage,
    updateMessage,
    getMessageByID,
    markMessageSeen,
} from "../../redux/request/messageRequest";
import Message from "../../components/Message";
import { useTimeAgo } from "../../hooks/useTimeAgo";
import useUploadImage from "../../hooks/useUploadImage";
import PreviewImage from "../../components/PreviewImage";
import ConfirmDialog from "../../components/ConfirmDialog";
import useDownloadImage from "../../hooks/useDownloadImage";
import { getUserByID } from "../../redux/request/userRequest";

const MessagesMiddle = () => {
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState("");
    const [active, setActive] = useState("");
    const [messageID, setMessageID] = useState(null);
    const [oldMessage, setOldMessage] = useState("");
    const [messageThread, setMessageThread] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [imageSelected, setImageSelected] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [friendID, setFriendID] = useState("");
    const [friend, setFriend] = useState({ name: "", avatar: "" });
    const [base64Image, setBase64Image] = useState(""); // Base64 string representing the image
    const uploadImgRef = useRef(null);
    const downloadImage = useDownloadImage(imgSrc);
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

    const handleSocket = {
        serverResponse: useCallback(() => {
            console.log("Server connected");
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
    ]);

    const currentRoom = useSelector((state) => {
        return state.room.room?.currentRoom;
    });

    useEffect(() => {
        friendID &&
            getUserByID(friendID, dispatch).then((data) => {
                const friendInfo = data.user;
                setFriend({
                    name: friendInfo.username,
                    avatar: friendInfo.profilePicture,
                });
            });
    }, [friendID]);

    // Loop each room
    useEffect(() => {
        let isCancelled = false;

        if (currentRoom && !isCancelled) {
            const roomData = currentRoom.data;

            // This conditional will filter one room in list of rooms
            if (roomData && roomData._id) {
                const value = roomData._id;
                setFriendID(
                    roomData.participants.filter((p) => p !== sender._id)
                );
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

    const handlePreviewImage = (imgSrc) => {
        setActive("PREVIEW_IMAGE");
        setImgSrc(imgSrc);
    };

    const loadingMsg = useSelector((state) => {
        return state.message.message.isFetching;
    });

    const handleCancelEditMsg = () => {
        setEdit(false);
        setMessage("");
    };

    const renderTitleConversation = () => {
        return (
            <div className="middle-container-header d-flex align-items-center justify-content-between py-3 px-4 pb-3">
                <div className="d-flex align-items-center">
                    <div className="profile-pic">
                        {friend.avatar ? (
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={friend.avatar}
                                alt="Avatar user"
                            />
                        ) : (
                            <>{friend.name}</>
                        )}
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

    const renderMessages = () => {
        return messageThread.map((message) => (
            <Message
                key={message._id}
                media={message.media}
                sender={message.sender}
                loadingMsg={loadingMsg}
                content={message.message}
                createdAt={message.createdAt}
                updatedAt={message.updatedAt}
                onUpdateMsg={() => handleMsg.updateMsg(message._id)}
                onDeleteMsg={() => handleMsg.deleteMsg(message._id)}
                onPreviewImage={() => handlePreviewImage(message.media)}
            />
        ));
    };

    const renderBodyConversation = () => {
        return (
            <div className="middle-container-body scrollbar px-4 py-4 fs-3">
                {renderMessages()}
                <div ref={scrollRef} />
            </div>
        );
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
                    title="Download this image?"
                    children={<PreviewImage imgSrc={imgSrc} />}
                    onClose={() => setActive("")}
                    onConfirm={downloadImage}
                    confirmButtonText="Download"
                />
            )
        );
    };

    const renderEmojiPicker = () => {
        return (
            <>
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
                        active !== "EMOJI" ? setActive("EMOJI") : setActive("");
                    }}
                >
                    <FontAwesomeIcon icon={faFaceLaughBeam} />
                </span>
            </>
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
                    {renderEmojiPicker()}
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
            <div className="h-100 d-flex justify-content-center align-items-center fs-1 text-center fw-bold">
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

export default MessagesMiddle;
