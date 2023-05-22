import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserByID } from "../redux/request/authRequest";

const Conversation = (props) => {
    const { conversation, currentUser, avatarUser } = props;

    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const friendID = conversation.participants.find(
            (p) => p !== currentUser
        );

        getUserByID(dispatch, friendID).then((data) => {
            setUser(data.user);
        });
    }, [currentUser, conversation]);

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
