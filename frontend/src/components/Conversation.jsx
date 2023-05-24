import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getUserByID } from "../redux/request/authRequest";

const Conversation = (props) => {
    const { conversation, currentUser, avatarUser, onlineUsers } = props;

    const [user, setUser] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const friendID = conversation.participants.find(
            (p) => p !== currentUser
        );

        getUserByID(dispatch, friendID).then((data) => {
            setUser(data.user);
        });
    }, [currentUser, conversation, dispatch]);

    useEffect(() => {
        const uniqueUsers = [];

        onlineUsers.forEach((user) => {
            if (!uniqueUsers.includes(user)) {
                uniqueUsers.push(user);
                console.log(user);
            }
        });
    }, [onlineUsers]);

    return (
        <div
            className="d-flex align-items-center message-item p-3"
            style={{ borderRadius: "1rem" }}
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
                <div className="fs-4 fw-bold">{user && user.username}</div>
            </div>
        </div>
    );
};

export default Conversation;
