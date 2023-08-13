import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./style/messagesRight.css";

import { useDispatch, useSelector } from "react-redux";
import { getUserByID } from "../../redux/request/userRequest";
import { Link } from "react-router-dom";

const MessagesRight = () => {
    const [currentConversation, setCurrentConversation] = useState(null);
    const [friend, setFriend] = useState({
        id: "",
        username: "",
        profilePicture: "",
    });
    const dispatch = useDispatch();

    const currentRoom = useSelector((state) => {
        return state.room.room?.currentRoom;
    });

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        let isCancelled = false;

        if (currentRoom && !isCancelled) {
            const roomData = currentRoom.data;

            if (roomData?._id) {
                const { participants, _id } = roomData;
                const friendID = participants.find(
                    (id) => id !== currentUser._id
                );

                getUserByID(friendID, dispatch).then((data) => {
                    const { username, profilePicture, _id } = data.user;

                    setFriend({
                        id: _id,
                        username: username,
                        profilePicture: profilePicture,
                    });
                });

                setCurrentConversation(_id);
            }
        }

        return () => {
            isCancelled = true;
        };
    }, [currentRoom, currentUser._id, dispatch]);

    const renderAvatarUser = () => {
        return (
            <div className="d-flex flex-column align-items-center mb-4">
                <div
                    className="right-container-header rounded rounded-circle overflow-hidden d-flex justify-content-center align-items-center fs-3 fw-bold"
                    style={{
                        background: "var(--color-primary)",
                    }}
                >
                    {friend.profilePicture ? (
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={friend.profilePicture}
                            alt="Avatar user"
                            className="w-100"
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <>{friend.username}</>
                    )}
                </div>
                <p className="mt-2 mb-0 fs-4 fw-bold">{friend.username}</p>
            </div>
        );
    };

    const renderActionUser = () => {
        return (
            <div
                className="right-container-body fs-5 ms-3"
                style={{
                    width: "max-content",
                }}
            >
                <Link
                    to={`/user/${friend.id}`}
                    className="d-flex flex-column align-items-center"
                    data-profile
                >
                    <span
                        className="p-3 text-center icon"
                        style={{
                            borderRadius: "0.5rem",
                        }}
                    >
                        <FontAwesomeIcon icon={faUser} className="me-3" />
                        <span>Visit Profile</span>
                    </span>
                </Link>
            </div>
        );
    };

    return (
        currentConversation && (
            <div className="right-msg-page p-4">
                <div className="right-container d-flex flex-column align-items-center">
                    {renderAvatarUser()}
                    {renderActionUser()}
                </div>
            </div>
        )
    );
};

export default MessagesRight;
