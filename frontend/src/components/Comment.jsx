import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UilTrash } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

import { getUserByID } from "../redux/request/userRequest";
import { deleteComment } from "../redux/request/commentRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";

const Comment = ({
    userCommented,
    createdAt,
    content,
    commentID,
    postID,
    authorPost,
    socket,
}) => {
    const [user, setUser] = useState({
        _id: "",
        username: "",
        profilePicture: "",
    });
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const formatTime = useTimeAgo;
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handleComment = () => {
        setIsActive((isActive) => !isActive);
    };

    useEffect(() => {
        // Get info of each user commented in post
        userCommented &&
            getUserByID(userCommented, dispatch)
                .then((data) => {
                    const userInfo = data?.user;
                    setUser({
                        _id: userInfo._id,
                        username: userInfo.username,
                        profilePicture: userInfo.profilePicture,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
    }, []);

    const deleteComments = () => {
        setIsLoading(true);
        deleteComment(commentID, dispatch).then(async () => {
            const updatePost = {
                _id: postID,
            };
            socket = io(SOCKET_URL);

            await socket.emit("update-post", updatePost);

            setIsLoading(false);
        });
    };

    return isLoading ? (
        <div className="text-white">Loading...</div>
    ) : (
        <div className="d-flex text-white flex-column pb-2 animate__animated animate__fadeIn my-4 overflowXHidden">
            <div className="d-flex align-items-center justify-content-between">
                <Link
                    to={"/user/" + userCommented}
                    className="d-flex align-items-center"
                >
                    <div className="profile-pic bg-white text-black">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="avatar_user"
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <>{user.username || "user"}</>
                        )}
                    </div>
                    <div className="d-flex align-items-center justify-content-between flex-fill">
                        <div className="ms-3 d-flex align-items-center justify-content-between">
                            <div className="d-flex text-white fs-4 flex-column">
                                <div className="fw-bold">
                                    {user._id === authorPost ? (
                                        <>
                                            <span className="author me-2">
                                                Author
                                            </span>
                                            @{user.username}
                                        </>
                                    ) : (
                                        `@${user.username}` || "user"
                                    )}
                                </div>
                                <div>commented {formatTime(createdAt)}</div>
                            </div>
                        </div>
                    </div>
                </Link>
                {currentUser._id === userCommented && (
                    <UilTrash
                        onClick={() => {
                            handleComment();
                            deleteComments();
                        }}
                        style={{
                            cursor: "pointer",
                        }}
                    />
                )}
            </div>
            <div
                className="mt-2 fs-3 text-break border border-1 p-3"
                style={{
                    marginLeft: "2.8em",
                    borderRadius: "1rem",
                }}
            >
                {content}
            </div>
        </div>
    );
};

export default Comment;
