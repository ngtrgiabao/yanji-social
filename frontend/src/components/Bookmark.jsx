import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getPostByID } from "../redux/request/postRequest";
import { useTimeAgo } from "../hooks/useTimeAgo";
import { getUserByID } from "../redux/request/userRequest";
import ParagraphWithLink from "./ParagraphWithLink";

const Bookmark = ({ postID, createdAt }) => {
    const dispatch = useDispatch();
    const [post, setPost] = useState({
        desc: "",
        likes: 0,
        img: "",
        video: "",
        author: "",
    });
    const formatTime = useTimeAgo;

    useEffect(() => {
        getPostByID(postID, dispatch).then((data) => {
            const { desc, likes, img, video, userID } = data.data;

            getUserByID(userID, dispatch).then((data) => {
                const { username } = data.user;

                setPost({
                    desc: desc,
                    likes: likes.length,
                    img: img,
                    video: video,
                    author: username,
                });
            });
        });
    }, [postID, dispatch]);

    return (
        <div
            className="card shadow-sm bg-body-tertiary text-black"
            style={{
                width: "w-100",
                height: "20rem",
            }}
        >
            <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 className="card-title">{post.author}</h5>
                    <p className="caption flex-wrap text-truncate">
                        {post.desc}
                    </p>
                </div>
                <p className="card-text">
                    <small className="text-body-secondary">
                        Saved {formatTime(createdAt)}
                    </small>
                </p>
            </div>
        </div>
    );
};

export default Bookmark;
