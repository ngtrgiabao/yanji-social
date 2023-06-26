import { useState, useEffect } from "react";
import { UilPlusCircle, UilPen } from "@iconscout/react-unicons";

import axios from "axios";

const PersonalAvatarFriends = () => {
    // GET RANDOM AVATAR FRIENDS IN PERSONAL PAGE
    const [randomAvatarFriends, setRandomAvatarFriends] = useState([]);

    useEffect(() => {
        let isCancelled = false;

        const getFriendsAvatar = async () => {
            try {
                const avatar = await axios.get(
                    "https://randomuser.me/api/?results=9"
                );
                let avatars = [];

                avatar.data.results.forEach((friend) => {
                    avatars.push({
                        id: friend.login.uuid,
                        avatar: friend.picture.large,
                    });
                });

                setRandomAvatarFriends(avatars);
            } catch (error) {
                console.error("Failed to get user data", error);
            }
        };

        if (!isCancelled) {
            getFriendsAvatar();
        }

        return () => {
            isCancelled = true;
        };
    }, []);

    const renderRandomAvatarFriends = () => {
        return randomAvatarFriends.map((item, index) => (
            <div key={item.id} className="rounded-circle avatar-friends">
                <img
                    loading="lazy"
                    role="presentation"
                    decoding="async"
                    src={item.avatar}
                    alt="Avatar user"
                    className="rounded-circle"
                />
            </div>
        ));
    };

    return (
        <div className="tools d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-center justify-content-between">
                {renderRandomAvatarFriends()}
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
};

export default PersonalAvatarFriends;
