import React from "react";
import { UilPlusCircle, UilPen } from "@iconscout/react-unicons";

import avtarImg from "../../../../images/profile-pic.png";

function AvatarFriends() {
    const avatarFriendsList = [
        {
            id: 1,
            img: avtarImg,
        },
        {
            id: 2,
            img: avtarImg,
        },
        {
            id: 3,
            img: avtarImg,
        },
        {
            id: 4,
            img: avtarImg,
        },
        {
            id: 5,
            img: avtarImg,
        },
        {
            id: 6,
            img: avtarImg,
        },
        {
            id: 7,
            img: avtarImg,
        },
        {
            id: 8,
            img: avtarImg,
        },
    ];

    return (
        <div className="tools d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-center justify-content-between">
                {avatarFriendsList.map((avatarFriendList) => (
                    <div
                        key={avatarFriendList.id}
                        className="border border-dark rounded-circle avatar-friends"
                    >
                        <img
                            className="rounded-circle"
                            src={avatarFriendList.img}
                            alt=""
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
