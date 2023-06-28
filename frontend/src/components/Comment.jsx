import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UilEllipsisH } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

import { getUserByID } from "../redux/request/userRequest";
import { getCommentByID, deleteComment } from "../redux/request/commentRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";
import { io } from "socket.io-client";

const Comment = ({ userID, createdAt, content, commentID, postID }) => {
    const [user, setUser] = useState({
        _id: "",
        username: "",
        profilePicture: "",
    });
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    const formatTime = useTimeAgo;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handleComment = () => {
        setIsActive((isActive) => !isActive);
    };

    useEffect(() => {
        userID &&
            getUserByID(userID, dispatch)
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

    // const socketRef = useRef(null);
    // const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
    // socketRef.current = io(SOCKET_URL);
    // const socket = socketRef.current;

    const renderSettingComment = () => {
        // getCommentByID(commentID, dispatch).then((data) => {
        //     console.log(data);
        // });
        // deleteComment(commentID, dispatch).then(async () => {
        //     const updatePost = {
        //         _id: postID,
        //     };

        //     await socket.emit("update-post", updatePost);
        // });
    };

    return (
        <div
            className="d-flex text-white flex-column pb-2 animate__animated animate__fadeIn my-4"
            style={{
                overflowX: "hidden",
            }}
        >
            <div className="d-flex align-items-center justify-content-between">
                <Link
                    to={"/user/" + userID}
                    className="d-flex align-items-center"
                >
                    <div className="profile-pic bg-white text-black d-flex justify-content-center align-items-center">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="avatar_user"
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <>{user.username}</>
                        )}
                    </div>
                    <div className="d-flex align-items-center justify-content-between flex-fill">
                        <div className="ms-3 d-flex align-items-center justify-content-between">
                            <div className="d-flex text-white fs-4 flex-column">
                                <div className="fw-bold">@{user.username}</div>
                                <div>commented {formatTime(createdAt)}</div>
                            </div>
                        </div>
                    </div>
                </Link>
                {currentUser._id === userID && (
                    <UilEllipsisH
                        className="dots"
                        onClick={handleComment}
                        style={{
                            cursor: "pointer",
                        }}
                    />
                )}

                {isActive && renderSettingComment()}
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
