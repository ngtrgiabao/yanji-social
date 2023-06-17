import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import "../../../../style/pages/messages/left/left.css";

import {
    getRoomsByUserID,
    getCurrentRoom,
} from "../../../../redux/request/roomRequest";
import Conversation from "../../../../components/Conversation";
import { getUserByID } from "../../../../redux/request/userRequest";
// import ChatOnline from "../../../../components/ChatOnline";

const Left = ({ avatarUser }) => {
    const [rooms, setRooms] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [friendID, setFriendID] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [filterMessages, setFilterMessages] = useState("");
    const dispatch = useDispatch();

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const sender = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        let isCancelled = false;
        getRoomsByUserID(dispatch, sender._id)
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
    }, [dispatch, sender._id]);

    useEffect(() => {
        if (currentChat) {
            getCurrentRoom(dispatch, currentChat);
        }
    }, [currentChat, dispatch]);

    useEffect(() => {
        if (friendID) {
            getUserByID(dispatch, friendID);
        }
    }, [friendID, dispatch]);

    const socketRef = useRef(null);

    const handleSocket = {
        getUsersOnline: useCallback(
            (userList) => {
                const users = Object.values(userList);

                // Get friends of sender to compare user of socket to set online users
                getUserByID(dispatch, sender._id).then((data) => {
                    const value = data.user.friends.filter((f) =>
                        users.some((u) => u.userID === f)
                    );

                    setOnlineUsers(value);
                });
            },
            [sender._id, dispatch]
        ),
    };

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);
        const socket = socketRef.current;

        socket.emit("add-user", {
            user: sender._id,
        });

        socket.on("get-users", handleSocket.getUsersOnline);

        return () => {
            socket.off("get-users", handleSocket.getUsersOnline);
        };
    }, [handleSocket.getUsersOnline, sender._id]);

    const renderRooms = () => {
        return rooms.map((r) => (
            <div
                key={r._id}
                onClick={() => {
                    setCurrentChat(r._id);
                    setFriendID(
                        r.participants.filter((user) => user !== sender._id)
                    );
                }}
                className="messages-wrapper__room-list"
            >
                <Conversation
                    onlineUsers={onlineUsers}
                    conversation={r}
                    currentUser={sender._id}
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
                                currentUser={sender._id}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Left;
