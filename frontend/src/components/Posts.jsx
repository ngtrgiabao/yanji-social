import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../style/components/post.css"

import { getAllPosts } from "../redux/request/postRequest";
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
