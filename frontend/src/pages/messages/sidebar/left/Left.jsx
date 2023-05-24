import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import "../../../../style/pages/messages/left/left.css";

import {
    getRoomsByUserID,
    getCurrentRoom,
} from "../../../../redux/request/roomRequest";
import Conversation from "../../../../components/Conversation";
import { getUserByID } from "../../../../redux/request/authRequest";
import { SOCKET_URL } from "../../../../constants/backend.url.constant";

const Left = (props) => {
    const { avatarUser } = props;

    const [rooms, setRooms] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [friendID, setFriendID] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const dispatch = useDispatch();

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
                    conversation={r}
                    currentUser={sender._id}
                    avatarUser={avatarUser}
                    onlineUsers={onlineUsers}
                />
            </div>
        ));
    };

    const handleInputSearch = (e) => {};

    const socketRef = useRef(null);

    const handleSocket = {
        getUsersOnline: useCallback((userList) => {
            const users = Object.values(userList);

            setOnlineUsers(users.filter((u) => u.userID !== sender._id));
        }, []),
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
    }, [handleSocket.getUsersOnline]);

    return (
        <>
            <div className="left-msg-page">
                <div className="left-container">
                    <div className="left-container-main">
                        <input
                            type="text"
                            placeholder="Searching someone?"
                            className="fs-3 rounded border-0 mb-4"
                            onChange={handleInputSearch}
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Left;
