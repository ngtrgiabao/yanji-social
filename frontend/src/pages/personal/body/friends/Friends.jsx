import React, { useState, useEffect } from "react";

import axios from "axios";

import "../../../../style/pages/personal/body/friends/friends.css";

import RandomFriendsCollection from "./randomFriends/friendCollection/RandomFriendsCollection";

const Friends = () => {
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

        return getFriendsAvatar;
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
                <RandomFriendsCollection avatars={randomAvatarFriends} />
            </div>
        </div>
    );
};

export default Friends;
