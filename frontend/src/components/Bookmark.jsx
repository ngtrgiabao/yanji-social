import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import Loading from "../pages/loading/LoadingPage";
import { getPostByID } from "../redux/request/postRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";
import { getUserByID, updateUser } from "../redux/request/userRequest";

import DEFAULT_AVATAR from "../assets/background/default_bg_user.svg";

const Bookmark = ({ postID, createdAt, socket }) => {
    const dispatch = useDispatch();
    const [post, setPost] = useState({
        desc: "",
        likes: 0,
        img: "",
        video: "",
        isExisting: false,
    });
    const [author, setAuthor] = useState({
        username: "",
        avatar: "",
        authorID: "",
    });
    const formatTime = useTimeAgo;
    const navigate = useNavigate();

    const handleVisitLink = (link) => {
        navigate(link);
    };

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
                    const { username, _id, profilePicture } = data.user;
                    setPost({
                        desc: desc,
                        likes: likes.length,
                        img: img,
                        video: video,
                        isExisting: true,
                    });
                    setAuthor({
                        username: username,
                        avatar: profilePicture,
                        authorID: _id,
                    });
                });
            } else {
                setPost({
                    ...post,
                    author: "This post has been deleted :<",
                    authorID: "null",
                });
                setAuthor({
                    avatar: DEFAULT_AVATAR,
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
                {author.authorID ? (
                    <div className="h-100 d-flex flex-column justify-content-between">
                        <div
                            onClick={() =>
                                handleVisitLink(`/user/${author.authorID}`)
                            }
                            className="card-title fs-4 fw-bold d-flex align-items-center"
                            style={{
                                color: "var(--color-primary)",
                                width: "max-content",
                            }}
                            data-title
                        >
                            <div
                                className="profile-pic bg-black text-white me-2"
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                {author.avatar ? (
                                    <img
                                        loading="lazy"
                                        role="presentation"
                                        decoding="async"
                                        src={author.avatar || DEFAULT_AVATAR}
                                        alt="Avatar user"
                                        className="w-100"
                                    />
                                ) : (
                                    author.username
                                )}
                            </div>
                            <span className="link-underline ">
                                {author.username}
                            </span>
                        </div>

                        {post.isExisting ? (
                            <div
                                className="caption overflow-hidden fw-light fs-4 d-flex flex-column link-underline"
                                style={{
                                    height: "20rem",
                                    color: "unset",
                                }}
                                onClick={() =>
                                    handleVisitLink(`/post/${postID}`)
                                }
                                data-content
                            >
                                {post.desc}
                                {post.img && (
                                    <img
                                        src={post.img}
                                        alt="post_image"
                                        className="w-100"
                                        style={{
                                            objectFit: "cover",
                                        }}
                                    />
                                )}
                            </div>
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

                        <p data-time className="card-text mt-3">
                            <small className="text-body-secondary">
                                Saved {formatTime(createdAt)}
                            </small>
                        </p>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};

export default Bookmark;
