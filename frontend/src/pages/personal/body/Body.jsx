import React, { useState, useEffect } from "react";

import "../../../style/pages/personal/body/body.css";

import ProfilePic from "../../../assets/avatar/profile-pic.png";

import Friends from "./friends/Friends";
import Introduce from "./introduce/Introduce";
import SocialLinks from "./social-links/SocialLinks";
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

    const renderPostPopup = () => {
        return (
            popup && (
                <PostPopup
                    onPopup={handlePopup}
                    animateClass="animate__animated animate__bounceIn"
                />
            )
        );
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
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={avatar || ProfilePic}
                                alt="Avatar user"
                            />
                        </div>
                        <button
                            role="button"
                            className="ms-3 btn btn-light col-sm d-flex align-items-center text-muted"
                            onClick={handlePopup}
                        >
                            What are you thinking, Yanji
                        </button>
                    </div>

                    <Post />
                </div>
            </div>

            {renderPostPopup()}
        </>
    );
}

export default Body;
