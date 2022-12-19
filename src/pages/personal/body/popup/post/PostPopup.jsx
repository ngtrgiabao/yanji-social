import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./postPopup.css";

const PostPopup = (props) => {
    const { onPopup, animateClass } = props;

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

    return (
        <>
            <div className="d-flex justify-content-center align-items-center post-popup__container">
                {/* FORM */}
                <form action="" className={animateClass}>
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
                            <img src={avatar} alt="" />
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
                        <div className="input" contentEditable="true"></div>
                        <span>
                            <FontAwesomeIcon icon="fa-regular fa-face-smile" />
                        </span>
                    </div>

                    {/* DRAG IMG */}
                    <div className="form__drag-image">
                        <input type="file" style={{ display: "none" }} />
                        <span>
                            <FontAwesomeIcon icon="fa-solid fa-image" />
                        </span>
                        <p>
                            Drag or upload <br /> your photo here
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="form__post-btn mt-3 p-2 border-0 rounded fs-5 fw-bold"
                    >
                        POST
                    </button>
                </form>
            </div>
        </>
    );
};

export default PostPopup;
