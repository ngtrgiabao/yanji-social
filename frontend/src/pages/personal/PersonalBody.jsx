import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";

import "../../style/pages/personal/personalBody.css";

import PersonalFriends from "./PersonalFriends";
import PersonalIntroduce from "./PersonalIntroduce";
import PersonalSocialLinks from "./PersonalSocialLinks";
import PostPopup from "../../components/PostPopup";
import Post from "../../components/Post";
import {
    getAllPostsByUser,
    getPostByID,
} from "../../redux/request/postRequest";
import { io } from "socket.io-client";
import { getPostsShared, getUserByID } from "../../redux/request/userRequest";

//TODO FIX POST SHARED ALWAYS PIN

const PersonalBody = ({ user, socket, onUpdateBioPopup }) => {
    const [popup, setPopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const socketRef = useRef(null);

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const handlePopup = () => {
        setPopup((popup) => !popup);
    };

    const renderPostPopup = () => {
        return (
            popup && (
                <PostPopup
                    socket={socket}
                    onPopup={handlePopup}
                    extendClass="animate__animated animate__fadeIn"
                />
            )
        );
    };

    const handleSocket = {
        updatePost: useCallback(
            (data) => {
                const { _id } = data;
                getPostByID(_id, dispatch).then((data) => {
                    setPosts((prevPosts) => {
                        const updatePost = prevPosts.map((p) =>
                            p?._id === data?.data._id ? data.data : p
                        );

                        return updatePost;
                    });
                });
            },
            [dispatch]
        ),
        uploadPost: useCallback((data) => {
            setPosts((prevPosts) => [data, ...prevPosts]);
        }, []),
        deletePost: useCallback((data) => {
            const { _id } = data;
            setPosts((prevPosts) => {
                const updatedPosts = prevPosts.filter((p) => p._id !== _id);
                return updatedPosts;
            });
        }, []),
    };

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);
        const socket = socketRef.current;

        socket.on("updated-post", handleSocket.updatePost);
        socket.on("uploaded-post", handleSocket.uploadPost);
        socket.on("deleted-post", handleSocket.deletePost);

        return () => {
            socket.off("updated-post", handleSocket.updatePost);
            socket.off("uploaded-post", handleSocket.uploadPost);
            socket.off("deleted-post", handleSocket.deletePost);
        };
    }, [
        handleSocket.updatePost,
        handleSocket.uploadPost,
        handleSocket.deletePost,
        SOCKET_URL,
    ]);

    const handleUser = useMemo(
        () => ({
            getAllPosts: (userID) => {
                getAllPostsByUser(userID, dispatch)
                    .then((data) => {
                        setPosts(data.posts);
                    })
                    .catch((err) => {
                        console.error("Failed to get post of user", err);
                    });
            },
            getPostsShared: (userID) => {
                getPostsShared(userID, dispatch)
                    .then((data) => {
                        const { postShared } = data;
                        postShared?.map((p) =>
                            getPostByID(p.postID, dispatch).then((data) => {
                                setPosts((prevPosts) => [
                                    data?.data,
                                    ...prevPosts,
                                ]);
                            })
                        );
                    })
                    .catch((err) => {
                        console.error("Failed to get post shared", err);
                    });
            },
        }),
        [dispatch]
    );

    useEffect(() => {
        if (user._id) {
            handleUser.getAllPosts(user._id);

            getUserByID(user._id, dispatch).then((data) => {
                const { postShared } = data.user;

                if (postShared.length > 0) {
                    handleUser.getPostsShared(user._id);
                }
            });
        }
    }, [user._id, handleUser, dispatch]);

    return (
        <>
            <div className="row place-items-center gap-3">
                <div className="col">
                    <div className="row p-3">
                        <PersonalIntroduce onUpdateBioPopup={onUpdateBioPopup} />
                    </div>
                    <div className="row">
                        <PersonalFriends />
                    </div>
                    <div className="row">
                        <PersonalSocialLinks />
                    </div>
                </div>
                <div className="col-7">
                    <p className="fs-1 fw-bold">Introduce</p>

                    <div className="row d-flex border-bottom pb-4">
                        <div className="profile-pic p-0 rounded-circle overflow-hidden">
                            {user.profilePicture ? (
                                <img
                                    loading="lazy"
                                    role="presentation"
                                    decoding="async"
                                    src={user.profilePicture}
                                    alt="Avatar user"
                                    className="w-100"
                                />
                            ) : (
                                <>{user.username}</>
                            )}
                        </div>
                        <button
                            className="ms-3 btn btn-light col-sm d-flex align-items-center text-muted text-center"
                            onClick={handlePopup}
                        >
                            What are you thinking, {user.username || "user"} ?
                        </button>
                    </div>

                    <div className="posts mt-4">
                        {posts.map(
                            (post) =>
                                post && (
                                    <Post
                                        key={post._id}
                                        postID={post._id}
                                        image={post.img}
                                        video={post.video}
                                        userID={post.userID}
                                        createdAt={post.createdAt}
                                        desc={post.desc}
                                        likes={post.likes}
                                        shares={post.shares}
                                        comments={post.comments}
                                    />
                                )
                        )}
                    </div>
                </div>
            </div>
            {renderPostPopup()}
        </>
    );
};

export default PersonalBody;
