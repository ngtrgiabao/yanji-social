import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookmark,
    faPenToSquare,
    faThumbsUp,
    faComment,
} from "@fortawesome/free-regular-svg-icons";
import {
    faLock,
    faThumbTack,
    faEarthAmerica,
    faBoxArchive,
    faTrash,
    faShare,
} from "@fortawesome/free-solid-svg-icons";

import "../../../../style/pages/personal/body/post/post.css";

import ProfilePic from "../../../../assets/avatar/profile-pic.png";

import { RANDOM_IMG_URL } from "../../../../constants/api.data.constant";

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
            .get(RANDOM_IMG_URL)
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

    const renderSettingPost = () => {
        return (
            settingPost && (
                <div className="personal-post__setting">
                    <div className="personal-post__setting-container">
                        <ul>
                            <li>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faThumbTack} />
                                </span>
                                Pin this post
                            </li>
                            <li>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faBookmark} />
                                </span>
                                Save this post
                            </li>
                        </ul>
                        <ul className="border-bottom border-top py-4">
                            <li>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </span>
                                Edit this post
                            </li>
                            <li>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faEarthAmerica} />
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
                                    <FontAwesomeIcon icon={faBoxArchive} />
                                </span>
                                Archived this post
                            </li>
                            <li>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                Move this post to trash bin
                            </li>
                        </ul>
                    </div>
                </div>
            )
        );
    };
    const renderHeaderPost = () => {
        return (
            <div className="d-flex personal-post__name">
                <div className="d-flex ">
                    <span className="avatar">
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={avatar || ProfilePic}
                            alt="Avatar user"
                        />
                    </span>
                    <div className="ms-3">
                        <span className="text-bold fs-4">
                            Nguyễn Trần Gia Bảo
                        </span>
                        <div className="form__status d-flex align-items-center">
                            <span className="me-2">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                            <select name="" id="" defaultValue="public">
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                            <span className="ms-2">● 1 phút trước</span>
                        </div>
                    </div>
                </div>
                <div className="dot rounded-circle" onClick={handleSettingPost}>
                    <span>...</span>
                </div>

                {renderSettingPost()}
            </div>
        );
    };

    const renderContentPost = () => {
        return (
            <div
                className="d-flex personal-post__content mt-4"
                style={{
                    padding: "1.2rem",
                }}
            >
                hello
            </div>
        );
    };

    const renderActionPost = () => {
        return (
            <div className="d-flex justify-content-center personal-post__action mt-4 pt-4">
                <div className="personal-post__action-btn d-flex justify-content-center align-items-center">
                    <span className="icon">
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </span>
                    Like
                </div>
                <div className="personal-post__action-btn d-flex justify-content-center align-items-center">
                    <span className="icon">
                        <FontAwesomeIcon icon={faComment} />
                    </span>
                    Comment
                </div>
            </div>
        );
    };

    const renderSettingPost2 = () => {
        return (
            settingPost && (
                <div className="personal-post__setting">
                    <div className="personal-post__setting-container">
                        <ul>
                            <li>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faThumbTack} />
                                </span>
                                Pin this post
                            </li>
                            <li>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faBookmark} />
                                </span>
                                Save this post
                            </li>
                        </ul>
                        <ul className="border-bottom border-top py-4">
                            <li>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </span>
                                Edit this post
                            </li>
                            <li>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faEarthAmerica} />
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
                                    <FontAwesomeIcon icon={faBoxArchive} />
                                </span>
                                Archived this post
                            </li>
                            <li>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                Move this post to trash bin
                            </li>
                        </ul>
                    </div>
                </div>
            )
        );
    };
    const renderHeaderPost2 = () => {
        return (
            <div className="d-flex personal-post__name">
                <div className="d-flex ">
                    <span className="avatar">
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={avatar || ProfilePic}
                            alt="Avatar user"
                        />
                    </span>
                    <div className="ms-3">
                        <span className="text-bold fs-4">
                            Nguyễn Trần Gia Bảo
                        </span>
                        <div className="form__status d-flex align-items-center">
                            <span className="me-2">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                            <select name="" id="" defaultValue="public">
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                            <span className="ms-2">● 1 phút trước</span>
                        </div>
                    </div>
                </div>
                <div className="dot rounded-circle" onClick={handleSettingPost}>
                    <span>...</span>
                </div>

                {renderSettingPost2()}
            </div>
        );
    };

    const renderConentPost2 = () => {
        return (
            <div
                className="d-flex personal-post__content mt-4"
                style={{
                    padding: "1.2rem",
                }}
            >
                {/* IMAGE */}
                <img
                    loading="lazy"
                    role="presentation"
                    decoding="async"
                    src={randomPhoto}
                    alt="Avatar user"
                />
            </div>
        );
    };

    const renderActionPost2 = () => {
        return (
            <div className="d-flex justify-content-center personal-post__action mt-4 pt-4">
                <div className="personal-post__action-btn d-flex justify-content-center align-items-center">
                    <span className="icon">
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </span>
                    Like
                </div>
                <div className="personal-post__action-btn d-flex justify-content-center align-items-center">
                    <span className="icon">
                        <FontAwesomeIcon icon={faComment} />
                    </span>
                    Comment
                </div>
                <div className="personal-post__action-btn d-flex justify-content-center align-items-center">
                    <span className="icon">
                        <FontAwesomeIcon icon={faShare} />
                    </span>
                    Share
                </div>
            </div>
        );
    };

    return (
        <>
            {/* POST 1 */}
            <div className=" d-flex flex-column personal-post p-3 mt-5">
                {renderHeaderPost()}
                {renderContentPost()}
                {renderActionPost()}
            </div>

            {/* POST 2 */}
            <div className=" d-flex flex-column personal-post p-3 mt-5">
                {renderHeaderPost2()}
                {renderConentPost2()}
                {renderActionPost2()}
            </div>
        </>
    );
};

export default Post;
