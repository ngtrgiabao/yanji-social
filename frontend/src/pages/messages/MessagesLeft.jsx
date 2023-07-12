import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import "../../style/pages/messages/messagesLeft.css";

import {
    getRoomsByUserID,
    getCurrentRoom,
} from "../../redux/request/roomRequest";
import Conversation from "../../components/Conversation";
import { getUserByID } from "../../redux/request/userRequest";
// import ChatOnline from "../../../../components/ChatOnline";

const MessagesLeft = ({ avatarUser, socket = {} }) => {
    const [rooms, setRooms] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [friendID, setFriendID] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [filterMessages, setFilterMessages] = useState("");
    const dispatch = useDispatch();

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        let isCancelled = false;
        getRoomsByUserID(dispatch, currentUser._id)
            .then((data) => {
                if (!isCancelled) {
                    setRooms(data.rooms); // Set rooms directly
                }
            })
            .catch((error) => {
                console.error("Failed to get rooms", error);
            });

        return () => {
            isCancelled = true;
        };
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (currentChat) {
            getCurrentRoom(dispatch, currentChat);
        }
    }, [currentChat, dispatch]);

    useEffect(() => {
        if (friendID) {
            getUserByID(friendID, dispatch);
        }
    }, [friendID, dispatch]);

    const handleSocket = {
        getUsersOnline: useCallback((userList) => {
            const users = Object.values(userList);

            // Get friends of currentUser to compare user of socket to set online users
            getUserByID(currentUser._id, dispatch)
                .then((data) => {
                    const { followers, followings } = data.user;

                    if (followers.length > 0) {
                        const value = followers.filter((f) =>
                            users.some((u) => u.userID === f)
                        );
                        setOnlineUsers(value);
                    } else if (followings.length > 0) {
                        const value = followings.filter((f) =>
                            users.some((u) => u.userID === f)
                        );
                        setOnlineUsers(value);
                    }
                })
                .catch((err) => {
                    console.error("Failed to get user online", err);
                });
        }, []),
    };

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.emit("add-user", {
            user: currentUser._id,
        });

        socket.on("get-users", handleSocket.getUsersOnline);

        return () => {
            socket.off("get-users", handleSocket.getUsersOnline);
        };
    }, [handleSocket.getUsersOnline, currentUser._id]);

    const renderRooms = () => {
        return rooms.map((r) => (
            <div
                key={r._id}
                onClick={() => {
                    setCurrentChat(r._id);
                    setFriendID(
                        r.participants.filter(
                            (user) => user !== currentUser._id
                        )
                    );
                }}
                className="messages-wrapper__room-list"
            >
                <Conversation
                    onlineUsers={onlineUsers}
                    conversation={r}
                    currentUser={currentUser._id}
                    avatarUser={avatarUser}
                    filterMessages={filterMessages}
                />
            </div>
        ));
    };

    const handleFilterMessages = (e) => {
        setFilterMessages(e.target.value);
    };

    return (
        <>
            <div className="left-msg-page">
                <div className="left-container">
                    <div className="left-container-main">
                        <input
                            type="text"
                            placeholder="Searching someone?"
                            className="fs-3 rounded border-0 mb-4"
                            onChange={handleFilterMessages}
                        />

                        <div className="d-flex mb-4">
                            <div className="border px-4 py-2 fs-4 rounded-3">
                                Box
                            </div>
                            <div className="border px-4 py-2 fs-4 rounded-3 ms-3">
                                Communites
                            </div>
                        </div>

                        <div className="messages-wrapper scrollbar">
                            {renderRooms()}
                            {/* <ChatOnline
                                onlineUsers={onlineUsers}
                                currentUser={currentUser._id}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessagesLeft;
