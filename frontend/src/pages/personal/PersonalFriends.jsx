import { useState, useEffect } from "react";

import axios from "axios";

import "../../style/pages/personal/personalFriends.css";

import PersonalRandomFriendsCollection from "./PersonalRandomFriendsCollection";

const PersonalFriends = () => {
    // GET RANDOM AVATAR FRIENDS IN PERSONAL PAGE
    const [randomAvatarFriends, setRandomAvatarFriends] = useState([]);

    useEffect(() => {
        const getFriendsAvatar = async () => {
            const avatar = await axios.get(
                "https://randomuser.me/api/?results=9&inc=picture"
            );

            avatar.data.results.forEach((friend) => {
                setRandomAvatarFriends((friendAvatar) => [
                    ...friendAvatar,
                    friend.picture.large,
                ]);
            });
        };

        getFriendsAvatar();
    }, []);

    return (
        <div>
            <div className="header d-flex justify-content-between">
                <a href="#" className="fw-bold fs-3">
                    Friends
                </a>
                <a href="#" className="fs-3">
                    All friends
                </a>
            </div>
            <span className="fs-5 nums-friends">1.259 Friends</span>
            <div>
                <PersonalRandomFriendsCollection
                    avatars={randomAvatarFriends}
                />
            </div>
        </div>
    );
};

export default PersonalFriends;
