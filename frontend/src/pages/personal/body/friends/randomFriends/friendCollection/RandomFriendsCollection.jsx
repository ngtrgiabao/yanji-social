import React from "react";

import "../../../../../../style/pages/personal/body/friends/randomFriends/friendCollection/randomFriendsCollection.css";

const RandomFriendsCollection = (props) => {
    const { avatars } = props;
    return (
        <div className="friends-grid">
            {avatars.map((avatar, index) => {
                return <img src={avatar} alt="" key={index} />;
            })}
        </div>
    );
};

export default RandomFriendsCollection;
