import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

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
} from "@iconscout/react-unicons";
import "./middle.css";

import { StoryData } from "../../data/StoryData";

const Middle = () => {
    // API
    const postApi = "http://localhost:3000/home/";

    const StoryItem = (props) => {
        return (
            <div className="story-item story">
                <div className="profile-pic">
                    <img src={props.avatar} alt="" />
                </div>
                <p className="name">{props.name}</p>
            </div>
        );
    };

    // RENDER JSON
    const [data, setData] = useState([]);

    // GET METHOD
    const getPosts = () => {
        fetch(postApi)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            });
    };

    useEffect(() => {
        getPosts();
    }, []);

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

    // PUT DATA INTO JSON
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        e.persist();
        setInputs(() => ({
            ...inputs,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        postPosts();
        window.location.reload();
    };

    // UPLOAD IMG
    const fileElem = document.getElementById("fileElem");

    // POST METHOD
    const objPost = {
        avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.redd.it%2Fevtlnz66q7j61.jpg%3Fwidth%3D960%26crop%3Dsmart%26auto%3Dwebp%26s%3Dc118a6a2630e2c9a2b9412a20c8bc54f19b087dc&f=1&nofb=1",
        name: "Diana Ayi",
        location: "VietNam",
        time: "1 min ago",
        caption: inputs.caption,
    };

    const postPosts = async () => {
        const response = await fetch(postApi, {
            method: "POST",
            body: JSON.stringify(objPost),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    };

    return (
        <>
            <div className="middle">
                {/* STORIES */}

                <div className="stories d-flex justify-content-between">
                    {StoryData.map((item, index) => (
                        <StoryItem
                            key={item.id}
                            avatar={item.avatar}
                            name={item.name}
                        ></StoryItem>
                    ))}
                </div>

                {/* END OF STORIES */}

                {/* STATUS */}
                <form
                    action=""
                    className="create-post d-flex flex-column align-items-center"
                    onSubmit={handleSubmit}
                >
                    <div className="create-post-wrapper d-flex align-items-center">
                        <div className="profile-pic">
                            <img
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.redd.it%2Fevtlnz66q7j61.jpg%3Fwidth%3D960%26crop%3Dsmart%26auto%3Dwebp%26s%3Dc118a6a2630e2c9a2b9412a20c8bc54f19b087dc&f=1&nofb=1"
                                alt=""
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="What's on your mind, Diana?"
                            className="border-0 ps-3 me-3 ms-3"
                            name="caption"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="d-flex justify-content-between create-post-action">
                        <div className="d-flex justify-items-around create-post-icons">
                            <input
                                type="file"
                                name="photo"
                                id="fileElem"
                                multiple
                                accept="image/*"
                                style={{ display: "none" }}
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
                            <input
                                type="submit"
                                value="Post"
                                className="btn btn-primary"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </form>
                {/* END STATUS */}

                {/* FEEDS */}
                <div className="feeds">
                    {data &&
                        data.map((item, index) => (
                            <div key={item.id} className="feed-item feed">
                                <div className="head">
                                    <div className="user">
                                        <div className="profile-pic">
                                            <img src={item.avatar} alt="" />
                                        </div>
                                        <div className="info">
                                            <h3>{item.name}</h3>
                                            <span>
                                                {item.location}, {item.time}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="edit">
                                        <UilEllipsisH />
                                    </span>
                                </div>
                                <div className="photo">
                                    <img src={item.photo} alt="" />
                                </div>
                                <div className="action-buttons">
                                    <div className="interaction-buttons d-flex gap-4">
                                        <span>
                                            <UilHeart />
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
                                        <b> {item.numsLiked} others</b>
                                    </p>
                                </div>
                                <div className="caption">
                                    <p>
                                        <b>{item.name + " "}</b>
                                        {item.caption}
                                        <b className="hash-tag">
                                            {" " + item.hashtag}
                                        </b>
                                    </p>
                                </div>
                                <div className="comments text-muted">
                                    View all {item.numsCommented} comments
                                </div>
                            </div>
                        ))}
                </div>
                {/* END OF FEEDS */}
            </div>
        </>
    );
};

export default Middle;
