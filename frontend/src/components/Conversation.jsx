import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getUserByID } from "../redux/request/authRequest";

const Conversation = (props) => {
    const {
        conversation,
        currentUser,
        avatarUser,
        onlineUsers,
        filterMessages,
    } = props;

    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const [isOnline, setIsOnline] = useState(false);
    const dispatch = useDispatch();

    const friendID = conversation.participants.find((p) => p !== currentUser);

    useEffect(() => {
        let isCancelled = false;

        getUserByID(dispatch, currentUser).then((data) => {
            if (!isCancelled) {
                setFriends(data.user.friends);
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [currentUser]);

    useEffect(() => {
        let isCancelled = false;

        getUserByID(dispatch, friendID).then((data) => {
            if (!isCancelled) {
                setUser(data.user);
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [currentUser, conversation, dispatch]);

    useEffect(() => {
        let isCancelled = false;

        if (!isCancelled) {
            friends.forEach((friend) => {
                if (onlineUsers?.includes(friend) && friend === user._id) {
                    setIsOnline(true);
                }
            });
        }

        return () => {
            isCancelled = true;
        };
    }, [friends, onlineUsers, isOnline]);

    const avatarUserElement = () => {
        return (
            <span
                className={
                    isOnline && user
                        ? "avatar-user online-status"
                        : "avatar-user"
                }
            >
                <img
                    loading="lazy"
                    role="presentation"
                    decoding="async"
                    src={avatarUser}
                    alt="Avatar user"
                    className="rounded-circle"
                />
            </span>
        );
    };

    const messageBodyElement = () => {
        return (
            <div className="message-body ms-3">
                <div className="fs-4 fw-bold">{user && user.username}</div>
            </div>
        );
    };

    const renderMessageBlock = () => {
        return filterMessages &&
            !user.username.toLowerCase().includes(filterMessages) ? null : (
            <>
                {avatarUserElement()}
                {messageBodyElement()}
            </>
        );
    };

    return (
        <div
            className="d-flex align-items-center message-item pt-3"
            style={{ borderRadius: "1rem" }}
        >
            {renderMessageBlock()}
        </div>
    );
};

export default Conversation;
