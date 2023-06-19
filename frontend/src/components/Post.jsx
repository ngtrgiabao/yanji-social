import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    UilBookmark,
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

import {
    deletePost,
    getAllPosts,
    likePost,
    sharePost,
} from "../redux/request/postRequest";
import { getUserByID } from "../redux/request/userRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";

import KAYO_AVATAR from "../assets/avatar/kayo.jpg";

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
    const [posts, setPosts] = useState([]);
    const [popup, setPopup] = useState(false);
    const [username, setUsername] = useState("");

    const dispatch = useDispatch();
    const formatTime = useTimeAgo;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        console.log(currentUser);
    }, []);

    useEffect(() => {
        let isCancelled = false;

        getAllPosts(dispatch)
            .then((data) => {
                if (!isCancelled) {
                    setPosts(data.posts);
                }
            })
            .catch((err) => {
                console.error(err);
            });

        return () => {
            isCancelled = true;
        };
    }, [dispatch]);

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
        getUserByID(dispatch, userID)
            .then((data) => {
                setUsername(data.user.username);
            })
            .catch((err) => {
                console.error("Failed", err);
            });
    }, []);

    const handlePopup = (e) => {
        e.stopPropagation();

        setPopup((popup) => !popup);
    };

    const handleSharePost = async (postID) => {
        const post = {
            userID: currentUser._id,
            postID: postID,
        };

        try {
            const updatedPost = await sharePost(post, dispatch);
            const updatedPosts = posts.map((p) => {
                if (p && p._id === updatedPost?._id) {
                    return updatedPost;
                }
                return p;
            });
            setPosts(updatedPosts);
        } catch (error) {
            console.error("Failed to share post", error);
        }
    };

    const handleLikePost = async (postID) => {
        const post = {
            userID: currentUser._id,
            postID: postID,
        };

        try {
            const updatedPost = await likePost(post, dispatch);
            const updatedPosts = posts.map((p) => {
                if (p && p._id === updatedPost?._id) {
                    return updatedPost;
                }
                return p;
            });
            setPosts(updatedPosts);
        } catch (error) {
            console.error("Failed to like post", error);
        }
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

    return (
        <div className="post">
            <div className="head">
                <div className="user">
                    <Link
                        to="/user"
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
                    <Link to="/user" className="info">
                        <div className="d-flex align-items-center">
                            <h3>{username}</h3>
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
            <div className="action-buttons d-flex justify-content-between align-items-center">
                <div className="interaction-buttons d-flex align-items-center gap-4">
                    <span
                        className="d-flex align-items-center share"
                        onClick={() => handleSharePost(postID)}
                    >
                        {/* share */}
                        {shares.includes(currentUser._id) ? (
                            <span>
                                <FontAwesomeIcon
                                    icon={faRepeat}
                                    style={{
                                        fontSize: "1.4em",
                                        color: "var(--color-blue)",
                                    }}
                                />
                            </span>
                        ) : (
                            <span>
                                <FontAwesomeIcon
                                    icon={faRepeat}
                                    style={{
                                        fontSize: "1.4em",
                                    }}
                                />
                            </span>
                        )}
                        <div className="ms-2">
                            <b>{shares.length}</b>
                        </div>
                    </span>
                    <span className="d-flex align-items-center comment">
                        {/* comment */}
                        <span>
                            <FontAwesomeIcon
                                icon={faComment}
                                style={{
                                    fontSize: "1.4em",
                                }}
                            />
                        </span>
                        <div className="ms-2">
                            <b>{comments.length}</b>
                        </div>
                    </span>
                    <span
                        className="d-flex align-items-center heart"
                        onClick={() => handleLikePost(postID)}
                    >
                        {/* like */}
                        {likes.includes(currentUser._id) ? (
                            <span>
                                <FontAwesomeIcon
                                    icon={liked}
                                    style={{
                                        fontSize: "1.4em",
                                        color: "crimson",
                                    }}
                                />
                            </span>
                        ) : (
                            <span>
                                <FontAwesomeIcon
                                    icon={likeDefault}
                                    style={{
                                        fontSize: "1.4em",
                                    }}
                                />
                            </span>
                        )}

                        <div className="ms-2">
                            <b>{likes.length}</b>
                        </div>
                    </span>
                </div>
                <div className="bookmark">
                    <span>
                        <UilBookmark />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Post;
