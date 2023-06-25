import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import "../style/components/post.css";

import { getAllPosts, getPostByID } from "../redux/request/postRequest";
import Post from "./Post";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        getAllPosts(dispatch)
            .then((data) => {
                setPosts(data.posts);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

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
            [posts]
        ),
        uploadPost: useCallback(
            (data) => {
                setPosts((prevPosts) => [data, ...prevPosts]);
            },
            [posts]
        ),
        deletePost: useCallback(
            (data) => {
                const { _id } = data;
                setPosts((prevPosts) => {
                    const updatedPosts = prevPosts.filter((p) => p._id !== _id);
                    return updatedPosts;
                });
            },
            [posts]
        ),
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
    ]);

    return (
        currentUser &&
        posts.map((post) => (
            <Post
                key={post._id}
                postID={post._id}
                image={post.img}
                userID={post.userID}
                createdAt={post.createdAt}
                desc={post.desc}
                likes={post.likes}
                shares={post.shares}
                comments={post.comments}
            />
        ))
    );
};

export default Posts;
