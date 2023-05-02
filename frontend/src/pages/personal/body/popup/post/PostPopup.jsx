import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../../../../style/pages/personal/body/popup/post/postPopup.css";

import ProfilePic from "../../../../../assets/avatar/profile-pic.png";

const PostPopup = (props) => {
    const { onPopup, animateClass } = props;

    const [avatar, setAvatar] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
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

    const postInput = useRef(null);

    const handlePostInput = () => {
        postInput.current.focus();
    };

    const handleImageUpload = (event) => {
        const file = event?.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
    };

    const handleUploadImgFile = () => {
        uploadImg.current.click();
    };

    useEffect(() => {
        console.log(imageUrl);
    }, [imageUrl]);

    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center post-popup__container"
                style={{
                    zIndex: 99999,
                }}
                onClick={onPopup}
            >
                {/* FORM */}
                <form
                    action=""
                    className={animateClass}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {/* TITLE */}
                    <div className="form__title">
                        <span>CREATE POST</span>
                        <span
                            className="fs-1 form__title-icon px-2"
                            onClick={onPopup}
                        >
                            <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
                        </span>
                    </div>

                    {/* NAME */}
                    <div className="form__name d-flex">
                        <span className="avatar">
                            <img
                                loading="lazy"
                                src={avatar || ProfilePic}
                                alt=""
                            />
                        </span>
                        <div className="ms-3">
                            <span className="text-white text-bold fs-4">
                                Nguyễn Trần Gia Bảo
                            </span>
                            <div className="form__status d-flex align-items-center">
                                <span className="me-2 text-white">
                                    <FontAwesomeIcon icon="fa-solid fa-lock" />
                                </span>
                                <select name="" id="" defaultValue="public">
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* INPUT FORM */}
                    <div className="form__input">
                        <p
                            className="mb-0"
                            onClick={handlePostInput}
                            style={{
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            TEXT YOUR MIND HERE :3
                        </p>
                        <textarea
                            ref={postInput}
                            id="post-input"
                            className="input"
                            maxLength="5000"
                            style={{
                                overflowY: "auto",
                                overflowX: "hidden",
                                width: "100%",
                                height: "25rem",
                            }}
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
                            <FontAwesomeIcon icon="fa-solid fa-image" />
                        </span>
                    </div>

                    {imageUrl && (
                        <img
                            loading="lazy"
                            src={imageUrl}
                            alt="Uploaded file"
                            style={{
                                width: "5rem",
                                height: "5rem",
                            }}
                        />
                    )}

                    <button
                        type="submit"
                        className="form__post-btn p-2 border-0 rounded fs-5 fw-bold"
                        style={{
                            position: "absolute",
                            bottom: "2rem",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "95%",
                        }}
                    >
                        POST
                    </button>
                </form>
            </div>
        </>
    );
};

export default PostPopup;
