import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { io } from "socket.io-client";

import { commentPost } from "../redux/request/postRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";

const Comment = ({ author, comments, postID }) => {
    const [content, setContent] = useState("");
    const dispatch = useDispatch();

    const formatTime = useTimeAgo;

    const socketRef = useRef(null);
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
    socketRef.current = io(SOCKET_URL);
    const socket = socketRef.current;

    const handleComment = {
        commentPost: () => {
            const newComment = {
                _id: postID,
                userID: author._id,
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

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    const sortedComments = [...comments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    console.log(sortedComments);

    return (
        <>
            <div className="d-flex align-items-center justify-content-between border-bottom pb-4 mb-4">
                <div className="profile-pic bg-white">
                    <img
                        src={author.profilePicture}
                        alt="avatar_user"
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div className="flex-fill mx-2">
                    <input
                        type="text"
                        className="fs-3 p-2 w-100 border-0"
                        placeholder="Đăng bình luận của bạn"
                        value={content}
                        onChange={handleContent}
                    />
                </div>
                <button
                    onClick={() => handleComment.commentPost()}
                    style={{
                        width: "7%",
                    }}
                    className="fs-3 p-2"
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>

            {/* Comment */}
            {sortedComments.map((c) => (
                <div key={c._id} className="d-flex text-white flex-column pb-2">
                    <div className="d-flex align-items-center">
                        <div className="profile-pic bg-white">
                            <img
                                src={author.profilePicture}
                                alt="avatar_user"
                            />
                        </div>
                        <div className="ms-3 d-flex align-items-center">
                            <Link
                                to="/"
                                className="d-flex align-items-center text-white"
                            >
                                <div className="fw-bold fs-4">
                                    {author.username}
                                </div>
                                <div className="mx-2 fs-4 fw-light">
                                    @{author.username} -
                                </div>
                                <div>commented {formatTime(c.createdAt)}</div>
                            </Link>
                        </div>
                    </div>
                    <div
                        className="mt-2 fs-3 text-break border border-2 p-3"
                        style={{
                            marginLeft: "2.8em",
                            borderRadius: "1rem",
                        }}
                    >
                        {c.content}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Comment;
