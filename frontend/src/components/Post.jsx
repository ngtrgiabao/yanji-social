import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    UilEllipsisH,
    UilTrash,
    UilBell,
    UilTimesSquare,
    UilLinkAlt,
    UilUserTimes,
    UilExclamationTriangle,
} from "@iconscout/react-unicons";
import {
    faHeart as likeDefault,
    faComment,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as liked, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";

import KAYO_AVATAR from "../assets/avatar/kayo.jpg";

import "../style/components/post.css";

import { deletePost, likePost, sharePost } from "../redux/request/postRequest";
import { getUserByID } from "../redux/request/userRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";

const Post = ({
    image,
    postID,
    userID,
    createdAt,
    desc,
    likes,
    shares,
    comments,
}) => {
    const [popup, setPopup] = useState(false);
    const [username, setUsername] = useState("User");

    const dispatch = useDispatch();
    const formatTime = useTimeAgo;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        const handleClickOutside = () => {
            setPopup(false);
        };

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [popup]);

    useEffect(() => {
        getUserByID(userID, dispatch)
            .then((data) => {
                setUsername(data?.user.username);
            })
            .catch((err) => {
                console.error("Failed", err);
            });
    }, []);

    const handlePopup = (e) => {
        e.stopPropagation();

        setPopup((popup) => !popup);
    };

    const handleDeletePost = async (postID) => {
        try {
            await deletePost(postID, dispatch);
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    const renderEditPost = () => {
        return (
            <div className="edit-post" hidden={!popup}>
                <ul>
                    <li
                        className="delete-post"
                        onClick={() => handleDeletePost(postID)}
                    >
                        <span>
                            <UilTrash />
                        </span>
                        Delete this post
                    </li>
                    <li>
                        <span>
                            <UilBell />
                        </span>
                        Notification for this post
                    </li>
                    <li>
                        <span>
                            <UilLinkAlt />
                        </span>
                        Copy link of this post
                    </li>
                    <li>
                        <span>
                            <UilTimesSquare />
                        </span>
                        Hide this post
                    </li>
                    <li>
                        <span>
                            <UilUserTimes />
                        </span>
                        Unfollow
                    </li>
                    <li>
                        <span>
                            <UilExclamationTriangle />
                        </span>
                        Report
                    </li>
                </ul>
            </div>
        );
    };

    const socketRef = useRef(null);
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
    socketRef.current = io(SOCKET_URL);
    const socket = socketRef.current;
    const post = {
        userID: currentUser._id,
        postID: postID,
    };

    const handlePost = {
        likePost: () => {
            likePost(post, dispatch)
                .then(async (data) => {
                    await socket.emit("update-post", data.data);
                })
                .catch((error) => {
                    console.error("Failed to like post", error);
                });
        },
        sharePost: async () => {
            sharePost(post, dispatch)
                .then(async (data) => {
                    await socket.emit("update-post", data.data);
                })
                .catch((error) => {
                    console.error("Failed to share post", error);
                });
        },
    };

    return (
        <div className="post">
            <div className="head">
                <div className="user">
                    <Link
                        to={`/user/${currentUser._id}`}
                        className="profile-pic bg-white"
                        aria-label="Avatar user"
                    >
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={currentUser.profilePicture || KAYO_AVATAR}
                            alt="Avatar user"
                        />
                    </Link>
                    <Link to={`/user/${currentUser._id}`} className="info">
                        <div className="d-flex align-items-center">
                            <div className="fs-4 fw-bold">{username}</div>
                            <span className="mx-2">●</span>
                            <div className="fs-5">
                                {formatTime(createdAt) || "now"}
                            </div>
                        </div>
                        <span>@{username}</span>
                    </Link>
                </div>

                <span className="post-settings">
                    <UilEllipsisH
                        className="dots"
                        onClick={(e) => {
                            handlePopup(e);
                        }}
                    />
                    {renderEditPost()}
                </span>
            </div>

            <div className="caption">
                <p>{desc}</p>
            </div>
            {image && (
                <div className="photo">
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src={image}
                        alt="Photo of post"
                    />
                </div>
            )}
            <div className="action-buttons d-flex justify-content-between align-items-center fs-3">
                <div className="interaction-buttons d-flex justify-content-between w-100 align-items-center gap-4">
                    <span
                        className="d-flex justify-content-center align-items-center share flex-fill p-1 post-action__btn rounded-2"
                        onClick={() => handlePost.sharePost(postID)}
                    >
                        {/* share */}
                        {shares.includes(currentUser._id) ? (
                            <span>
                                <FontAwesomeIcon
                                    icon={faRepeat}
                                    style={{
                                        color: "var(--color-blue)",
                                    }}
                                />
                            </span>
                        ) : (
                            <span>
                                <FontAwesomeIcon icon={faRepeat} />
                            </span>
                        )}
                        <div className="ms-2">
                            <b>{shares.length}</b>
                        </div>
                    </span>
                    <span className="d-flex justify-content-center align-items-center comment flex-fill p-1 post-action__btn rounded-2">
                        {/* comment */}
                        <span>
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                        <div className="ms-2">
                            <b>{comments.length}</b>
                        </div>
                    </span>
                    <span
                        className="d-flex justify-content-center align-items-center heart flex-fill p-1 post-action__btn rounded-2"
                        onClick={() => handlePost.likePost()}
                    >
                        {/* like */}
                        {likes.includes(currentUser._id) ? (
                            <span>
                                <FontAwesomeIcon
                                    icon={liked}
                                    style={{
                                        color: "crimson",
                                    }}
                                />
                            </span>
                        ) : (
                            <span>
                                <FontAwesomeIcon icon={likeDefault} />
                            </span>
                        )}

                        <div className="ms-2">
                            <b>{likes.length}</b>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Post;
