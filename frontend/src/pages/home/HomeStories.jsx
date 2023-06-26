import { useState, useEffect } from "react";

import "../../style/pages/home/homeStories.css";
import ProfilePic from "../../assets/avatar/profile-pic.png";

import axios from "axios";
import { useSelector } from "react-redux";

const HomeStories = () => {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const data = window.localStorage.getItem("avatar");
        setAvatar(data);
    }, []);

    // GET RANDOM STORIES
    const [storyData, setStoryData] = useState([]);
    const USER_URL = "https://randomuser.me/api/?results=6";

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    useEffect(() => {
        const getStory = async () => {
            try {
                const response = await axios.get(USER_URL);
                const stories = response.data.results.map((friend) => ({
                    id: friend.login.uuid,
                    avatar: friend.picture.large,
                    firstName: friend.name.first,
                    lastName: friend.name.last,
                }));
                setStoryData(stories);
            } catch (error) {
                console.error("Failed to get user data", error);
            }
        };
        getStory();
    }, []);

    // GET RANDOM IMG STORY
    // const [storyImg, setStoryImg] = useState([]);

    // const IMG_STORY_URL = "https://random.imagecdn.app/v1/image?";

    const renderStory = () => {
        return storyData.map((item) => (
            <div
                className="story-item story"
                key={item.id}
                style={{
                    background: `url(${item.avatar}) no-repeat center center/cover`,
                }}
            >
                <div className="profile-pic">
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src={item.avatar}
                        alt="Avatar user"
                    />
                </div>
                <p className="name text-center">
                    {item.lastName + " " + item.firstName}
                </p>
            </div>
        ));
    };

    return (
        <div className="stories d-flex justify-content-between">
            <div
                className="story-item story"
                id="your-story"
                style={{
                    background: `url(${
                        currentUser ? currentUser.profilePicture : ProfilePic
                    }) no-repeat center center/cover`,
                }}
            >
                <div className="profile-pic">
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src={
                            currentUser
                                ? currentUser.profilePicture
                                : ProfilePic
                        }
                        alt="Avatar user"
                    />
                </div>
                <p className="name text-center mb-1">Create story</p>
                <span className="create-post-icon">+</span>
            </div>

            {renderStory()}
        </div>
    );
};

export default HomeStories;
