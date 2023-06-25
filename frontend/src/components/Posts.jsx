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
    };

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);
        const socket = socketRef.current;

        socket.on("updated-post", handelSocket.updatePost);

        return () => {
            socket.off("updated-post", handelSocket.updatePost);
        };
    }, [handelSocket.updatePost]);

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
