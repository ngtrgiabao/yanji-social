import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import "../../../../style/pages/messages/left/left.css";

import {
    getRoomsByUserID,
    getCurrentRoom,
} from "../../../../redux/request/roomRequest";
import Conversation from "../../../../components/Conversation";

const Left = (props) => {
    const { avatarUser } = props;
    const [rooms, setRooms] = useState([]);
    const dispatch = useDispatch();

    const sender = useSelector((state) => {
        return state.auth.login.currentUser?.data._id;
    });

    useEffect(() => {
        let isCancelled = false;
        getRoomsByUserID(dispatch, sender)
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

    const [currentChat, setCurrentChat] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        if (!isCancelled) {
            currentChat && getCurrentRoom(dispatch, currentChat);
        }

        return () => {
            isCancelled = true;
        };
    }, [currentChat, dispatch]);

    const renderRooms = () => {
        return rooms.map((r) => (
            <div key={r._id} onClick={() => setCurrentChat(r._id)}>
                <Conversation
                    conversation={r}
                    currentUser={sender}
                    avatarUser={avatarUser}
                />
            </div>
        ));
    };

    return (
        <>
            <div className="left-msg-page">
                <div className="left-container">
                    {/* HEADER */}
                    <div className="d-flex justify-content-between align-items-center fs-3 mb-4">
                        <div className="fs-2 fw-bold">Chat</div>
                        <div>
                            <span className="left-setting-chat__icon border rounded-circle">
                                <FontAwesomeIcon icon={faEllipsis} />
                            </span>
                        </div>
                    </div>
                    {/* MAIN */}
                    <div className="left-container-main">
                        <input
                            type="text"
                            placeholder="searching someone?"
                            className="fs-5 rounded border-0 mb-4"
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
