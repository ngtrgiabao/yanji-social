import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import "../../../../style/pages/messages/left/left.css";

import { getRoomsByUserID } from "../../../../redux/request/roomRequest";
import { getUserByID } from "../../../../redux/request/userRequest";

const Left = (props) => {
    const { avatarUser } = props;
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const sender = useSelector((state) => {
        return state.auth.login.currentUser?.data._id;
    });

    useEffect(() => {
        let isCancalled = false;
        getRoomsByUserID(dispatch, sender)
            .then((data) => {
                if (!isCancalled) {
                    Object.keys(data).forEach((key) => {
                        if (key === "rooms") {
                            const value = data[key];
                            setRooms(value);
                        }
                    });
                }
            })
            .catch((error) => {
                console.error("Failed to get rooms", error);
            });

        return () => {
            isCancalled = true;
        };
    }, []);

    useEffect(() => {
        let isCancalled = false;

        const friendIDs = rooms.map((item) => {
            return item.participants.find((user) => user !== sender);
        });

        Promise.all(
            friendIDs.map((friendID) => getUserByID(dispatch, friendID))
        )
            .then((responses) => {
                if (!isCancalled) {
                    const userList = responses
                        .map((data) => data?.user)
                        .filter(Boolean);
                    setUsers(userList);
                }
            })
            .catch((error) => {
                console.error("Failed to get users by ID", error);
            });

        return () => {
            isCancalled = true;
        };
    }, [rooms]);

    const renderRooms = () => {
        return users.map((user, index) => (
            <div
                className="d-flex align-items-center message-item p-3"
                style={{ borderRadius: "1rem" }}
                key={index}
            >
                <span className="profile-pic">
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src={user.profilePicture || avatarUser}
                        alt="Avatar user"
                    />
                </span>
                <div className="message-body ms-3">
                    <div className="fs-4 fw-bold">{user.username}</div>
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
