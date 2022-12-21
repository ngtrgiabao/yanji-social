import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
    UilBookmark,
    UilEllipsisH,
    UilHeart,
    UilCommentDots,
    UilShare,
    UilTrash,
    UilBell,
    UilTimesSquare,
    UilLinkAlt,
    UilUserTimes,
    UilExclamationTriangle,
} from "@iconscout/react-unicons";

const PokemonsList = (props) => {
    const { name, id, image } = props;

    const [active, setActive] = useState(null);
    const [popup, setPopup] = useState(false);

    window.addEventListener("click", () => {
        setPopup(false);
    });

    const handlePopup = (e) => {
        e.stopPropagation();

        setPopup((popup) => !popup);
    };

    return (
        <>
            <div className="post">
                <div className="head">
                    <div className="user">
                        <Link to="/user" className="profile-pic bg-white">
                            <img src={image} alt="" />
                        </Link>
                        <Link to="/user" className="info">
                            <h3>{name}</h3>
                            <span>@{name}</span>
                        </Link>
                    </div>
                    <span className="post-settings">
                        <UilEllipsisH
                            className="dots"
                            onClick={(e) => {
                                setActive(id);
                                handlePopup(e);
                            }}
                        />

                        <div
                            className={`edit-post ${
                                popup && active === id
                                    ? "animate__animated animate__bounceIn"
                                    : "hide"
                            }`}
                        >
                            <ul>
                                <li className="delete-post">
                                    <span>
                                        <UilTrash />
                                    </span>
                                    Delete this post
                                </li>
                                <li>
                                    <span>
                                        <UilBell />
                                    </span>
                                    Notification for this post
                                </li>
                                <li>
                                    <span>
                                        <UilLinkAlt />
                                    </span>
                                    Copy link of this post
                                </li>
                                <li>
                                    <span>
                                        <UilTimesSquare />
                                    </span>
                                    Hide this post
                                </li>
                                <li>
                                    <span>
                                        <UilUserTimes />
                                    </span>
                                    Unfollow
                                </li>
                                <li>
                                    <span>
                                        <UilExclamationTriangle />
                                    </span>
                                    Report
                                </li>
                            </ul>
                        </div>
                    </span>
                </div>
                <div className="photo">
                    <img src={image} alt="image" />
                </div>
                <div className="action-buttons">
                    <div className="interaction-buttons d-flex gap-4">
                        <span>
                            <UilHeart className="heart" />
                        </span>
                        <span>
                            <UilCommentDots />
                        </span>
                        <span>
                            <UilShare />
                        </span>
                    </div>
                    <div className="bookmark">
                        <span>
                            <UilBookmark />
                        </span>
                    </div>
                </div>
                <div className="liked-by">
                    <span>
                        <img
                            src="https:images.unsplash.com/photo-1656576413714-b3e5a3d2aab3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt=""
                        />
                    </span>
                    <span>
                        <img
                            src="https://images.unsplash.com/photo-1656437660370-4e8886a0e8ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                            alt=""
                        />
                    </span>
                    <span>
                        <img
                            src="https://images.unsplash.com/photo-1656354798706-bc0c3b99f291?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNzd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt=""
                        />
                    </span>
                    <p>
                        Liked by <b>Erest Achivers</b> and
                        <b> 2.245 others</b>
                    </p>
                </div>
                <div className="caption">
                    <p></p>
                </div>
                <div className="comments text-muted">View all comments</div>
            </div>
        </>
    );
};

export default PokemonsList;
