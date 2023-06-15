import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faLock, faImage } from "@fortawesome/free-solid-svg-icons";

import "../style/components/postPopup.css";

import ProfilePic from "../assets/avatar/profile-pic.png";
import { uploadPost } from "../redux/request/postRequest";
import useUploadImage from "../hooks/useUploadImage";
import PreviewImage from "./PreviewImage";

const PostPopup = (props) => {
    const { onPopup, animateClass } = props;

    const [avatar, setAvatar] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const [content, setContent] = useState("");
    const uploadImg = useRef(null);

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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setImageUrl(file);
        setImageSrc(imgUrl);
    };

    const handleUploadImgFile = () => {
        uploadImg.current.click();
    };

    const dispatch = useDispatch();

    const userID = useSelector((state) => {
        return state.auth.login.currentUser?.data._id;
    });

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    const cloudStorage = useUploadImage;

    const handleSubmit = async (e) => {
        if (content) {
            e.preventDefault();

            const result = await cloudStorage(imageUrl);
            const imageURL = result?.secure_url;

            const newPost = {
                userID: userID,
                desc: content,
            };

            if (imageURL) {
                newPost.img = imageURL;
            }

            uploadPost(newPost, dispatch)
                .then(() => {
                    console.log("Upload post successfully");
                })
                .catch((err) => console.error("Failed to upload post", err));

            onPopup();
        }
    };

    const user = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    return (
        <div
            className="d-flex justify-content-center align-items-center post-popup__container"
            onClick={onPopup}
        >
            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className={animateClass}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {/* NAME */}
                <div className="form__name d-flex justify-content-between">
                    <div className="d-flex">
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
                            <span className="text-white text-bold fs-4">
                                {user.username}
                            </span>
                            <div className="form__status d-flex align-items-center mt-1">
                                <span className="me-2 text-white">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <select name="" id="" defaultValue="public">
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <span
                        className="fs-1 form__title-icon px-2"
                        onClick={onPopup}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </span>
                </div>

                {/* INPUT FORM */}
                <div className="form__input">
                    <textarea
                        id="post-input"
                        className="input scrollbar"
                        maxLength="5000"
                        style={{
                            overflowY: "auto",
                            overflowX: "hidden",
                            width: "100%",
                            height: "25rem",
                        }}
                        onChange={handleContent}
                        placeholder={`What's in your mind, ${user.username}?`}
                    ></textarea>
                </div>

                {/* DRAG IMG */}
                <div
                    className="form__drag-image"
                    style={{
                        fontSize: "1.8rem",
                        cursor: "pointer",
                    }}
                    onClick={() => handleUploadImgFile()}
                >
                    <input
                        type="file"
                        style={{ display: "none" }}
                        ref={uploadImg}
                        onChange={(e) => handleImageUpload(e)}
                    />

                    <span>
                        <FontAwesomeIcon icon={faImage} />
                    </span>
                </div>

                {imageSrc && (
                    <PreviewImage
                        imgSrc={imageSrc}
                        width="10rem"
                        height="10rem"
                    />
                )}

                <input
                    type="submit"
                    className="form__post-btn p-2 w-100 border-0 rounded fs-5 fw-bold mt-4"
                    value="Post"
                />
            </form>
        </div>
    );
};

export default PostPopup;
