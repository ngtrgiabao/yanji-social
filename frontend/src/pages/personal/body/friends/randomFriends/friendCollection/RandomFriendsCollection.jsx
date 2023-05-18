import React from "react";

import "../../../../../../style/pages/personal/body/friends/randomFriends/friendCollection/randomFriendsCollection.css";

const RandomFriendsCollection = (props) => {
    const { avatars } = props;

    const renderAvatars = () => {
        return avatars.map((avatar, index) => {
            return (
                <img
                    loading="lazy"
                    role="presentation"
                    decoding="async"
                    src={avatar}
                    alt="Avatar user"
                    key={index}
                />
            );
        });
    };

    return <div className="friends-grid">{renderAvatars()}</div>;
};

export default RandomFriendsCollection;
