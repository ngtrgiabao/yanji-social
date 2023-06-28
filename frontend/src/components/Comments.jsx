import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { io } from "socket.io-client";

import { commentPost } from "../redux/request/postRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";
import Comment from "./Comment";

//TODO FIX DUPLICATION USER WHEN COMMENT

const Comments = ({ author, comments, postID }) => {
    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    const socketRef = useRef(null);
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
    socketRef.current = io(SOCKET_URL);
    const socket = socketRef.current;

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
                    .then(async () => {
                        await socket.emit("update-post", newComment);
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

    const sortedLatestComments = [...comments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="d-flex align-items-center justify-content-between border-bottom pb-4 mb-4 w-100 rounded-0 p-0"
                style={{
                    overflowX: "hidden",
                    background: "unset",
                    outline: "0",
                }}
            >
                <div className="profile-pic bg-white">
                    <img
                        src={currentUser.profilePicture}
                        alt="avatar_user"
                        style={{
                            objectFit: "cover",
                        }}
                    />
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
            {sortedLatestComments.map((c, index) => (
                <Comment
                    key={index}
                    createdAt={c.createdAt}
                    content={c.content}
                    userID={c.userID}
                    // postID={postID}
                    commentID={c._id}
                />
            ))}
        </>
    );
};

export default Comments;
