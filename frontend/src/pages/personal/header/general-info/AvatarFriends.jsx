import React, { useState, useEffect } from "react";
import { UilPlusCircle, UilPen } from "@iconscout/react-unicons";

import axios from "axios";

function AvatarFriends() {
    // GET RANDOM AVATAR FRIENDS IN PERSONAL PAGE
    const [randomAvatarFriends, setRandomAvatarFriends] = useState([]);

    useEffect(() => {
        const getFriendsAvatar = async () => {
            const avatar = await axios.get(
                "https://randomuser.me/api/?results=9"
            );

            avatar.data.results.forEach((friend) => {
                setRandomAvatarFriends((avatarFriend) => [
                    ...avatarFriend,
                    { id: friend.login.uuid, avatar: friend.picture.large },
                ]);
            });
        };

        return getFriendsAvatar;
    }, []);

    return (
        <div className="tools d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-center justify-content-between">
                {randomAvatarFriends.map((item, index) => (
                    <div
                        key={item.id}
                        className="rounded-circle avatar-friends"
                    >
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={item.avatar}
                            alt="Avatar user"
                            className="rounded-circle"
                        />
                    </div>
                ))}
            </div>

            <div className="d-flex flex-wrap edit-profile">
                <div className="add-stories d-flex align-items-center text-light">
                    <span>
                        <UilPlusCircle />
                    </span>
                    <span className="d-block ms-2 ">Add stories</span>
                </div>
                <div className="d-flex align-items-center edit-profile-page text-light">
                    <span>
                        <UilPen />
                    </span>
                    <span className="d-block ms-2">Edit profile page</span>
                </div>
            </div>
        </div>
    );
}

export default AvatarFriends;
