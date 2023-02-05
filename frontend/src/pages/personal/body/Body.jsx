import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./body.css";

import avatarImg from "../../../images/profile-pic.png";

import Friends from "./friends/Friends";
import Introduce from "./introduce/Introduce";
import SocialLinks from "./socialLinks/SocialLinks";
import PostPopup from "./popup/post/PostPopup";
import Post from "./post/Post";

function Body() {
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

    const [popup, setPopup] = useState(false);

    const handlePopup = () => {
        setPopup((popup) => !popup);
    };

    return (
        <>
            <div className="row place-items-center gap-3">
                <div className="col p-4">
                    <div className="row p-3">
                        <Introduce />
                    </div>
                    <div className="row p-3">
                        <Friends />
                    </div>
                    <div className="row p-3">
                        <SocialLinks />
                    </div>
                </div>
                <div className="col-7">
                    <p className="fs-1 fw-bold">Introduce</p>

                    <div className="row d-flex border-bottom pb-4">
                        <div className="profile-pic p-0 rounded-circle overflow-hidden">
                            <img src={avatar || avatarImg} alt="avatar" />
                        </div>
                        <button
                            className="ms-3 btn btn-light col-sm d-flex align-items-center text-muted"
                            onClick={handlePopup}
                        >
                            What are you thinking, Yanji
                        </button>
                    </div>

                    <button className="col col-12 mt-2 p-2 text-bold fs-3 btn-upload rounded-3">
                        <span className="me-2">
                            <FontAwesomeIcon icon="fa-regular fa-image" />
                        </span>
                        <span>Upload Photos</span>
                    </button>
                <Post />
                </div>

            </div>

            {popup && (
                <PostPopup
                    onPopup={handlePopup}
                    animateClass="animate__animated animate__bounceIn"
                />
            )}
        </>
    );
}

export default Body;
