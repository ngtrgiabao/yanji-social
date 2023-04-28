import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../../../style/pages/personal/body/post/post.css";

import ProfilePic from "../../../../assets/avatar/profile-pic.png";

import API from "../../../../api";

const Post = () => {
    const [avatar, setAvatar] = useState("");

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

    // GET RANDOWM IMG
    const [randomPhoto, setRandomPhoto] = useState("");

    useEffect(() => {
        axios
            .get(API.RANDOM_IMG_URL)
            .then((res) => {
                setRandomPhoto(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const [settingPost, setSettingPost] = useState(false);

    window.addEventListener("click", () => setSettingPost(false));

    const handleSettingPost = (e) => {
        setSettingPost((settingPost) => !settingPost);

        e.stopPropagation();
    };

    return (
        <>
            {/* POST 1 */}
            <div className=" d-flex flex-column personal-post p-3 mt-5">
                {/* HEADER */}
                <div className="d-flex personal-post__name">
                    <div className="d-flex ">
                        <span className="avatar">
                            <img src={avatar || ProfilePic} alt="" />
                        </span>
                        <div className="ms-3">
                            <span className="text-bold fs-4">
                                Nguyễn Trần Gia Bảo
                            </span>
                            <div className="form__status d-flex align-items-center">
                                <span className="me-2">
                                    <FontAwesomeIcon icon="fa-solid fa-lock" />
                                </span>
                                <select name="" id="" defaultValue="public">
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                                <span className="ms-2">● 1 phút trước</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="dot rounded-circle"
                        onClick={handleSettingPost}
                    >
                        <span>...</span>
                    </div>

                    {/* SETTING POST */}
                    {settingPost && (
                        <div className="personal-post__setting">
                            <div className="personal-post__setting-container">
                                <ul>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-solid fa-thumbtack" />
                                        </span>
                                        Pin this post
                                    </li>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                                        </span>
                                        Save this post
                                    </li>
                                </ul>
                                <ul className="border-bottom border-top py-4">
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                                        </span>
                                        Edit this post
                                    </li>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-solid fa-earth-americas" />
                                        </span>
                                        Change status this post
                                    </li>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-regular fa-bell-slash" />
                                        </span>
                                        Turn off notification this post
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-solid fa-box-archive" />
                                        </span>
                                        Archived this post
                                    </li>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                                        </span>
                                        Move this post to trash bin
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* BODY */}
                <div
                    className="d-flex personal-post__content mt-4"
                    style={{
                        padding: "1.2rem",
                    }}
                >
                    hello
                </div>
                {/* FOOTER */}
                <div className="d-flex justify-content-center personal-post__action mt-4 pt-4">
                    <div className="personal-post__action-btn d-flex justify-content-center align-items-center">
                        <span className="icon">
                            <FontAwesomeIcon icon="fa-regular fa-thumbs-up " />
                        </span>
                        Like
                    </div>
                    <div className="personal-post__action-btn d-flex justify-content-center align-items-center">
                        <span className="icon">
                            <FontAwesomeIcon icon="fa-regular fa-comment " />
                        </span>
                        Comment
                    </div>
                </div>
            </div>

            {/* POST 2 */}
            <div className=" d-flex flex-column personal-post p-3 mt-5">
                {/* HEADER */}
                <div className="d-flex personal-post__name">
                    <div className="d-flex ">
                        <span className="avatar">
                            <img src={avatar || ProfilePic} alt="" />
                        </span>
                        <div className="ms-3">
                            <span className="text-bold fs-4">
                                Nguyễn Trần Gia Bảo
                            </span>
                            <div className="form__status d-flex align-items-center">
                                <span className="me-2">
                                    <FontAwesomeIcon icon="fa-solid fa-lock" />
                                </span>
                                <select name="" id="" defaultValue="public">
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                                <span className="ms-2">● 1 phút trước</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="dot rounded-circle"
                        onClick={handleSettingPost}
                    >
                        <span>...</span>
                    </div>

                    {/* SETTING POST */}
                    {settingPost && (
                        <div className="personal-post__setting">
                            <div className="personal-post__setting-container">
                                <ul>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-solid fa-thumbtack" />
                                        </span>
                                        Pin this post
                                    </li>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                                        </span>
                                        Save this post
                                    </li>
                                </ul>
                                <ul className="border-bottom border-top py-4">
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                                        </span>
                                        Edit this post
                                    </li>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-solid fa-earth-americas" />
                                        </span>
                                        Change status this post
                                    </li>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-regular fa-bell-slash" />
                                        </span>
                                        Turn off notification this post
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-solid fa-box-archive" />
                                        </span>
                                        Archived this post
                                    </li>
                                    <li>
                                        <span className="icon">
                                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                                        </span>
                                        Move this post to trash bin
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                {/* BODY */}
                <div
                    className="d-flex personal-post__content mt-4"
                    style={{
                        padding: "1.2rem",
                    }}
                >
                    {/* IMAGE */}
                    <img src={randomPhoto} alt="" />
                </div>
                {/* BOTTOM */}
                <div className="d-flex justify-content-center personal-post__action mt-4 pt-4">
                    <div className="personal-post__action-btn d-flex justify-content-center align-items-center">
                        <span className="icon">
                            <FontAwesomeIcon icon="fa-regular fa-thumbs-up " />
                        </span>
                        Like
                    </div>
                    <div className="personal-post__action-btn d-flex justify-content-center align-items-center">
                        <span className="icon">
                            <FontAwesomeIcon icon="fa-regular fa-comment " />
                        </span>
                        Comment
                    </div>
                    <div className="personal-post__action-btn d-flex justify-content-center align-items-center">
                        <span className="icon">
                            <FontAwesomeIcon icon="fa-solid fa-share" />
                        </span>
                        Share
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
