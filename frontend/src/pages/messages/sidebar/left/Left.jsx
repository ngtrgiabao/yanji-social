import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../../../style/pages/messages/left/left.css";

import {
    getRoomsByUserID,
    getCurrentRoom,
} from "../../../../redux/request/roomRequest";
import Conversation from "../../../../components/Conversation";
import { getUserByID } from "../../../../redux/request/authRequest";

const Left = (props) => {
    const { avatarUser } = props;

    const [rooms, setRooms] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [friendID, setFriendID] = useState(null);
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
    }, []);

    useEffect(() => {
        let isCancelled = false;

        if (!isCancelled) {
            currentChat && getCurrentRoom(dispatch, currentChat);
        }

        return () => {
            isCancelled = true;
        };
    }, [currentChat, dispatch]);

    useEffect(() => {
        let isCancelled = false;

        if (!isCancelled) {
            friendID && getUserByID(dispatch, friendID);
        }

        return () => {
            isCancelled = true;
        };
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
                />
            </div>
        ));
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
