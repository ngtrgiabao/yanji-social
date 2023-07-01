import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    UilEllipsisH,
    UilTrash,
    UilTimesSquare,
    UilLinkAlt,
    UilUserTimes,
    UilExclamationTriangle,
} from "@iconscout/react-unicons";
import {
    faHeart as likeDefault,
    faComment,
    faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as liked, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";

import DEFAULT_AVATAR from "../assets/background/default_bg_user.svg";

import "../style/components/post.css";

import { deletePost, likePost, sharePost } from "../redux/request/postRequest";
import { getPostsShared, getUserByID } from "../redux/request/userRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";
import DetailsPost from "./DetailsPost";
import ParagraphWithLink from "./ParagraphWithLink";
import EditPopup from "./EditPopup";

const Post = ({
    image,
    video,
    postID,
    userID,
    createdAt,
    updatedAt,
    desc,
    likes,
    shares,
    comments,
    socket,
}) => {
    const [popup, setPopup] = useState("");
    const [user, setUser] = useState({
        _id: "",
        username: "",
        profilePicture: "",
    });
    const [postShared, setPostShared] = useState([]);
    const videoRef = useRef(null);

    const dispatch = useDispatch();
    const formatTime = useTimeAgo;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    useEffect(() => {
        getPostsShared(currentUser._id, dispatch).then((data) => {
            const { postShared } = data;
            setPostShared(postShared.map((p) => p.postID));
        });
    }, []);

    useEffect(() => {
        const handleClickOutside = () => {
            setPopup("");
        };

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [popup]);

    useEffect(() => {
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
                console.error("Failed", err);
            });
    }, []);

    const handleSetting = (e) => {
        e.stopPropagation();
        if (popup !== "SETTING") {
            setPopup("SETTING");
        } else {
            setPopup("");
        }
    };

    const handleDetailsPost = (e) => {
        e.stopPropagation();
        if (popup !== "DETAILS") {
            setPopup("DETAILS");
        } else {
            setPopup("");
        }
    };

    const handleEditPost = () => {
        if (popup !== "EDIT") {
            setPopup("EDIT");
        } else {
            setPopup("");
        }
    };

    const post = {
        userID: currentUser._id,
        postID: postID,
    };

    const handlePost = {
        likePost: () => {
            likePost(post, dispatch)
                .then(async (data) => {
                    socket = io(SOCKET_URL);

                    await socket.emit("update-post", data.data);
                })
                .catch((error) => {
                    console.error("Failed to like post", error);
                });
        },
        sharePost: async () => {
            sharePost(post, dispatch)
                .then(async (data) => {
                    socket = io(SOCKET_URL);

                    await socket.emit("update-post", data.data);
                })
                .catch((error) => {
                    console.error("Failed to share post", error);
                });
        },
        deletePost: async (postID) => {
            try {
                socket = io(SOCKET_URL);

                deletePost(postID, dispatch).then(async (data) => {
                    await socket.emit("delete-post", data.data);
                });
            } catch (error) {
                console.error("Failed to delete post", error);
            }
        },
    };

    const renderTitle = () => {
        return (
            <div className="user">
                <Link
                    to={`/user/${user._id}`}
                    className="profile-pic bg-black text-white d-flex justify-content-center align-items-center border"
                    aria-label="Avatar user"
                >
                    {user.profilePicture ? (
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={user.profilePicture || DEFAULT_AVATAR}
                            alt="Avatar user"
                        />
                    ) : (
                        user.username
                    )}
                </Link>
                <Link to={`/user/${user._id}`} className="info">
                    <div className="d-flex align-items-center fs-5">
                        <div className="fw-bold">{user.username}</div>
                        <span className="mx-2">●</span>
                        <div>Upload {formatTime(createdAt) || "now"}</div>

                        {postShared.includes(postID) && (
                            <div className="d-flex align-items-center">
                                <span className="mx-2">●</span>
                                Shared
                            </div>
                        )}
                    </div>
                    <span>
                        <>@{user.username}</>
                    </span>
                </Link>
            </div>
        );
    };

    const renderEditPost = () => {
        return (
            <div className="edit-post" hidden={popup !== "SETTING"}>
                <ul>
                    <li
                        className="delete-post"
                        onClick={() => handlePost.deletePost(postID)}
                    >
                        <span>
                            <UilTrash />
                        </span>
                        Delete this post
                    </li>
                    <li
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditPost();
                        }}
                    >
                        <span className="fs-2">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </span>
                        Edit this post
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

    const renderActionBtn = () => {
        return (
            <div className="action-buttons d-flex justify-content-between align-items-center fs-3 border-top pt-3">
                <div className="interaction-buttons d-flex justify-content-between w-100 align-items-center gap-4">
                    <span
                        className="d-flex justify-content-center align-items-center share flex-fill p-1 post-action__btn rounded-2"
                        onClick={() => handlePost.sharePost()}
                    >
                        {/* share */}
                        <span>
                            {shares.includes(currentUser._id) ? (
                                <FontAwesomeIcon
                                    icon={faRepeat}
                                    style={{
                                        color: "var(--color-blue)",
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon icon={faRepeat} />
                            )}
                        </span>
                        <div className="ms-2">
                            <b>{shares.length}</b>
                        </div>
                    </span>
                    <span
                        className="d-flex justify-content-center align-items-center comment flex-fill p-1 post-action__btn rounded-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDetailsPost(e);
                        }}
                    >
                        {/* comment */}
                        <span>
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                        <div className="ms-2">
                            <b>{comments.length}</b>
                        </div>
                    </span>
                    <span
                        className="d-flex justify-content-center align-items-center heart flex-fill p-1 post-action__btn rounded-2 overflow-hidden"
                        onClick={() => handlePost.likePost()}
                    >
                        {/* like */}
                        <span>
                            {likes.includes(currentUser._id) ? (
                                <FontAwesomeIcon
                                    icon={liked}
                                    style={{
                                        color: "crimson",
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon icon={likeDefault} />
                            )}
                        </span>
                        <div className="ms-2">
                            <b>{likes.length}</b>
                        </div>
                    </span>
                </div>
            </div>
        );
    };

    const renderPost = () => {
        return (
            <div className="post mb-4">
                <div className="head">
                    {renderTitle()}

                    {user._id === currentUser._id && (
                        <span className="post-settings">
                            <UilEllipsisH
                                className="dots"
                                onClick={(e) => {
                                    handleSetting(e);
                                }}
                            />
                            {renderEditPost()}
                        </span>
                    )}
                </div>

                <div className="caption fs-3 my-3">
                    <ParagraphWithLink text={desc} />
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

                {video && (
                    <div className="photo">
                        <video
                            preload="metadata"
                            className="w-100"
                            ref={videoRef}
                            controls
                            draggable="false"
                            muted
                            autoPlay
                            loop
                        >
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}

                {renderActionBtn()}
            </div>
        );
    };

    const renderDetailsPost = () => {
        return (
            popup === "DETAILS" && (
                <DetailsPost
                    onPopup={handleDetailsPost}
                    animateClass="animate__animated animate__fadeIn"
                    children={renderPost()}
                    author={user}
                    postID={postID}
                    socket={socket}
                />
            )
        );
    };

    const renderEditPostPopup = () => {
        return (
            popup === "EDIT" && (
                <EditPopup
                    title="Edit post"
                    onPopup={handleEditPost}
                    currentUser={currentUser}
                    defaultAvatar={DEFAULT_AVATAR}
                    imageSrc={image}
                    content={desc}
                    socket={socket}
                    postID={postID}
                    animateClass="animate__animated animate__fadeIn"
                />
            )
        );
    };

    return (
        <>
            {renderPost()}
            {renderDetailsPost()}
            {renderEditPostPopup()}
        </>
    );
};

export default Post;
