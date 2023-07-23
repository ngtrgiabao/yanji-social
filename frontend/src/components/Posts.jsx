import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import "../style/components/post.css";

import { getAllPosts, getPostByID } from "../redux/request/postRequest";
import Post from "./Post";

const Posts = ({ socket, handleDeletePopup = () => {} }) => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        socket = io(SOCKET_URL);

        getAllPosts(dispatch)
            .then((data) => {
                const { posts } = data;
                setPosts(posts);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleSocket = {
        updatePost: useCallback(
            (data) => {
                const { _id } = data;

                getPostByID(_id, dispatch).then((data) => {
                    const originalPost = data.data;
                    setPosts((prevPosts) => {
                        const updatePost = prevPosts.map((p) =>
                            p._id === originalPost._id ? originalPost : p
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
        socket = io(SOCKET_URL);

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
        socket,
    ]);

    return (
        currentUser &&
        posts.map((post) => (
            <Post
                key={post._id}
                postID={post._id}
                image={post.img}
                video={post.video}
                userID={post.userID}
                desc={post.desc}
                likes={post.likes}
                shares={post.shares}
                comments={post.comments}
                socket={socket}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                handleDeletePopup={handleDeletePopup}
            />
        ))
    );
};

export default Posts;
