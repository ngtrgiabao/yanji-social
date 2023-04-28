import React, { useState, useEffect } from "react";

import "../../../../../style/pages/main/sidebar/middle/stories/stories.css";
import ProfilePic from "../../../../../assets/avatar/profile-pic.png";

import axios from "axios";
import { useSelector } from "react-redux";

const Stories = () => {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const data = window.localStorage.getItem("avatar");
        setAvatar(data);
    }, [avatar]);

    // GET RANDOM STORIES
    const [storyData, setStoryData] = useState([]);
    const USER_URL = "https://randomuser.me/api/?results=6";

    const user = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        const getStory = async () => {
            const story = await axios.get(USER_URL);

            story.data.results.forEach((friend) => {
                setStoryData((str) => [
                    ...str,
                    {
                        id: friend.login.uuid,
                        avatar: friend.picture.large,
                        firstName: friend.name.first,
                        lastName: friend.name.last,
                    },
                ]);
            });
        };
        return getStory;
    }, []);

    // GET RANDOM IMG STORY
    // const [storyImg, setStoryImg] = useState([]);

    // const IMG_STORY_URL = "https://random.imagecdn.app/v1/image?";

    return (
        <div className="stories d-flex justify-content-between">
            <div
                className="story-item story"
                id="your-story"
                style={{
                    background: `url(${
                        user ? ProfilePic : avatar || ProfilePic
                    }) no-repeat center center/cover`,
                }}
            >
                <div className="avatar-profile__stories">
                    <img
                        src={user ? ProfilePic : avatar || ProfilePic}
                        alt=""
                    />
                </div>
                <p className="name text-center">Create story</p>
                <span className="create-post-icon">+</span>
            </div>

            {storyData.map((item) => (
                <div
                    className="story-item story"
                    key={item.id}
                    style={{
                        background: `url(${item.avatar}) no-repeat center center/cover`,
                    }}
                >
                    <div className="profile-pic">
                        <img src={item.avatar} alt="" />
                    </div>
                    <p className="name text-center">
                        {item.lastName + " " + item.firstName}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Stories;
