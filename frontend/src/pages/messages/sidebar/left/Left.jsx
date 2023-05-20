import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import "../../../../style/pages/messages/left/left.css";

import {
    getCurrentRoom,
    getRoomsByUserID,
} from "../../../../redux/request/roomRequest";
import { getUserByID } from "../../../../redux/request/authRequest";

const Left = (props) => {
    const { avatarUser } = props;
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
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

    useEffect(() => {
        let isCancalled = false;

        const friendIDs = rooms.map((item) => {
            return item.participants.find((user) => user !== sender);
        });

        // Get all the user data from the server
        const userPromises = friendIDs.map((friendID) =>
            getUserByID(dispatch, friendID)
        );

        // Wait for all the promises to resolve
        Promise.all(userPromises).then((responses) => {
            // Check if the request was cancelled
            if (!isCancalled) {
                // Create a list of users from the responses
                const userList = responses
                    .map((data) => data?.user)
                    .filter(Boolean);

                // Set the users state
                setUsers(userList);
            }
        });

        // Catch any errors
        Promise.all(userPromises).catch((error) => {
            console.error("Failed to get users by ID", error);
        });

        return () => {
            isCancalled = true;
        };
    }, [rooms]);

    useEffect(() => {
        currentChat && getCurrentRoom(dispatch, currentChat);
    }, [currentChat, rooms, dispatch]);

    const renderRooms = () => {
        return rooms.map((room) => (
            <div
                className="d-flex align-items-center message-item p-3"
                style={{ borderRadius: "1rem" }}
                key={room._id}
                onClick={() => setCurrentChat(room._id)}
            >
                <span className="profile-pic">
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src={avatarUser}
                        alt="Avatar user"
                    />
                </span>
                <div className="message-body ms-3">
                    <div className="fs-4 fw-bold">
                        {room.name} - {room._id}
                    </div>
                </div>
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
