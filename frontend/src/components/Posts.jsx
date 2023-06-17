import { useEffect, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as liked, faRepeat } from "@fortawesome/free-solid-svg-icons";
import {
    faHeart as likeDefault,
    faComment,
    faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";

import {
    getAllPostsByUser,
    likePost,
    sharePost,
} from "../redux/request/postRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";

const options = {
    hour: "numeric",
    minute: "numeric",
};

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [popup, setPopup] = useState(false);

    const formatTime = useTimeAgo;
    const dispatch = useDispatch();

    const user = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        getAllPostsByUser(user._id, dispatch)
            .then((data) => {
                setPosts(data.posts);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        const handleClickOutside = () => {
            setPopup(false);
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handlePopup = (e) => {
        e.stopPropagation();

        setPopup((popup) => !popup);
    };

    const renderEditPost = () => {
        return (
            <div className="edit-post" hidden={!popup}>
                <ul>
                    <li className="delete-post">
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

    const renderUserLikedPost = () => {
        return (
            <>
                <span>
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src="https:images.unsplash.com/photo-1656576413714-b3e5a3d2aab3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt="Avatar user"
                    />
                </span>
                <span>
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src="https://images.unsplash.com/photo-1656437660370-4e8886a0e8ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                        alt="Avatar user"
                    />
                </span>
                <span>
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src="https://images.unsplash.com/photo-1656354798706-bc0c3b99f291?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNzd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt="Avatar user"
                    />
                </span>
            </>
        );
    };

    const handleLikePost = async (postID) => {
        const post = {
            userID: user._id,
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

    const handleSharePost = async (postID) => {
        const post = {
            userID: user._id,
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

    return posts.map((post) => (
        <div key={post._id} className="post">
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
                            src={post.img}
                            alt="Avatar user"
                        />
                    </Link>
                    <Link to="/user" className="info">
                        <div className="d-flex align-items-center">
                            <h3>{post.userID}</h3>
                            <span className="mx-2">●</span>
                            <div className="fs-5">
                                {formatTime(post.createdAt) || "now"}
                            </div>
                        </div>
                        <span>@{post.userID}</span>
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
                <p>{post.desc}</p>
            </div>
            {post.img && (
                <div className="photo">
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src={post.img}
                        alt="Photo of post"
                    />
                </div>
            )}
            <div className="action-buttons d-flex justify-content-between align-items-center">
                <div className="interaction-buttons d-flex gap-4">
                    <span
                        className="d-flex align-content-center share"
                        onClick={() => handleSharePost(post._id)}
                    >
                        {/* share */}
                        {post.shares.includes(user._id) ? (
                            <FontAwesomeIcon
                                icon={faRepeat}
                                style={{
                                    fontSize: "1.4em",
                                    color: "var(--color-blue)",
                                }}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faRepeat}
                                style={{
                                    fontSize: "1.4em",
                                }}
                            />
                        )}
                        <p className="ms-2">
                            <b>{post.shares.length}</b>
                        </p>
                    </span>
                    <span className="d-flex align-content-center comment">
                        {/* comment */}
                        <FontAwesomeIcon
                            icon={faComment}
                            style={{
                                fontSize: "1.4em",
                            }}
                        />
                        <p className="ms-2">
                            <b>{post.comments.length}</b>
                        </p>
                    </span>
                    <span
                        className="d-flex align-content-center heart"
                        onClick={() => handleLikePost(post._id)}
                    >
                        {/* like */}
                        {post.likes.includes(user._id) ? (
                            <FontAwesomeIcon
                                icon={liked}
                                style={{
                                    fontSize: "1.4em",
                                    color: "crimson",
                                }}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={likeDefault}
                                style={{
                                    fontSize: "1.4em",
                                }}
                            />
                        )}

                        <p className="ms-2">
                            <b>{post.likes.length}</b>
                        </p>
                    </span>
                </div>
                <div className="bookmark">
                    <span>
                        <UilBookmark />
                    </span>
                </div>
            </div>
            <div className="liked-by">{renderUserLikedPost()}</div>
            <div className="comments text-muted">View all comments</div>
        </div>
    ));
};

export default Posts;
