import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { io } from "socket.io-client";

import { commentPost } from "../redux/request/postRequest";
import Comment from "./Comment";
import { getAllCommentsByPostID } from "../redux/request/commentRequest";
import { pushNewNotification } from "../redux/request/notificationRequest";
import { COMMENT_POST } from "../constants/noti.type.constant";
import { getUserByID } from "../redux/request/userRequest";

const Comments = ({ postID, author, socket }) => {
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const handleSocket = {
        commentPost: useCallback(
            (data) => {
                const sortLatestComments = data.reverse();
                setComments(sortLatestComments);
            },
            [comments]
        ),
    };

    const fetchComments = () => {
        getAllCommentsByPostID(postID, dispatch).then((data) => {
            const { comments } = data;
            setComments(comments);
        });
    };

    useEffect(() => {
        fetchComments();
        socket = io(SOCKET_URL);

        socket.on("updated-post", (data) => {
            const { _id } = data;
            if (_id === postID) {
                fetchComments();
            }
        });
    }, []);

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.on("commented-post", handleSocket.commentPost);

        return () => {
            socket.off("commented-post", handleSocket.commentPost);
        };
    }, [handleSocket.commentPost]);

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handleComment = {
        commentPost: () => {
            const newComment = {
                _id: postID,
                userID: currentUser._id,
                postID: postID,
            };

            if (content) {
                newComment.content = content;
                commentPost(newComment, dispatch)
                    .then(async (data) => {
                        const { comments } = data.data;
                        const updatePost = {
                            _id: postID,
                        };

                        socket = io(SOCKET_URL);

                        await socket.emit("update-post", updatePost);
                        await socket.emit("comment-post", {
                            comments: comments,
                            postID: postID,
                        });

                        if (author._id !== currentUser._id) {
                            const notification = {
                                sender: currentUser._id,
                                receiver: author._id,
                                type: COMMENT_POST,
                            };

                            pushNewNotification(notification, dispatch)
                                .then((data) => {
                                    socket.emit("push-notification", data.data);
                                })
                                .catch((err) => {
                                    console.error(
                                        "Failed to create new notification",
                                        err
                                    );
                                });
                        }
                    })
                    .catch((err) => {
                        console.error("Failed to comment", err);
                    });

                setContent("");
            }
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleComment.commentPost();
    };

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    const [user, setUser] = useState({
        profilePicture: "",
        username: "",
    });

    useEffect(() => {
        currentUser &&
            getUserByID(currentUser._id, dispatch).then((data) => {
                const { profilePicture, username } = data.user;

                setUser({
                    username: username,
                    profilePicture: profilePicture,
                });
            });
    }, [currentUser, dispatch]);

    return (
        <>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="d-flex align-items-center justify-content-between border-bottom pb-4 mb-4 w-100 rounded-0 p-0 overflowXHidden"
                style={{
                    background: "unset",
                    outline: "0",
                }}
            >
                <div className="profile-pic">
                    {user.profilePicture ? (
                        <img
                            src={user.profilePicture}
                            alt="avatar_user"
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <>{user.username || currentUser.username}</>
                    )}
                </div>
                <div className="flex-fill mx-2">
                    <input
                        type="text"
                        className="fs-3 p-2 px-4 w-100 border-0"
                        placeholder="Đăng bình luận của bạn"
                        value={content}
                        onChange={handleContent}
                        style={{
                            borderRadius: "2rem",
                        }}
                        maxLength={200}
                    />
                </div>
                <button
                    style={{
                        width: "7%",
                        background: "none",
                    }}
                    className="fs-3 p-2 border-0 text-white"
                    type="submit"
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>

            {/* Comment */}
            {comments.map((c) => (
                <Comment
                    key={c._id}
                    createdAt={c.createdAt}
                    content={c.content}
                    userCommented={c.userID}
                    authorPost={author._id}
                    postID={postID}
                    commentID={c._id}
                    socket={socket}
                />
            ))}
        </>
    );
};

export default Comments;
