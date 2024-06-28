import io from "socket.io-client";
import { useEffect, useRef, useState, useCallback, lazy, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Info, Phone, Video } from "lucide-react";
import isEqual from "react-fast-compare";

import "../../styles/messageMiddle.css";

import {
  sendMessage,
  getMessagesByRoomID,
  deleteMessage,
  updateMessage,
  getMessageByID,
  markMessageSeen,
} from "../../../../../redux/request/messageRequest";

import {
  useUploadImage,
  useDownloadImage,
  useCurrentRoom,
} from "../../../../../hooks";
import { PreviewImage } from "../../../../../components";
import { getUserByID } from "../../../../../redux/request/userRequest";
import { NotiType } from "../../../../../constant/notification";
import { pushNewNotification } from "../../../../../redux/request/notificationRequest";
import SocketEvent from "../../../../../constant/socket-event";
import Global from "../../../../../constant/global";
import Footer from "../footer";
import { Avatar } from "../../../../../components";
import Message from "../message";
import ConfirmDialog from "../../../../ui/dialog/confirm-dialog";

const friendDefaultValues = {
  name: "",
  avatar: "",
};

const MessageMiddle = ({ socket }) => {
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
  const [friend, setFriend] = useState(friendDefaultValues);
  const [base64Image, setBase64Image] = useState(""); // Base64 string representing the image
  const [isLoading, setIsLoading] = useState(false);
  const uploadImgRef = useRef(null);
  const downloadImage = useDownloadImage(imgSrc);
  const dispatch = useDispatch();
  const currentRoom = useCurrentRoom();

  const cloudStorage = useUploadImage;

  const socketRef = useRef(null);
  const scrollRef = useRef();

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
          setMessageThread((prevMessageThread) => [...prevMessageThread, data]);
      },
      [currentConversation],
    ),
    updatedMessage: useCallback((data) => {
      const { _id } = data;

      setMessageThread((prevMessageThread) => {
        const updatedThread = prevMessageThread.map((message) =>
          message._id === _id ? data : message,
        );
        return updatedThread;
      });
    }, []),
    deletedMesssage: useCallback((msgID) => {
      setMessageThread((prevMessageThread) => {
        const updatedThread = prevMessageThread.filter(
          (message) => message._id !== msgID,
        );
        return updatedThread;
      });
    }, []),

    disconnect: useCallback(() => {
      console.log("Server disconnected :<");
    }, []),
  };

  useEffect(() => {
    socketRef.current = io(Global.SOCKET_URL);
    const socket = socketRef.current;

    socket.emit("client", {
      msg: "Hello from client 😀",
    });

    socket.on(SocketEvent.SERVER, handleSocket.serverResponse);
    socket.on(SocketEvent.RECEIVE_MESSAGE, handleSocket.receivedMessage);
    socket.on(SocketEvent.UPDATED_MESSAGE, handleSocket.updatedMessage);
    socket.on(SocketEvent.DELETED_MESSAGE, handleSocket.deletedMesssage);
    socket.on(SocketEvent.DISCONNECT, handleSocket.disconnect);

    return () => {
      socket.off(SocketEvent.SERVER, handleSocket.serverResponse);
      socket.off(SocketEvent.RECEIVE_MESSAGE, handleSocket.receivedMessage);
      socket.off(SocketEvent.UPDATED_MESSAGE, handleSocket.updatedMessage);
      socket.off(SocketEvent.DELETED_MESSAGE, handleSocket.deletedMesssage);
      socket.off(SocketEvent.DISCONNECT, handleSocket.disconnect);
    };
  }, [
    Global.SOCKET_URL,
    handleSocket.serverResponse,
    handleSocket.receivedMessage,
    handleSocket.updatedMessage,
    handleSocket.deletedMesssage,
    handleSocket.disconnect,
  ]);

  useEffect(() => {
    let isCancelled = false;

    friendID &&
      getUserByID(friendID, dispatch).then((data) => {
        if (data && !isCancelled) {
          const friendInfo = data.user;
          setFriend({
            name: friendInfo.username,
            avatar: friendInfo.profilePicture,
          });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [friendID, dispatch]);

  // Loop each room
  useEffect(() => {
    let isCancelled = false;

    if (currentRoom && !isCancelled) {
      const roomData = currentRoom.data;

      // filter one room in list of rooms
      if (roomData?._id) {
        const value = roomData._id;
        setFriendID(roomData.participants.filter((p) => p !== sender._id));
        setCurrentConversation(value);
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [currentRoom]);

  const handleChangeInputMsg = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmitSendMessage = (e) => {
    e.preventDefault();

    const trimmedMsg = message.trim();

    setMessage("");

    if (currentConversation && trimmedMsg.length > 0) {
      const newMessage = {
        sender: sender._id,
        message: trimmedMsg,
        time: time,
        roomId: currentConversation,
      };

      sendMessage(newMessage, dispatch)
        .then(async (data) => {
          if (message) {
            await socketRef.current.emit("send-message", data?.data);
            setMessage("");

            socket = io(Global.SOCKET_URL);

            const notification = {
              sender: sender._id,
              receiver: friendID,
              type: NotiType.NEW_MSG,
            };

            pushNewNotification(notification, dispatch)
              .then((data) => {
                socket.emit("push-notification", data?.data);
              })
              .catch((err) => {
                console.error("Failed to create new notification", err);
              });
          }
        })
        .catch((error) => {
          alert("Failed to send message");
          console.error("Failed to send message", error);
        });
    }
  };

  const handleUpdateMessage = async (msgID) => {
    setMessageID(msgID);

    await getMessageByID(msgID, dispatch).then((data) => {
      setMessage(data?.data.message);
      setOldMessage(data?.data.message);
    });

    setEdit(true);
  };

  const handleDeleteMessage = async (msgID) => {
    setMessageID(msgID);

    setActive("DELETE_MSG");
  };

  const handleMarkMessageSeen = async (data) => {
    const friendMsg = data.messages.filter((m) => m.sender !== sender._id);
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
  };

  const handleSendEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];

    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);

    setMessage(message + emoji);
  };

  const handlePreviewImageBeforeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setBase64Image(base64);
      };
      reader.readAsDataURL(file);
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
            await socketRef.current.emit("send-message", newMessage);
            setMessage("");
          }
        })
        .catch((error) => {
          alert("Failed to send message");
          console.error("Failed to send message", error);
        });
    }
  };

  const handleMsg = {
    changeInputMsg: (e) => handleChangeInputMsg(e),
    submit: (e) => handleSubmitSendMessage(e),
    updateMsg: (msgID) => handleUpdateMessage(msgID),
    deleteMsg: (msgID) => handleDeleteMessage(msgID),
    markMsgSeen: (data) => handleMarkMessageSeen(data),
    sendEmoji: (e) => handleSendEmoji(e),
    previewImageBeforeUpload: (e) => handlePreviewImageBeforeUpload(e),
    sendLike: (emoji) => handleSendLike(emoji),
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
        const updatedMsg = {
          msgID: messageID,
          message: message,
          sender: sender._id,
        };

        updateMessage(updatedMsg, dispatch).then(async (data) => {
          await socketRef.current.emit("update-message", data?.data);
          setEdit(false);
          setMessage("");
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message && !edit) {
      handleMsg["submit"](e);
    } else {
      handleEditMsg();
    }
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
    setIsLoading(true);
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
        .then(async (data) => {
          await socketRef.current.emit("send-message", data?.data);
        })
        .catch((error) => {
          alert("Failed to send message");
          console.error("Failed to send message", error);
        });
    }

    setIsLoading(false);
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
      <div className="middle-container-header d-flex align-items-center justify-content-between py-3 px-4 pb-3 position-relative">
        <Link
          to={`/user/${friendID}`}
          className="d-flex align-items-center link-underline"
        >
          <span
            style={{
              width: "4rem",
              height: "4rem",
            }}
          >
            <Avatar
              imageSrc={friend.avatar}
              label={friend.name}
              userId={friendID}
            />
          </span>
          <span className="ms-2 fs-4 fw-bold">{friend.name}</span>
        </Link>
        <div className="d-flex fs-4">
          <Link
            to={`https://meet-with-us.netlify.app/`}
            aria-label="Gọi điện"
            role="button"
            className="icon d-flex justify-content-center align-items-center rounded-circle"
          >
            <Phone size={20} />
          </Link>
          <Link
            to={`https://meet-with-us.netlify.app/`}
            aria-label="Gọi video"
            role="button"
            className="icon d-flex justify-content-center align-items-center rounded-circle mx-2"
          >
            <Video size={20} />
          </Link>
          <span
            aria-label="Xem thêm thông tin"
            role="button"
            className="icon d-flex justify-content-center align-items-center rounded-circle"
          >
            <Info size={20} />
          </span>
        </div>
      </div>
    );
  };

  const renderMessages = () => {
    return messageThread.map((message, _) => (
      <Message
        key={message._id}
        id={message._id}
        media={message.media}
        sender={message.sender}
        loadingMsg={loadingMsg}
        content={message.message}
        createdAt={message.createdAt}
        updatedAt={message.updatedAt}
        onUpdateMsg={() => handleMsg["updateMsg"](message._id)}
        onDeleteMsg={() => handleMsg["deleteMsg"](message._id)}
        onPreviewImage={() => handlePreviewImage(message.media)}
      />
    ));
  };

  const renderBodyConversation = () => {
    return (
      <div className="middle-container-body px-4 py-4 fs-3">
        {renderMessages()}
        <div ref={scrollRef} />
      </div>
    );
  };

  const renderPopupConfirmUploadImg = () => {
    return (
      active === "UPLOAD_IMAGE" &&
      imageSelected && (
        <ConfirmDialog
          title="Bạn muốn gửi hình ảnh này?"
          children={<img src={base64Image} alt="image_before_upload" />}
          onClose={() => setActive("")}
          onConfirm={uploadImage}
          confirmButtonText="Send"
          isLoading={isLoading}
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

  const renderFooterConversation = () => {
    return (
      <Footer
        isEdit={edit}
        messageContent={message}
        activeState={active}
        uploadImgRef={uploadImgRef}
        onSubmit={handleSubmit}
        onUploadImage={handleUploadImage}
        onActive={setActive}
        onImageSelected={setImageSelected}
        onPreviewImageBeforeUpload={(e) =>
          handleMsg["previewImageBeforeUpload"](e)
        }
        onSendEmoji={handleMsg["sendEmoji"]}
        onChangeInputMsg={handleMsg["changeInputMsg"]}
        onCancelEditMsg={handleCancelEditMsg}
      />
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

  return (
    <>
      <div className="middle-msg-page position-relative">
        {renderPopupConfirmDeleteMsg()}
        {renderConversation()}
        {renderPopupConfirmUploadImg()}
        {renderPreviewPopupImage()}
      </div>
    </>
  );
};

export default memo(MessageMiddle, isEqual);
