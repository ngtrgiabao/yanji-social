import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { io } from "socket.io-client";

import { commentPost } from "../redux/request/postRequest";
import Comment from "./Comment";
import { getAllCommentsByPostID } from "../redux/request/commentRequest";

const Comments = ({ postID, author, socket }) => {
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const handleSocket = {
        commentPost: useCallback(
            (data) => {
                const updatedComments = data.reverse();
                setComments(updatedComments);
            },
            [comments]
        ),
    };

    useEffect(() => {
        getAllCommentsByPostID(postID, dispatch).then((data) => {
            const { comments } = data;
            setComments(comments);
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
                socket = io(SOCKET_URL);

                newComment.content = content;
                commentPost(newComment, dispatch)
                    .then(async (data) => {
                        const { comments } = data.data;
                        await socket.emit("comment-post", comments);
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
