import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

import Loading from "../pages/loading/LoadingPage";
import { getPostByID } from "../redux/request/postRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";
import { getUserByID, updateUser } from "../redux/request/userRequest";

const Bookmark = ({ postID, createdAt, socket }) => {
    const dispatch = useDispatch();
    const [post, setPost] = useState({
        desc: "",
        likes: 0,
        img: "",
        video: "",
        author: "",
        authorID: "",
        isExisting: false,
    });
    const formatTime = useTimeAgo;
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handleDeletePostSaved = (postID) => {
        const updatedUser = {
            userID: currentUser._id,
            postSaved: { postID: postID },
        };

        updateUser(updatedUser, dispatch)
            .then(() => {
                socket = io(SOCKET_URL);

                socket.emit("delete-saved", { postID: postID });
            })
            .catch((err) => {
                console.error("Failed to save", err);
            });
    };

    useEffect(() => {
        getPostByID(postID, dispatch).then((data) => {
            if (data) {
                const { desc, likes, img, video, userID } = data.data;

                getUserByID(userID, dispatch).then((data) => {
                    const { username, _id } = data.user;
                    setPost({
                        desc: desc,
                        likes: likes.length,
                        img: img,
                        video: video,
                        author: username,
                        authorID: _id,
                        isExisting: true,
                    });
                });
            } else {
                setPost({
                    ...post,
                    author: "This post has been deleted from author :<",
                    authorID: "null",
                });
            }
        });
    }, [postID, dispatch]);

    return (
        <div className="card shadow-sm bg-body-tertiary text-black h-100 w-100">
            <div
                className="card-body d-flex flex-column justify-content-between"
                style={{
                    height: "28rem",
                }}
            >
                {post.authorID ? (
                    <>
                        <div>
                            <Link
                                to={`/user/${post.authorID}`}
                                className="card-title fs-3 link-underline fw-bold"
                                style={{
                                    color: "var(--color-primary)",
                                }}
                                data-title
                            >
                                {post.author}
                            </Link>

                            {post.isExisting ? (
                                <Link
                                    to={`/post/${postID}`}
                                    className="caption overflow-hidden fw-light fs-4 d-flex flex-column link-underline"
                                    style={{
                                        height: "20rem",
                                        color: "unset"
                                    }}
                                    data-content
                                >
                                    {post.desc}
                                    {post.img && (
                                        <img
                                            src={post.img}
                                            alt="post_image"
                                            className="w-100 mt-2"
                                            style={{
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}
                                </Link>
                            ) : (
                                <div
                                    className="fs-3 d-flex justify-content-center align-items-center"
                                    style={{
                                        height: "20rem",
                                    }}
                                >
                                    <button
                                        className="p-2 border-0 bg-danger text-white"
                                        style={{
                                            borderRadius: "0.5rem",
                                        }}
                                        onClick={() => {
                                            handleDeletePostSaved(postID);
                                        }}
                                    >
                                        Delete this post ?
                                    </button>
                                </div>
                            )}
                        </div>
                        <p data-time className="card-text">
                            <small className="text-body-secondary">
                                Saved {formatTime(createdAt)}
                            </small>
                        </p>
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};

export default Bookmark;
