import { useState, useEffect } from "react";

import axios from "axios";

import "../../style/pages/personal/personalGallery.css";

import PersonalGalleryCollection from "./PersonalGalleryCollection";

const PersonalGallery = () => {
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
        <>
            <div className="header d-flex justify-content-between">
                <span className="fw-bold fs-3">Images</span>
                <a href="#" className="fs-3">
                    All images
                </a>
            </div>
            <div>
                <PersonalGalleryCollection photos={randomAvatarFriends} />
            </div>
        </>
    );
};

export default PersonalGallery;
