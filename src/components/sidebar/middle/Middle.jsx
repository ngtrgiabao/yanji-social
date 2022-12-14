import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";

import avatarIMG from "../../images/profile-pic.png";

import {
    UilBookmark,
    UilEllipsisH,
    UilHeart,
    UilCommentDots,
    UilShare,
    UilScenery,
    UilSmile,
    UilLocationPoint,
    UilLabelAlt,
    UilTrash,
    UilBell,
    UilTimesSquare,
    UilLinkAlt,
    UilUserTimes,
    UilExclamationTriangle,
} from "@iconscout/react-unicons";
import "./middle.css";
import Stories from "./stories/Stories";
import Post from "./post/Post";

const Middle = () => {
    const useDate = () => {
        const locale = "en";
        const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

        useEffect(() => {
            const timer = setInterval(() => {
                // Creates an interval which will update the current data every minute
                // This will trigger a rerender every component that uses the useDate hook.
                setDate(new Date());
            }, 60 * 1000);
            return () => {
                clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
            };
        }, []);

        const day = today.toLocaleDateString(locale, { weekday: "long" });
        const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(
            locale,
            { month: "long" }
        )}\n\n`;

        const hour = today.getHours();
        const wish = `Good ${
            (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
        }, `;

        const time = today.toLocaleTimeString(locale, {
            hour: "numeric",
            hour12: true,
            minute: "numeric",
        });

        return {
            date,
            time,
            wish,
        };
    };

    // Write Data
    const [postData, setPostData] = useState({
        caption: "",
    });
    const [array, setArray] = useState([]);

    const handleInput = (e) => {
        let newInput = { [e.target.name]: e.target.value };

        setPostData({ ...postData, ...newInput });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();

        getData();
    };
    // UPLOAD IMG
    const fileElem = document.getElementById("fileElem");
    const [file, setFile] = useState(null);

    const handleUploadImg = () => {};

    // Get Data
    const getData = async () => {};

    // Delete Data
    const deleteData = (id) => {};

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="middle">
                <Stories />

                {/* STATUS */}
                <form
                    action=""
                    className="create-post d-flex flex-column align-items-center"
                    onSubmit={(e) => {
                        handleSubmit(e);
                        handleUploadImg();
                    }}
                >
                    <div className="create-post-wrapper d-flex align-items-center">
                        <Link to="/user" className="profile-pic">
                            <img src={avatarIMG} alt="" />
                        </Link>

                        <Form.Control
                            type="text"
                            placeholder="What's on your mind, Nguyen Tran Gia Bao?"
                            className="border-0 ps-3 me-3 ms-3"
                            name="caption"
                            onChange={handleInput}
                            id="caption"
                        />
                    </div>

                    <div className="d-flex justify-content-between create-post-action">
                        <div className="d-flex justify-items-around create-post-icons">
                            <Form.Control
                                type="file"
                                name="photo"
                                id="fileElem"
                                multiple
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <span>
                                <UilScenery
                                    className="sidebar-icon"
                                    id="fileSelect"
                                    onClick={() => {
                                        if (fileElem) {
                                            fileElem.click();
                                        }
                                    }}
                                />
                            </span>
                            <span>
                                <UilSmile className="sidebar-icon" />
                            </span>
                            <span>
                                <UilLocationPoint className="sidebar-icon" />
                            </span>
                            <span>
                                <UilLabelAlt className="sidebar-icon" />
                            </span>
                        </div>

                        <div className="submit d-flex align-items-center">
                            <button type="submit" className="btn btn-primary">
                                Post
                            </button>
                        </div>
                    </div>
                </form>
                {/* END STATUS */}

                {/* POSTS */}
                <div className="posts">
                    {array.map((item) => (
                        <div key={item.id}>
                            <div className="post-item post">
                                <div className="head">
                                    <div className="user">
                                        <Link
                                            to="/user"
                                            className="profile-pic"
                                        >
                                            <img src={item.avatar} alt="" />
                                        </Link>
                                        <Link to="/user" className="info">
                                            <h3>Nguyen Tran Gia Bao</h3>
                                            <span>@yanji</span>
                                            {/* <span>{item.location},</span> */}
                                        </Link>
                                    </div>
                                    <span className="post-settings">
                                        <UilEllipsisH className="dots" />

                                        <div className="edit-post">
                                            <ul>
                                                <li
                                                    className="delete-post"
                                                    onClick={() =>
                                                        deleteData(item.id)
                                                    }
                                                >
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
                                    <img src={item.img} alt="image" />
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
                                        <b> {item.numsLiked} 2.245 others</b>
                                    </p>
                                </div>
                                <div className="caption">
                                    <p>{item.caption}</p>
                                </div>
                                <div className="comments text-muted">
                                    View all {item.numsCommented} comments
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* END OF postS */}
            </div>
        </>
    );
};

export default Middle;
