import { useState, useEffect, useCallback, useRef } from "react";
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
import { getPostsShared } from "../../redux/request/userRequest";

//TODO FIX POST SHARED ALWAYS PIN

const PersonalBody = ({ user }) => {
    const [avatar, setAvatar] = useState("");
    const [popup, setPopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    // CLEANUP URL WHEN CHANGE IMG
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    // SAVE IMG TO LOCAL
    useEffect(() => {
        avatar && window.localStorage.setItem("avatar", avatar);
    }, [avatar]);

    // GET IMG FROM LOCAL
    useEffect(() => {
        const data = window.localStorage.getItem("avatar");
        setAvatar(data);
    }, [avatar]);

    const handlePopup = () => {
        setPopup((popup) => !popup);
    };

    const renderPostPopup = () => {
        return (
            popup && (
                <PostPopup
                    onPopup={handlePopup}
                    animateClass="animate__animated animate__fadeIn"
                />
            )
        );
    };

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
    const socketRef = useRef(null);

    const handelSocket = {
        updatePost: useCallback(
            (data) => {
                const { _id } = data;
                getPostByID(_id, dispatch).then((data) => {
                    setPosts((prevPosts) => {
                        const updatePost = prevPosts.map((p) =>
                            p._id === data?.data._id ? data.data : p
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

        socket.on("updated-post", handelSocket.updatePost);
        socket.on("uploaded-post", handelSocket.uploadPost);
        socket.on("deleted-post", handelSocket.deletePost);

        return () => {
            socket.off("updated-post", handelSocket.updatePost);
            socket.off("uploaded-post", handelSocket.uploadPost);
            socket.off("deleted-post", handelSocket.deletePost);
        };
    }, [
        handelSocket.updatePost,
        handelSocket.uploadPost,
        handelSocket.deletePost,
        SOCKET_URL,
    ]);

    useEffect(() => {
        user._id &&
            getAllPostsByUser(user._id, dispatch)
                .then((data) => {
                    setPosts(data.posts);
                })
                .catch((err) => {
                    console.error("Failed to get post of user", err);
                });
        user._id &&
            getPostsShared(user._id, dispatch).then((data) => {
                data.postShared.map((p) =>
                    getPostByID(p.postID, dispatch).then((data) => {
                        setPosts((prevPosts) => [data.data, ...prevPosts]);
                    })
                );
            });
    }, [user, dispatch]);

    return (
        <>
            <div className="row place-items-center gap-3">
                <div className="col p-4">
                    <div className="row p-3">
                        <PersonalIntroduce />
                    </div>
                    <div className="row p-3">
                        <PersonalFriends />
                    </div>
                    <div className="row p-3">
                        <PersonalSocialLinks />
                    </div>
                </div>
                <div className="col-7">
                    <p className="fs-1 fw-bold">Introduce</p>

                    <div className="row d-flex border-bottom pb-4">
                        <div className="profile-pic p-0 rounded-circle overflow-hidden">
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={user.profilePicture}
                                alt="Avatar user"
                            />
                        </div>
                        <button
                            className="ms-3 btn btn-light col-sm d-flex align-items-center text-muted text-center"
                            onClick={handlePopup}
                        >
                            What are you thinking, {user.username || "user"} ?
                        </button>
                    </div>

                    <div className="posts mt-4">
                        {posts.map((post) => (
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
                        ))}
                    </div>
                </div>
            </div>

            {renderPostPopup()}
        </>
    );
};

export default PersonalBody;
